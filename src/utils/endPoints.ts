/**
 * @brief 학기 + 마일리지 상태 + 신청 시작 날짜 + 신청 끝 날짜
 */
export const GetMileageSemesterMeURI = '/api/mileage/semesters/me/status';

/**
 * @brief 학기별 나의 마일리지 조회
 */
export const GetMyMileageBySemesterURI = (semester: string) =>
  `/api/student/mileage/${semester}/me`;

/**
 * @brief 이번 학기 모든 마일리지와 내가 등록된 마일리지 조회
 */
export const getAllMileageThisSemesterURI = (semester: string) =>
  `/api/student/mileage/${semester}`;

/**
 * @brief 학생 로그인
 */

export const postStudentLoginURI = `/api/student/login`;

export const GetMyProfileURI = `/api/mileage/students/me`;

export const postMileageApplyURI = `/api/mileage/apply`;

export const ChartOneURI = `/api/mileage/charts/total-score`;

export interface ICategoryTypeCompChartReqData {
  isYearFilter: boolean;
  semester: string;
}

export const ChartTwoURI = (data: ICategoryTypeCompChartReqData) =>
  `/api/mileage/charts/category-type?semester=${data.semester}${
    data.isYearFilter ? '&filter=year' : ''
  }`;

export const CharThirdURI = `api/mileage/charts/popular-item`;

export const ChartFourURI = `/api/mileage/charts/category-type/upper`;
