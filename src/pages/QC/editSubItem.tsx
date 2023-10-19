import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
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
  GetSubItemsDataAction,
  UpdateSubItemAction,
} from "../../redux/features/qcSlicer";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import JalaliDatePicker from "../../components/date-picker/date-picker";
import { GetUsersListAction } from "../../redux/features/administrationSlicer";
import { GetAllProjects_Floor_Unit_UsabilityAction } from "../../redux/features/definitionSlicer";
import CloseIcon from "@mui/icons-material/Close";

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
    floorId: undefined,
    unitId: undefined,
    usabilityId: undefined,
    contractorId: undefined,
  });
  const [showAddNewWorkData, setShowAddNewWorkData] = useState<boolean>(false);
  const [workingData, setWorkingData] = useState([]);

  const getSubItem = useCallback(async () => {
    await dispatch(GetSubItemsDataAction({ selectedItemId: +id }));
  }, [dispatch]);
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
    getSubItem();
    getAllOriginalItems();
    getAllUsabilities();
    getAllChecklists();
    getAllProjects();
    getAllContractor();
  }, [
    getSubItem,
    getAllOriginalItems,
    getAllUsabilities,
    getAllChecklists,
    getAllProjects,
    getAllContractor,
  ]);

  useEffect(() => {
    if (selectedSubItem?.data) {
      setInfo({
        ...info,
        name: selectedSubItem?.data.name,
        originalItemId: selectedSubItem?.data.originalItemId,
        masterCheckListId: selectedSubItem?.data.masterCheckListId,
        usabilities: selectedSubItem?.data.usabilities || [],
      });
      setWorkingData(selectedSubItem?.data.workingDatas);
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
          workingData: workingData
            .filter(
              (work) => work.contractorId || work.usabilityId || work.unitId
            )
            .map((work) => ({
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
  const handleAddItem = () => {
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
      <CardHeader title="ویرایش آیتم فرعی" sx={{ textAlign: "left" }} />
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
        <FormControl sx={{ mt: 2, width: "50%" }}>
          <InputLabel>چک لیست اصلی</InputLabel>
          <Select
            value={info?.masterCheckListId}
            fullWidth={true}
            name={"masterCheckListId"}
            label="آیتم اصلی"
            onChange={handleChange}
          >
            {selectedSubItem?.data?.relatedCheckList?.map((item) => (
              <MenuItem value={item.id} key={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 2, width: "50%" }}>
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
            color="secondary"
            disabled={showAddNewWorkData}
            onClick={() => setShowAddNewWorkData(true)}
          >
            دیتای کاری جدید +
          </Button>

          {showAddNewWorkData && (
            <div className="w-2/3 grid grid-cols-2 gap-12">
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

              <Button
                variant="contained"
                className="col-span-full"
                onClick={handleAddItem}
              >
                اضافه کردن
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
