"""
train_mode.py
-------------
Trains a Random Forest classifier to predict comfort vs budget mode.

The model learns from the exact same category averages that compute_summary
receives at runtime — expressed as ratios to salary. This means training
and inference use identical numbers with zero inconsistency.

Features (7 ratios):
    bills_to_salary            → total bills / salary
    transport_to_salary        → cheapest transport total / salary
    groceries_to_salary        → full grocery basket / salary
    entertainment_to_salary    → full entertainment total / salary
    accommodation_to_salary    → average rent / salary
    cheapest_rent_to_salary    → cheapest rent / salary
    remaining_to_salary        → (salary - total_expenses) / salary
                                   positive = money left over
                                   negative = already over budget

Labels:
    "comfort"  →  total_expenses ≤ salary
    "budget"   →  total_expenses > salary

Usage:
    python train_mode.py

Outputs (saved to models/):
    mode_model.pkl
    mode_importance.png
    training_report.txt
"""

import os
import joblib
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

from sklearn.ensemble        import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.metrics         import classification_report, confusion_matrix, accuracy_score, precision_score, recall_score, f1_score

from data_preprocessing import (
    preprocess_data,
    compute_bills,
    compute_transportation,
    compute_groceries,
    compute_entertainment,
    compute_accommodations,
)

os.makedirs("models", exist_ok=True)

# ══════════════════════════════════════════════════════════════════════════════
#  BUILD FEATURES & LABELS:     
# ══════════════════════════════════════════════════════════════════════════════

def build_features_and_labels(df):
    records = []

    for _, row in df.iterrows():
        salary = float(row["x54"]) or 1e-9

        # call the actual functions — no math rewritten anywhere
        _, bills         , _  = compute_bills(row)
        _, transport     , _, _ = compute_transportation(row)
        _, groceries     , _  = compute_groceries(row)
        _, entertainment , _  = compute_entertainment(row)
        _, accommodation , _, _ = compute_accommodations(row)

        total_expenses   = bills + transport + groceries + entertainment + accommodation
        remaining_income = salary - total_expenses

        # label: same rule as the original compute_summary fallback
        mode = "comfort" if remaining_income >= 0 else "budget"

        records.append({
            # ── features ───────────────────────────────────
            "bills":          bills,
            "transport":      transport,
            "groceries":      groceries,
            "entertainment":  entertainment,
            "accommodation":  accommodation,
            # ── label ─────────────────────────────────────────────────────────
            "mode": mode,
        })

    result = pd.DataFrame(records)
    print(f"Built {len(result)} feature rows")
    print("Label distribution:\n", result["mode"].value_counts())
    return result


# ══════════════════════════════════════════════════════════════════════════════
#  TRAIN:    
# ══════════════════════════════════════════════════════════════════════════════

FEATURE_COLS = [
    "bills",
    "transport",
    "groceries",
    "entertainment",
    "accommodation",
]

def train(df_features):
    X = df_features[FEATURE_COLS]
    y = df_features["mode"]


    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # GridSearchCV
    params_rf = {
        "n_estimators": [100, 200, 300],
        "max_depth": [3, 5, 10, None],
        "min_samples_leaf": [5, 10, 20],
        "min_samples_split": [2, 5, 10],
        "max_features": ["sqrt", "log2"],
        "class_weight": ["balanced"],
    }
 
    grid_mode_model = GridSearchCV(RandomForestClassifier(random_state=42), params_rf, cv=3, scoring="f1_macro")     
    # We used f1_macro because it averages F1 across both classes without needing a pos_label, which is exactly what we want for a two-string-label problem.
    grid_mode_model.fit(X_train, y_train)
    best_mode_model = grid_mode_model.best_estimator_

    return best_mode_model, X, y, X_test, y_test


# ══════════════════════════════════════════════════════════════════════════════
#  EVALUATE:   
# ══════════════════════════════════════════════════════════════════════════════
def evaluation(name, y_test, y_pred):
    report = classification_report(y_test, y_pred)
    cm     = confusion_matrix(y_test, y_pred, labels=["comfort", "budget"])

    print(f"\n── {name} ──────────────────────────────────────────────────────")
    print(f"Accuracy:  {round(accuracy_score(y_test, y_pred), 3)}")
    print(f"Precision: {round(precision_score(y_test, y_pred, average='macro'), 3)}")     # We used average='macro' to 
    print(f"Recall:    {round(recall_score(y_test, y_pred, average='macro'), 3)}")
    print(f"F1-score:  {round(f1_score(y_test, y_pred, average='macro'), 3)}")
    print(f"\nConfusion matrix:")
    print(f"               comfort   budget")
    print(f"  comfort       {cm[0,0]:5d}    {cm[0,1]:5d}")
    print(f"  budget        {cm[1,0]:5d}    {cm[1,1]:5d}")

    lines = [
        "=" * 60,
        f"MODE CLASSIFIER — {name} Report",
        "=" * 60,
        f"Accuracy:  {round(accuracy_score(y_test, y_pred), 3)}",
        f"Precision: {round(precision_score(y_test, y_pred, average='macro'), 3)}",
        f"Recall:    {round(recall_score(y_test, y_pred, average='macro'), 3)}",
        f"F1-score:  {round(f1_score(y_test, y_pred, average='macro'), 3)}",
        "",
        "Confusion matrix (rows=actual, cols=predicted):",
        f"               comfort   budget",
        f"  comfort       {cm[0,0]:5d}    {cm[0,1]:5d}",
        f"  budget        {cm[1,0]:5d}    {cm[1,1]:5d}",
    ]
    with open(f"models/{name}_report.txt", "w") as f:
        f.write("\n".join(lines))
    print(f"\nReport saved → models/{name}_report.txt")


# ══════════════════════════════════════════════════════════════════════════════
#  FEATURE IMPORTANCE CHART:    
# ══════════════════════════════════════════════════════════════════════════════

def save_importance_chart(model):
    importances = pd.Series(
        model.feature_importances_ , index=FEATURE_COLS
    ).sort_values()

    fig, ax = plt.subplots(figsize=(8, 4))
    importances.plot(kind="barh", ax=ax, color="#4A90D9")
    ax.set_title("What drives comfort vs budget mode?", fontweight="bold")
    ax.set_xlabel("Importance")
    ax.spines[["top", "right"]].set_visible(False)
    plt.tight_layout()
    plt.savefig("models/mode_importance.png", dpi=150)
    plt.close()
    print("Feature importance chart saved → models/mode_importance.png")


# ══════════════════════════════════════════════════════════════════════════════
#  MAIN:     
# ══════════════════════════════════════════════════════════════════════════════
def main():
    print("Loading data …")
    df, error = preprocess_data("data/cost-of-living.csv", "data/cost-of-living_v2.csv")

    print("\nComputing features and labels …")
    df_features = build_features_and_labels(df)

    print("\nTraining model …")
    model, X, y, X_test, y_test = train(df_features)
    y_pred = model.predict(X_test)

    evaluation("Mode model: RandomForestClassifier", y_test, y_pred)
    save_importance_chart(model)

    joblib.dump(model,  "models/mode_model.pkl")
    print("\n✓  model saved → models/mode_model.pkl")



if __name__ == "__main__":
    main()