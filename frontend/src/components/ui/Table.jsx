function Table({ data, columnHeaders }) {
  if (!data || data.length === 0) {
    return <p className="container">No data to display.</p>;
  }

  const propertyNames = Object.keys(data[0]);

  return (
    <table className="relative overflow-y-auto table-fixed w-full border border-input">
      <thead className="sticky top-0 z-[1] text-xs uppercase bg-accent">
        <tr>
          {propertyNames.map((propName, index) => (
            <th
              key={propName}
              className={`text-left p-2 ${index === 0 ? "w-[40%]" : ""} ${
                data[0][propName]?.align || ""
              }`}
            >
              {columnHeaders?.[propName] || propName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-t border-input">
            {propertyNames.map((propName) => (
              <td
                key={`${propName}-${index}`}
                className={`text-left p-2 ${row[propName]?.align || ""}`}
              >
                {row[propName]?.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
