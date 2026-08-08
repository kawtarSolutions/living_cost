import { useState, useCallback } from "react";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

const LOCATION_OPTIONS = [
  { value: "center", label: "City centre" },
  { value: "outside", label: "Outside centre" },
];

const HOUSING_OPTIONS = [
  { value: "studio", label: "Studio / 1-bedroom" },
  { value: "family", label: "Family (3-bedroom)" },
];

const TRANSPORT_OPTIONS = [
  { value: "public", label: "Public transport" },
  { value: "car", label: "Car" },
];

const EATING_FIELDS = [
  { name: "cheap_visits", label: "Inexpensive" },
  { name: "mid_visits", label: "Mid-range" },
  { name: "fast_food_visits", label: "Fast food" },
];

const ACTIVITY_FIELDS = [
  {
    toggle: "go_gym",
    label: "Gym membership",
    icon: <FitnessCenterIcon />,
  },
  {
    toggle: "play_tennis",
    label: "Tennis",
    icon: <SportsTennisIcon />,
    subField: { name: "tennis_frequency", label: "Sessions per month" },
  },
  {
    toggle: "go_cinema",
    label: "Cinema",
    icon: <MovieCreationIcon />,
    subField: { name: "cinema_visits", label: "Visits per month" },
  },
];

const INITIAL_STATE = {
  salary: 1500,
  location: "center",
  housing_type: "studio",
  transport_type: "public",
  gas_liters: 5,
  cheap_visits: 4,
  mid_visits: 3,
  fast_food_visits: 5,
  go_gym: true,
  play_tennis: true,
  tennis_frequency: 4,
  go_cinema: true,
  cinema_visits: 4,
};

// ── Primitives ────────────────────────────────────────────────────────────────

const FieldLabel = ({ children }) => (
  <span className="text-xs font-medium tracking-widest uppercase text-blue-400 select-none">
    {children}
  </span>
);

const NumberInput = ({ name, value, onChange, ...props }) => (
  <input
    type="number"
    name={name}
    value={value === "" ? "" : value}
    onChange={onChange}
    min="0"
    className="w-full px-3 py-2 text-sm rounded-lg bg-blue-50 border border-blue-100 text-blue-900
               focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
    {...props}
  />
);

