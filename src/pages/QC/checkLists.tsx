import {
  Box,
  Card,
  CardHeader,
  Grid as CardGrid,
  IconButton,
  Typography,
  Button,
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import Grid from "../../components/grid/grid.tsx";
import { useDispatch, useSelector } from "react-redux";
import gridDict from "../../dictionary/gridDict.ts";
import { Link, useNavigate } from "react-router-dom";
import { GetAllCheckListsAction } from "../../redux/features/qcSlicer.ts";
import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogTitle } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

const ChecklistsListQC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { checkLists } = useSelector((state: any) => state.qc);

  const [selectedSubItems, setSelectedSubItems] = useState([]);
  const [isOpenSubItemsModal, setIsOpenSubItemsModal] =
    useState<boolean>(false);

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
      field: "name",
      headerName: gridDict.name,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: "creator",
      headerName: gridDict.creator,
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
        <span>{new Date(value).toLocaleDateString("fa-IR").toString()}</span>
      ),
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
            onClick={() => navigate(`edit/${params.row.id}`)}
            color="inherit"
          />
        </>
      ),
    },
  ];
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    dispatch(GetAllCheckListsAction());
  };

  const handleDoubleClick = (e) => {
    navigate(`/warehouse/details/${e.row.warehouseOrderId}`);
  };
  const hanldeOpenSubItemModal = (subItems) => {
    setSelectedSubItems(subItems ?? []);
    setIsOpenSubItemsModal(true);
  };
  const handleCloseSubItemModal = () => {
    setSelectedSubItems([]);
    setIsOpenSubItemsModal(false);
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
        <Box sx={{ display: "flex", justifyContent: "end", pr: 10 }}>
          <Button variant="outlined" onClick={() => navigate("add")}>
            <AddIcon />
            افزودن
          </Button>
        </Box>

        <Grid
          rowIdFields={[
            "purchaseOrderId",
            "requesterUser",
            "requestCaseId",
            "commodityId",
            "requestCaseCommodityId",
            "purchaseOrderDetailsId",
            "warehouseOrderId",
          ]}
          columns={columns}
          rows={checkLists?.data ?? []}
          pagination={{}}
          // onDoubleClick={handleDoubleClick}
        />
        <Dialog open={isOpenSubItemsModal} onClose={handleCloseSubItemModal}>
          <DialogTitle>آیتم های فرعی</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseSubItemModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <div style={{ width: "30rem", padding: "1.6rem" }}>
              {selectedSubItems.length > 0 && (
                <List>
                  {selectedSubItems.map((subItem) => (
                    <ListItem key={subItem.id}>
                      <ListItemText>{subItem?.name}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              )}
              {selectedSubItems.length > 0 || (
                <Typography>
                  آیتم اصلی انتخاب شده فاقد آیتم فرعی میباشد
                </Typography>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    </CardGrid>
  );
};
export default ChecklistsListQC;
