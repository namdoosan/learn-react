export default function Table({ columns, data, renderActions }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.status}</td>
              <td>{row.address}</td>
              <td>{renderActions(i)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: "center" }}>
              Belum ada data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
