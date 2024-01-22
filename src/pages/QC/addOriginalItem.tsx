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
  AddNewOriginalItemAction,
  GetAllSubItemsAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import AutoCompleteComponent from "../../components/AutoComplete/AutoCompleteComponent";
const AddOriginalItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { subItems, originalItemsAddState } = useSelector(
    (state: any) => state?.qc
  );
  const [info, setInfo] = useState({
    name: "",
    subItemsIds: [],
  });

  useEffect(() => {
    getSubItems();
  }, []);

  const getSubItems = async () => {
    await dispatch(GetAllSubItemsAction());
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };
  const hanldeSubmit = async () => {
    await dispatch(
      AddNewOriginalItemAction({
        name: info.name,
        subItemsIds: info.subItemsIds,
      })
    );
  };
  return (
    <Card>
      <CardHeader title="افزودن آیتم اصلی" sx={{ textAlign: "left" }} />
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
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <AutoCompleteComponent
            options={subItems?.data}
            id="subItemsIds"
            label="آیتم فرعی"
            changeHandler={(value) => {
              setInfo((prev) => ({ ...prev, subItemsIds: value }));
            }}
            value={info?.subItemsIds || []}
            multiple={true}
          />
        </FormControl>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          color="success"
          variant="contained"
          onClick={hanldeSubmit}
          loading={originalItemsAddState?.pending}
        >
          ثبت
        </LoadingButton>
        <Button
          color="error"
          variant="contained"
          onClick={() => navigate("/qc/originalItems")}
          disabled={
            originalItemsAddState.pending && originalItemsAddState?.pending
          }
        >
          انصراف
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddOriginalItem;
