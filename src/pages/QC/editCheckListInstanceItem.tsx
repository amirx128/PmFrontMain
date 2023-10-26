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
import AutoCompleteComponent from "../../components/AutoComplete/AutoCompleteComponent";
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
          <AutoCompleteComponent
            sx={{ mt: 2 }}
            options={allProjectsFloorUnitUsability?.data}
            id="relatedProject"
            label="پروژه"
            changeHandler={(value) => {
              setInfo((prev) => ({ ...prev, relatedProject: value }));
            }}
            value={info?.relatedProject}
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <AutoCompleteComponent
            options={
              allProjectsFloorUnitUsability?.data?.find(
                (project) => +project.id === +info?.relatedProject
              )?.projectfloor
            }
            id="relatedFloor"
            label="طبقه"
            changeHandler={(value) => {
              setInfo((prev) => ({ ...prev, relatedFloor: value }));
            }}
            value={info?.relatedFloor || []}
            multiple={true}
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <AutoCompleteComponent
            options={allProjectsFloorUnitUsability?.data
              ?.find((project) => +project.id === +info.relatedProject)
              ?.projectfloor?.filter((floor) =>
                info.relatedFloor.includes(floor.id)
              )
              .flatMap((floor) => floor?.projectUnit)}
            id="relatedUnits"
            label="واحد"
            changeHandler={(value) => {
              setInfo((prev) => ({ ...prev, relatedUnits: value }));
            }}
            value={info?.relatedUnits || []}
            multiple={true}
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <AutoCompleteComponent
            options={allProjectsFloorUnitUsability?.data
              ?.find((project) => +project.id === +info.relatedProject)
              ?.projectfloor?.filter((floor) =>
                info.relatedFloor.includes(floor.id)
              )
              .flatMap((floor) => floor?.projectUnit)
              .filter((unit) => info.relatedUnits.includes(unit.id))
              ?.flatMap((unit) => unit.unitsUsability)}
            id="relatedUsability"
            label="کاربری"
            changeHandler={(value) => {
              setInfo((prev) => ({ ...prev, relatedUsability: value }));
            }}
            value={info?.relatedUsability || []}
            multiple={true}
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <AutoCompleteComponent
            options={allOrginalSubItemChechLists?.data}
            id="relatedOrginalItems"
            label="آیتم اصلی"
            changeHandler={(value) => {
              setInfo((prev) => ({ ...prev, relatedOrginalItems: value }));
            }}
            value={info?.relatedOrginalItems || []}
            multiple={true}
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <AutoCompleteComponent
            options={allOrginalSubItemChechLists?.data
              ?.filter((original) =>
                info.relatedOrginalItems.includes(original.id)
              )
              .flatMap((original) => original.subItems)}
            id="relatedSubItems"
            label="آیتم فرعی"
            changeHandler={(value) => {
              setInfo((prev) => ({ ...prev, relatedSubItems: value }));
            }}
            value={info?.relatedSubItems || []}
            multiple={true}
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <AutoCompleteComponent
            options={allOrginalSubItemChechLists?.data
              ?.filter((original) =>
                info.relatedOrginalItems.includes(original.id)
              )
              .flatMap((original) => original.subItems)
              .filter((subItem) => info.relatedSubItems.includes(subItem.id))
              .flatMap((subItem) => subItem.checkLists)}
            id="relatedCheckLists"
            label="چک لیست"
            changeHandler={(value) => {
              setInfo((prev) => ({ ...prev, relatedCheckLists: value }));
            }}
            value={info?.relatedCheckLists || []}
            multiple={true}
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <AutoCompleteComponent
            options={contractors?.data || []}
            id="contractorUserId"
            label="پیمانکار"
            changeHandler={(value) => {
              setInfo((prev) => ({ ...prev, contractorUserId: value }));
            }}
            value={info?.contractorUserId}
            dataLabel="fullName"
          />
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
