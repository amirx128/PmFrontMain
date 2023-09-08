import axiosInstance from "../../utils/axios.config.ts";

export const GetRequesterUserQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate",
  exportExcell = false
) =>
  await axiosInstance.post(`/warehouse/RequesterUser.Q`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate,
    toDate,
    exportExcell,
  });
export const RequesterUserSentItem = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "createDate"
) =>
  await axiosInstance.post(`/requestCase/SentItem`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate,
    toDate,
  });