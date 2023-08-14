import { Box, Typography, useTheme } from "@mui/material";
import axios from "../../../utils/axios.config";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {getUserIdFromStorage} from "../../../utils/functions.ts";

const RequestDetail = () => {
  const [mainData, setMainData] = useState("");
  const [trackingCode, setTrackingCode] = useState<string>("");
  const today = new Date().toLocaleDateString("fa-IR");

  useEffect(() => {
    getMainData();
  }, []);
    const {user} = useSelector((state:any) => state?.user)
  const getMainData = async () => {
    try {
      const response: any = await axios.post("/RequestCase/GetMainData", {
        userId: user?.id ?? getUserIdFromStorage(),
      });
      console.log(response.data.model);
      const trackingCode = response.data.model.trackingCode;
      setMainData(trackingCode);
      setTrackingCode(trackingCode);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        style={{
          fontFamily: "IRANSans",
          textAlign: "right",
          color: theme.palette.text.primary,
          fontWeight: "bold",
          fontSize: "16px",
        }}
        variant="h6"
        component="span"
      >
        تاریخ تکمیل فرم:
        <Typography
          style={{
            fontFamily: "IRANSans",
            textAlign: "right",
            marginRight: "5px",
            color: theme.palette.text.primary,
            fontSize: "14px",
          }}
          variant="h6"
          component="span"
        >
          {today}
        </Typography>
      </Typography>
      <Typography
        style={{
          marginRight: "20px",
          fontFamily: "IRANSans",
          textAlign: "right",
          color: theme.palette.text.primary,
          fontWeight: "bold",
          fontSize: "16px",
        }}
        variant="h6"
        component="span"
      >
        شماره درخواست:
        <Typography
          style={{
            marginRight: "5px",
            fontFamily: "IRANSans",
            textAlign: "right",
            color: theme.palette.text.primary,
            fontSize: "14px",
          }}
          variant="h6"
          component="span"
        >
          {trackingCode}
        </Typography>
      </Typography>
    </Box>
  );
};
export default RequestDetail;
