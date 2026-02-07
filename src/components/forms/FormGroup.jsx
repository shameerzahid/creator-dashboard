/**
 * FormGroup Component
 * Wrapper for form fields with consistent spacing
 */
export default function FormGroup({ 
  children, 
  className = '',
  ...props 
}) {
  return (
    <div className={`form-group ${className}`} {...props}>
      {children}
    </div>
  );
}


