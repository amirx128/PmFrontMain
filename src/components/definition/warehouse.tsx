import { Box, Button, Grid, Typography } from "@mui/material";
import moment from "jalali-moment";
import { Add, Apartment, Edit, Numbers } from "@mui/icons-material";
import Divider from "@mui/material/Divider";

export const Warehouse = ({
  warehouse,
  setAddWarehouseDialog,
  setSelectedWarehouse,
}) => {
  return (
    <Grid item md={4} sm={6} xs={12}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          border: "2px solid #607D8B",
          borderRadius: 2,
          p: 1,
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant={"subtitle1"}>
            {warehouse?.warehouseName}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant={"subtitle1"}>تاریخ ایجاد :</Typography>
          <Typography variant={"subtitle1"}>
            {new Date(warehouse?.createDate)
              .toLocaleDateString("fa-IR")
              .toString()}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant={"subtitle1"}>سازنده :</Typography>
          <Typography variant={"subtitle1"}>
            {warehouse?.creatorUser}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Button
          color={"warning"}
          variant={"contained"}
          fullWidth={true}
          onClick={() => {
            setSelectedWarehouse(warehouse);
            setAddWarehouseDialog(true);
          }}
        >
          ویرایش
        </Button>
      </Box>
    </Grid>
  );
};
