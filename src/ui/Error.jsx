
// eslint-disable-next-line react/prop-types
function Error({ error }) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/40
    backdrop-blur-md border border-red-200/60 shadow-sm max-w-sm
    h-15 m-auto">
      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-red-100/80 flex items-center justify-center">
        <svg
          className="w-4 h-4 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-600 tracking-wide">{error}</p>
    </div>
  );
}

export default Error;