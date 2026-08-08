function Logo() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8f0fb"/>
          <stop offset="100%" stopColor="#c8d8f0"/>
        </radialGradient>
        <radialGradient id="innerGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0f5ff"/>
          <stop offset="100%" stopColor="#dce8f8"/>
        </radialGradient>
        <linearGradient id="needleN" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2455a4"/>
          <stop offset="100%" stopColor="#4a7fcb"/>
        </linearGradient>
        <linearGradient id="needleS" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b0c4e0"/>
          <stop offset="100%" stopColor="#d0dff0"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3a6bbf" floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle cx="100" cy="100" r="92" fill="url(#bgGrad)" stroke="#b8cce8" strokeWidth="1.5"/>

      {/* Tick marks around the ring */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        const isMajor = i % 9 === 0;
        const r1 = isMajor ? 78 : 81;
        const r2 = 88;
        const x1 = 100 + r1 * Math.sin(angle);
        const y1 = 100 - r1 * Math.cos(angle);
        const x2 = 100 + r2 * Math.sin(angle);
        const y2 = 100 - r2 * Math.cos(angle);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={isMajor ? "#4a7fcb" : "#a0b8d8"}
            strokeWidth={isMajor ? "2" : "1"}
            strokeLinecap="round"
          />
        );
      })}

      {/* Cardinal letters */}
      <text x="100" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2455a4" fontFamily="Georgia, serif">N</text>
      <text x="100" y="188" textAnchor="middle" fontSize="11" fontWeight="500" fill="#8aabe0" fontFamily="Georgia, serif">S</text>
      <text x="180" y="104" textAnchor="middle" fontSize="11" fontWeight="500" fill="#8aabe0" fontFamily="Georgia, serif">E</text>
      <text x="20" y="104" textAnchor="middle" fontSize="11" fontWeight="500" fill="#8aabe0" fontFamily="Georgia, serif">W</text>

      {/* Inner circle */}
      <circle cx="100" cy="100" r="68" fill="url(#innerGrad)" stroke="#c8d8f0" strokeWidth="1"/>

      {/* Subtle cross guides */}
      <line x1="100" y1="36" x2="100" y2="164" stroke="#c8dcf0" strokeWidth="0.8" strokeDasharray="3,4"/>
      <line x1="36" y1="100" x2="164" y2="100" stroke="#c8dcf0" strokeWidth="0.8" strokeDasharray="3,4"/>

      {/* Compass rose petals (diagonal) */}
      <polygon points="100,100 112,112 100,124 88,112" fill="#dce8f8" stroke="#b8cce8" strokeWidth="0.5"/>
      <polygon points="100,100 112,88 124,100 112,112" fill="#dce8f8" stroke="#b8cce8" strokeWidth="0.5"/>
      <polygon points="100,100 88,88 100,76 112,88" fill="#dce8f8" stroke="#b8cce8" strokeWidth="0.5"/>
      <polygon points="100,100 88,112 76,100 88,88" fill="#dce8f8" stroke="#b8cce8" strokeWidth="0.5"/>

      {/* Compass needle — North (blue, points up) */}
      <polygon
        points="100,42 107,100 100,108 93,100"
        fill="url(#needleN)"
        filter="url(#shadow)"
      />
      {/* Compass needle — South (light, points down) */}
      <polygon
        points="100,158 107,100 100,92 93,100"
        fill="url(#needleS)"
      />

      {/* Center jewel */}
      <circle cx="100" cy="100" r="7" fill="#2455a4" stroke="#e8f0fb" strokeWidth="2"/>
      <circle cx="100" cy="100" r="3" fill="#7ab0e8"/>
    </svg>
  );
}

export default Logo;