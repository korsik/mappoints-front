import React from "react";

const TableDrawer = ({ table_data }) => {
  // console.log(table_data);
  return (
    <div className="overflow-x-auto">
      <table className="table w-full h-full">
        {/* head */}
        <thead>
          <tr className="outline-1 h-1/6">
            {/* {table_data.headings.map((heading) => (
              <th key={heading} className="lowercase">
                {heading}
              </th>
            ))} */}
            <th key={table_data.headings[0]} className="lowercase w-5/6">
                {table_data.headings[0]}
              </th>
              <th key={table_data.headings[1]} className="lowercase w-1/6">
                {table_data.headings[1]}
              </th>
          </tr>
        </thead>
        <tbody>
          {table_data.types.map((type) => (
            <tr key={type.category} className="hover outline-1">
              <td className="outline-1 w-5/6">{type.category}</td>
              <td className="outline-1 w-1/6">{type.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDrawer;
