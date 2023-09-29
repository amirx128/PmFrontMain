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
