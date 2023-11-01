import axiosInstance from 'src/utils/axios';
import {
  GetMileageSemesterMeURI,
  GetMyMileageBySemesterURI,
  getAllMileageThisSemesterURI,
} from 'src/utils/endPoints';

/**
 * @brief 내 마일리지가 적립되어 있는 학기의 신청 정보와 상태 조회
 */

export const getSemestersWithStatus = async () => {
  const response = await axiosInstance.get(GetMileageSemesterMeURI);

  return response;
};

export interface IGetMileageSemestersWithStatuses {
  list: IMileageSemesterWithStatus[];
}

export interface IMileageSemesterWithStatus {
  name: string;
  status: string;
  applyStart: string;
  applyEnd: string;
}

/**
 * @brief 내 마일리지가 적립되어 있는 학기별 항목의 정보를 카테고리로 묶어서 조회
 */

export const getMyMileageBySemester = async (semester: string) => {
  const response = await axiosInstance.get(GetMyMileageBySemesterURI(semester));

  return response;
};

/**
 * @brief 현재 학기 조회
 */
export const getAllMileageThisSemester = async (semester: string) => {
  const response = await axiosInstance.get(getAllMileageThisSemesterURI(semester));
  return response;
};
