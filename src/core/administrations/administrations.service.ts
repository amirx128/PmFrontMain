import axiosInstance from '../../utils/axios.config.ts';

export const GetAllRolesReq = async (userId) =>
  await axiosInstance.post(`/Administration/GetAllRoles`, {
    userId: userId,
  });

export const AddNewUserReq = async (userId, body) =>
  await axiosInstance.post(
    `/Administration/AddNewUser`,
    {
      userId: userId,
      ...body,
    },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );

export const UpdateUserReq = async (userId, body) =>
  await axiosInstance.post(
    `/Administration/UpdateUserInfo`,
    {
      userId: userId,
      ...body,
    },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
export const UpdateUserProfileReq = async (userId, body) =>
  await axiosInstance.post(`/Administration/UpdateUserProfile`, {
    userId: userId,
    ...body,
  });

export const GetUserInfoReq = async (userId, id) =>
  await axiosInstance.post(`/Administration/GetUserInfo`, {
    userId: userId,
    selectedItemId: id,
  });
export const GetUsersList = async (userId) =>
  await axiosInstance.post(`/Administration/GetAllUsers`, {
    userId: userId,
  });
