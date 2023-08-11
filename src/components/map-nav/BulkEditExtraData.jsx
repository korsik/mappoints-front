import * as React from "react";

const BulkEditExtraData = ({ data }) => {
  data = JSON.parse(data);
  return (
    <td>
      {data.map((item) => (
        <p key={item.id}> {item.value}</p>
      ))}
    </td>
  );
};

export default BulkEditExtraData;
