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
  AddNewSubItemAction,
  GetAllCheckListsAction,
  GetAllContractorAction,
  GetAllOriginalItemsAction,
  GetAllUsabilityAction,
  GetSubItemLevelsAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { GetAllProjects_Floor_Unit_UsabilityAction } from "../../redux/features/definitionSlicer";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
const AddSubItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {
    AddNewSubItem,
    originalItems,
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
    originalItemId: undefined,
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
    getAllOriginalItems();
    getAllUsabilities();
    getAllChecklists();
    getAllProjects();
    getAllContractor();
    getAllSubItemsLevel();
  }, [
    getAllOriginalItems,
    getAllUsabilities,
    getAllChecklists,
    getAllProjects,
    getAllContractor,
    getAllSubItemsLevel,
  ]);

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
        originalItemId: +info.originalItemId,
        usabilities: info.usabilities,
        masterCheckListId: +info.masterCheckListId,
        levelId: +info.levelId,
        workingData: workingData
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
      })
    );
  };
  const handleDeleteItem = (id) => {
    setWorkingData((prev) => prev.filter((p) => +p.id !== +id));
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
      <CardHeader title="افزودن آیتم فرعی" sx={{ textAlign: "left" }} />
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
          <FormControl>
            <InputLabel>چک لیست اصلی</InputLabel>
            <Select
              value={info?.masterCheckListId}
              fullWidth={true}
              name={"masterCheckListId"}
              label="آیتم اصلی"
              onChange={handleChange}
            >
              {checkLists?.data?.map((item) => (
                <MenuItem value={item.id} key={item?.id}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>کاربری</InputLabel>
            <Select
              value={info?.usabilities}
              fullWidth={true}
              name={"usabilities"}
              label="کاربری"
              onChange={handleChange}
              multiple
            >
              {usabilities?.data?.map((item) => (
                <MenuItem value={item.id} key={item?.id}>
                  {item?.usablityName}
                </MenuItem>
              ))}
            </Select>
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
            color="success"
            disabled={showAddNewWorkData}
            onClick={() => setShowAddNewWorkData(true)}
          >
            اضافه کردن دیتای جدید
          </Button>

          {showAddNewWorkData && (
            <div className="w-full flex flex-col gap-6">
              <div className="flex gap-12">
                <FormControl className="w-full">
                  <InputLabel>پروژه</InputLabel>
                  <Select
                    value={info?.projectId}
                    fullWidth={true}
                    name={"projectId"}
                    label="آیتم اصلی"
                    onChange={handleChange}
                  >
                    {allProjectsFloorUnitUsability?.data?.map((item) => (
                      <MenuItem value={item.id} key={item?.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="w-full">
                  <InputLabel>طبقه</InputLabel>
                  <Select
                    value={info?.floorId}
                    fullWidth={true}
                    name={"floorId"}
                    label="آیتم اصلی"
                    onChange={handleChange}
                    multiple
                  >
                    {allProjectsFloorUnitUsability?.data
                      ?.find((project) => +project.id === info.projectId)
                      ?.projectfloor?.map((item) => (
                        <MenuItem value={item.id} key={item?.id}>
                          {item?.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl className="w-full">
                  <InputLabel>واحد</InputLabel>
                  <Select
                    value={info?.unitId}
                    fullWidth={true}
                    name={"unitId"}
                    label="آیتم اصلی"
                    onChange={handleChange}
                    multiple
                  >
                    {allProjectsFloorUnitUsability?.data
                      ?.find((project) => +project.id === info.projectId)
                      ?.projectfloor?.filter((floor) =>
                        info.floorId?.includes(floor.id)
                      )
                      ?.flatMap((floor) => floor.projectUnit)
                      ?.map((item) => (
                        <MenuItem value={item.id} key={item?.id}>
                          {item?.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl className="w-full">
                  <InputLabel>کاربری</InputLabel>
                  <Select
                    value={info?.usabilityId}
                    fullWidth={true}
                    name={"usabilityId"}
                    label="آیتم اصلی"
                    onChange={handleChange}
                    multiple
                  >
                    {allProjectsFloorUnitUsability?.data
                      ?.find((project) => +project.id === info.projectId)
                      ?.projectfloor?.filter((floor) =>
                        info.floorId?.includes(floor.id)
                      )
                      ?.flatMap((floor) => floor.projectUnit)
                      ?.filter((unit) => info.unitId.includes(unit.id))
                      ?.flatMap((unit) => unit.unitsUsability)
                      ?.map((item) => (
                        <MenuItem value={item.id} key={item?.id}>
                          {item?.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl className="w-full">
                  <InputLabel>پیمانکار</InputLabel>
                  <Select
                    value={info?.contractorId}
                    fullWidth={true}
                    name={"contractorId"}
                    label="آیتم اصلی"
                    onChange={handleChange}
                  >
                    {contractors?.data?.map((item) => (
                      <MenuItem value={item.id} key={item?.id}>
                        {item?.fullName}
                      </MenuItem>
                    ))}
                  </Select>
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
        {!!workingData.length && (
          <div className="mt-6 grid gap-6 grid-cols-6 max-h-96 overflow-y-scroll">
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
                    work.floorId.includes(floor.id)
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

export default AddSubItem;
