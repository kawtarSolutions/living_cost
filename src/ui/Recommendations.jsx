import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchRecommendations,
  getRecommendations,
  getRecommendationsLoading,
  getRecommendationsError,
} from "../recommendationsSlice";

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const BREAKDOWN_FIELDS = [
  { key: "accommodation", label: "Accommodation" },
  { key: "groceries",     label: "Groceries"     },
  { key: "transport",     label: "Transport"      },
  { key: "eating_out",    label: "Eating out"     },
  { key: "bills",         label: "Bills"          },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden animate-pulse">
    <div className="p-5 flex justify-between">
      <div className="space-y-2">
        <div className="h-3 w-16 bg-blue-100 rounded-full" />
        <div className="h-5 w-28 bg-blue-100 rounded" />
        <div className="h-3 w-20 bg-blue-50 rounded" />
      </div>
      <div className="h-12 w-24 bg-green-50 rounded-lg" />
    </div>
    <div className="h-px bg-blue-50 mx-5" />
    <div className="p-5 grid grid-cols-3 gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-1">
          <div className="h-2.5 w-16 bg-blue-50 rounded-full" />
          <div className="h-4 w-12 bg-blue-100 rounded" />
        </div>
      ))}
    </div>
    <div className="px-5 py-3 bg-blue-50 flex justify-between">
      <div className="h-3 w-20 bg-blue-100 rounded-full" />
      <div className="h-4 w-16 bg-blue-200 rounded" />
    </div>
  </div>
);

const CityCard = ({ city, rank }) => {
  const isTop = rank === 0;
  const savings = city.savings ?? (city.salary - city.total_expenses);

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5
        ${isTop
          ? "border-2 border-blue-400 shadow-md shadow-blue-100"
          : "border border-blue-100 hover:border-blue-200"
        }`}
    >
      {/* Card head */}
      <div className="flex items-start justify-between px-5 pt-5 pb-4">
        <div>
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full
              ${isTop
                ? "bg-blue-600 text-blue-50"
                : "bg-blue-50 text-blue-800"
              }`}
          >
            {isTop ? "Best match" : `#${rank + 1}`}
          </span>
          <p className="text-[17px] font-medium text-blue-900 mt-2">{city.city}</p>
          <p className="text-xs text-blue-400 mt-0.5">{city.country}</p>
        </div>

        <div className="bg-green-50 rounded-xl px-3 py-2 text-right min-w-[90px]">
          <p className="text-[15px] font-medium text-green-800">{fmt(savings)}</p>
          <p className="text-[10px] text-green-600 mt-0.5">monthly savings</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-blue-50 mx-5" />

      {/* Expense breakdown */}
      <div className="px-5 py-4 grid grid-cols-3 gap-3">
        {BREAKDOWN_FIELDS.map(({ key, label }) => (
          <div key={key} className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-widest text-blue-300 font-medium">
              {label}
            </span>
            <span className="text-sm font-medium text-blue-800">
              {fmt(city[key])}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-blue-600 flex items-center justify-between ">
        <span className="text-xs font-semibold text-white">Total expenses</span>
        <span className="text-[15px] font-semibold text-blue-900 text-white">{fmt(city.total_expenses)} / mo</span>
      </div>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

function Recommendations() {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const location   = useLocation();

  const recommendations = useSelector(getRecommendations);
  const loading         = useSelector(getRecommendationsLoading);
  const error           = useSelector(getRecommendationsError);

  const prefs = location.state?.prefs;

  useEffect(() => {
    if (prefs) dispatch(fetchRecommendations(prefs));
  }, []);

  const bestSavings = recommendations[0]?.savings ?? null;

  const prefSummary = prefs
    ? [
        `$${prefs.salary.toLocaleString()} / mo`,
        prefs.housing_type === "studio" ? "Studio" : "Family home",
        prefs.transport_type === "public" ? "Public transport" : "Car",
      ].join(" · ")
    : null;

  return (
    <div className="relative h-dvh overflow-scroll bg-[#e8edf5] px-4 py-10">
      {/* Atmospheric blobs — matching Home.jsx */}
      <div className="absolute top-[-120px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-300/30 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-indigo-200/35 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-6">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="self-start flex items-center gap-1.5 text-md text-blue-600 font-semibold bg-white/70 border border-blue-600 rounded-full px-4 py-2 hover:bg-white transition-all"
        >
          ← Adjust preferences
        </button>

        {/* Page title */}
        <div className="text-center">
          <h1
            className="text-3xl font-bold tracking-wide text-[#1e3a6e]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Your city matches
          </h1>
          {prefSummary && (
            <p className="text-sm text-[#5a7aaa] mt-1">{prefSummary}</p>
          )}
        </div>

        {/* Summary banner */}
        {!loading && !error && recommendations.length > 0 && (
          <div className="bg-blue-600 text-blue-50 rounded-2xl px-6 py-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-blue-200 uppercase tracking-widest">Cities analysed</p>
              <p className="text-xl font-medium mt-0.5">{recommendations.length}</p>
            </div>
            {bestSavings !== null && (
              <div className="text-center">
                <p className="text-xs text-blue-200 uppercase tracking-widest">Best savings</p>
                <p className="text-xl font-medium mt-0.5">{fmt(bestSavings)} / mo</p>
              </div>
            )}
            <div className="text-right">
              <p className="text-xs text-blue-200 uppercase tracking-widest">Top match</p>
              <p className="text-xl font-medium mt-0.5">{recommendations[0]?.city}</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 rounded-xl px-5 py-4 text-sm">
            Something went wrong: {error}
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="flex flex-col gap-4">
            {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <div className="flex flex-col gap-4">
            {recommendations.map((city, index) => (
              <CityCard key={`${city.city}-${city.country}`} city={city} rank={index} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && recommendations.length === 0 && (
          <div className="text-center py-16 text-blue-300 text-sm">
            No cities matched your criteria. Try adjusting your preferences.
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommendations;