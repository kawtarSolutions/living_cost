import json
import pandas as pd

from data_preprocessing import (
    preprocess_data,
    compute_net_salary,
    compute_bills,
    compute_transportation,
    compute_groceries,
    compute_entertainment,
    compute_accommodations,
    compute_summary
)


def main(user_city: str):
    try:
        file_path1 = "./cost-of-living.csv"
        file_path2 = "./cost-of-living_v2.csv"

        df, preprocess_error = preprocess_data(file_path1, file_path2)
        if preprocess_error:
            raise ValueError(preprocess_error)

        filtered_rows = df[df["city"].str.lower() == user_city.lower()]
        if filtered_rows.empty:
            raise ValueError(f"City '{user_city}' not found in the dataset.")

        row = filtered_rows.iloc[0]

        net_salary, salary_value, salary_error = compute_net_salary(row)
        bills_and_fees, bills_avg, bills_error = compute_bills(row)
        transportation, transport_total, transport_cheapest, transport_error = compute_transportation(row)
        groceries, groceries_avg, groceries_error = compute_groceries(row)
        entertainment, entertainment_total, ent_error = compute_entertainment(row, budget_mode=False)
        accommodations, accommodations_total, accommodations_cheapest, acc_error = compute_accommodations(row,  budget_mode=False)

        summary, entertainment_adjusted, accommodations_adjusted, transportation_adjusted, mode, summary_error = compute_summary(
            salary_value=salary_value,
            bills_avg=bills_avg,
            transport_total=transport_total,
            groceries_avg=groceries_avg,
            entertainment_total=entertainment_total,
            accommodations_total=accommodations_total,
            cheapest_accomodation=accommodations_cheapest,
            row=row
        )

        if entertainment_adjusted is not None:
            entertainment = entertainment_adjusted
        if accommodations_adjusted is not None:
            accommodations = accommodations_adjusted
        if transportation_adjusted is not None:
            transportation = transportation_adjusted

        all_errors = [e for e in [salary_error, bills_error, transport_error, groceries_error, ent_error, acc_error, summary_error] if e]
        error = "; ".join(all_errors) if all_errors else ""

        city_dashboard = {
            "city": row["city"],
            "country": row["country"],
            "net_salary": net_salary,
            "bills_and_fees": bills_and_fees,
            "transportation": transportation,
            "groceries": groceries,
            "entertainment": entertainment,
            "accommodations": accommodations,
            "summary": summary,
            "mode": mode,
            "error": error
        }

        print(city_dashboard)
        return city_dashboard

    except Exception as e:
        return {"mode": "error", "error": str(e)}


if __name__ == "__main__":
    import sys
    city = sys.argv[1] if len(sys.argv) > 1 else "Paris"
    print(json.dumps(main(city), indent=2, default=float))