export const tableRowComponent = (id, ...columns) => {
  return `
      <tr id="${id}" scope="row">
        <td>${id}</td>
        ${columns.map((column) => `<td>${column}</td>`).join("")} 
      </tr>
    `;
};
