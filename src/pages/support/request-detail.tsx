import { Grid, Box, Typography, useTheme } from "@mui/material";
import { StyledBox } from "./approve/style";
import { Link } from "react-router-dom";

const RequestDetail = ({ detail }) => {
  const theme = useTheme();
  console.log(detail);
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
                  نقش کاربری:
                </Typography>
                <Typography variant="body2">{detail?.businessRoles}</Typography>
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
                  محل مصرف:
                </Typography>

                <Typography variant="body2">{detail?.placeOfUse} </Typography>
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

              <Typography variant="body2">{detail?.requesterUser} </Typography>
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

              <Typography
                variant="body2"
                color="secondary"
                sx={{ cursor: "pointer" }}
              >
                <Link
                  to={`/product-details/${
                    detail?.commodities?.at(0)?.requestCaseId
                  }`}
                >
                  {detail?.trackingCode}
                </Link>
              </Typography>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default RequestDetail;
