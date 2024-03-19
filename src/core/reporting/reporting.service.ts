import axiosInstance from '../../utils/axios.config';

export const GetAllRepoertsAndProps = async (
  userId
  // pageIndex = 1,
  // fromDate = new Date().setMonth(new Date().getMonth() - 1),
  // toDate = new Date(),
  // orderType = 'desc',
  // orderBy = 'requestCaseCreateDate'
) =>
  await axiosInstance.post(`/Reporting/GetAllRepoertsAndProps`, {
    userId: userId,
    // pageIndex,
    // pageCount: 20,
    // orderType,
    // orderBy,
    // fromDate: new Date(fromDate).toISOString().slice(0, 10),
    // toDate: new Date(toDate).toISOString().slice(0, 10),
  });
