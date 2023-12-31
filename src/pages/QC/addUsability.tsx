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
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { getAllUnits } from "../../redux/features/definitionSlicer";
import AutoCompleteComponent from "../../components/AutoComplete/AutoCompleteComponent";
const AddUsability = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { usabilityAddState } = useSelector((state: any) => state?.qc);
  const { units } = useSelector((state: any) => state.definition);
  const [info, setInfo] = useState({
    usablityName: "",
    units: [],
    code: "",
  });

  useEffect(() => {
    getUnits();
  }, []);

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
      AddNewUsabilityAction({
        usabilityName: info.usablityName,
        units: info.units,
        code: info.code,
      })
    );
  };
  return (
    <Card>
      <CardHeader title="افزودن کاربری" sx={{ textAlign: "left" }} />
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
          loading={usabilityAddState?.pending}
        >
          ثبت
        </LoadingButton>
        <Button
          color="error"
          variant="contained"
          onClick={() => navigate("/qc/defineUsability")}
          disabled={usabilityAddState.pending && usabilityAddState?.pending}
        >
          انصراف
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddUsability;
