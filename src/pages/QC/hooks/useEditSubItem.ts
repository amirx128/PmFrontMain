import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GetAllCheckListsAction,
  GetAllContractorAction,
  GetAllOriginalItemsAction,
  GetAllUsabilityAction,
  GetSubItemLevelsAction,
  GetSubItemsDataAction,
  UpdateSubItemAction,
} from '../../../redux/features/qcSlicer';
import { GetAllProjects_Floor_Unit_UsabilityAction } from '../../../redux/features/definitionSlicer';
import { toast } from 'react-toastify';

const useEditSubItem = () => {
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
    name: '',
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
      toast.error('پروژه انتخاب نشده است');
      return;
    }
    if (!info.floorId) {
      toast.error('طبقه انتخاب نشده است');
      return;
    }
    if (!info.contractorId) {
      toast.error('پیمانکار انتخاب نشده است');
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
  return {
    info,
    handleChange,
    originalItems,
    setInfo,
    checkLists,
    usabilities,
    subItemsLevel,
    showAddNewWorkData,
    setShowAddNewWorkData,
    allProjectsFloorUnitUsability,
    contractors,
    handleAddItem,
    oldWorkingData,
    handleDeleteOldItem,
    workingData,
    handleDeleteItem,
    hanldeSubmit,
    subItemsUpdateState,
    navigate,
  };
};

export default useEditSubItem;
