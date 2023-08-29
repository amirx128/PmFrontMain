import axiosInstance from "../../utils/axios.config.ts";

export const GetWarehouseQ = async (
  userId,
  pageIndex = 1,
  fromDate = "",
  toDate = ""
) =>
  await axiosInstance.post(`/warehouse/Warehose.GetWarehouseQ`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType: "desc",
    orderBy: "requestCaseCreateDate",
    fromDate,
    toDate,
  });

export const WarehouseSentItem = async (
  userId,
  pageIndex = 1,
  fromDate = "",
  toDate = ""
) =>
  await axiosInstance.post(`/warehouse/Warehose.GetWarehouseSentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType: "desc",
    orderBy: "requestCaseCreateDate",
    fromDate,
    toDate,
  });
export const GetExitWareHouseQ = async (
  userId,
  pageIndex = 1,
  fromDate = "",
  toDate = ""
) =>
  await axiosInstance.post(`/Warehouse.GetExitWarehouseQ`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType: "desc",
    orderBy: "requestCaseCreateDate",
    fromDate,
    toDate,
  });
export const ExitWarehouseSentItem = async (
  userId,
  pageIndex = 1,
  fromDate = "",
  toDate = ""
) =>
  await axiosInstance.post(`/Warehouse.GetExitWarehouseSentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType: "desc",
    orderBy: "requestCaseCreateDate",
    fromDate,
    toDate,
  });
