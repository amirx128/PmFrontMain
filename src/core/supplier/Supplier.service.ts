import axiosInstance from "../../utils/axios.config.ts";

export const GetSupplierQ = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(`/warehouse/Supplier.GetSupplierQ`, {
    userId: userId,
    pageIndex,
    pageCount: 20,
    orderType,
    orderBy,
    fromDate,
    toDate,
  });

export const SupplierSentItem = async (
  userId,
  pageIndex = 1,
  fromDate = new Date().setMonth(new Date().getMonth() - 1),
  toDate = new Date(),
  orderType = "desc",
  orderBy = "requestCaseCreateDate"
) =>
  await axiosInstance.post(
    `/warehouse/Supplier.SentItems
  `,
    {
      userId: userId,
      pageIndex,
      pageCount: 20,
      orderType,
      orderBy,
      fromDate,
      toDate,
    }
  );
