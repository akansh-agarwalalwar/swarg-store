// Reusable Card component
export default function Card({ children, className = '', header, footer }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      {header && <div className="mb-4 border-b pb-2 font-bold text-lg text-orange-700">{header}</div>}
      <div>{children}</div>
      {footer && <div className="mt-4 border-t pt-2">{footer}</div>}
    </div>
  );
} 