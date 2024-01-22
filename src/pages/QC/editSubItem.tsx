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
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewOriginalItemAction,
  AddNewSubItemAction,
  GetAllCheckListsAction,
  GetAllContractorAction,
  GetAllOriginalItemsAction,
  GetAllSubItemsAction,
  GetAllUsabilityAction,
  GetSubItemLevelsAction,
  GetSubItemsDataAction,
  UpdateSubItemAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllProjects_Floor_Unit_UsabilityAction } from "../../redux/features/definitionSlicer";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import AutoCompleteComponent from "../../components/AutoComplete/AutoCompleteComponent";

const EditSubItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {
    subItemsUpdateState,
    originalItems,
    selectedSubItem,
    usabilities,
    checkLists,
    contractors,
    subItemsLevel,
  } = useSelector((state: any) => state?.qc);
  const { allProjectsFloorUnitUsability } = useSelector(
    (state: any) => state?.definition
  );

  const [info, setInfo] = useState({
    name: "",
    originalItemId: 0,
    usabilities: [],
    masterCheckListId: undefined,
    projectId: undefined,
    floorId: [],
    unitId: [],
    usabilityId: [],
    contractorId: undefined,
    levelId: undefined,
  });
  const [showAddNewWorkData, setShowAddNewWorkData] = useState<boolean>(false);
  const [workingData, setWorkingData] = useState([]);
  const [oldWorkingData, setOldWorkingData] = useState([]);
  const getSubItem = useCallback(async () => {
    await dispatch(GetSubItemsDataAction({ selectedItemId: +id }));
  }, [dispatch, id]);
  const getAllOriginalItems = useCallback(async () => {
    await dispatch(GetAllOriginalItemsAction());
  }, [dispatch]);
  const getAllUsabilities = useCallback(async () => {
    await dispatch(GetAllUsabilityAction());
  }, [dispatch]);
  const getAllChecklists = useCallback(async () => {
    await dispatch(GetAllCheckListsAction());
  }, [dispatch]);
  const getAllProjects = useCallback(async () => {
    await dispatch(GetAllProjects_Floor_Unit_UsabilityAction());
  }, [dispatch]);
  const getAllContractor = useCallback(async () => {
    await dispatch(GetAllContractorAction());
  }, [dispatch]);
  const getAllSubItemsLevel = useCallback(async () => {
    await dispatch(GetSubItemLevelsAction());
  }, [dispatch]);

  useEffect(() => {
    getSubItem();
    getAllOriginalItems();
    getAllUsabilities();
    getAllChecklists();
    getAllProjects();
    getAllContractor();
    getAllSubItemsLevel();
  }, [
    getSubItem,
    getAllOriginalItems,
    getAllUsabilities,
    getAllChecklists,
    getAllProjects,
    getAllContractor,
    getAllSubItemsLevel,
  ]);

  useEffect(() => {
    if (selectedSubItem?.data) {
      setInfo({
        ...info,
        name: selectedSubItem?.data.name,
        originalItemId: selectedSubItem?.data.originalItemId,
        masterCheckListId: selectedSubItem?.data.masterCheckListId,
        usabilities: selectedSubItem?.data.usabilities || [],
        levelId: selectedSubItem?.data.levelId,
      });
      setOldWorkingData(selectedSubItem?.data.workingDatas);
    }
  }, [selectedSubItem]);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target?.name]: e.target?.value,
    });
  };
  const hanldeSubmit = async () => {
    await dispatch(
      UpdateSubItemAction({
        id: +id,
        data: {
          name: info.name,
          originalItemId: info.originalItemId,
          usabilities: info.usabilities,
          masterCheckListId: info.masterCheckListId,
          levelId: +info.levelId,
          removedWorkingData: selectedSubItem?.data?.workingDatas
            .filter(
              (work) =>
                !oldWorkingData.map((oWork) => oWork.id).includes(work.id)
            )
            ?.map((work) => work.id),
          newWorkingData: workingData
            .filter(
              (work) =>
                work.contractorId && work.projectId && !!work.floorId.length
            )
            .map((work) => ({
              projectId: work.projectId,
              floorId: work.floorId,
              contractorId: work.contractorId,
              usabilityId: work.usabilityId,
              unitId: work.unitId,
            })),
        },
      })
    );
    await getSubItem();
  };
  const handleDeleteItem = (id) => {
    setWorkingData((prev) => prev.filter((p) => +p.id !== +id));
  };
  const handleDeleteOldItem = (id) => {
    setOldWorkingData((prev) => prev.filter((p) => +p.id !== +id));
  };
  const handleAddItem = () => {
    if (!info.projectId) {
      toast.error("پروژه انتخاب نشده است");
      return;
    }
    if (!info.floorId) {
      toast.error("طبقه انتخاب نشده است");
      return;
    }
    if (!info.contractorId) {
      toast.error("پیمانکار انتخاب نشده است");
      return;
    }
    setWorkingData((prev) => [
      ...prev,
      {
        id: prev.length,
        projectId: info.projectId,
        floorId: info.floorId,
        contractorId: info?.contractorId,
        usabilityId: info?.usabilityId,
        unitId: info?.unitId,
      },
    ]);
    setInfo((prev) => ({
      ...prev,
      projectId: undefined,
      floorId: [],
      unitId: [],
      usabilityId: [],
      contractorId: undefined,
    }));
    setShowAddNewWorkData(false);
  };
  return (
    <Card>
      <CardHeader title="ویرایش آیتم فرعی" sx={{ textAlign: "left" }} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div className="grid grid-cols-2 gap-9">
          <TextField
            value={info?.name}
            name={"name"}
            onChange={handleChange}
            label={"نام"}
          />
          <FormControl>
            <AutoCompleteComponent
              options={originalItems?.data}
              id="originalItemId"
              label="آیتم اصلی"
              changeHandler={(value) => {
                setInfo((prev) => ({ ...prev, originalItemId: value }));
              }}
              value={info?.originalItemId}
            />
          </FormControl>
          <FormControl>
            <AutoCompleteComponent
              options={checkLists?.data}
              id="masterCheckListId"
              label="چک لیست اصلی"
              changeHandler={(value) => {
                setInfo((prev) => ({ ...prev, masterCheckListId: value }));
              }}
              value={info?.masterCheckListId}
            />
          </FormControl>
          <FormControl>
            <AutoCompleteComponent
              options={usabilities?.data}
              id="usabilities"
              label="کاربری"
              changeHandler={(value) => {
                setInfo((prev) => ({ ...prev, usabilities: value }));
              }}
              value={info?.usabilities || []}
              dataLabel="usablityName"
              multiple={true}
            />
          </FormControl>
          <FormControl>
            <InputLabel>سطح آیتم فرعی</InputLabel>
            <Select
              value={info?.levelId}
              fullWidth={true}
              name={"levelId"}
              label="کاربری"
              onChange={handleChange}
            >
              {subItemsLevel?.data?.map((item) => (
                <MenuItem value={item.id} key={item?.id}>
                  {item?.levelName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="mt-10 w-full flex flex-col items-start gap-8">
          <Button
            variant="outlined"
            color="secondary"
            disabled={showAddNewWorkData}
            onClick={() => setShowAddNewWorkData(true)}
          >
            دیتای کاری جدید +
          </Button>

          {showAddNewWorkData && (
            <div className="w-full flex flex-col gap-6">
              <div className="flex gap-12">
                <FormControl className="w-full">
                  <AutoCompleteComponent
                    options={allProjectsFloorUnitUsability?.data}
                    id="projectId"
                    label="پروژه"
                    changeHandler={(value) => {
                      setInfo((prev) => ({ ...prev, projectId: value }));
                    }}
                    value={info?.projectId}
                  />
                </FormControl>
                <FormControl className="w-full">
                  <AutoCompleteComponent
                    options={
                      allProjectsFloorUnitUsability?.data?.find(
                        (project) => +project.id === +info?.projectId
                      )?.projectfloor
                    }
                    id="floorId"
                    label="طبقه"
                    changeHandler={(value) => {
                      setInfo((prev) => ({ ...prev, floorId: value }));
                    }}
                    value={info?.floorId || []}
                    multiple={true}
                  />
                </FormControl>
                <FormControl className="w-full">
                  <AutoCompleteComponent
                    options={allProjectsFloorUnitUsability?.data
                      ?.find((project) => +project.id === +info.projectId)
                      ?.projectfloor?.filter((floor) =>
                        info.floorId.includes(floor.id)
                      )
                      .flatMap((floor) => floor?.projectUnit)}
                    id="unitId"
                    label="واحد"
                    changeHandler={(value) => {
                      setInfo((prev) => ({ ...prev, unitId: value }));
                    }}
                    value={info?.unitId || []}
                    multiple={true}
                  />
                </FormControl>
                <FormControl className="w-full">
                  <AutoCompleteComponent
                    options={allProjectsFloorUnitUsability?.data
                      ?.find((project) => +project.id === +info.projectId)
                      ?.projectfloor?.filter((floor) =>
                        info.floorId.includes(floor.id)
                      )
                      .flatMap((floor) => floor?.projectUnit)
                      .filter((unit) => info.unitId.includes(unit.id))
                      ?.flatMap((unit) => unit.unitsUsability)}
                    id="usabilityId"
                    label="کاربری"
                    changeHandler={(value) => {
                      setInfo((prev) => ({ ...prev, usabilityId: value }));
                    }}
                    value={info?.usabilityId || []}
                    multiple={true}
                  />
                </FormControl>
                <FormControl className="w-full">
                  <AutoCompleteComponent
                    options={contractors?.data}
                    id="contractorId"
                    label="پیمانکار"
                    changeHandler={(value) => {
                      setInfo((prev) => ({ ...prev, contractorId: value }));
                    }}
                    value={info?.contractorId}
                    dataLabel="fullName"
                  />
                </FormControl>
              </div>
              <Button
                variant="contained"
                className="self-start"
                onClick={handleAddItem}
              >
                <span className="text-xl">+</span>
              </Button>
            </div>
          )}
        </div>
        {!!oldWorkingData.length && (
          <div className="mt-6 grid gap-6 grid-cols-6 max-h-96 overflow-y-scroll">
            {oldWorkingData.map((work, index) => (
              <div
                key={index}
                className="bg-slate-200 px-6 py-3 rounded-2xl text-xs"
              >
                {
                  allProjectsFloorUnitUsability.data?.find(
                    (project) => +project.id === +work.projectId
                  )?.name
                }
                /
                {
                  allProjectsFloorUnitUsability.data
                    ?.find((project) => +project.id === +work.projectId)
                    ?.projectfloor?.find((floor) => +floor.id === +work.floorId)
                    .name
                }
                /
                {
                  allProjectsFloorUnitUsability.data
                    ?.find((project) => +project.id === +work.projectId)
                    ?.projectfloor?.find((floor) => +floor.id === +work.floorId)
                    .projectUnit?.find((unit) => +work.unitId === +unit.id)
                    ?.name
                }
                /
                {
                  allProjectsFloorUnitUsability.data
                    ?.find((project) => +project.id === +work.projectId)
                    ?.projectfloor?.find((floor) => +floor.id === +work.floorId)
                    ?.projectUnit?.find((unit) => +work.unitId === +unit.id)
                    ?.unitsUsability?.find(
                      (usa) => +work.usabilityId === +usa.id
                    )?.name
                }
                /
                {
                  contractors.data?.find((cont) => cont.id == work.contractorId)
                    ?.fullName
                }
                <IconButton onClick={() => handleDeleteOldItem(work.id)}>
                  <CloseIcon color="error" />
                </IconButton>
              </div>
            ))}
            {workingData.map((work, index) => (
              <div
                key={index}
                className="bg-slate-200 px-6 py-3 rounded-2xl text-xs"
              >
                {
                  allProjectsFloorUnitUsability.data?.find(
                    (project) => +project.id === +work.projectId
                  )?.name
                }
                /
                {allProjectsFloorUnitUsability.data
                  ?.find((project) => +project.id === +work.projectId)
                  ?.projectfloor?.filter((floor) =>
                    work.floorId?.includes(floor.id)
                  )
                  ?.map((floor) => floor.name)
                  .join(",")}
                /
                {allProjectsFloorUnitUsability.data
                  ?.find((project) => +project.id === +work.projectId)
                  ?.projectfloor?.filter((floor) =>
                    work.floorId.includes(floor.id)
                  )
                  .flatMap((floor) => floor.projectUnit)
                  ?.filter((unit) => work.unitId.includes(unit.id))
                  .map((unit) => unit.name)
                  ?.join(",")}
                /
                {allProjectsFloorUnitUsability.data
                  ?.find((project) => +project.id === +work.projectId)
                  ?.projectfloor?.filter((floor) =>
                    work.floorId.includes(floor.id)
                  )
                  .flatMap((floor) => floor.projectUnit)
                  ?.filter((unit) => work.unitId.includes(unit.id))
                  ?.flatMap((unit) => unit.unitsUsability)
                  ?.filter((usa) => work.usabilityId.includes(usa.id))
                  ?.map((usa) => usa.name)
                  ?.join(",")}
                /
                {
                  contractors.data?.find((cont) => cont.id == work.contractorId)
                    ?.fullName
                }
                <IconButton onClick={() => handleDeleteItem(work.id)}>
                  <CloseIcon color="error" />
                </IconButton>
              </div>
            ))}
          </div>
        )}
        {!!workingData.length && <div className="mt-6 flex gap-6"></div>}
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          color="success"
          variant="contained"
          onClick={hanldeSubmit}
          loading={subItemsUpdateState?.pending}
        >
          ثبت
        </LoadingButton>
        <Button
          color="error"
          variant="contained"
          onClick={() => navigate("/qc/subItems")}
          disabled={
            subItemsUpdateState?.pending && subItemsUpdateState?.pending
          }
        >
          انصراف
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditSubItem;
