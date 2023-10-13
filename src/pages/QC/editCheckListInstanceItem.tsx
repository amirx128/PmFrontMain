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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCheckListInstancesAction,
  GetAllContractorAction,
  GetAllOrginal_SubItem_ChechListsAction,
  GetOneInstanceDataAction,
  UpdateQcInstanceAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllProjects_Floor_Unit_UsabilityAction } from "../../redux/features/definitionSlicer";
const EditCheckListInstance = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  const {
    checkListAddState,
    contractors,
    allOrginalSubItemChechLists,
    selectedCheckListInstance,
  } = useSelector((state: any) => state?.qc);
  const { allProjectsFloorUnitUsability } = useSelector(
    (state: any) => state?.definition
  );
  const [info, setInfo] = useState({
    relatedProject: "",
    relatedFloor: "",
    relatedUnits: "",
    relatedUsability: "",
    relatedOrginalItems: "",
    relatedSubItems: "",
    relatedCheckLists: [],
    contractorUserId: "",
  });

  useEffect(() => {
    getAllDependency();
  }, []);
  useEffect(() => {
    if (selectedCheckListInstance?.data) {
      const {
        instanceId,
        relatedOriginalItems,
        contractorUserId,
        relatedSubItems,
        relatedUsability,
        relatedProjects,
        relatedFloor,
        relatedUnits,
        relatedCheckListIds,
      } = selectedCheckListInstance.data;
      setInfo({
        relatedProject: relatedProjects,
        relatedFloor,
        relatedUnits,
        relatedUsability,
        relatedOrginalItems: relatedOriginalItems,
        relatedSubItems,
        relatedCheckLists: relatedCheckListIds,
        contractorUserId,
      });
    }
  }, [selectedCheckListInstance]);
  const getAllDependency = async () => {
    await dispatch(GetOneInstanceDataAction({ selectedId: +id }));
    await dispatch(GetAllProjects_Floor_Unit_UsabilityAction());
    await dispatch(GetAllOrginal_SubItem_ChechListsAction());
    await dispatch(GetAllContractorAction());
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };
  const hanldeSubmit = async () => {
    await dispatch(
      UpdateQcInstanceAction({
        contractorUserId: info.contractorUserId,
        instanceId: +id,
        relatedProjects: +info.relatedProject,
        relatedFloor: +info.relatedFloor,
        relatedUnits: +info.relatedUnits,
        relatedUsability: +info.relatedUsability,
        relatedSubItems: +info.relatedSubItems,
        relatedCheckLists: info.relatedCheckLists,
        relatedOriginalItems: +info.relatedOrginalItems,
      })
    );
  };

  return (
    <Card>
      <CardHeader title="ویرایش کردن چک لیست " sx={{ textAlign: "left" }} />
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
            {allProjectsFloorUnitUsability?.data?.map((item) => (
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
          >
            {allProjectsFloorUnitUsability?.data
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
          >
            {allProjectsFloorUnitUsability?.data
              ?.find((project) => +project.id === +info.relatedProject)
              ?.projectfloor?.find((floor) => +info.relatedFloor === +floor.id)
              ?.projectUnit.map((item) => (
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
          >
            {allProjectsFloorUnitUsability?.data
              ?.find((project) => +project.id === +info.relatedProject)
              ?.projectfloor?.find((floor) => +info.relatedFloor === +floor.id)
              ?.projectUnit.find((unit) => +info.relatedUnits === +unit.id)
              ?.unitsUsability.map((item) => (
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
          >
            {allOrginalSubItemChechLists?.data?.map((item) => (
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
          >
            {allOrginalSubItemChechLists?.data
              ?.find((original) => +info.relatedOrginalItems === +original.id)
              ?.subItems.map((item) => (
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
            {allOrginalSubItemChechLists?.data
              ?.find((original) => +info.relatedOrginalItems === +original.id)
              ?.subItems.find(
                (subItem) => +info.relatedSubItems === +subItem.id
              )
              ?.checkLists.map((item) => (
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

export default EditCheckListInstance;
