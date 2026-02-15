/**
 * Select Component
 * Enhanced with icon support using Tailwind CSS
 */
export default function Select({
  label,
  error,
  errorMessage,
  icon: Icon,
  options = [],
  placeholder,
  className = '',
  ...props
}) {
  const selectClasses = `w-full px-3 py-2.5 pr-9 ${Icon ? 'pl-10' : ''} border rounded-sm text-sm text-dark bg-white appearance-none cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
    error
      ? 'border-danger focus:border-danger focus:ring-danger/20'
      : 'border-dark-lighter focus:border-primary focus:ring-primary/20'
  } ${className}`.trim();

  return (
    <div className="mb-5">
      {label && (
        <label className="block mb-2 font-medium text-dark text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-lighter pointer-events-none ${
            error ? 'text-danger' : ''
          }`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <select
          className={selectClasses}
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23032625' fill-opacity='0.5' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            backgroundSize: '12px'
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => {
            if (typeof option === 'string') {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            }
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      {error && errorMessage && (
        <div className="text-danger text-xs mt-1.5">{errorMessage}</div>
      )}
    </div>
  );
}




