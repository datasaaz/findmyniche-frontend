export function GlobalLoader({
  containerClassName = "min-h-[55vh]",
  spinnerClassName = "text-essence",
  size = 120,
  showLabel = false,
  label = "Loading...",
}) {
  const borderSize = Math.max(8, Math.round(size / 7.5));

  return (
    <div className={`flex items-center justify-center ${containerClassName}`}>
      <style>{`
        .global-loader-spinner {
          position: relative;
          border: var(--loader-border) solid #f3f3f3;
          border-top: var(--loader-border) solid currentColor;
          border-radius: 9999px;
          width: var(--loader-size);
          height: var(--loader-size);
          animation: global-loader-spin 2s linear infinite;
        }

        .global-loader-spinner::after {
          content: "";
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border-radius: 9999px;
          box-shadow: inset 0 0 20px currentColor;
        }

        @keyframes global-loader-spin {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="flex flex-col items-center gap-3">
        <div
          className={`global-loader-spinner ${spinnerClassName}`}
          style={{
            "--loader-size": `${size}px`,
            "--loader-border": `${borderSize}px`,
          }}
        />
        {showLabel ? <p className="text-sm text-gray-600">{label}</p> : null}
      </div>
    </div>
  );
}
