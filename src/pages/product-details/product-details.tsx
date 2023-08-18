import List from "@mui/icons-material/List";
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  CardHeader,
  IconButton,
} from "@mui/material";
import axios from "../../utils/axios.config.ts";
import { useEffect, useState } from "react";
import RequestDetail from "../product-request/request-detail/request-detail.tsx";
import { useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { withSnackbar } from "../../utils/snackbar-hook";
import { useSelector } from "react-redux";
import SelectComponent from "../../components/select/selects";
import JalaliDatePicker from "../../components/date-picker/date-picker";

import { getUserIdFromStorage } from "../../utils/functions.ts";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "../../components/grid/grid";
import { Row } from "./style";

import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
const ProductDetails = (props) => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(undefined);
  const [states, setStates] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [commodities, setCommodities] = useState(undefined);
  const [approveStates, setApproveStates] = useState<any[]>([]);
  const [fromDate, setFromDate] = useState<any>(new Date());
  const [toDate, setToDate] = useState<any>(new Date());

  const { user } = useSelector((state: any) => state?.user);
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
    getRequestDetail();
  }, []);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<any>({
    defaultValues: { approveStateId: 3, fromDate: "", toDate: "" },
  });
  const onSubmit = (data) => {};
  const getRequestDetail = async () => {
    try {
      const response = await axios.post("/Support/GetRequestDetails", {
        userId: user?.id ?? getUserIdFromStorage(),
        requestId: id,
      });
      console.log(response);
      setDetail(response.data.model);
      setCommodities(response.data.model.commodities);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const setSelectedFromDate = (e) => {
    const date = new Date(e).toLocaleDateString("en-US");
    setFromDate(date);
    setValue("fromDate", date);
  };
  const setSelectedToDate = (e) => {
    const date = new Date(e).toLocaleDateString("en-US");
    setToDate(date);
    setValue("toDate", date);
  };
  const columns: GridColDef[] = [
    {
      field: "commodity",
      headerName: "نام کالا",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "requiredDate",
      headerName: "تاریخ نیاز",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <span>
          {new Date(params.row.approveDate)
            .toLocaleDateString("fa-IR")
            .toString()}
        </span>
      ),
    },
    {
      field: "count",
      headerName: "تعداد مورد نیاز",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "newcount",
      headerName: "تعداد تایید شده ",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: ({ value }) => <p>{value || 0}</p>,
    },
    {
      field: "requiredDate",
      headerName: " تاریخ ایجاد",
      minWidth: 150,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",

      flex: 1,
      renderCell: ({ value }) => (
        <span>{new Date(value).toLocaleDateString("fa-IR").toString()}</span>
      ),
    },
    {
      field: "approveState",
      headerName: " وضعیت تایید ",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "count",
      headerName: "تعداد",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "عملیات",
      description: "ActionColumn",
      sortable: false,
      minWidth: 150,
      flex: 1,
      filterable: false,
      hideSortIcons: true,
      type: "actions",
      cellClassName: "actions",
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              console.log("hi");
            }}
            color="inherit"
          />
        </>
      ),
    },
  ];
  return (
    <Card>
      <RequestDetail detail={detail} />
      <Divider sx={{ marginTop: 6.5, marginBottom: 2 }} />

      <CardHeader
        style={{ textAlign: "right" }}
        title="لیست کالا ها"
        titleTypographyProps={{ variant: "h6" }}
      />

      {commodities && (
        <Grid
          onDoubleClick={(e) => {
            console.log("bye");
          }}
          rowIdFields={["requestCaseRowCommodityId"]}
          columns={columns}
          rows={commodities}
          pagination={{}}
          onSortModelChange={() => {
            console.log("aa");
          }}
        ></Grid>
      )}
    </Card>
  );
};
export default withSnackbar(ProductDetails);
