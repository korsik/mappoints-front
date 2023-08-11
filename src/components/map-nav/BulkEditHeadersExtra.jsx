import * as React from "react";

const BulkEditHeadersExtra = ({ data }) => {
  return (
    <td>
      {data.map((item) => (
        <td key={item.id}>{item.name}</td>
      ))}
    </td>
  );
};

export default BulkEditHeadersExtra;
