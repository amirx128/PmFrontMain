import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Grid from "../../components/grid/grid";
import { useEffect, useState } from "react";
import { Button, Card, CardHeader, Typography } from "@mui/material";
import { Grid as CardGrid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/AddOutlined";
import { ActionRow } from "./style";
import axios from "../../utils/axios.config";

const Users = () => {
  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: " نام",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: " نام خانوادگی",
      minWidth: 150,
      flex: 1,
      editable: true,
      renderCell: (params) => (
        <Typography variant="h6" color="red">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "userName",
      headerName: "نام کاربری",
      minWidth: 150,
      flex: 1,
      editable: true,
      //   renderCell: (params) => (
      //     <Typography variant="h6" color="red">
      //       {params.value}
      //     </Typography>
      //   ),
    },
    // when type of column is number align should be left, because of rtl direction

    {
      field: "isActive",
      headerName: " وضعیت",
      description: "This column has a value getter and is not sortable.",
      minWidth: 150,
      sortable: false,
      flex: 1,
      renderCell: (params) => <span>{params.value ? "فعال" : "غیرفعال"}</span>,
      //   valueGetter: (params: GridValueGetterParams) =>
      //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
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
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params.row)}
            color="inherit"
          />
        </>
      ),
    },
  ];

  const handleEditClick = (row) => {
    console.log("edit", row);
  };
  const handleDeleteClick = (row) => {
    console.log("delete", row);
  };
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    try {
      const response: any = await axios.post("/Administration/GetAllUsers", {
        userId: "1",
      });
      console.log(response);
      setData(response.data.model);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleFilter = (entity) => {
    console.log(entity);
  };
  const handleSortModelChange = (entity) => {
    console.log(entity);
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
          title="لیست کاربران"
          titleTypographyProps={{ variant: "h6" }}
        />
        <ActionRow>
          <Button
            sx={{ justifySelf: "flex-start", marginRight: "20px" }}
            color="info"
            variant="outlined"
          >
            <AddIcon />
            افزودن
          </Button>
        </ActionRow>

        <Grid
          columns={columns}
          rows={data}
          pagination={{}}
          onFilterCahnge={handleFilter}
          onSortModelChange={handleSortModelChange}
        ></Grid>
      </Card>
    </CardGrid>
  );
};
export default Users;
