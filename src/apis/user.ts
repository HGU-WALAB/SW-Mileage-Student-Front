import axiosInstance from 'src/utils/axios';
import { GetMyProfileURI, postStudentLoginURI } from 'src/utils/endPoints';

export interface IPostStudentLoginData {
  password: string;
  uniqueId: string;
}

export const studentLogin = async (data: IPostStudentLoginData) => {
  const response = axiosInstance.post(postStudentLoginURI, data);

  return response;
};

export const getStudentProfile = async () => {
  const response = axiosInstance.get(GetMyProfileURI);
  return response;
};
