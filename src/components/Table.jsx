// Reusable Table component
export default function Table({ columns, data, className = '' }) {
  return (
    <div className={`overflow-x-auto rounded-xl shadow ${className}`}>
      <table className="min-w-full divide-y divide-blue-100">
        <thead className="bg-blue-50">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-50">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-blue-50 transition">
              {columns.map((col, j) => (
                <td key={j} className="px-4 py-3 text-sm text-gray-700">
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 