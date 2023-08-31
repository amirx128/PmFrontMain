import axiosInstance from "../../utils/axios.config.ts";

export const GetWarehouseQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/warehouse/Warehose.GetWarehouseQ`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate,
    toDate,
  });

export const WarehouseSentItem = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/warehouse/Warehose.GetWarehouseSentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate,
    toDate,
  });
export const GetExitWareHouseQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/warehouse/Warehouse.GetExitWarehouseQ`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate,
    toDate,
  });
export const ExitWarehouseSentItem = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/warehouse/Warehouse.GetExitWarehouseSentItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate,
    toDate,
  });