const RadioPill = ({ name, value, checked, onChange, label }) => (
  <label
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm cursor-pointer select-none transition-all
      ${checked
        ? "bg-blue-400 text-white font-medium border border-blue-600"
        : "bg-blue-50 text-blue-500 border border-blue-100 hover:border-blue-300"
      }`}
  >
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    {label}
  </label>
);

const RadioGroup = ({ name, options, value, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((opt) => (
      <RadioPill
        key={opt.value}
        name={name}
        value={opt.value}
        checked={value === opt.value}
        onChange={onChange}
        label={opt.label}
      />
    ))}
  </div>
);

const Toggle = ({ name, checked, onChange }) => (
  <label className="relative inline-block w-9 h-5 cursor-pointer">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="sr-only peer"
    />
    <span
      className="absolute inset-0 rounded-full bg-blue-100 transition-colors duration-200
                 peer-checked:bg-blue-400"
    />
    <span
      className="absolute top-[3px] left-[3px] w-[14px] h-[14px] rounded-full bg-white
                 transition-transform duration-200 peer-checked:translate-x-4"
    />
  </label>
);

// ── Form ─────────────────────────────────────────────────────────────────────

const PreferencesForm = ({ onSubmit, onClose }) => {
  const [form, setForm] = useState(INITIAL_STATE);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? value === "" ? "" : parseFloat(value)
          : value,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];
    if (!form.salary || form.salary <= 0) errors.push("Salary must be a positive number.");
    if (form.transport_type === "car" && (form.gas_liters === "" || form.gas_liters < 0))
      errors.push("Gas liters must be non-negative.");
    if (form.play_tennis && (form.tennis_frequency === "" || form.tennis_frequency < 0))
      errors.push("Tennis frequency must be non-negative.");
    if (form.go_cinema && (form.cinema_visits === "" || form.cinema_visits < 0))
      errors.push("Cinema visits must be non-negative.");
    if (errors.length) { alert(errors.join("\n")); return; }

    const clean = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, v === "" ? 0 : v])
    );
    onSubmit(clean);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-xl border border-blue-100 h-full"
      style={{ scrollbarWidth: "none" }}
    >
      {/* Header */}
      <div className="bg-blue-400 px-7 pt-6 pb-5 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-medium text-blue-50">Lifestyle preferences</h2>
          <p className="text-sm text-blue-200 mt-0.5">
            We'll match cities to your budget and habits
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-blue-200 hover:text-white mt-0.5 transition"
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>

      {/* Body */}
      <form
        onSubmit={handleSubmit}
        className="bg-white px-7 py-6 flex flex-col gap-5"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Salary */}
        <div className="flex flex-col gap-1.5">
          <FieldLabel>Monthly net salary (USD)</FieldLabel>
          <NumberInput name="salary" value={form.salary} onChange={handleChange} step="100" required />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1.5">
          <FieldLabel>Location preference</FieldLabel>
          <RadioGroup
            name="location"
            options={LOCATION_OPTIONS}
            value={form.location}
            onChange={handleChange}
          />
        </div>

        {/* Housing */}
        <div className="flex flex-col gap-1.5">
          <FieldLabel>Housing type</FieldLabel>
          <RadioGroup
            name="housing_type"
            options={HOUSING_OPTIONS}
            value={form.housing_type}
            onChange={handleChange}
          />
        </div>

        {/* Transport */}
        <div className="flex flex-col gap-1.5">
          <FieldLabel>Primary transport</FieldLabel>
          <RadioGroup
            name="transport_type"
            options={TRANSPORT_OPTIONS}
            value={form.transport_type}
            onChange={handleChange}
          />
        </div>

        {/* Gas (conditional) */}
        {form.transport_type === "car" && (
          <div className="flex flex-col gap-1.5 pl-3 border-l-2 border-blue-100">
            <FieldLabel>Monthly gasoline (liters)</FieldLabel>
            <NumberInput name="gas_liters" value={form.gas_liters} onChange={handleChange} step="5" />
          </div>
        )}

        <hr className="border-blue-50" />

        {/* Eating out */}
        <div className="bg-blue-50 rounded-xl p-4 flex flex-col gap-3">
          <span className="text-sm font-medium text-blue-400">Eating out — visits per month</span>
          <div className="grid grid-cols-3 gap-3">
            {EATING_FIELDS.map(({ name, label }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="text-xs font-medium text-blue-400 uppercase tracking-wide">
                  {label}
                </label>
                <NumberInput name={name} value={form[name]} onChange={handleChange} step="1" />
              </div>
            ))}
          </div>
        </div>

        <hr className="border-blue-50" />

        {/* Activities */}
        <div className="flex flex-col gap-2.5">
          <FieldLabel>Activities</FieldLabel>
          {ACTIVITY_FIELDS.map(({ toggle, label, icon, subField }) => (
            <div key={toggle} className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white border border-blue-100">
                <span className="text-sm text-blue-900 flex items-center gap-2">
                  <span className="text-base">{icon}</span>
                  {label}
                </span>
                <Toggle name={toggle} checked={form[toggle]} onChange={handleChange} />
              </div>
              {subField && form[toggle] && (
                <div className="flex flex-col gap-1 pl-3 border-l-2 border-blue-100">
                  <label className="text-xs font-medium text-blue-400 uppercase tracking-wide">
                    {subField.label}
                  </label>
                  <NumberInput
                    name={subField.name}
                    value={form[subField.name]}
                    onChange={handleChange}
                    step="1"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-blue-400 hover:bg-blue-700 active:scale-[0.99]
                     text-white text-sm font-medium transition-all"
        >
          Find my cities
        </button>
      </form>
    </div>
  );
};

export default PreferencesForm;