"""
data_processing.py
------------------
ML-enhanced backend. Only compute_summary is changed — everything else
keeps the same signature and return values so main.py, app.py and the
React dashboard require zero modifications.

What changed:
  - preprocess_data : smarter NaN handling (country median → global median)
  - compute_transportation : cheapest option in comfort mode (no randomness)
  - compute_summary : ML model predicts comfort/budget mode using the exact
                      average totals already computed by the other functions
"""

import os
import joblib
import numpy as np
import pandas as pd

# ── load ML model once at startup ─────────────────────────────────────────────
_MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")
try:
    _mode_model    = joblib.load(os.path.join(_MODEL_DIR, "mode_model.pkl"))
    _ML_READY      = True
except Exception:
    _ML_READY = False   # app still works before training


# ══════════════════════════════════════════════════════════════════════════════
# 1.  PREPROCESSING
# ══════════════════════════════════════════════════════════════════════════════

def preprocess_data(file_path1, file_path2):
    try:
        df1 = pd.read_csv(file_path1)
        df2 = pd.read_csv(file_path2)

        df = pd.concat([df1, df2], ignore_index=True)
        df = df.drop_duplicates(subset=['city', 'country'], keep='first')
        df = df.drop(columns=["Unnamed: 0"], errors="ignore")

        #handling missing values:
        cols = [
            "x54", "x36", "x37", "x38", "x28", "x29", "x30", "x31", "x33",
            "x9", "x10", "x11", "x12", "x13", "x14", "x15", "x16", "x17",
            "x18", "x19", "x20", "x21", "x22", "x1", "x2", "x3", "x39",
            "x40", "x41", "x48", "x49", "x50", "x51"
        ]

        # Step 1: fill NaN with the median of the same country
        # (a missing price in Paris is better estimated from French cities
        #  than from the global median)
        df[cols] = df.groupby("country")[cols].transform(lambda x: x.fillna(x.median()))

        # Step 2: if still NaN (country had only one city with no data),
        # fall back to the global column median. And we are using median and not mean, 
        # because mean can be heavly influenced by the imbalance of the data (veeryy big and verryy small values)
        df[cols] = df[cols].fillna(df[cols].median())

        df = df[df['data_quality'] == 1]

        # Remove cities with no salary data at all
        df = df[df['x54'] != 0]


        return df, None

    except FileNotFoundError as e:
        return {}, f"Error: One or both CSV files not found. {e}"
    except pd.errors.EmptyDataError as e:
        return {}, f"Error: One or both CSV files are empty. {e}"
    except Exception as e:
        return {}, f"Unexpected error in preprocess_data: {e}"


# ══════════════════════════════════════════════════════════════════════════════
# 2.  NET SALARY
# ══════════════════════════════════════════════════════════════════════════════
#i dont see the point of this function


def compute_net_salary(row):
    try:
        net_salary = {"monthly_value": row["x54"]}
        return net_salary, net_salary["monthly_value"], None
    except KeyError as e:
        return {}, 0, f"Error: Missing column {e} in compute_net_salary."
    except Exception as e:
        return {}, 0, f"Unexpected error in compute_net_salary: {e}"


# ══════════════════════════════════════════════════════════════════════════════
# 3.  BILLS
# ══════════════════════════════════════════════════════════════════════════════

def compute_bills(row):
    try:
        bills_details = {
            "monthly_electricity_heating_water_cost": row["x36"],
            "monthly_mobile":                         round(row["x37"] * 60, 2),
            "monthly_internet_cost":                  row["x38"],
        }
        bills_avg = round(sum(bills_details.values()), 2)
        bills_and_fees = {
            "monthly_average_cost": bills_avg,
            "monthly_details":      bills_details,
        }
        return bills_and_fees, bills_avg, None

    except KeyError as e:
        return {}, 0, f"Error: Missing column {e} in compute_bills."
    except Exception as e:
        return {}, 0, f"Unexpected error in compute_bills: {e}"


# ══════════════════════════════════════════════════════════════════════════════
# 4.  TRANSPORTATION
# ══════════════════════════════════════════════════════════════════════════════

