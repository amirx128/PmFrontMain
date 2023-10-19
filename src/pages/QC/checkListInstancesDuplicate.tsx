import {
  Box,
  Card,
  CardHeader,
  Grid as CardGrid,
  Button,
  DialogContent,
  Dialog,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Grid from "../../components/grid/grid.tsx";
import { useDispatch, useSelector } from "react-redux";
import gridDict from "../../dictionary/gridDict.ts";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DeleteQcInstanceAction,
  GetDuplicatedAction,
} from "../../redux/features/qcSlicer.ts";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { LoadingButton } from "@mui/lab";
const CheckListInstancesListDuplicate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { duplicatedCheckLists, checkListInstancRemoveState } = useSelector(
    (state: any) => state.qc
  );
  const [warningRemoveModal, setWarningREmoveModal] = useState(false);

  const [idsDelete, setIdsDelete] = useState<number[]>([]);

  const columns: GridColDef[] = [
    {
      field: "checkListId",
      headerName: gridDict.id,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "checkListInstanceId",
      headerName: gridDict.checkListInstanceId,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "checkListState",
      headerName: gridDict.checkListState,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "checkListTitle",
      headerName: gridDict.checkListTitle,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "checkListTrackingNumber",
      headerName: gridDict.checkListTrackingNumber,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "placeTitle",
      headerName: gridDict.placeTitle,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "subItemTitle",
      headerName: gridDict.subItemTitle,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },

    {
      field: "actions",
      headerName: gridDict.actions,
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
            onClick={() => navigate(`edit/${params.row.checkListInstanceId}`)}
            color="inherit"
          />
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            className="textPrimary"
            onClick={() => {
              setIdsDelete([params.row.checkListInstanceId]);
              setWarningREmoveModal(true);
            }}
            color="error"
          />
        </>
      ),
    },
  ];
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    dispatch(GetDuplicatedAction({ data: window.opener.infoData }));
  };

  const handleDeleteItems = async () => {
    if (idsDelete.length) {
      await dispatch(DeleteQcInstanceAction({ instanceIds: idsDelete }));
      setWarningREmoveModal(false);
      setIdsDelete([]);
    }
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
      <Card sx={{ borderRadius: 3 }}>
        <CardHeader
          style={{ textAlign: "right" }}
          title="چک لیست ها"
          titleTypographyProps={{ variant: "h6" }}
        />

        <Box sx={{ display: "flex", justifyContent: "end", pr: 10, gap: 5 }}>
          <Button variant="outlined" onClick={() => navigate("add")}>
            <AddIcon />
            افزودن
          </Button>
          <Button
            variant="outlined"
            onClick={() => setWarningREmoveModal(true)}
            color="error"
            disabled={!idsDelete.length}
          >
            <DeleteIcon />
            حذف موارد انتخابی
          </Button>
        </Box>
        {duplicatedCheckLists?.pending || (
          <Grid
            columns={columns}
            rows={
              duplicatedCheckLists?.data.map((rows, index) => ({
                ...rows,
                id: rows.checkListInstanceId,
              })) ?? []
            }
            pagination={{}}
            onRowSelected={(e) => setIdsDelete(e)}
          />
        )}

        <Dialog
          open={warningRemoveModal}
          onClose={() => setWarningREmoveModal(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              آیا از حذف مورد انتخابی اطمینان دارید؟
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setWarningREmoveModal(false)}>انصراف</Button>
            <LoadingButton
              onClick={handleDeleteItems}
              loading={checkListInstancRemoveState.pending}
            >
              تایید
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Card>
    </CardGrid>
  );
};
export default CheckListInstancesListDuplicate;
