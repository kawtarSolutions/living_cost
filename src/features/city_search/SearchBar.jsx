import { useState } from "react";
import { fetchCityData, updateByCity } from "../../costOfLivingSlice";
import Logo from "./svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SearchBar({ showBar, width, expandBar, setShowFormModal }) {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateByCity(city));
    dispatch(fetchCityData(city));
    setCity("");
  }

  return (
    <>
      {/* Mobile backdrop overlay */}
      {width < 1080 && showBar && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => expandBar(false)} // optionally close sidebar when clicking outside
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          row-span-4 bg-[#dde4f0]/80 backdrop-blur-xl p-8 flex flex-col items-center gap-7 z-50
          border-r border-white/60 transition-all duration-500 ease-out
          ${width < 1080
            ? `fixed top-0 left-0 h-screen shadow-2xl transform transition-transform duration-500 ease-out
               ${showBar ? "translate-x-0" : "-translate-x-full"}`
            : "relative"
          }
          ${expandBar ? "w-96" : "w-60"}
        `}
        style={{ background: 'linear-gradient(160deg, rgba(225,232,245,0.95) 0%, rgba(210,222,240,0.9) 100%)' }}
      >
        {/* Logo + Brand */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-300/20 blur-lg scale-110" />
            <div className="relative">
              <Logo />
            </div>
          </div>
          <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#1e3a6e]"
             style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Compass
          </p>
          <p className="text-[9px] tracking-[0.2em] uppercase text-[#7090bb]">Cost of Living</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />

        {/* Search form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-3">
          <p className="text-[10px] uppercase tracking-widest text-[#7090bb]">Explore a city</p>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7090bb" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <input
              name="city"
              className="w-full pl-9 pr-4 py-2.5 text-sm text-[#1e3a6e] rounded-xl
                bg-white/60 border border-white/80
                placeholder:text-[#9db0cc]
                hover:bg-white/80 hover:border-blue-200
                focus:outline-none focus:bg-white/90 focus:border-blue-300 focus:ring-2 focus:ring-blue-100/60
                transition-all duration-300 shadow-sm"
              placeholder="Enter City"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              type="text"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-white text-xs font-semibold tracking-widest uppercase
              shadow-md shadow-blue-300/30 hover:shadow-blue-300/50 hover:scale-[1.02]
              transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #3a6bbf 0%, #5b8fd4 100%)' }}
          >
            Explore
          </button>
        </form>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />

        {/* Quick cities */}
        <div className="w-full flex flex-col items-center gap-2.5">
          <p className="text-[9px] uppercase tracking-widest text-[#7090bb]">Popular</p>
          <div className="flex flex-col gap-1.5 w-full">
            {['Tokyo', 'New York', 'London', 'Paris', 'Mecca'].map((c) => (
              <button
                key={c}
                onClick={() => {
                  dispatch(updateByCity(c));
                  dispatch(fetchCityData(c));
                }}
                className="w-full px-3 py-2 text-xs text-[#2c4a7c] font-medium text-left rounded-lg
                  bg-white/40 border border-white/70
                  hover:bg-white/70 hover:border-blue-200 hover:text-[#1e3a6e] hover:translate-x-0.5
                  transition-all duration-200"
              >
                <span className="mr-2 text-[#9db0cc]">→</span>{c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;