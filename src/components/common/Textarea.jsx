/**
 * Textarea Component
 * Enhanced with icon support using Tailwind CSS
 */
export default function Textarea({
  label,
  error,
  errorMessage,
  icon: Icon,
  className = '',
  rows = 4,
  ...props
}) {
  const textareaClasses = `w-full px-3 py-2.5 ${Icon ? 'pl-10' : ''} border rounded-sm text-sm text-dark placeholder:text-dark-lightest min-h-[120px] resize-y transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
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
          <div className={`absolute left-3 top-3 text-dark-lighter pointer-events-none ${
            error ? 'text-danger' : ''
          }`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <textarea className={textareaClasses} rows={rows} {...props} />
      </div>
      {error && errorMessage && (
        <div className="text-danger text-xs mt-1.5">{errorMessage}</div>
      )}
    </div>
  );
}




