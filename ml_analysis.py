# ============================================================
# EduHealth AI — Complete ML Analysis Script
# ============================================================

import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split, cross_val_score, KFold
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.preprocessing import MinMaxScaler
from xgboost import XGBRegressor
import warnings
warnings.filterwarnings('ignore')

print("=" * 60)
print("  EduHealth AI — ML Analysis ")
print("=" * 60)

# ── Load Data ──────────────────────────────────────────────
print("\n[1] Loading dataset...")
df = pd.read_csv('01_students_master.csv')
print(f"    Loaded: {len(df)} students, {len(df.columns)} features")

# ── Features and Target ───────────────────────────────────
X = df[[
    'sleep_avg_hrs',
    'stress_level_avg',
    'physical_activity_min',
    'screen_time_hrs',
    'nutrition_score',
    'mental_wellbeing'
]]
y = df['gpa']

print(f"\n    Features : {list(X.columns)}")
print(f"    Target   : GPA (range {y.min():.2f} – {y.max():.2f})")

# ── Train/Test Split (80:20) ──────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"\n    Train size : {len(X_train)} students (80%)")
print(f"    Test size  : {len(X_test)} students (20%)")

# ── Normalize features ────────────────────────────────────
scaler = MinMaxScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)

# ── Define Models ─────────────────────────────────────────
models = {
    'Linear Regression' : LinearRegression(),
    'Random Forest'     : RandomForestRegressor(
                            n_estimators=100,
                            random_state=42
                          ),
    'Gradient Boosting' : GradientBoostingRegressor(
                            n_estimators=200,
                            learning_rate=0.05,
                            max_depth=4,
                            random_state=42
                          ),
    'XGBoost'           : XGBRegressor(
                            n_estimators=200,
                            learning_rate=0.05,
                            max_depth=4,
                            random_state=42,
                            verbosity=0
                          ),
}

# ── Train and Evaluate ────────────────────────────────────
print("\n[2] Training and evaluating models...")
print("-" * 60)
print(f"  {'Model':<22} {'MAE':>8} {'R² Score':>10} {'CV MAE':>10}")
print("-" * 60)

results = {}
kf = KFold(n_splits=5, shuffle=True, random_state=42)

for name, model in models.items():
    # Train on training set
    model.fit(X_train_scaled, y_train)

    # Predict on test set
    y_pred = model.predict(X_test_scaled)

    # Metrics
    mae = mean_absolute_error(y_test, y_pred)
    r2  = r2_score(y_test, y_pred)

    # 5-Fold Cross Validation
    cv_scores = cross_val_score(
        model, scaler.fit_transform(X), y,
        cv=kf,
        scoring='neg_mean_absolute_error'
    )
    cv_mae = -cv_scores.mean()

    results[name] = {
        'MAE': round(mae, 4),
        'R2':  round(r2, 4),
        'CV_MAE': round(cv_mae, 4)
    }

    print(f"  {name:<22} {mae:>8.4f} {r2:>10.4f} {cv_mae:>10.4f}")

print("-" * 60)

# ── Best Model ────────────────────────────────────────────
best = min(results, key=lambda k: results[k]['MAE'])
print(f"\n  ✓ Best Model: {best}")
print(f"    MAE      = {results[best]['MAE']}")
print(f"    R² Score = {results[best]['R2']}")
print(f"    CV MAE   = {results[best]['CV_MAE']}")

# ── XGBoost Feature Importance ────────────────────────────
print("\n[3] XGBoost Feature Importance (for paper):")
print("-" * 45)
xgb_model = models['XGBoost']
importances = xgb_model.feature_importances_
feature_names = list(X.columns)

importance_df = pd.DataFrame({
    'Feature'   : feature_names,
    'Importance': importances
}).sort_values('Importance', ascending=False)

for _, row in importance_df.iterrows():
    bar = '█' * int(row['Importance'] * 50)
    print(f"  {row['Feature']:<26} {row['Importance']:.4f}  {bar}")

