import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewCheckListAction,
  GetAllContractorAction,
  GetAllOriginalItemsAction,
  GetAllSubItemsAction,
  GetManyOrginalItemSubItemsAction,
  GetManySubItemsCheckListsAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import {
  GetManyFloorUnitAction,
  GetManyUnitUsabilityAction,
  getAllProjects,
} from "../../redux/features/definitionSlicer";
const AddCheckListInstance = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {
    checkListAddState,
    originalItems,
    manySubItemsCheckLists,
    manyOriginalItemsSubItems,
    contractors,
  } = useSelector((state: any) => state?.qc);
  const { projects, manyFloorUnit, manyUnitUsability } = useSelector(
    (state: any) => state?.definition
  );
  const [info, setInfo] = useState({
    relatedProject: "",
    relatedFloor: [],
    relatedUnits: [],
    relatedUsability: [],
    relatedOrginalItems: [],
    relatedSubItems: [],
    relatedCheckLists: [],
    contractorUserId: "",
  });

  useEffect(() => {
    getAllDependency();
  }, []);

  useEffect(() => {
    if (info.relatedFloor.length) {
      dispatch(GetManyFloorUnitAction({ ids: info.relatedFloor }));
    }
  }, [info?.relatedFloor]);
  useEffect(() => {
    if (info.relatedUnits.length) {
      dispatch(GetManyUnitUsabilityAction({ ids: info.relatedUnits }));
    }
  }, [info?.relatedUnits]);
  useEffect(() => {
    if (info.relatedOrginalItems.length) {
      dispatch(
        GetManyOrginalItemSubItemsAction({ ids: info.relatedOrginalItems })
      );
    }
  }, [info?.relatedOrginalItems]);
  useEffect(() => {
    if (info.relatedSubItems.length) {
      dispatch(GetManySubItemsCheckListsAction({ ids: info.relatedSubItems }));
    }
  }, [info?.relatedSubItems]);

  const getAllDependency = async () => {
    await dispatch(getAllProjects());
    await dispatch(GetAllOriginalItemsAction());
    await dispatch(GetAllContractorAction());
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };
  const hanldeSubmit = async () => {
    // await dispatch(
    //   AddNewCheckListAction({
    //     name: info.name,
    //     subItemId: +info.subItemId,
    //     items: items.map((item) => ({ itemName: item.itemName })),
    //   })
    // );
  };
  console.log(originalItems);
  return (
    <Card>
      <CardHeader title="پر کردن چک لیست " sx={{ textAlign: "left" }} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>پروژه</InputLabel>
          <Select
            value={info?.relatedProject}
            fullWidth={true}
            name={"relatedProject"}
            label="پروژه"
            onChange={handleChange}
          >
            {projects?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>طبقه</InputLabel>
          <Select
            value={info?.relatedFloor}
            fullWidth={true}
            name={"relatedFloor"}
            label="طبقه"
            onChange={handleChange}
            multiple
          >
            {projects?.data
              ?.find((project) => +project.id === +info?.relatedProject)
              ?.projectfloor?.map((item) => (
                <MenuItem value={item.id} key={item?.id}>
                  {item?.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>واحد</InputLabel>
          <Select
            value={info?.relatedUnits}
            fullWidth={true}
            name={"relatedUnits"}
            label="واحد"
            onChange={handleChange}
            multiple
          >
            {manyFloorUnit?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>کاربری</InputLabel>
          <Select
            value={info?.relatedUsability}
            fullWidth={true}
            name={"relatedUsability"}
            label="کاربری"
            onChange={handleChange}
            multiple
          >
            {manyUnitUsability?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>آیتم اصلی</InputLabel>
          <Select
            value={info?.relatedOrginalItems}
            fullWidth={true}
            name={"relatedOrginalItems"}
            label="آیتم اصلی"
            onChange={handleChange}
            multiple
          >
            {originalItems?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>آیتم فرعی</InputLabel>
          <Select
            value={info?.relatedSubItems}
            fullWidth={true}
            name={"relatedSubItems"}
            label="آیتم فرعی"
            onChange={handleChange}
            multiple
          >
            {manyOriginalItemsSubItems?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>چک لیست</InputLabel>
          <Select
            value={info?.relatedCheckLists}
            fullWidth={true}
            name={"relatedCheckLists"}
            label="چک لیست"
            onChange={handleChange}
            multiple
          >
            {manySubItemsCheckLists?.data?.map((item) => (
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
            {contractors?.data?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.fullName}
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
          loading={checkListAddState?.pending}
        >
          ثبت
        </LoadingButton>
        <Button
          color="error"
          variant="contained"
          onClick={() => navigate("/qc/checkLists")}
          disabled={checkListAddState.pending && checkListAddState?.pending}
        >
          انصراف
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddCheckListInstance;
