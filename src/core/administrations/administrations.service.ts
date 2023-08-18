import axiosInstance from "../../utils/axios.config.ts";

export const GetAllRolesReq = async (userId) =>
    await axiosInstance.post(
        `/Administration/GetAllRoles`,
        {
            userId: userId,
        }
    );

export const AddNewUserReq = async (userId,body) =>
    await axiosInstance.post(
        `/Administration/AddNewUser`,
        {
            userId: userId,
            ...body
        }
    );

export const UpdateUserReq = async (userId,body) =>
    await axiosInstance.post(
        `/Administration/UpdateUserInfo`,
        {
            userId: userId,
            ...body
        }
    );

