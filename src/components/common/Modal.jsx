/**
 * Modal Component
 * Matches wireframe modal styles
 */
export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  children,
  actions,
  className = '',
  ...props 
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-overlay" 
      style={{ display: 'flex' }}
      onClick={handleOverlayClick}
      {...props}
    >
      <div className={`modal ${className}`} onClick={(e) => e.stopPropagation()}>
        {title && <div className="modal-title">{title}</div>}
        {message && <div className="modal-message">{message}</div>}
        {children}
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  );
}




