// Reusable Card component
export default function Card({ children, className = '', header, footer }) {
  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:shadow-cyan-400/20 transition-all duration-200 ${className}`}>
      {header && <div className="mb-4 border-b border-gray-600 pb-3 font-bold text-lg text-cyan-400">{header}</div>}
      <div>{children}</div>
      {footer && <div className="mt-4 border-t border-gray-600 pt-3">{footer}</div>}
    </div>
  );
} 