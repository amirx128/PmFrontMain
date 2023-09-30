import {
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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewOriginalItemAction,
  AddNewSubItemAction,
  GetAllOriginalItemsAction,
  GetAllSubItemsAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import JalaliDatePicker from "../../components/date-picker/date-picker";
import { GetUsersListAction } from "../../redux/features/administrationSlicer";
const AddSubItemCOPY = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { AddNewSubItem, originalItems } = useSelector(
    (state: any) => state?.qc
  );
  const { usersList } = useSelector(
    (state: any) => state?.administrations?.users
  );

  const [info, setInfo] = useState({
    name: "",
    subItemsIds: [],
    placeId: undefined,
    originalItemId: undefined,
    contractorUserId: "",
    technicalUserId: "",
    qcUserId: "",
  });
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(
    new Date().setMonth(new Date().getMonth() + 1)
  );
  const [contractorActivityDate, setContractorActivityDate] = useState(
    new Date()
  );
  const [technicalActivityDate, setTechnicalActivityDate] = useState(
    new Date()
  );
  const [qcActivityDate, setQcActivityDate] = useState(new Date());
  const [qcVisitFromDate, setQcVisitFromDate] = useState(new Date());
  const [qcVisitToDate, setQcVisitToDate] = useState(
    new Date().setMonth(new Date().getMonth() + 1)
  );
  const [inspectDate, setInspectDate] = useState(new Date());
  const [technicalApprove, setTechnicalApprove] = useState<boolean>(true);

  useEffect(() => {
    getAllOriginalItems();
    // getAllUnits();
    getAllUsers();
  }, []);

  const getAllOriginalItems = async () => {
    await dispatch(GetAllOriginalItemsAction());
  };
  const getAllUnits = async () => {
    await dispatch(GetAllSubItemsAction());
  };
  const getAllUsers = async () => {
    await dispatch(GetUsersListAction());
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };
  const hanldeSubmit = async () => {
    await dispatch(
      AddNewSubItemAction({
        name: info.name,
        fromDate: new Date(fromDate).toISOString().slice(0, 10),
        toDate: new Date(toDate).toISOString().slice(0, 10),
        placeId: 0,
        originalItemId: info.originalItemId,
        contractorUserId: info.contractorUserId,
        contractorActivityDate: new Date(contractorActivityDate)
          .toISOString()
          .slice(0, 10),
        technicalApprove,
        technicalUserId: info.technicalUserId,
        technicalActivityDate: new Date(technicalActivityDate)
          .toISOString()
          .slice(0, 10),
        qcUserId: info.qcUserId,
        qcActivityDate: new Date(qcActivityDate).toISOString().slice(0, 10),
        qcVisitFromDate: new Date(qcVisitFromDate).toISOString().slice(0, 10),
        qcVisitToDate: new Date(qcVisitToDate).toISOString().slice(0, 10),
        inspectDate: new Date(inspectDate).toISOString().slice(0, 10),
      })
    );
  };
  const setSelectedFromDate = (e) => {
    const date = new Date(e);
    setFromDate(+date);
  };
  const setSelectedToDate = (e) => {
    const date = new Date(e);
    setToDate(+date);
  };
  const setSelectedContractorActivityDate = (e) => {
    const date = new Date(e);
    setContractorActivityDate(date);
  };
  const setSelectedTechnicalActivityDate = (e) => {
    const date = new Date(e);
    setTechnicalActivityDate(date);
  };
  const setSelectedQcActivityDate = (e) => {
    const date = new Date(e);
    setQcActivityDate(date);
  };
  const setSelectedQcVisitFromDate = (e) => {
    const date = new Date(e);
    setQcVisitFromDate(date);
  };
  const setSelectedQcVisitToDate = (e) => {
    const date = new Date(e);
    setQcVisitToDate(+date);
  };
  const setSelectedInspectDate = (e) => {
    const date = new Date(e);
    setInspectDate(date);
  };
  return (
    <Card>
      <CardHeader title="افزودن آیتم فرعی" sx={{ textAlign: "left" }} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <TextField
          value={info?.name}
          name={"name"}
          onChange={handleChange}
          label={"نام"}
          sx={{ mt: 2, width: "50%" }}
        />
        <JalaliDatePicker
          defaultValue={fromDate}
          onChange={setSelectedFromDate}
          name="requiredDate"
          label="از تاریخ"
          value={fromDate}
          sx={{ mt: 2, width: "50%" }}
        />
        <JalaliDatePicker
          defaultValue={toDate}
          onChange={setSelectedToDate}
          name="requiredDate"
          label="تا تاریخ"
          value={toDate}
          sx={{ mt: 2, width: "50%" }}
        />

        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>واحد</InputLabel>
          <Select
            value={info?.placeId}
            fullWidth={true}
            name={"placeId"}
            label="طبقه"
            onChange={handleChange}
          >
            {[].map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>آیتم اصلی</InputLabel>
          <Select
            value={info?.originalItemId}
            fullWidth={true}
            name={"originalItemId"}
            label="آیتم اصلی"
            onChange={handleChange}
          >
            {originalItems?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>پیمانکار</InputLabel>
          <Select
            value={info?.contractorUserId}
            fullWidth={true}
            name={"contractorUserId"}
            label="پیمانکار"
            onChange={handleChange}
          >
            {usersList?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {`${item?.firstName} ${item?.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <JalaliDatePicker
          defaultValue={contractorActivityDate}
          onChange={setSelectedContractorActivityDate}
          name="requiredDate"
          label="تاریخ فعالیت پیمانکار"
          value={contractorActivityDate}
          sx={{ mt: 2, width: "50%" }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={technicalApprove}
              onChange={() => setTechnicalApprove((prev) => !prev)}
              color="info"
            />
          }
          sx={{ mt: 2 }}
          label="تایید فنی"
        />
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>کاربر فنی</InputLabel>
          <Select
            value={info?.technicalUserId}
            fullWidth={true}
            name={"technicalUserId"}
            label="کاربر فنی"
            onChange={handleChange}
          >
            {usersList?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {`${item?.firstName} ${item?.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <JalaliDatePicker
          defaultValue={technicalActivityDate}
          onChange={setSelectedTechnicalActivityDate}
          name="requiredDate"
          label="تاریخ فعالیت کاربر فنی"
          value={technicalActivityDate}
          sx={{ mt: 2, width: "50%" }}
        />
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>کاربر کنترل کیفیت</InputLabel>
          <Select
            value={info?.qcUserId}
            fullWidth={true}
            name={"qcUserId"}
            label="کاربر کنترل کیفیت"
            onChange={handleChange}
          >
            {usersList?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {`${item?.firstName} ${item?.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <JalaliDatePicker
          defaultValue={qcActivityDate}
          onChange={setSelectedQcActivityDate}
          name="requiredDate"
          label="تاریخ فعالیت کنترل کیفیت"
          value={qcActivityDate}
          sx={{ mt: 2, width: "50%" }}
        />
        <JalaliDatePicker
          defaultValue={qcVisitFromDate}
          onChange={setSelectedQcVisitFromDate}
          name="requiredDate"
          label="تاریخ بازدید از "
          value={qcVisitFromDate}
          sx={{ mt: 2, width: "50%" }}
        />
        <JalaliDatePicker
          defaultValue={qcVisitToDate}
          onChange={setSelectedQcVisitToDate}
          name="requiredDate"
          label="تاریخ بازدید تا "
          value={qcVisitToDate}
          sx={{ mt: 2, width: "50%" }}
        />
        <JalaliDatePicker
          defaultValue={inspectDate}
          onChange={setSelectedInspectDate}
          name="requiredDate"
          label="تریخ بازرسی"
          value={inspectDate}
          sx={{ mt: 2, width: "50%" }}
        />
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          color="success"
          variant="contained"
          onClick={hanldeSubmit}
          loading={AddNewSubItem?.pending}
        >
          ثبت
        </LoadingButton>
        <Button
          color="error"
          variant="contained"
          onClick={() => navigate("/qc/subItems")}
          disabled={AddNewSubItem?.pending && AddNewSubItem?.pending}
        >
          انصراف
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddSubItemCOPY;
