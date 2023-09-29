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
  GetOriginalItemsDataAction,
  UpdateOriginalItemAction,
} from "../../redux/features/qcSlicer";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
const EditOriginalItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  const { subItems, originalItemsUpdateState, selectedOriginalItem } =
    useSelector((state: any) => state?.qc);

  const [info, setInfo] = useState({
    name: "",
    subItemsIds: [],
  });

  useEffect(() => {
    getOriginalItemData();
    getSubItems();
  }, []);
  useEffect(() => {
    if (selectedOriginalItem?.data) {
      setInfo({
        name: selectedOriginalItem?.data?.name,
        subItemsIds: selectedOriginalItem?.data?.subItems?.map(
          (subItem) => subItem.id
        ),
      });
    }
  }, [selectedOriginalItem]);

  const getSubItems = async () => {
    await dispatch(GetAllSubItemsAction());
  };
  const getOriginalItemData = async () => {
    await dispatch(GetOriginalItemsDataAction({ selectedItemId: +id }));
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };
  const hanldeSubmit = async () => {
    await dispatch(
      UpdateOriginalItemAction({
        id: +id,
        name: info.name,
        subItemsIds: info.subItemsIds,
      })
    );
    await getOriginalItemData();
  };
  return (
    <Card>
      <CardHeader title="ویرایش آیتم اصلی" sx={{ textAlign: "left" }} />
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
          <InputLabel>آیتم فرعی</InputLabel>
          <Select
            multiple
            value={info?.subItemsIds}
            fullWidth={true}
            name={"subItemsIds"}
            label="آیتم فرعی"
            onChange={handleChange}
          >
            {subItems?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          color="success"
          variant="contained"
          onClick={hanldeSubmit}
          loading={originalItemsUpdateState?.pending}
        >
          ثبت
        </LoadingButton>
        <Button
          color="error"
          variant="contained"
          onClick={() => navigate("/qc/originalItems")}
          disabled={
            originalItemsUpdateState.pending &&
            originalItemsUpdateState?.pending
          }
        >
          انصراف
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditOriginalItem;
