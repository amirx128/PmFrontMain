import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ContractorAddDateAction,
  GetAllCheckListsAction,
  GetAllContractorAction,
  GetAllSubItemsAction,
  GetAllUsabilityAction,
  GetOneSubItemDetailsAction,
  technicalApproveScheduleAction,
} from "../../redux/features/qcSlicer";
import { getAllProjects } from "../../redux/features/definitionSlicer";
import JalaliDatePicker from "../date-picker/date-picker";
import { LoadingButton } from "@mui/lab";
import { GetUsersListAction } from "../../redux/features/administrationSlicer";
import { useParams } from "react-router-dom";
const QcDetails = ({ mode }) => {
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  const {
    subItems,
    usabilities,
    checkLists,
    contractors,
    subItemDetails,
    contractorAddDateState,
    technicalApproveScheduleAddState,
  } = useSelector((state: any) => state?.qc);
  const { projects } = useSelector((state: any) => state?.definition);
  const { usersList } = useSelector(
    (state: any) => state?.administrations?.users
  );
  const [contractorAccrodion, setContractorAccrodion] = useState<boolean>(
    () => mode === "contractor"
  );
  const [technicalAccrodion, setTechnicalAccrodion] = useState<boolean>(
    () => mode === "technical"
  );
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [technicalApprove, setTechnicalApprove] = useState<boolean>(false);
  const [info, setInfo] = useState({
    trackingNumber: "",
    subItem: "",
    usability: "",
    project: "",
    floor: "",
    unit: "",
    checkList: "",
    contractor: "",
    technicalUser: "",
  });

  useEffect(() => {
    getItemData();
    getLists();
  }, []);
  useEffect(() => {
    if (!subItemDetails?.data) return;
    setFromDate(new Date(subItemDetails.data.fromDate));
    setToDate(new Date(subItemDetails.data.toDate));
  }, [subItemDetails]);
  const getItemData = async () => {
    await dispatch(GetOneSubItemDetailsAction({ selectedItemId: +id }));
  };
  const getLists = async () => {
    // await dispatch(GetAllSubItemsAction());
    // await dispatch(GetAllUsabilityAction());
    // await dispatch(getAllProjects());
    await dispatch(GetAllCheckListsAction());
    // await dispatch(GetAllContractorAction());
    // await dispatch(GetUsersListAction());
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };

  const setSelectedFromDate = (e) => {
    const date = new Date(e);
    setFromDate(date);
  };
  const setSelectedToDate = (e) => {
    const date = new Date(e);
    setToDate(date);
  };
  const submitHandler = async () => {
    switch (mode) {
      case "contractor":
        await dispatch(
          ContractorAddDateAction({
            instanceId: +id,
            fromDate,
            toDate,
          })
        );
        break;
      case "technical":
        await dispatch(
          technicalApproveScheduleAction({
            instanceId: +id,
            fromDate,
            toDate,
            isApproved: !!technicalApprove,
          })
        );
        break;
    }
    await getItemData();
  };
  const submitLoading = () => {
    switch (mode) {
      case "contractor":
        return contractorAddDateState.pending;
      case "technical":
        return technicalApproveScheduleAddState.pending;
    }
  };
  return (
    <Card
      sx={{
        p: 5,
      }}
    >
      <CardHeader
        title="جزیبات"
        sx={{
          textAlign: "left",
        }}
      />
      <CardContent className="w-3/4">
        {!subItemDetails.pending && (
          <>
            <Accordion sx={{ mt: 5 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="main"
                sx={{
                  backgroundColor: "#e6fcf5",
                }}
              >
                <Typography>اصلی</Typography>
              </AccordionSummary>
              <AccordionDetails className="grid grid-cols-2 gap-y-9">
                <div className="flex">
                  <Typography className="w-1/5 text-right">
                    کد پیگیری:{" "}
                  </Typography>
                  <Typography>
                    {subItemDetails?.data?.trackingNumber}
                  </Typography>
                </div>
                <div className="flex">
                  <Typography className="w-1/5 text-right">
                    واحد فرعی:{" "}
                  </Typography>
                  <Typography>{subItemDetails?.data?.subItem}</Typography>
                </div>
                <div className="flex  ">
                  <Typography className="w-1/5 text-right">کاربری: </Typography>
                  <Typography>
                    {subItemDetails?.data?.unitsUsability}
                  </Typography>
                </div>
                <div className="flex  ">
                  <Typography className="w-1/5 text-right">
                    تاریخ ایجاد:{" "}
                  </Typography>
                  <Typography>{subItemDetails?.data?.createDate}</Typography>
                </div>
                <div className="flex  ">
                  <Typography className="w-1/5 text-right">پروژه: </Typography>
                  <Typography>{subItemDetails?.data?.project}</Typography>
                </div>
                <div className="flex  ">
                  <Typography className="w-1/5 text-right">طبقه: </Typography>
                  <Typography>{subItemDetails?.data?.floor}</Typography>
                </div>
                <div className="flex  ">
                  <Typography className="w-1/5 text-right">واحد: </Typography>
                  <Typography>{subItemDetails?.data?.unit}</Typography>
                </div>
                <div className="flex  ">
                  <Typography className="w-1/5 text-right">
                    چک لیست:{" "}
                  </Typography>
                  <Typography>
                    {checkLists?.data
                      ?.filter((check) =>
                        subItemDetails?.data?.relatedCheckList?.includes(
                          check.id
                        )
                      )
                      .flatMap((check) => check.name)
                      .join(" / ")}
                  </Typography>
                </div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={subItemDetails?.data?.hasUnHandledChaeckList}
                      color="info"
                      disabled={true}
                    />
                  }
                  label="دارای چک لیست هندل نشده است؟"
                  dir="ltr"
                  className="justify-self-start"
                />
                <div className="flex gap-12">
                  <Typography>تعداد چک لیست: </Typography>
                  <Typography>
                    {subItemDetails?.data?.contOfChechList}
                  </Typography>
                </div>
                <div className="flex gap-12">
                  <Typography>تعداد چک لیست های هندل نشده :</Typography>
                  <Typography>
                    {subItemDetails?.data?.contOfHandledChechList}
                  </Typography>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={contractorAccrodion}
              onChange={() => setContractorAccrodion((prev) => !prev)}
              sx={{ mt: 2 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="contractor"
                sx={{
                  backgroundColor: "#e6fcf5",
                }}
              >
                <Typography>پیمانکار</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <div className="grid grid-cols-2 w-1/2">
                  <div className="flex">
                    <Typography className="w-1/5 text-right">
                      پیمانکار:{" "}
                    </Typography>
                    <Typography>
                      {subItemDetails?.data?.contractorUser}
                    </Typography>
                  </div>
                  <div className="flex">
                    <Typography className="w-1/4 text-right">
                      تاریخ فعالیت:{" "}
                    </Typography>
                    <Typography>
                      {subItemDetails?.data?.contractorActivityDate &&
                        new Date(
                          subItemDetails?.data?.contractorActivityDate
                        ).toLocaleDateString("fa-ir")}
                    </Typography>
                  </div>
                </div>
                <JalaliDatePicker
                  defaultValue={fromDate}
                  onChange={setSelectedFromDate}
                  name="requiredDate"
                  label="از تاریخ"
                  value={fromDate}
                  sx={{ mt: 2, width: "50%" }}
                  disabled={
                    mode === "contractor"
                      ? !subItemDetails?.data?.contractorEditable
                      : true
                  }
                />
                <JalaliDatePicker
                  defaultValue={toDate}
                  onChange={setSelectedToDate}
                  name="requiredDate"
                  label="تا تاریخ"
                  value={toDate}
                  sx={{ mt: 2, width: "50%" }}
                  disabled={
                    mode === "contractor"
                      ? !subItemDetails?.data?.contractorEditable
                      : true
                  }
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={technicalAccrodion}
              onChange={() => setTechnicalAccrodion((prev) => !prev)}
              sx={{ mt: 2 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="contractor"
                sx={{
                  backgroundColor: "#e6fcf5",
                }}
              >
                <Typography>دفتر فنی</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <div className="grid grid-cols-2 w-1/2">
                  <div className="flex">
                    <Typography className="w-1/5 text-right">
                      کاربر فنی:{" "}
                    </Typography>
                    <Typography>
                      {subItemDetails?.data?.technicalUser}
                    </Typography>
                  </div>
                  <div className="flex">
                    <Typography className="w-1/3 text-right">
                      تاریخ فعالیت:{" "}
                    </Typography>
                    <Typography>
                      {subItemDetails?.data?.technicalActivityDate &&
                        new Date(
                          subItemDetails?.data?.technicalActivityDate
                        ).toLocaleDateString("fa-ir")}
                    </Typography>
                  </div>
                </div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={technicalApprove}
                      color="info"
                      disabled={
                        mode === "technical"
                          ? !subItemDetails?.data?.technicalEditable
                          : true
                      }
                      onChange={() => setTechnicalApprove((prev) => !prev)}
                    />
                  }
                  sx={{ mt: 2 }}
                  label="تایید فنی؟"
                  dir="ltr"
                />
                <JalaliDatePicker
                  defaultValue={fromDate}
                  onChange={setSelectedFromDate}
                  name="requiredDate"
                  label="از تاریخ"
                  value={fromDate}
                  sx={{ mt: 2, width: "50%" }}
                  disabled={
                    mode === "technical"
                      ? !subItemDetails?.data?.technicalEditable
                      : true
                  }
                />
                <JalaliDatePicker
                  defaultValue={toDate}
                  onChange={setSelectedToDate}
                  name="requiredDate"
                  label="تا تاریخ"
                  value={toDate}
                  sx={{ mt: 2, width: "50%" }}
                  disabled={
                    mode === "technical"
                      ? !subItemDetails?.data?.technicalEditable
                      : true
                  }
                />
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </CardContent>
      <CardActions className="justify-end">
        <LoadingButton
          variant="outlined"
          color="success"
          loading={submitLoading()}
          onClick={submitHandler}
        >
          ثبت
        </LoadingButton>
        <Button variant="outlined" color="error">
          انضراف
        </Button>
      </CardActions>
    </Card>
  );
};

export default QcDetails;
