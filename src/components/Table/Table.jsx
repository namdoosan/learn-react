export default function Table({ columns, data, renderActions }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-kpink-light text-kpink-dark">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide border-b border-kpink-dark"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr
                key={i}
                className="odd:bg-white even:bg-kpink-light/40 hover:bg-kpink-light hover:shadow-sm transition-all duration-200"
              >
                <td className="px-4 py-2 text-sm text-gray-800">{i + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{row.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{row.age}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{row.status}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{row.address}</td>
                <td className="px-4 py-2">{renderActions(i)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-gray-500 py-4"
              >
                Belum ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
