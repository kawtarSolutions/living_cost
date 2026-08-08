# 🧭 Compass — Living Cost Orientation

**Compass** helps you understand and plan your finances when considering a move to a new city. It gives you a clear picture of the **average salary** in cities around the world, then breaks down how that income is realistically spent across essential living expenses — **accommodation, bills & fees, transportation, groceries, and sports/leisure**.

Whether you're relocating for work, planning to study abroad, or just curious how far your salary would go elsewhere, Compass turns raw cost-of-living data into an actionable, visual breakdown.

🔗 **Live demo:** 

---

## ✨ Features

- 🔍 **City Search** — Look up any city and instantly get salary and cost data
- 💰 **Average Salary Insights** — See typical income levels for a given city
- 📊 **Expense Breakdown** — Visual breakdown of spending across:
  - 🏠 Accommodation
  - 🧾 Bills & Fees
  - 🚌 Transportation
  - 🛒 Groceries
  - 🏋️ Sports & Leisure
- 📈 **Interactive Graphs** — Compare accommodation costs and overall expenses through dynamic charts
- 🎯 **Personalized Recommendations** — Get tailored suggestions based on your preferences (via a guided preferences form)
- 🤖 **ML-Powered Predictions** — A trained machine learning model estimates and refines cost/salary data for more accurate results

---

## 🛠️ Tech Stack

**Frontend**
- React (with Vite)
- Redux Toolkit (state management)
- Feature-based architecture (`features/`, `ui/`, `pages/`)

**Backend**
- Python
- FastAPI
- Machine learning model for salary/cost prediction (trained on cost-of-living datasets)

**Tooling**
- ESLint + Prettier for code quality and formatting

---

## 📁 Project Structure

```
compass/
├── backend/
│   ├── main.py                  # FastAPI entry point
│   ├── api.py                   # API routes
│   ├── model.py                 # ML model definition
│   ├── train_model.py           # Model training script
│   ├── data_preprocessing.py    # Data cleaning & preprocessing
│   └── cost-of-living*.csv      # Cost of living datasets
│
├── src/
│   ├── features/
│   │   ├── accomodation_graph/  # Accommodation cost visualization
│   │   ├── average_costs/       # Average cost breakdown by category
│   │   ├── city_search/         # City search functionality
│   │   ├── cost_graph/          # Overall cost visualization
│   │   └── expenses/            # Detailed expense breakdown
│   │
│   ├── pages/
│   │   ├── AppLayout.jsx
│   │   └── PreferencesForm.jsx  # User preferences input
│   │
│   ├── ui/                      # Shared UI components (Header, Loader, Icons, etc.)
│   ├── store.js                 # Redux store configuration
│   ├── costOfLivingSlice.js     # Cost of living state slice
│   ├── recommendationsSlice.js  # Recommendations state slice
│   └── dataFetcher.js           # API data fetching logic
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Python (v3.10+ recommended)

### Frontend Setup
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

### Backend Setup
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn main:app --reload
```

The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:8000` (adjust as needed based on your configuration).

---

## 🧠 How It Works

1. **Data Collection** — Cost of living data is sourced and preprocessed (`data_preprocessing.py`) from real-world datasets covering salaries and expenses across cities.
2. **Model Training** — A machine learning model (`train_model.py`) is trained on this data to predict and estimate cost/salary patterns.
3. **API Layer** — FastAPI serves predictions and city data through REST endpoints.
4. **Frontend Visualization** — The React app fetches this data and presents it through interactive graphs, searchable city lookups, and a personalized recommendations engine based on user-defined preferences.

---

## 📌 Roadmap

- [ ] Add more cities and expand dataset coverage
- [ ] Improve model accuracy with additional features
- [ ] Add currency conversion support
- [ ] Add user accounts to save comparisons
- [ ] Mobile-responsive enhancements

---

## 👩‍💻 Author

Built by **Kawtar** — [GitHub](https://github.com/kawtarSolutions)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
