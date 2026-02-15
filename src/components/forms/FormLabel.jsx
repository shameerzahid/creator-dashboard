/**
 * FormLabel Component
 * Consistent label styling
 */
export default function FormLabel({ 
  children, 
  required = false,
  className = '',
  ...props 
}) {
  return (
    <label className={`form-label ${className}`} {...props}>
      {children}
      {required && <span className="text-danger ml-1">*</span>}
    </label>
  );
}




