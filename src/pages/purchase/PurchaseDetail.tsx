import { Grid, Box, Typography, useTheme } from "@mui/material";
import { StyledBox } from "./style";
import { Link } from "react-router-dom";

const PurchaseDetail = ({ detail }) => {
  const theme = useTheme();
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
                  شرح کالا:
                </Typography>
                <Typography variant="body2">{detail?.commodity}</Typography>
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
                  تعداد کل:
                </Typography>

                <Typography variant="body2">
                  {detail?.requestCasePurchaseHavingCount}{" "}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "3rem",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  {" "}
                  تعداد مانده:
                </Typography>

                <Typography variant="body2">
                  {detail?.requestCasePurchaseRemainingCount}{" "}
                </Typography>
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
                درخواست دهنده :
              </Typography>

              <Typography variant="body2">
                {detail?.requestCaseUser}{" "}
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
                {detail?.purchaseTrackingCode}
              </Typography>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default PurchaseDetail;
