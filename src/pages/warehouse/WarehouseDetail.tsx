import { Grid, Box, Typography, useTheme } from "@mui/material";
import { StyledBox } from "./style";
import { Link } from "react-router-dom";

const WarehouseDetail = ({ detail, mode = "warehouse" }: any) => {
  const theme = useTheme();
  const createDate = new Date(detail?.createDate).toLocaleDateString("fa-IR");
  return (
    <Grid container spacing={5} p={2}>
      {detail && (
        <>
          <Grid item xs={12} sm={5} fontFamily="IRANSans">
            <StyledBox theme={theme}>
              <Box sx={{ mb: 6.75, display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  تاریخ ایجاد:
                </Typography>
                <Typography variant="body2">{createDate.toString()}</Typography>
              </Box>
            </StyledBox>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Box sx={{ mb: 6.75, display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
              >
                {mode === "warehouse" ? "درخواست دهنده :" : "ایجاد کننده"}
              </Typography>

              <Typography variant="body2">
                {mode === "warehouse"
                  ? detail?.requestCaseUser
                  : detail?.creatorUser}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
              >
                {" "}
                شماره تراکنش:
              </Typography>

              <Typography variant="body2" color="secondary">
                {mode === "warehouse"
                  ? detail?.warehouseTrackingCode
                  : detail?.trakingCode}
              </Typography>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default WarehouseDetail;