def compute_transportation(row, budget_mode=False):
    # 2 scenarios: public transportation ((one way tickets OR monthly pass) + occasional taxi), or own a car
    try:
        # Scenario 1: public transport
        individual_tickets = row["x28"] * 40 # assuming you take the bus 5 days/week, and 2 times/day
        monthly_pass       = row["x29"]
        taxi_cost          = (row["x30"] + row["x31"]) * 10

        if monthly_pass > 0 and monthly_pass < individual_tickets:
            public_base = monthly_pass
        else:
            public_base = individual_tickets

        public_transport_total = round(public_base + taxi_cost, 2)
        
        # Scenario 2: car
        car_total              = round(row["x33"] * 80, 2)   # 80 liters of gasoline per month
        
        cheapest_cost          = min(public_transport_total, car_total)
        expensive_cost          = max(public_transport_total, car_total)

        # both budget mode and comfort mode pick the cheapest option
        # (no randomness — rational economic choice)
        if budget_mode:
            transport_total = cheapest_cost
            transport_type  = "public" if public_transport_total <= car_total else "car"
        else:
            transport_total = expensive_cost
            transport_type  = "public" if public_transport_total >= car_total else "car"

        transport_details = {
            "monthly_public_transport_cost": public_transport_total,
            "monthly_gasoline_cost":         car_total,
            "transport_type":                transport_type,
        }
        transportation = {
            "monthly_average_cost": transport_total,
            "monthly_details":      transport_details,
        }
        return transportation, transport_total, cheapest_cost, None

    except KeyError as e:
        return {}, 0, 0, f"Error: Missing column {e} in compute_transportation."
    except Exception as e:
        return {}, 0, 0, f"Unexpected error in compute_transportation: {e}"


# ══════════════════════════════════════════════════════════════════════════════
# 5.  GROCERIES
# ══════════════════════════════════════════════════════════════════════════════

def compute_groceries(row):
    try:
        grocery_items = {
            "milk":           round(row["x9"]  * 8,  2),
            "rice":           round(row["x11"] * 2,  2),
            "eggs":           round(row["x12"] * 4,  2),
            "bread":          round(row["x10"] * 10, 2),
            "cheese":         round(row["x13"] * 1,  2),
            "chicken":        round(row["x14"] * 4,  2),
            "beef":           round(row["x15"] * 2,  2),
            "fruits_veggies": round(
                (row["x16"] + row["x17"] + row["x18"] + row["x19"] +
                 row["x20"] + row["x21"] + row["x22"]) * 4, 2),
        }
        groceries_avg = sum(grocery_items.values())
        groceries = {
            "monthly_average_cost": groceries_avg,
            "monthly_details":      grocery_items,
        }
        return groceries, groceries_avg, None

    except KeyError as e:
        return {}, 0, f"Error: Missing column {e} in compute_groceries."
    except Exception as e:
        return {}, 0, f"Unexpected error in compute_groceries: {e}"


# ══════════════════════════════════════════════════════════════════════════════
# 6.  ENTERTAINMENT
# ══════════════════════════════════════════════════════════════════════════════

def compute_entertainment(row, budget_mode=False):
    try:
        entertainment_details = {
            "monthly_tennis_cost":     row["x40"] * 2 * 4,
            "monthly_cinema_cost":     row["x41"] * 2,
            "monthly_gym_cost":        row["x39"],
            "monthly_restaurant_cost": row["x1"]  * 4,
            "monthly_mcdo_cost":       row["x3"]  * 2,
        }

        if budget_mode:
            sports = [v for v in [entertainment_details["monthly_tennis_cost"], entertainment_details["monthly_gym_cost"]] if v > 0]
            food   = [v for v in [entertainment_details["monthly_restaurant_cost"], entertainment_details["monthly_mcdo_cost"]] if v > 0]
            fun    = [entertainment_details["monthly_cinema_cost"]]

            entertainment_total = (
                min(sports, default=0) +
                min(food,   default=0) +
                (fun[0] if fun[0] > 0 else 0)
            )
        else:
            entertainment_total = sum(entertainment_details.values())

        entertainment = {
            "monthly_total_cost": round(entertainment_total, 2),
            "monthly_details":    entertainment_details,
        }
        return entertainment, round(entertainment_total, 2), None

    except KeyError as e:
        return {}, 0, f"Missing column {e} in entertainment calculation: {e}"
    except Exception as e:
        return {}, 0, f"Unexpected error in entertainment calculation: {e}"


