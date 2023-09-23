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
  setWarhouseRowSelectedAction,
  GetWarehouseOrderDataAction,
  GetExitWarehouseOrderDataAction,
} from "../../redux/features/warehouseSlicer.ts";
import WarehouseDetail from "./WarehouseDetail.tsx";
const WarhouseForm = ({
  mode = "warehouse",
}: {
  mode: "warehouse" | "exitWarehouse";
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { orderDetailData, warehouseRowSelected, exitOrderDetailData } =
    useSelector((state: any) => state?.warehouse);
  useEffect(() => {
    if (!id) navigate("/");
    getWarehouseDetails();
  }, []);
  useEffect(() => {
    if (orderDetailData?.data?.wareHouseDetailsModelResult) {
      handleSelectDefaultRow();
    }
  }, [orderDetailData]);

  const getWarehouseDetails = async () => {
    try {
      if (mode === "warehouse") {
        await dispatch(GetWarehouseOrderDataAction({ id: +id }));
      } else if (mode === "exitWarehouse") {
        await dispatch(GetExitWarehouseOrderDataAction({ id: +id }));
      }
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
      field: "receiveCount",
      headerName: gridDict.receiveCount,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "receiverDate",
      headerName: gridDict.receiverDate,
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
      field: "receiverId",
      headerName: gridDict.receiverId,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "receiverUser",
      headerName: gridDict.receiverUser,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "sendDate",
      headerName: gridDict.sendDate,
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
      field: "senderUser",
      headerName: gridDict.senderUser,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "sentCount",
      headerName: gridDict.sentCount,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
  ];
  const handleSelectDefaultRow = () => {
    const selectedRow =
      orderDetailData?.data?.wareHouseDetailsModelResult.at(0);
    dispatch(setWarhouseRowSelectedAction(selectedRow));
  };
  const handleSelectedRow = (e) => {
    const selectedRow =
      orderDetailData?.data?.wareHouseDetailsModelResult?.find(
        (purchaseDetail) => +purchaseDetail.id === +e.at(-1)
      );
    dispatch(setWarhouseRowSelectedAction(selectedRow));
  };
  return (
    <Card>
      <WarehouseDetail
        detail={
          mode === "warehouse"
            ? orderDetailData?.data
            : exitOrderDetailData?.data
        }
      />
      <Divider sx={{ marginTop: 6.5, marginBottom: 2 }} />

      <CardHeader
        style={{ textAlign: "right" }}
        title="لیست کالا ها"
        titleTypographyProps={{ variant: "h6" }}
      />

      {(orderDetailData?.data?.wareHouseDetailsModelResult ||
        exitOrderDetailData?.data?.exitFromWarehouseDetails) && (
        <Grid
          rowIdFields={["requestCaseRowCommodityId"]}
          columns={columns}
          rows={
            mode === "warehouse"
              ? orderDetailData?.data?.wareHouseDetailsModelResult
              : exitOrderDetailData?.data?.exitFromWarehouseDetails
          }
          pagination={{}}
          selectMode="single"
          onRowSelected={handleSelectedRow}
          seletedRow={warehouseRowSelected ? [warehouseRowSelected?.id] : []}
        />
      )}
    </Card>
  );
};
export default withSnackbar(WarhouseForm);
