import axiosInstance from "../../utils/axios.config.ts";

export const SaveGridColumn = async (userId, gridName, gridConfigs) =>
  await axiosInstance.post(`/AccountCountroller/SaveGridColumn`, {
    userId,
    gridName,
    gridConfigs,
  });

export const GetGridColumn = async (userId, gridName) =>
  await axiosInstance.post(`/AccountCountroller/GetGridColumns`, {
    userId,
    gridName,
  });
