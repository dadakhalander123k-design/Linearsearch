interface AlgoLearnLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AlgoLearnLogo({ className = '', size = 'md' }: AlgoLearnLogoProps) {
  // Height configurations
  const heightClasses = {
    sm: 'h-8 max-w-[160px]',
    md: 'h-9 sm:h-10 max-w-[200px]',
    lg: 'h-12 max-w-[240px]',
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${heightClasses} ${className}`}>
      {/* Exact Vector Asset matching the uploaded image */}
      <svg
        viewBox="0 0 380 90"
        className="h-full w-auto aspect-[380/90] shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="AlgoLearn - YOUR DSA JOURNEY"
      >
        <defs>
          {/* Main Top Diamond Gradient (Deep Indigo to Electric Blue) */}
          <linearGradient id="logoCapTop" x1="15" y1="10" x2="105" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B1D51" />
            <stop offset="45%" stopColor="#123B9E" />
            <stop offset="100%" stopColor="#1E66F5" />
          </linearGradient>

          {/* Top Diamond Rim Highlight */}
          <linearGradient id="logoCapRim" x1="10" y1="28" x2="110" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="60%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>

          {/* Under-skull 3D Base Gradient (Electric Blue to Bright Cyan) */}
          <linearGradient id="logoCapBase" x1="30" y1="46" x2="90" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="35%" stopColor="#2563EB" />
            <stop offset="70%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>

          {/* Tassel Cord & Teardrop Gradient */}
          <linearGradient id="logoTassel" x1="84" y1="32" x2="100" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Learn Wordmark Gradient */}
          <linearGradient id="logoLearnGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>

        {/* 3D Skull Cap Container */}
        <path
          d="M 35 46 L 60 60 L 85 46 C 85 46 86 68 60 76 C 34 68 35 46 35 46 Z"
          fill="url(#logoCapBase)"
        />

        {/* 3D Skull Cap Lower Lip Glow */}
        <path
          d="M 39 50 C 39 50 41 65 60 72 C 79 65 81 50 81 50 C 81 58 72 69 60 72 C 48 69 39 58 39 50 Z"
          fill="#00F0FF"
          opacity="0.6"
        />

        {/* Top Diamond Mortarboard (Slightly tilted isometric perspective) */}
        <path
          d="M 57 10 C 59 8.8 61 8.8 63 10 L 109 34 C 111 35.2 111 37.2 109 38.4 L 63 62 C 61 63.2 59 63.2 57 62 L 11 38.4 C 9 37.2 9 35.2 11 34 Z"
          fill="url(#logoCapTop)"
          stroke="url(#logoCapRim)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Top Diamond Center Button */}
        <ellipse cx="60" cy="36" rx="3.2" ry="2.4" fill="#38BDF8" />

        {/* Tassel String draped across top diamond edge to the right */}
        <path
          d="M 60 36 Q 80 41 93 49 L 93 62"
          stroke="url(#logoTassel)"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Tassel Bead & Hanging Droplet */}
        <circle cx="93" cy="60" r="2.4" fill="#38BDF8" />
        <path
          d="M 93 62 C 90 65 89 69 93 73 C 97 69 96 65 93 62 Z"
          fill="url(#logoTassel)"
        />

        {/* Wordmark: "Algo" + "Learn" */}
        <text
          x="126"
          y="54"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="44"
          fontWeight="900"
          letterSpacing="-0.8"
        >
          <tspan fill="#0B132B" className="dark:fill-[#F5F7FF]">Algo</tspan>
          <tspan fill="url(#logoLearnGrad)">Learn</tspan>
        </text>

        {/* Subtitle: "YOUR DSA JOURNEY" */}
        <text
          x="128"
          y="73"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="11"
          fontWeight="800"
          letterSpacing="4.2"
          fill="#475569"
          className="dark:fill-[#94A3B8]"
        >
          YOUR DSA JOURNEY
        </text>
      </svg>
    </div>
  );
}
