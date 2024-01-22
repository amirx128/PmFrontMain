import { Button, Typography } from "@mui/material";
import { GridActionsCellItem, GridRenderCellParams } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export const showNumberColumns = ({ value }) => {
  return <p>{new Intl.NumberFormat().format(+value)}</p>;
};
export const showDateColumns = ({ value }) => (
  <span>{new Date(value).toLocaleDateString("fa-IR").toString()}</span>
);
export const navigateToProductDetails_RequestCaseId = ({ value, row }) => {
  return (
    <Typography variant="body1" color="secondary" sx={{ cursor: "pointer" }}>
      <Link to={`/product-details/${row.requestCaseId}`}>{value}</Link>
    </Typography>
  );
};
export const navigateToPurchaseDetails_purchaseOrderId = ({ value, row }) => {
  return (
    <Typography variant="body1" color="secondary" sx={{ cursor: "pointer" }}>
      <Link to={`/purchase/details/${row.purchaseOrderId}`}>{value}</Link>
    </Typography>
  );
};
export const navigateToWarehouseDetails_warehouseOrderId = ({ value, row }) => {
  return (
    <Typography variant="body1" color="secondary" sx={{ cursor: "pointer" }}>
      <Link to={`/warehouse/detail/${row.warehouseOrderId}`}>{value}</Link>
    </Typography>
  );
};
export const showTrueFalseColumns = ({ value }) => {
  return (
    <Typography variant="body1" color="secondary" sx={{ cursor: "pointer" }}>
      {value ? "بله" : "خیر"}
    </Typography>
  );
};
export const actionEditColumn = (params, handleEditClick) => {
  return (
    <>
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={() => handleEditClick(params.row)}
        color="inherit"
      />
    </>
  );
};

export const actionCustom = (params, handleAction) => {
  return (
    <Button
      variant="contained"
      color="inherit"
      onClick={() => handleAction(params)}
    >
      ...
    </Button>
  );
};
