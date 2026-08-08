// Net Salary Icon - Stacked coins representing income
export function NetSalaryIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circular background - soft green for income/growth */}
      <circle cx="50" cy="50" r="45" fill="#D1FAE5" />
      
      {/* Stack of coins */}
      {/* Bottom coin */}
      <ellipse cx="50" cy="65" rx="18" ry="6" fill="#059669" />
      <ellipse cx="50" cy="63" rx="18" ry="6" fill="#10B981" />
      
      {/* Middle coin */}
      <ellipse cx="50" cy="53" rx="18" ry="6" fill="#059669" />
      <ellipse cx="50" cy="51" rx="18" ry="6" fill="#34D399" />
      
      {/* Top coin */}
      <ellipse cx="50" cy="41" rx="18" ry="6" fill="#059669" />
      <ellipse cx="50" cy="39" rx="18" ry="6" fill="#6EE7B7" />
      
      {/* Dollar sign on top coin */}
      <text
        x="50"
        y="44"
        fontSize="18"
        fontWeight="bold"
        fill="#065F46"
        textAnchor="middle"
      >
        $
      </text>
      
      {/* Upward arrow indicating income */}
      <path
        d="M 70 35 L 70 25 L 75 30 L 70 25 L 65 30 Z"
        fill="#10B981"
        stroke="#059669"
        strokeWidth="1"
      />
    </svg>
  );
}

// Bills and Fees Icon - Utility bills (electricity, water, internet)
export function BillsFeesIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circular background - soft amber for bills/costs */}
      <circle cx="50" cy="50" r="45" fill="#FEF3C7" />
      
      {/* Receipt/Bill paper */}
      <path
        d="M 35 28 L 65 28 L 65 72 L 62 69 L 59 72 L 56 69 L 53 72 L 50 69 L 47 72 L 44 69 L 41 72 L 38 69 L 35 72 Z"
        fill="#FFFFFF"
        stroke="#F59E0B"
        strokeWidth="1.5"
      />
      
      {/* Lightning bolt symbol (electricity) */}
      <path
        d="M 48 38 L 44 48 L 47 48 L 43 58 L 50 50 L 47 50 Z"
        fill="#FBBF24"
        stroke="#F59E0B"
        strokeWidth="1"
      />
      
      {/* Water droplet symbol */}
      <path
        d="M 57 42 Q 57 38 54 35 Q 51 38 51 42 Q 51 45 54 45 Q 57 45 57 42 Z"
        fill="#3B82F6"
      />
      
      {/* WiFi symbol (internet) */}
      <path
        d="M 40 60 Q 44 56 50 56 Q 56 56 60 60"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 42 63 Q 45 60 50 60 Q 55 60 58 63"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="50" cy="66" r="1.5" fill="#D97706" />
    </svg>
  );
}

// Groceries Icon - Shopping basket with fresh produce
export function GroceriesIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circular background - soft rose for variety */}
      <circle cx="50" cy="50" r="45" fill="#FCE7F3" />
      
      {/* Shopping basket */}
      <path
        d="M 32 45 L 68 45 L 65 65 Q 65 68 62 68 L 38 68 Q 35 68 35 65 Z"
        fill="#EC4899"
        stroke="#DB2777"
        strokeWidth="1.5"
      />
      
      {/* Basket weave pattern */}
      <line x1="38" y1="50" x2="38" y2="65" stroke="#BE185D" strokeWidth="1" opacity="0.5" />
      <line x1="44" y1="50" x2="44" y2="65" stroke="#BE185D" strokeWidth="1" opacity="0.5" />
      <line x1="50" y1="50" x2="50" y2="65" stroke="#BE185D" strokeWidth="1" opacity="0.5" />
      <line x1="56" y1="50" x2="56" y2="65" stroke="#BE185D" strokeWidth="1" opacity="0.5" />
      <line x1="62" y1="50" x2="62" y2="65" stroke="#BE185D" strokeWidth="1" opacity="0.5" />
      
      {/* Handle */}
      <path
        d="M 35 45 Q 35 35 40 32 Q 45 30 50 30 Q 55 30 60 32 Q 65 35 65 45"
        fill="none"
        stroke="#DB2777"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Fresh produce items */}
      {/* Apple */}
      <circle cx="42" cy="40" r="5" fill="#EF4444" />
      <path d="M 42 35 Q 42 33 43 32" stroke="#059669" strokeWidth="1" fill="none" />
      
      {/* Lettuce/Leafy green */}
      <path
        d="M 54 35 Q 52 38 54 41 Q 56 38 58 41 Q 56 38 58 35 Q 56 38 54 35 Z"
        fill="#10B981"
        stroke="#059669"
        strokeWidth="1"
      />
      
      {/* Carrot */}
      <path
        d="M 62 38 L 64 42 L 62 42 Z"
        fill="#F97316"
      />
      <path d="M 62 38 L 61 36 M 62 38 L 63 36" stroke="#10B981" strokeWidth="0.5" />
    </svg>
  );
}

// Transportation Icon - Multiple transport modes
export function TransportationIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circular background - soft purple/indigo */}
      <circle cx="50" cy="50" r="45" fill="#E0E7FF" />
      
      {/* Bus/Public transport */}
      <rect
        x="30"
        y="35"
        width="40"
        height="28"
        rx="3"
        fill="#6366F1"
        stroke="#4F46E5"
        strokeWidth="1.5"
      />
      
      {/* Bus windows */}
      <rect x="34" y="40" width="10" height="8" rx="1" fill="#EEF2FF" />
      <rect x="46" y="40" width="10" height="8" rx="1" fill="#EEF2FF" />
      <rect x="58" y="40" width="8" height="8" rx="1" fill="#EEF2FF" />
      
      {/* Bus door */}
      <rect x="34" y="51" width="8" height="10" rx="1" fill="#4338CA" />
      
      {/* Wheels */}
      <circle cx="38" cy="64" r="4" fill="#1F2937" stroke="#111827" strokeWidth="1" />
      <circle cx="38" cy="64" r="2" fill="#6B7280" />
      <circle cx="62" cy="64" r="4" fill="#1F2937" stroke="#111827" strokeWidth="1" />
      <circle cx="62" cy="64" r="2" fill="#6B7280" />
      
      {/* Headlights */}
      <circle cx="32" cy="58" r="1.5" fill="#FDE047" />
      <circle cx="68" cy="58" r="1.5" fill="#FDE047" />
      
      {/* Gas pump symbol */}
      <rect x="62" y="25" width="3" height="8" fill="#10B981" />
      <rect x="59" y="28" width="9" height="3" rx="1" fill="#10B981" />
      <circle cx="63.5" cy="29.5" r="1" fill="#EEF2FF" />
      
      {/* Motion lines */}
      <line x1="20" y1="45" x2="26" y2="45" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="52" x2="27" y2="52" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
