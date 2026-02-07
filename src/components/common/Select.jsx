/**
 * Select Component
 * Matches wireframe select styles with error states
 */
export default function Select({
  label,
  error,
  errorMessage,
  options = [],
  placeholder,
  className = '',
  ...props
}) {
  const selectClasses = `form-select ${error ? 'error' : ''} ${className}`.trim();

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <select className={selectClasses} {...props}>
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
      {error && errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
}