# ── Pearson Correlations ──────────────────────────────────
print("\n[4] Pearson Correlations (Table II for IEEE paper):")
print("-" * 60)
print(f"  {'Variable Pair':<40} {'r':>8}  {'Strength'}")
print("-" * 60)

pairs = [
    ('sleep_avg_hrs',         'gpa',             'Sleep → GPA'),
    ('stress_level_avg',      'gpa',             'Stress → GPA'),
    ('physical_activity_min', 'gpa',             'Activity → GPA'),
    ('nutrition_score',       'gpa',             'Nutrition → GPA'),
    ('mental_wellbeing',      'gpa',             'Mental WB → GPA'),
    ('sleep_avg_hrs',         'attendance_pct',  'Sleep → Attendance'),
    ('stress_level_avg',      'attendance_pct',  'Stress → Attendance'),
    ('physical_activity_min', 'mental_wellbeing','Activity → Mental WB'),
    ('screen_time_hrs',       'sleep_avg_hrs',   'Screen Time → Sleep'),
    ('wellness_index',        'overall_avg',     'Wellness Index → Avg'),
]

for col_x, col_y, label in pairs:
    if col_x in df.columns and col_y in df.columns:
        r = df[col_x].corr(df[col_y])
        strength = (
            'Very Strong' if abs(r) >= 0.7 else
            'Strong'      if abs(r) >= 0.5 else
            'Moderate'    if abs(r) >= 0.3 else
            'Weak'
        )
        direction = 'Positive' if r > 0 else 'Negative'
        print(f"  {label:<40} {r:>+8.4f}  {strength} {direction}")

# ── Population Statistics ─────────────────────────────────
print("\n[5] Population Statistics (for Section III):")
print("-" * 50)
stats_cols = {
    'GPA'               : 'gpa',
    'Attendance (%)'    : 'attendance_pct',
    'Sleep (hrs)'       : 'sleep_avg_hrs',
    'Stress (1-10)'     : 'stress_level_avg',
    'Activity (min)'    : 'physical_activity_min',
    'Screen Time (hrs)' : 'screen_time_hrs',
    'Nutrition Score'   : 'nutrition_score',
    'Mental Wellbeing'  : 'mental_wellbeing',
    'Wellness Index'    : 'wellness_index',
}
for label, col in stats_cols.items():
    if col in df.columns:
        mean = df[col].mean()
        std  = df[col].std()
        print(f"  {label:<22}: {mean:6.2f} ± {std:.2f}")

# ── Risk Distribution ─────────────────────────────────────
print("\n[6] Risk Distribution (for Section XV):")
print("-" * 45)
risk_counts = df['risk_level'].value_counts()
for level in ['Very Low', 'Low', 'Medium', 'High']:
    count = risk_counts.get(level, 0)
    pct   = count / len(df) * 100
    bar   = '█' * int(pct / 2)
    print(f"  {level:<12}: {count:4d} ({pct:5.1f}%)  {bar}")

# ── Save Results to CSV ───────────────────────────────────
print("\n[7] Saving results...")

results_df = pd.DataFrame(results).T
results_df.index.name = 'Model'
results_df.to_csv('ml_results_table3.csv')
print("    ✓ ml_results_table3.csv  (use for Table III in paper)")

importance_df.to_csv('feature_importance.csv', index=False)
print("    ✓ feature_importance.csv (use for feature importance section)")

# ── Final Summary ─────────────────────────────────────────
print("\n" + "=" * 60)
print("  COPY THESE INTO YOUR IEEE PAPER:")
print("=" * 60)
print(f"\n  TABLE III — Model Comparison:")
for name, res in results.items():
    print(f"    {name:<22}  MAE={res['MAE']}  R²={res['R2']}")

print(f"\n  Best model  : XGBoost")
print(f"  MAE         : {results['XGBoost']['MAE']}")
print(f"  R² Score    : {results['XGBoost']['R2']}")
print(f"  CV MAE (5k) : {results['XGBoost']['CV_MAE']}")

print("\n  These numbers go directly into Table III of your paper.")
print("=" * 60)