import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewUsabilityAction,
  GetAllSubItemsAction,
  GetAllUsabilityAction,
  GetUsabilityDataAction,
  UpdateUsabilityAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUnits } from "../../redux/features/definitionSlicer";
import AutoCompleteComponent from "../../components/AutoComplete/AutoCompleteComponent";
const EditUsability = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { usabilityUpdateState, selectedUsability } = useSelector(
    (state: any) => state?.qc
  );
  const { units } = useSelector((state: any) => state.definition);
  const [info, setInfo] = useState({
    usablityName: "",
    units: [],
    code: "",
  });

  useEffect(() => {
    getList();
    getUnits();
  }, []);

  useEffect(() => {
    if (selectedUsability.data) {
      setInfo({
        usablityName: selectedUsability.data.usablityName,
        code: selectedUsability.data.code,
        units: selectedUsability.data.units.map((unit) => unit.id),
      });
      selectedUsability.data;
    }
  }, [selectedUsability]);
  const getList = async () => {
    await dispatch(GetUsabilityDataAction({ selectedItemId: +id }));
  };
  const getUnits = async () => {
    dispatch(getAllUnits({ projectId: 0, floorId: 0 }));
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };
  const hanldeSubmit = async () => {
    await dispatch(
      UpdateUsabilityAction({
        id: +id,
        usabilityName: info.usablityName,
        units: info.units,
        code: info.code,
      })
    );
  };
  return (
    <Card>
      <CardHeader title="ویرایش کاربری" sx={{ textAlign: "left" }} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <TextField
          value={info?.usablityName}
          name={"usablityName"}
          onChange={handleChange}
          label={"نام"}
          sx={{ mt: 2, width: "50%" }}
        />
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <AutoCompleteComponent
            options={units?.data}
            id="units"
            label="واحد"
            changeHandler={(value) => {
              setInfo((prev) => ({ ...prev, units: value }));
            }}
            value={info?.units}
          />
        </FormControl>
        <TextField
          value={info?.code}
          name={"code"}
          onChange={handleChange}
          label={"کد"}
          sx={{ mt: 2, width: "50%" }}
        />
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          color="success"
          variant="contained"
          onClick={hanldeSubmit}
          loading={usabilityUpdateState?.pending}
        >
          ثبت
        </LoadingButton>
        <Button
          color="error"
          variant="contained"
          onClick={() => navigate("/qc/defineUsability")}
          disabled={
            usabilityUpdateState.pending && usabilityUpdateState?.pending
          }
        >
          انصراف
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditUsability;
