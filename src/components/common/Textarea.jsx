/**
 * Textarea Component
 * Matches wireframe textarea styles with error states
 */
export default function Textarea({
  label,
  error,
  errorMessage,
  className = '',
  rows = 4,
  ...props
}) {
  const textareaClasses = `form-textarea ${error ? 'error' : ''} ${className}`.trim();

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <textarea className={textareaClasses} rows={rows} {...props} />
      {error && errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
}


