import {Box, Card, CardHeader, Grid as CardGrid, IconButton,} from "@mui/material";
import {GridColDef,} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {JalaliDatePickerNew} from "../../components/date-picker/date-picker.tsx";
import Grid from "../../components/grid/grid.tsx";
import {Row} from "./style.tsx";
import Filter from "@mui/icons-material/FilterAlt";
import FilterOff from "@mui/icons-material/FilterAltOff";
import {useDispatch, useSelector} from "react-redux";
import {GetApproveQAction} from "../../redux/features/purchaseSlicer.ts";

const ApproveQueue = () => {
  const dispatch = useDispatch();
  const queue = useSelector((state: any) => state.purchase?.approve?.queue);

  const [fromDate, setFromDate] = useState(
      new Date().toLocaleDateString()
  );
  const [toDate, setToDate] = useState(new Date().toLocaleDateString());
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: {errors, isValid, isDirty},
  } = useForm<any>({
    defaultValues: {
      fromDate: "",
      toDate: "",
    },
  });
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: "requesterUser",
      headerName: "درخواست دهنده",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseOrderCount",
      headerName: "تعداد مورد نیاز",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "purchaseOrderTrackingCode",
      headerName: "کد پیگیری سفارش",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCaseTrackingCode",
      headerName: "کد پیگیری درخواست",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "requestCaseCreateDate",
      headerName: "تاریخ ایجاد درخواست ",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      renderCell: (params) => (
          <span>
          {new Date(params.row.requestCaseCreateDate)
              .toLocaleDateString("fa-IR")
              .toString()}
        </span>
      ),
    },
    {
      field: "countOfDone",
      headerName: "تعداد پایان یافته ",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },

    {
      field: "purchaseTrackingCode",
      headerName: "کد پیگیری خرید ",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: "requiredDate",
      headerName: "تاریخ نیاز",
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      renderCell: (params) => (
          <span>
          {new Date(params.row.approveDate)
              .toLocaleDateString("fa-IR")
              .toString()}
        </span>
      ),
    },
    {
      field: "warehouseTrackingCode",
      headerName: "کد پیگیری انبار ",
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },

    /* {
       field: "actions",
       headerName: "Actions",
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
             onClick={() => handleEditClick(params.row)}
             color="inherit"
           />
         </>
       ),
     },*/
  ];
  useEffect(() => {
    //@ts-ignore
    dispatch(GetApproveQAction({
      fromDate: "2021-07-27",
      toDate: "2024-07-27"
    }));
  }, [dispatch]);
  const {user} = useSelector((state: any) => state?.user);

  const handleEditClick = (entity) => {
    navigate("/supportFinalApproveDetail/" + entity.requestCommodityId);
  };
  const handleSortModelChange = () => {
  };
  const getList = async () => {
    const filters = getValues();
    const body = {
      fromDate:
          filters && filters.fromDate != "" ? filters.fromDate : "2021-07-27",
      toDate: filters && filters.toDate != "" ? filters.toDate : "2024-07-27",
    };
    dispatch(GetApproveQAction(body))
  };
  const setSelectedFromDate = (e) => {
    const date = new Date(e).toJSON().split('T')[0];
    setFromDate(date);
    setValue("fromDate", date);
  };
  const setSelectedToDate = (e) => {
    const date = new Date(e).toJSON().split('T')[0];
    setToDate(date);
    setValue("toDate", date);
  };
  const onSubmit = (data) => {
  };
  return (
      <CardGrid
          item
          xs={12}
          sx={{
            borderRadius: 2,
            boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
            marginBottom: "10px",
          }}
      >
        <Card sx={{borderRadius: 3}}>
          <CardHeader
              style={{textAlign: "right"}}
              title="تایید خرید"
              titleTypographyProps={{variant: "h6"}}
          />

          <Box>
            <form onSubmit={onSubmit}>
              <Row>
                <Box sx={{flex: 1, marginLeft: "20px"}}>
                  <JalaliDatePickerNew
                      defaultValue={fromDate}
                      onChange={setSelectedFromDate}
                      name="requiredDate"
                      label="از تاریخ"
                      register={register}
                  ></JalaliDatePickerNew>
                </Box>
                <Box sx={{flex: 1, marginLeft: "20px"}}>
                  <JalaliDatePickerNew
                      defaultValue={toDate}
                      onChange={setSelectedToDate}
                      name="requiredDate"
                      label="تا تاریخ "
                      register={register}
                  ></JalaliDatePickerNew>
                </Box>
                <IconButton
                    aria-label="اعمال فیلتر"
                    onClick={getList}
                    color="info"
                >
                  <Filter/>
                </IconButton>
                <IconButton onClick={getList} color="info">
                  <FilterOff/>
                </IconButton>
                <Box sx={{flex: 1, marginLeft: "20px"}}></Box>
              </Row>
            </form>
          </Box>

          <Grid
              onDoubleClick={(e) => handleEditClick(e.row)}
              rowIdFields={["purchaseOrderId", "requesterUser", "requestCaseId", "commodityId", "requestCaseCommodityId", "purchaseOrderDetailsId", "warehouseOrderId"]}
              columns={columns}
              rows={queue?.data ?? []}
              pagination={{}}
              onSortModelChange={handleSortModelChange}
          ></Grid>
        </Card>
      </CardGrid>
  );
};
export default ApproveQueue;
