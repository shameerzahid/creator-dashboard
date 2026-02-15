/**
 * Card Component
 * Matches wireframe card styles
 */
export default function Card({ 
  children, 
  title, 
  className = '',
  onClick,
  ...props 
}) {
  const cardClasses = `card ${onClick ? 'cursor-pointer' : ''} ${className}`.trim();

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {title && <div className="card-title">{title}</div>}
      {children}
    </div>
  );
}




