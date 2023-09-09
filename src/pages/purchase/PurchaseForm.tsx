import { Card, Divider, CardHeader, Typography } from "@mui/material";
import axios from "../../utils/axios.config.ts";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { withSnackbar } from "../../utils/snackbar-hook";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "../../components/grid/grid";
import gridDict from "../../dictionary/gridDict.ts";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  GetPurchaseOrderDataAction,
  setPurchaseRowSelectedAction,
} from "../../redux/features/purchaseSlicer.ts";
import PurchaseDetail from "./PurchaseDetail.tsx";
const PurchaseForm = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { orderDetailData, purchaseRowSelected } = useSelector(
    (state: any) => state?.purchase
  );
  useEffect(() => {
    if (!id) navigate("/");
    getPurchaseDetails();
  }, []);
  useEffect(() => {
    if (orderDetailData?.data?.purchaseDetails) {
      handleSelectDefaultRow();
    }
  }, [orderDetailData]);

  const getPurchaseDetails = async () => {
    try {
      await dispatch(GetPurchaseOrderDataAction({ id: +id }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: gridDict.id,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "approveDate",
      headerName: gridDict.approveDate,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      renderCell: ({ value }) => (
        <span>
          {value ? new Date(value).toLocaleDateString("fa-IR").toString() : "-"}
        </span>
      ),
    },
    {
      field: "approveState",
      headerName: gridDict.approvestate,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "approverUser",
      headerName: gridDict.approverUser,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "supporterUser",
      headerName: gridDict.supporterUser,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "baravordFeeKala",
      headerName: gridDict.baravordFeeKala,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "baravordkolMandeh",
      headerName: gridDict.baravordkolMandeh,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "count",
      headerName: gridDict.count,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "createDate",
      headerName: gridDict.createDate,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      renderCell: ({ value }) => (
        <span>
          {value
            ? new Date(value.slice(0, 10))
                .toLocaleDateString("fa-IR")
                .toString()
            : "-"}
        </span>
      ),
    },
    {
      field: "etebar",
      headerName: gridDict.etebar,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCaseTrackingCode",
      headerName: gridDict.requestCaseTrackingCode,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
      renderCell: ({ value, row }) => {
        return (
          <Typography
            variant="body1"
            color="secondary"
            sx={{ cursor: "pointer" }}
          >
            <Link to={`/product-details/${row.requestCaseId}`}>{value}</Link>
          </Typography>
        );
      },
    },
    {
      field: "requestCaseId",
      headerName: gridDict.requestCaseId,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
  ];
  const handleSelectDefaultRow = () => {
    const selectedRow = orderDetailData?.data?.purchaseDetails.at(0);
    dispatch(setPurchaseRowSelectedAction(selectedRow));
  };
  const handleSelectedRow = (e) => {
    const selectedRow = orderDetailData?.data?.purchaseDetails?.find(
      (purchaseDetail) => +purchaseDetail.id === +e.at(-1)
    );
    dispatch(setPurchaseRowSelectedAction(selectedRow));
  };
  return (
    <Card>
      <PurchaseDetail detail={orderDetailData?.data} />
      <Divider sx={{ marginTop: 6.5, marginBottom: 2 }} />

      <CardHeader
        style={{ textAlign: "right" }}
        title="لیست کالا ها"
        titleTypographyProps={{ variant: "h6" }}
      />

      {orderDetailData?.data?.purchaseDetails && (
        <Grid
          rowIdFields={["requestCaseRowCommodityId"]}
          columns={columns}
          rows={orderDetailData?.data?.purchaseDetails.map((row, index) => ({
            id: index,
            ...row,
          }))}
          pagination={{}}
          selectMode="single"
          onRowSelected={handleSelectedRow}
          seletedRow={purchaseRowSelected ? [purchaseRowSelected?.id] : []}
        />
      )}
    </Card>
  );
};
export default withSnackbar(PurchaseForm);
