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
  TextareaAutosize,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ContractorAddDateAction,
  GetAllCheckListsAction,
  GetControlCheckListStatesAction,
  GetOneSubItemDetailsAction,
  InspectControlCheckListAction,
  QcFinalApproveAction,
  QcManagerControlCheckListAction,
  SetQcDateAction,
  technicalApproveScheduleAction,
} from "../../redux/features/qcSlicer";
import JalaliDatePicker from "../date-picker/date-picker";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";

const accessToEntryCheckListModes: string[] = [
  "control-checklist",
  "manager-control-checklist",
];

const QcDetails = ({ mode }) => {
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  const {
    checkLists,
    subItemDetails,
    contractorAddDateState,
    technicalApproveScheduleAddState,
    qcDateAddState,
    controlChecklistStates,
    controlCheckListAddState,
    finalApproveAddState,
  } = useSelector((state: any) => state?.qc);

  ////////////////////////////
  const [contractorAccrodion, setContractorAccrodion] = useState<boolean>(
    () => mode === "contractor"
  );
  const [technicalAccrodion, setTechnicalAccrodion] = useState<boolean>(
    () => mode === "technical"
  );
  const [qcAccrodion, setQcAccrodion] = useState<boolean>(() => mode === "qc");
  const [controlChecklistAccrodion, setControlChecklistAccrodion] =
    useState<boolean>(() => mode === "control-checklist");

  const [
    managerControlChecklistAccrodion,
    setManagerControlChecklistAccrodion,
  ] = useState<boolean>(() => mode === "manager-control-checklist");
  const [finalControlChecklistAccrodion, setFinalControlChecklistAccrodion] =
    useState<boolean>(() => mode === "final-control-checklist");
  /////////////////////////////////////////

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [qcVisitFromDate, setQcVisitFromDate] = useState(new Date());
  const [qcVisitToDate, setQcVisitToDate] = useState(new Date());
  const [qcInspectDate, setQcInspectDate] = useState(new Date());
  const [technicalApprove, setTechnicalApprove] = useState<boolean>(false);
  const [info, setInfo] = useState({
    inspectControlCheckListStateId: "",
    qcManagerControlStateId: "",
    qcManagerDescriptions: "",
    qcFinalControlStateId: "",
  });

  const [isPeriodTime, setIsPeriodTime] = useState<boolean>(false);

  const getItemData = useCallback(async () => {
    await dispatch(GetOneSubItemDetailsAction({ selectedItemId: +id }));
  }, [dispatch, id]);
  const getLists = useCallback(async () => {
    await dispatch(GetAllCheckListsAction());
    await dispatch(GetControlCheckListStatesAction());
  }, [dispatch]);

  useEffect(() => {
    getItemData();
    getLists();
  }, [getItemData, getLists]);
  useEffect(() => {
    if (!subItemDetails?.data) return;
    setFromDate(
      subItemDetails.data.fromDate
        ? new Date(subItemDetails.data.fromDate)
        : new Date()
    );
    setToDate(
      subItemDetails.data.toDate
        ? new Date(subItemDetails.data.toDate)
        : new Date()
    );
    setTechnicalApprove(subItemDetails.data.technicalApprove);
    setQcVisitFromDate(
      subItemDetails.data.qcVisitFromDate
        ? new Date(subItemDetails.data.qcVisitFromDate)
        : new Date()
    );
    setQcVisitToDate(
      subItemDetails.data.qcVisitToDate
        ? new Date(subItemDetails.data.qcVisitToDate)
        : new Date()
    );
    setQcInspectDate(
      subItemDetails.data.qcInspectDate
        ? new Date(subItemDetails.data.qcInspectDate)
        : new Date()
    );
    setInfo((prev) => ({
      ...prev,
      inspectControlCheckListStateId:
        subItemDetails.data.inspectControlCheckListStateId,
      qcManagerControlStateId: subItemDetails.data.qcManagerControlStateId,
      qcManagerDescriptions: subItemDetails.data.qcManagerDescriptions,
      qcFinalControlStateId: subItemDetails.data.qcFinalControlStateId,
    }));
    setIsPeriodTime(subItemDetails?.data.isPeriodTime);
  }, [subItemDetails]);

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
  const setSelectedQcVisitFromDate = (e) => {
    const date = new Date(e);
    setQcVisitFromDate(date);
  };
  const setSelectedQcVisitToDate = (e) => {
    const date = new Date(e);
    setQcVisitToDate(date);
  };
  const setSelectedQcInspectDate = (e) => {
    const date = new Date(e);
    setQcInspectDate(date);
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
      case "qc":
        await dispatch(
          SetQcDateAction({
            instanceId: +id,
            qcVisitFromDate,
            qcVisitToDate,
            inspectDate: qcInspectDate,
            isPeriodTime,
          })
        );
        break;
      case "control-checklist":
        await dispatch(
          InspectControlCheckListAction({
            instanceId: +id,
            inspectControlCheckListStateId:
              +info?.inspectControlCheckListStateId,
          })
        );
        break;
      case "manager-control-checklist":
        await dispatch(
          QcManagerControlCheckListAction({
            instanceId: +id,
            qcManagerControlStateId: +info.qcManagerControlStateId,
            qcManagerDescriptions: info?.qcManagerDescriptions,
          })
        );
        break;
      case "final-control-checklist":
        await dispatch(
          QcFinalApproveAction({
            instanceId: +id,
            stateId: +info.qcFinalControlStateId,
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
      case "qc":
        return qcDateAddState.pending;
      case "control-checklist":
        return controlCheckListAddState.pending;
      case "manager-control-checklist":
        return finalApproveAddState.pending;
    }
  };
  const handleClickEntryCheckList = () => {
    window.open(`/qc/entryChecklist/${id}/${mode}`, "_blank");
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
            <div className="flex justify-start">
              <Button
                variant="outlined"
                color="warning"
                onClick={handleClickEntryCheckList}
              >
                چک لیست
              </Button>
            </div>

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
            <Accordion
              expanded={qcAccrodion}
              onChange={() => setQcAccrodion((prev) => !prev)}
              sx={{ mt: 2 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="contractor"
                sx={{
                  backgroundColor: "#e6fcf5",
                }}
              >
                <Typography>واحد کیفیت</Typography>
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
                    <Typography className="w-1/2 text-right">
                      کاربر کنترل کیفیت:{" "}
                    </Typography>
                    <Typography>{subItemDetails?.data?.qcUser}</Typography>
                  </div>
                  <div className="flex">
                    <Typography className="w-1/3 text-right">
                      تاریخ فعالیت:{" "}
                    </Typography>
                    <Typography>
                      {subItemDetails?.data?.qcActivityDate &&
                        new Date(
                          subItemDetails?.data?.qcActivityDate
                        ).toLocaleDateString("fa-ir")}
                    </Typography>
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-6">
                  <Typography>تاریخ قطعی</Typography>
                  <Switch
                    checked={isPeriodTime}
                    onChange={() => setIsPeriodTime((prev) => !prev)}
                  />
                  <Typography>تعیین بازه</Typography>
                </div>
                {isPeriodTime && (
                  <>
                    <JalaliDatePicker
                      defaultValue={qcVisitFromDate}
                      onChange={setSelectedQcVisitFromDate}
                      name="requiredDate"
                      label="از تاریخ"
                      value={qcVisitFromDate}
                      sx={{ mt: 2, width: "50%" }}
                      disabled={
                        mode === "qc" ? !subItemDetails?.data?.qcEditable : true
                      }
                    />
                    <JalaliDatePicker
                      defaultValue={qcVisitToDate}
                      onChange={setSelectedQcVisitToDate}
                      name="requiredDate"
                      label="تا تاریخ"
                      value={qcVisitToDate}
                      sx={{ mt: 2, width: "50%" }}
                      disabled={
                        mode === "qc" ? !subItemDetails?.data?.qcEditable : true
                      }
                    />
                  </>
                )}
                {!isPeriodTime && (
                  <JalaliDatePicker
                    defaultValue={qcInspectDate}
                    onChange={setSelectedQcInspectDate}
                    name="requiredDate"
                    label="تاریخ بازرسی"
                    value={qcInspectDate}
                    sx={{ mt: 2, width: "50%" }}
                    disabled={
                      mode === "qc" ? !subItemDetails?.data?.qcEditable : true
                    }
                  />
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={controlChecklistAccrodion}
              onChange={() => setControlChecklistAccrodion((prev) => !prev)}
              sx={{ mt: 2 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="contractor"
                sx={{
                  backgroundColor: "#e6fcf5",
                }}
              >
                <Typography>بازرس</Typography>
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
                    <Typography className="w-1/2 text-right">
                      کاربر بازرس:{" "}
                    </Typography>
                    <Typography>
                      {subItemDetails?.data?.inspectserUser}
                    </Typography>
                  </div>
                  <div className="flex">
                    <Typography className="w-1/3 text-right">
                      تاریخ فعالیت:{" "}
                    </Typography>
                    <Typography>
                      {subItemDetails?.data?.inspectActivityDate &&
                        new Date(
                          subItemDetails?.data?.inspectActivityDate
                        ).toLocaleDateString("fa-ir")}
                    </Typography>
                  </div>
                </div>
                <FormControl sx={{ mt: 2, width: "50%" }}>
                  <InputLabel>وضعیت چک لیست</InputLabel>
                  <Select
                    value={info?.inspectControlCheckListStateId}
                    fullWidth={true}
                    name={"inspectControlCheckListStateId"}
                    label="وضعیت چک لیست"
                    onChange={handleChange}
                    disabled={
                      mode === "control-checklist"
                        ? !subItemDetails?.data?.inspectorEditable
                        : true
                    }
                  >
                    {controlChecklistStates?.data?.map((item) => (
                      <MenuItem value={item.id} key={item?.id}>
                        {item?.state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={managerControlChecklistAccrodion}
              onChange={() =>
                setManagerControlChecklistAccrodion((prev) => !prev)
              }
              sx={{ mt: 2 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="contractor"
                sx={{
                  backgroundColor: "#e6fcf5",
                }}
              >
                <Typography>مدیر کیفیت</Typography>
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
                    <Typography className="w-1/2 text-right">
                      کاربر مدیر کیفیت:{" "}
                    </Typography>
                    <Typography>
                      {subItemDetails?.data?.qcManagerUser}
                    </Typography>
                  </div>
                  <div className="flex">
                    <Typography className="w-1/3 text-right">
                      تاریخ فعالیت:{" "}
                    </Typography>
                    <Typography>
                      {subItemDetails?.data?.qcManagerActivityDate &&
                        new Date(
                          subItemDetails?.data?.qcManagerActivityDate
                        ).toLocaleDateString("fa-ir")}
                    </Typography>
                  </div>
                </div>
                <FormControl sx={{ mt: 2, width: "50%" }}>
                  <InputLabel>وضعیت چک لیست</InputLabel>
                  <Select
                    value={info?.qcManagerControlStateId}
                    fullWidth={true}
                    name={"qcManagerControlStateId"}
                    label="وضعیت چک لیست"
                    onChange={handleChange}
                    disabled={
                      mode === "manager-control-checklist"
                        ? !subItemDetails?.data?.qcManagerEditable
                        : true
                    }
                  >
                    {controlChecklistStates?.data?.map((item) => (
                      <MenuItem value={item.id} key={item?.id}>
                        {item?.state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className="w-1/2 flex items-center gap-4">
                  <Typography>توضیحات:</Typography>
                  <TextareaAutosize
                    value={info?.qcManagerDescriptions}
                    name={"qcManagerDescriptions"}
                    onChange={handleChange}
                    className="border-2 mt-4 flex-1 border-slate-300 p-4"
                    minRows={5}
                    disabled={
                      mode === "manager-control-checklist"
                        ? !subItemDetails?.data?.qcManagerEditable
                        : true
                    }
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={finalControlChecklistAccrodion}
              onChange={() =>
                setFinalControlChecklistAccrodion((prev) => !prev)
              }
              sx={{ mt: 2 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="contractor"
                sx={{
                  backgroundColor: "#e6fcf5",
                }}
              >
                <Typography>کنترل کیفیت نهایی</Typography>
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
                    <Typography className="w-1/2 text-right">
                      کاربر کنترل کیفیت نهایی:{" "}
                    </Typography>
                    <Typography>
                      {subItemDetails?.data?.qcFinalControlUser}
                    </Typography>
                  </div>
                  <div className="flex">
                    <Typography className="w-1/3 text-right">
                      تاریخ فعالیت:{" "}
                    </Typography>
                    <Typography>
                      {subItemDetails?.data?.qcFinalControlActivityDate &&
                        new Date(
                          subItemDetails?.data?.qcFinalControlActivityDate
                        ).toLocaleDateString("fa-ir")}
                    </Typography>
                  </div>
                </div>
                <FormControl sx={{ mt: 2, width: "50%" }}>
                  <InputLabel>وضعیت چک لیست</InputLabel>
                  <Select
                    value={info?.qcFinalControlStateId}
                    fullWidth={true}
                    name={"qcFinalControlStateId"}
                    label="وضعیت چک لیست"
                    onChange={handleChange}
                    disabled={
                      mode === "final-control-checklist"
                        ? !subItemDetails?.data?.qcFinalControlEditable
                        : true
                    }
                  >
                    {controlChecklistStates?.data?.map((item) => (
                      <MenuItem value={item.id} key={item?.id}>
                        {item?.state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
