import axiosInstance from "../../utils/axios.config.ts";

export const GetLogisticsQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/Purchase/Logistics.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate,
    toDate,
  });
export const GetPurchaseOrderData = async (userId, purchaseOrderId) =>
  await axiosInstance.post(`/Purchase/GetPurchaseOrderData`, {
    userId: userId,
    purchaseOrderId,
  });

export const GetPurchaseOrderDetailsData = async (userId, purchaseOrderId) =>
  await axiosInstance.post(`/Purchase/GetPurchaseOrderDetailsData`, {
    userId: userId,
    purchaseOrderId,
  });

export const AddDetailsToPurchaseOrder = async (userId, body) =>
  await axiosInstance.post(`/Purchase/Logistics.AddDetailsToPurchaseOrder`, {
    userId: userId,
    ...body,
  });

export const LogisticsSendItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/Purchase/Logistics.SendItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate,
    toDate,
  });

export const GetFinancialQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/Purchase/Financial.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate,
    toDate,
  });

export const FinancialUpdateDetails = async (
  userId,
  mablaghEtebar,
  purchaseOrderDetailsId
) =>
  await axiosInstance.post(`/Purchase/Financial.UpdateDetails`, {
    userId: userId,
    mablaghEtebar,
    purchaseOrderDetailsId,
  });

export const FinancialSendItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/Purchase/Financial.SendItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate,
    toDate,
  });

export const GetApproveQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/Purchase/Approve.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate,
    toDate,
  });

export const ApproveUpdateDetails = async (
  userId,
  count,
  approveStateId,
  purchaseOrderDetailsId
) =>
  await axiosInstance.post(`/Purchase/Approve.UpdateDetails`, {
    userId: userId,
    count,
    approveStateId,
    purchaseOrderDetailsId,
  });

export const ApproveSendItems = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/Purchase/Approve.SendItems`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate,
    toDate,
  });
