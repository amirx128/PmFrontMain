const downloadExcel = (data) => {
  console.log(data);
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${Date.now()}.xlsx`);
  document.body.appendChild(link);
  link.click();
};

export default downloadExcel;
