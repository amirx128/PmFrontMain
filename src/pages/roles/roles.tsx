import AddIcon from "@mui/icons-material/AddOutlined";
import { Button, Card, Grid as CardGrid, CardHeader } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "../../utils/axios.config";
import { useEffect, useState } from "react";
import Grid from "../../components/grid/grid";
import { ActionRow } from "./style";
import { useSelector } from "react-redux";
import { getUserIdFromStorage } from "../../utils/functions.ts";

const Roles = () => {
  const columns: GridColDef[] = [
    {
      field: "roleName",
      headerName: " نام نقش",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "roleTitle",
      headerName: " عنوان نقش",
      minWidth: 150,
      flex: 1,
      editable: true,
    },
  ];

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getUsers();
  }, []);
  const { user } = useSelector((state: any) => state?.user);
  const getUsers = async () => {
    try {
      const response: any = await axios.post("/Administration/GetAllRoles", {
        userId: user?.id ?? getUserIdFromStorage(),
      });
      setData(response.data.model);
    } catch (error) {
      console.error("Error fetching data:", error);
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
          title="لیست نقش ها"
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

        <Grid columns={columns} rows={data} pagination={{}}></Grid>
      </Card>
    </CardGrid>
  );
};
export default Roles;
