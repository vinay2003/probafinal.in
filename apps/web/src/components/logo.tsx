export function Logo() {
  return (
    <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="grad1"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop
              offset="0%"
              style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: 'hsl(var(--background))', stopOpacity: 1 }}
            />
          </radialGradient>
        </defs>
        <circle cx="16" cy="16" r="15" fill="url(#grad1)" />
        <path
          d="M13.5714 11.4286V22H15.9048C18.5397 22 20.2857 20.254 20.2857 17.619C20.2857 14.9841 18.5397 13.2381 15.9048 13.2381H13.5714V11.4286H20.2857V9H11V22H15.9048C19.746 22 22.8571 19.7937 22.8571 16.7143C22.8571 13.6349 19.746 11.4286 15.9048 11.4286H13.5714Z"
          transform="scale(0.9) translate(1.5, 1.5)"
          fill="white"
        />
      </svg>
      <span className="font-bold text-lg font-headline group-data-[collapsible=icon]:hidden">
        Proba
      </span>
    </div>
  );
}
