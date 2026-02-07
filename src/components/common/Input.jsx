/**
 * Input Component
 * Matches wireframe input styles with error states
 */
export default function Input({
  label,
  error,
  errorMessage,
  className = '',
  ...props
}) {
  const inputClasses = `form-input ${error ? 'error' : ''} ${className}`.trim();

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input className={inputClasses} {...props} />
      {error && errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
}


