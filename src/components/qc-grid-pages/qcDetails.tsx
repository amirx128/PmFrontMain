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
  GetAllCheckListsAction,
  GetAllContractorAction,
  GetAllSubItemsAction,
  GetAllUsabilityAction,
} from "../../redux/features/qcSlicer";
import { getAllProjects } from "../../redux/features/definitionSlicer";
import JalaliDatePicker from "../date-picker/date-picker";
import { LoadingButton } from "@mui/lab";
const QcDetails = ({ mode }) => {
  const dispatch = useDispatch<any>();
  const { subItems, usabilities, checkLists, contractors } = useSelector(
    (state: any) => state?.qc
  );
  const { projects } = useSelector((state: any) => state?.definition);

  const [contractorAccrodion, setContractorAccrodion] = useState<boolean>(
    () => mode === "contractor"
  );
  const [createDate, setCreateDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [contractorActivityDate, setContractorActivityDate] = useState(
    new Date()
  );
  const [hasUnHandleCheckList, setHasUnHandleCheckList] =
    useState<boolean>(false);
  const [info, setInfo] = useState({
    trackingNumber: "",
    subItem: "",
    usability: "",
    project: "",
    floor: "",
    unit: "",
    checkList: "",
    contractor: "",
  });

  useEffect(() => {
    getLists();
  }, []);

  const getLists = async () => {
    await dispatch(GetAllSubItemsAction());
    await dispatch(GetAllUsabilityAction());
    await dispatch(getAllProjects());
    await dispatch(GetAllCheckListsAction());
    await dispatch(GetAllContractorAction());
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };

  const setSelectedCreateDate = (e) => {
    const date = new Date(e);
    setCreateDate(date);
  };
  const setSelectedFromDate = (e) => {
    const date = new Date(e);
    setFromDate(date);
  };
  const setSelectedToDate = (e) => {
    const date = new Date(e);
    setToDate(date);
  };
  const setSelectedContractorActivityDate = (e) => {
    const date = new Date(e);
    setContractorActivityDate(date);
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
      <CardContent className="w-1/2">
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
          <AccordionDetails
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <TextField
              defaultValue={info?.trackingNumber}
              value={info?.trackingNumber}
              name={"trackingNumber"}
              onChange={handleChange}
              label={"کد پیگیری"}
              sx={{ mt: 2, width: "50%" }}
              disabled={true}
            />

            {!subItems.pending && (
              <FormControl sx={{ mt: 2, width: "50%" }}>
                <InputLabel>واحد فرعی</InputLabel>
                <Select
                  defaultValue={info?.subItem}
                  value={info?.subItem}
                  fullWidth={true}
                  name={"subItem"}
                  label="واحد فرعی"
                  onChange={handleChange}
                  disabled={true}
                >
                  {subItems?.data?.map((item) => (
                    <MenuItem value={item.id} key={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {!usabilities.pending && (
              <FormControl sx={{ mt: 2, width: "50%" }}>
                <InputLabel>کاربری</InputLabel>
                <Select
                  defaultValue={info?.usability}
                  value={info?.usability}
                  fullWidth={true}
                  name={"usability"}
                  label="کاربری"
                  onChange={handleChange}
                  disabled={true}
                >
                  {usabilities?.data?.map((item) => (
                    <MenuItem value={item.id} key={item?.id}>
                      {item?.usablityName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <JalaliDatePicker
              defaultValue={createDate}
              onChange={setSelectedCreateDate}
              name="requiredDate"
              label="تاریخ ایجاد"
              value={createDate}
              sx={{ mt: 2, width: "50%" }}
              disabled={true}
            />
            {!projects.pending && (
              <FormControl sx={{ mt: 2, width: "50%" }}>
                <InputLabel>پروژه</InputLabel>
                <Select
                  defaultValue={info?.project}
                  value={info?.project}
                  fullWidth={true}
                  name={"project"}
                  label="پروژه"
                  onChange={handleChange}
                  disabled={true}
                >
                  {projects?.data?.map((item) => (
                    <MenuItem value={item.id} key={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {!projects.pending && (
              <FormControl sx={{ mt: 2, width: "50%" }}>
                <InputLabel>طبقه</InputLabel>
                <Select
                  defaultValue={info?.floor}
                  value={info?.floor}
                  fullWidth={true}
                  name={"floor"}
                  label="طبقه"
                  onChange={handleChange}
                  disabled={true}
                >
                  {projects?.data
                    ?.flatMap((item) => item?.projectfloor)
                    .map((item) => (
                      <MenuItem value={item.id} key={item?.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
            {!projects.pending && (
              <FormControl sx={{ mt: 2, width: "50%" }}>
                <InputLabel>واحد</InputLabel>
                <Select
                  defaultValue={info?.unit}
                  value={info?.unit}
                  fullWidth={true}
                  name={"unit"}
                  label="واحد"
                  onChange={handleChange}
                  disabled={true}
                >
                  {projects?.data
                    ?.flatMap((item) => item?.projectfloor)
                    .flatMap((item) => item?.projectUnit)
                    .map((item) => (
                      <MenuItem value={item.id} key={item?.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
            {!checkLists.pending && (
              <FormControl sx={{ mt: 2, width: "50%" }}>
                <InputLabel>چک لیست</InputLabel>
                <Select
                  defaultValue={info?.checkList}
                  value={info?.checkList}
                  fullWidth={true}
                  name={"checkList"}
                  label="چک لیست"
                  onChange={handleChange}
                  disabled={true}
                >
                  {checkLists?.data?.map((item) => (
                    <MenuItem value={item.id} key={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={hasUnHandleCheckList}
                  onChange={() => setHasUnHandleCheckList((prev) => !prev)}
                  color="info"
                  disabled={true}
                />
              }
              sx={{ mt: 2 }}
              label="دارای چک لیست هندل نشده است؟"
              dir="ltr"
            />
            <div className="flex gap-3 mt-5">
              <Typography>تعداد چک لیست : </Typography>
              <Typography>25</Typography>
            </div>
            <div className="flex gap-3 mt-5">
              <Typography>تعداد چک لیست های هندل شده :</Typography>
              <Typography>25</Typography>
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
            <FormControlLabel
              control={<Switch checked={false} color="info" disabled={true} />}
              sx={{ mt: 2 }}
              label="قابل ویرایش؟"
              dir="ltr"
            />
            <JalaliDatePicker
              defaultValue={fromDate}
              onChange={setSelectedFromDate}
              name="requiredDate"
              label="از تاریخ"
              value={fromDate}
              sx={{ mt: 2, width: "50%" }}
              disabled={true}
            />
            <JalaliDatePicker
              defaultValue={toDate}
              onChange={setSelectedToDate}
              name="requiredDate"
              label="تا تاریخ"
              value={toDate}
              sx={{ mt: 2, width: "50%" }}
              disabled={true}
            />
            {!contractors.pending && (
              <FormControl sx={{ mt: 2, width: "50%" }}>
                <InputLabel>پیمانکار</InputLabel>
                <Select
                  defaultValue={info?.contractor}
                  value={info?.contractor}
                  fullWidth={true}
                  name={"contractor"}
                  label="پیمانکار"
                  onChange={handleChange}
                  disabled={true}
                >
                  {contractors?.data?.map((item) => (
                    <MenuItem value={item.id} key={item?.id}>
                      {item?.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <JalaliDatePicker
              defaultValue={contractorActivityDate}
              onChange={setSelectedContractorActivityDate}
              name="requiredDate"
              label="تاریخ فعالیت پیمانکار"
              value={contractorActivityDate}
              sx={{ mt: 2, width: "50%" }}
              disabled={true}
            />
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <CardActions className="justify-end">
        <LoadingButton variant="outlined" color="success">
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