# ══════════════════════════════════════════════════════════════════════════════
# 7.  ACCOMMODATIONS
# ══════════════════════════════════════════════════════════════════════════════

def compute_accommodations(row, budget_mode=False):
    try:
        accommodations_details = {
            "monthly_studio_city_center_rent":               row["x48"],
            "monthly_studio_outside_center_rent":            row["x49"],
            "monthly_family_apartment_city_center_rent":     row["x50"],
            "monthly_family_apartment_outside_center_rent":  row["x51"],
        }

        valid_rents   = [v for v in accommodations_details.values() if v > 0]
        cheapest_cost = min(valid_rents) if valid_rents else 0
        average_cost  = (sum(valid_rents) / len(valid_rents)) if valid_rents else 0

        accommodations_total = cheapest_cost if budget_mode else average_cost

        accommodations = {
            "monthly_total_cost": accommodations_total,
            "monthly_details":    accommodations_details,
        }
        return accommodations, accommodations_total, cheapest_cost, None

    except KeyError as e:
        return {}, 0, 0, f"Missing column {e} in accommodation calculation: {e}"
    except Exception as e:
        return {}, 0, 0, f"Unexpected error in accommodation calculation: {e}"


# ══════════════════════════════════════════════════════════════════════════════
# 8.  SUMMARY: ML predicts comfort/budget mode
# ══════════════════════════════════════════════════════════════════════════════

def compute_summary(
    salary_value,
    bills_avg,
    transport_total,
    groceries_avg,
    entertainment_total,
    accommodations_total,
    cheapest_accomodation,
    row,
):
    """
    Aggregates all expenses and determines the lifestyle mode.

    The ML model receives the exact averages already computed by the other
    functions (expressed as ratios to salary) and predicts whether the city
    puts the user in comfort or budget mode.

    If ML is not ready (models not trained yet), falls back to the simple
    rule: budget if total_expenses > salary.
    """
    try:
        mode  = "comfort"
        error = ""

        # ── comfort-mode totals (already computed by the caller) ──────────────
        total_expenses   = (
            bills_avg + transport_total + groceries_avg +
            entertainment_total + accommodations_total
        )
        remaining_income = salary_value - total_expenses

        # ── MODE DECISION ─────────────────────────────────────────────────────
        if _ML_READY:

            # same 7 values used during training in train_mode.py
            x = np.array([[
                bills_avg             ,   # bills burden
                transport_total       ,   # transport burden
                groceries_avg         ,   # grocery burden
                entertainment_total   ,   # entertainment burden
                accommodations_total  ,   # accommodation burden
            ]])

            predicted_mode = _mode_model.predict(x)[0]

        else:
            # fallback: original rule-based threshold
            predicted_mode = "comfort" if remaining_income > 0 else "budget"

        # ── BUDGET RECALCULATION (unchanged logic) ────────────────────────────
        if predicted_mode == "budget":
            mode = "budget"

            entertainment_budget, entertainment_total_budget, ent_error = compute_entertainment(row, budget_mode=True)

            accommodations_budget, accommodations_total_budget, cheapest_acc_budget, acc_error = compute_accommodations(row, budget_mode=True)

            transportation_budget, transport_total_budget, cheapest_transport, trans_error = compute_transportation(row, budget_mode=True)

            total_expenses   = (
                bills_avg + transport_total_budget + groceries_avg +
                entertainment_total_budget + accommodations_total_budget
            )
            remaining_income = salary_value - total_expenses

            entertainment_result  = entertainment_budget
            accommodations_result = accommodations_budget
            transportation_result = transportation_budget
            error = ent_error or acc_error or trans_error or ""

        else:
            entertainment_result  = None
            accommodations_result = None
            transportation_result = None

        summary = {
            "total_monthly_expenses": total_expenses,
            "remaining_income":       remaining_income,
        }
        return summary, entertainment_result, accommodations_result, transportation_result, mode, error

    except Exception as e:
        return {}, None, None, None, "error", str(e)