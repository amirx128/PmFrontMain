import axiosInstance from "../../utils/axios.config.ts";

export const GetAllOriginalItems = async (userId) =>
  await axiosInstance.post(`/QC/GetAllOriginalItems`, {
    userId,
  });
export const GetOriginalItemsData = async (userId, selectedItemId) =>
  await axiosInstance.post(`/QC/GetOriginalItemsData`, {
    userId,
    selectedItemId,
  });
export const AddNewOriginalItem = async (userId, name, subItemsIds) =>
  await axiosInstance.post(`/QC/AddNewOriginalItem`, {
    userId,
    name,
    subItemsIds,
  });
export const UpdateOriginalItem = async (userId, id, name, subItemsIds) =>
  await axiosInstance.post(`/QC/UpdateOriginalItem`, {
    userId,
    id,
    name,
    subItemsIds,
  });

export const GetAllSubItems = async (userId) =>
  await axiosInstance.post(`/QC/GetAllSubItems`, {
    userId,
  });
export const GetSubItemsData = async (userId, selectedItemId) =>
  await axiosInstance.post(`/QC/GetSubItemsData`, {
    userId,
    selectedItemId,
  });
export const AddNewSubItem = async (userId, body) =>
  await axiosInstance.post(`/QC/AddNewSubItem`, {
    userId,
    ...body,
  });
export const UpdateSubItem = async (userId, id, body) =>
  await axiosInstance.post(`/QC/UpdateSubItem`, {
    userId,
    id,
    ...body,
  });

export const GetAllUsability = async (userId) =>
  await axiosInstance.post(`/Definition/GetAllUsability`, {
    userId,
  });
export const AddNewUsability = async (userId, units, usablityName, code) =>
  await axiosInstance.post(`/Definition/AddNewUsablity`, {
    userId,
    units,
    usablityName,
    code,
  });
export const UpdateUsability = async (userId, id, units, usablityName, code) =>
  await axiosInstance.post(`/Definition/UpdateUsablity`, {
    userId,
    id,
    units,
    usablityName,
    code,
  });
export const GetUsabilityData = async (userId, selectedItemId) =>
  await axiosInstance.post(`/Definition/QcManager.GetUsabilityData`, {
    userId,
    selectedItemId,
  });

export const GetAllCheckLists = async (userId) =>
  await axiosInstance.post(`/QC/GetAllCheckLists`, {
    userId,
  });
export const GetCheckListsData = async (userId, selectedItemId) =>
  await axiosInstance.post(`/QC/GetCheckListsData`, {
    userId,
    selectedItemId,
  });
export const UpdateCheckList = async (userId, name, subItemId, items, id) =>
  await axiosInstance.post(`/QC/UpdateCheckList`, {
    userId,
    name,
    subItemId,
    items,
    id,
  });
export const AddNewCheckList = async (userId, name, subItemId, items) =>
  await axiosInstance.post(`/QC/AddNewCheckList`, {
    userId,
    name,
    subItemId,
    items,
  });

export const AllActiveCheckLists = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "checkListTitle",
  checkListStateId = 0
) =>
  await axiosInstance.post(`/QC/QcManager.AllActiveCheckLists`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
    checkListStateId,
  });
export const GetCheckListStates = async (userId) =>
  await axiosInstance.post(`/QC/GetCheckListStates`, {
    userId: userId,
  });

export const CreateCheckListInstances = async (
  userId,
  contractorUserId,
  relatedProject,
  relatedFloor,
  relatedUnits,
  relatedUsability,
  relatedOrginalItems,
  relatedSubItems,
  relatedCheckLists
) =>
  await axiosInstance.post(`/QC/QcManager.CreateCheckListInstances`, {
    userId: userId,
    contractorUserId,
    relatedProject,
    relatedFloor,
    relatedUnits,
    relatedUsability,
    relatedOrginalItems,
    relatedSubItems,
    relatedCheckLists,
  });
export const UpdateQcInstance = async (
  userId,
  instanceId,
  contractorUserId,
  relatedProjects,
  relatedFloor,
  relatedUnits,
  relatedUsability,
  relatedOrginalItems,
  relatedSubItems,
  relatedCheckLists
) =>
  await axiosInstance.post(`/QC/QcManager.UpdateQcInstance`, {
    userId: userId,
    instanceId,
    contractorUserId,
    relatedProjects,
    relatedFloor,
    relatedUnits,
    relatedUsability,
    relatedOrginalItems,
    relatedSubItems,
    relatedCheckLists,
  });

export const GetManySubItemsCheckLists = async (userId, ids) =>
  await axiosInstance.post(`/QC/GetManySubItemsCheckLists`, {
    userId,
    ids,
  });
export const GetManyOrginalItemSubItems = async (userId, ids) =>
  await axiosInstance.post(`/QC/GetManyOrginalItemSubItems`, {
    userId,
    ids,
  });
export const GetAllContractor = async (userId) =>
  await axiosInstance.post(`/QC/GetAllContractor`, {
    userId,
  });
export const GetAllOrginal_SubItem_ChechLists = async (userId) =>
  await axiosInstance.post(`/QC/GetAllOrginal_SubItem_ChechLists`, {
    userId,
  });
export const GetOneInstanceData = async (userId, selectedItemId) =>
  await axiosInstance.post(`/QC/QcManager.GetOneInstanceData`, {
    userId,
    selectedItemId,
  });
export const DeleteQcInstance = async (userId, instanceIds) =>
  await axiosInstance.post(`/QC/QcManager.DeleteQcInstance`, {
    userId,
    instanceIds,
  });
