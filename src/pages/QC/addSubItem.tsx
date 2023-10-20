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
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { GetAllProjects_Floor_Unit_UsabilityAction } from "../../redux/features/definitionSlicer";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
const AddSubItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { AddNewSubItem, originalItems, usabilities, checkLists, contractors } =
    useSelector((state: any) => state?.qc);
  const { allProjectsFloorUnitUsability } = useSelector(
    (state: any) => state?.definition
  );

  const [info, setInfo] = useState({
    name: "",
    originalItemId: undefined,
    usabilities: [],
    masterCheckListId: undefined,
    projectId: undefined,
    floorId: undefined,
    unitId: undefined,
    usabilityId: undefined,
    contractorId: undefined,
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

  useEffect(() => {
    getAllOriginalItems();
    getAllUsabilities();
    getAllChecklists();
    getAllProjects();
    getAllContractor();
  }, [
    getAllOriginalItems,
    getAllUsabilities,
    getAllChecklists,
    getAllProjects,
    getAllContractor,
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
        workingData: workingData
          .filter(
            (work) => work.contractorId && work.usabilityId && work.unitId
          )
          .map((work) => ({
            contractorId: work.contractorId,
            usabilityId: +work.usabilityId,
            unitId: +work.unitId,
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
    if (!info.unitId) {
      toast.error("واحد انتخاب نشده است");
      return;
    }
    if (!info.usabilityId) {
      toast.error("کاربری انتخاب نشده است");
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
      floorId: undefined,
      unitId: undefined,
      usabilityId: undefined,
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
        </div>
        {!!workingData.length && (
          <div className="mt-6 flex gap-6">
            {workingData.map((work, index) => (
              <div
                key={index}
                className="bg-slate-200 px-6 py-3 rounded-2xl text-xs"
              >
                {
                  allProjectsFloorUnitUsability.data
                    ?.find((project) => +project.id === +work.projectId)
                    ?.projectfloor?.find((floor) => +floor.id === +work.floorId)
                    ?.projectUnit?.find((unit) => +unit.id === +work.unitId)
                    ?.name
                }
                /
                {
                  allProjectsFloorUnitUsability.data
                    ?.find((project) => +project.id === +work.projectId)
                    ?.projectfloor?.find((floor) => +floor.id === +work.floorId)
                    ?.projectUnit?.find((unit) => +unit.id === +work.unitId)
                    ?.unitsUsability?.find(
                      (usa) => +usa.id === +work.usabilityId
                    )?.name
                }
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
                  >
                    {allProjectsFloorUnitUsability?.data
                      ?.find((project) => +project.id === info.projectId)
                      ?.projectfloor?.find((floor) => floor.id === info.floorId)
                      ?.projectUnit?.map((item) => (
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
                  >
                    {allProjectsFloorUnitUsability?.data
                      ?.find((project) => +project.id === info.projectId)
                      ?.projectfloor?.find((floor) => floor.id === info.floorId)
                      ?.projectUnit?.find((unit) => +unit.id === +info.unitId)
                      ?.unitsUsability?.map((item) => (
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
