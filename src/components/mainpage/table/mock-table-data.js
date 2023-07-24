import uuid from 'react-uuid';

export const mockTable = () => {
  var table = [];

  for (var i = 1; i <= 100; i++) {
    table.push({
      aa: Math.floor(Math.random() * (100 - 1 + 1) + 1),
      uuid: uuid(),
      address: "This is a sample address",
    });
  }

  return table;
};
