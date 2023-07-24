import React from "react";
import * as XLSX from "xlsx";
import * as Filesaver from 'file-saver';

const ExportExcel = ({ excelData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    var wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    // const wb = { sheets: { 'data': ws }, SheetNames: ['data'] };
    XLSX.utils.book_append_sheet(wb, ws, "Page1");
   
    // const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    XLSX.writeFile(wb, fileName+fileExtension); 
    // const data = new Blob([excelBuffer], { type: fileType });
    // Filesaver.saveAs(data, fileName + fileExtension);
  }

  return <button 
  onClick={(e) => exportToExcel(fileName)}
  className="btn btn-primary">Export To Excel</button>;
};

export default ExportExcel;
