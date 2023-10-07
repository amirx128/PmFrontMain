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
