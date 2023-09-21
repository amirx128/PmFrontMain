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
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadWarehouseQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/warehouse/Warehose.GetWarehouseQ`,
    {
      userId: userId,
      pageIndex,
      pageCount: 20,
      orderType,
      orderBy,
      fromDate: new Date(fromDate).toISOString().slice(0, 10),
      toDate: new Date(toDate).toISOString().slice(0, 10),
      exportExcell: true,
    },
    {
      responseType: "arraybuffer",
    }
  );

export const GetWarehouseOrderData = async (userId, warehouseOrderId) =>
  await axiosInstance.post(`/Warehouse/GetWarehouseOrderData`, {
    userId,
    warehouseOrderId,
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
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadWarehouseSentItem = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/warehouse/Warehose.GetWarehouseSentItems`,
    {
      userId: userId,
      pageIndex,
      pageCount: 20,
      orderType,
      orderBy,
      fromDate: new Date(fromDate).toISOString().slice(0, 10),
      toDate: new Date(toDate).toISOString().slice(0, 10),
      exportExcell: true,
    },
    {
      responseType: "arraybuffer",
    }
  );
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
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadExitWareHouseQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/warehouse/Warehouse.GetExitWarehouseQ`,
    {
      userId: userId,
      pageIndex,
      pageCount: 20,
      orderType,
      orderBy,
      fromDate: new Date(fromDate).toISOString().slice(0, 10),
      toDate: new Date(toDate).toISOString().slice(0, 10),
      exportExcell: true,
    },
    {
      responseType: "arraybuffer",
    }
  );
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
    fromDate: new Date(fromDate).toISOString().slice(0, 10),
    toDate: new Date(toDate).toISOString().slice(0, 10),
  });
export const DownloadExitWarehouseSentItem = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/warehouse/Warehouse.GetExitWarehouseSentItems`,
    {
      userId: userId,
      pageIndex,
      pageCount: 20,
      orderType,
      orderBy,
      fromDate: new Date(fromDate).toISOString().slice(0, 10),
      toDate: new Date(toDate).toISOString().slice(0, 10),
      exportExcell: true,
    },
    {
      responseType: "arraybuffer",
    }
  );
export const SupplierAddDetailsToWarehouseOrder = async (
  userId,
  warehouseOrderId,
  sentCount
) =>
  await axiosInstance.post(`/Warehouse/Supplier.AddDetailsToWarehoseOrder`, {
    userId: userId,
    warehouseOrderId,
    sentCount,
  });
export const SupplierUpdateDetailsToWarehouseOrder = async (
  userId,
  warehouseOrderId,
  commodityId,
  sentCount
) =>
  await axiosInstance.post(`/Warehouse/Supplier.UpdateDetailsToWarehoseOrder`, {
    userId: userId,
    warehouseOrderId,
    commodityId,
    sentCount,
  });
export const WarehouseReceiveCommidity = async (
  userId,
  warehouseOrderId,
  commodityId,
  sentCount,
  receiveCount,
  senderId,
  receiverId
) =>
  await axiosInstance.post(`/Warehouse/Warehose.ReceiveCommodity`, {
    userId,
    warehouseOrderId,
    commodityId,
    sentCount,
    receiveCount,
    senderId,
    receiverId,
  });
