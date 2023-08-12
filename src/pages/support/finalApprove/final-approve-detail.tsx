import List from "@mui/icons-material/List";
import { Card, Divider, Typography } from "@mui/material";
import axios from "../../../utils/axios.config";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { withSnackbar } from "../../../utils/snackbar-hook";
import RequestDetail from "../request-detail";
import ApproveCommodityForm from "./approve-commodity-form/aspprove-commodity-form";
import {useSelector} from "react-redux";
const FinalApproveDetail = (props) => {
  const theme = useTheme();

  const params = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);
  useEffect(() => {
    if (!params || !params.id) {
      navigate("/");
    }
    getRequestDetail();
  }, []);

  const {user} = useSelector((state:any) => state?.user)

  const getRequestDetail = async () => {
    try {
      const response = await axios.post("/Support/GetRequestCaseCommodityDetails", {
        userId: user?.id,
        requestId: params.id,
      });
    
      setDetail(response.data.model);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const onSubmit = (commodityDetail, newValues) => {
    console.log(newValues);

    setApproveDate(commodityDetail, newValues);
  };
  const setApproveDate = async function (commodityDetail: any, newValues) {
    // const formValue=getValues();
    setLoading(true);
    try {
      const response = await axios.post("/Support/SetFinalApproveData", {
        userId: user?.id,
        requestCaseCommodityId: commodityDetail.requestCaseRowCommodityId,
        stateId: commodityDetail.approveStateId,
        requestCaseId: params.id,
        requestCount: detail.count,
        purchaseOrderId: 0,
        commodityId: commodityDetail.commodityId,
        exitWarehouseCount: newValues.exitWarehouseCount,
        purchaseCount: +newValues.purchaseCount,
        finalApproveStateId: newValues.finalApproveStateId,
        purchaseOrderDetailsId: 0,
      });
      setLoading(false);
      props.snackbarShowMessage(
        response.data.message,
        response.data.statusCode !== 200 ? "error" : "success"
      );
    } catch (error) {
      setLoading(false);

      console.error("Error fetching data:", error);
    }
  };
  const countChange = (e) => {};
  const cancel = (e) => {
    navigate("/supportFinalApprove");
  };
  return (
    <Card>
      <RequestDetail detail={detail} />
      <Divider sx={{ marginTop: 6.5, marginBottom: 2 }} />
      <Typography
        variant="body2"
        sx={{
          fontSize: "1.25rem",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
        }}
      >
        <List
          sx={{
            margin: "0 5px",
            width: "30px",
            height: "30px",
            fontSize: "2rem",
          }}
          color="info"
        />
        لیست کالاها
      </Typography>
      {detail && detail.commodities
        ? detail.commodities.map((item, index) => (
            <ApproveCommodityForm
            isEditable={detail.isEditable}
              key={index}
              defaults={{ stateId: item.approveStateId }}
              commodity={item}
              loading={loading}
              
              onSubmitForm={(e) => onSubmit(item, e)}
            />
          ))
        : ""}
    </Card>
  );
};
export default withSnackbar(FinalApproveDetail);
