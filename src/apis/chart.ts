import { AxiosResponse } from 'axios';
import axiosInstance from 'src/utils/axios';
import { ChartTwoURI } from 'src/utils/endPoints';

/**
 * @breif 통계 페이지 - 시각화 차트 1 : 마일리지 총점 비교
 * @endPointName chartTwoURI
 * @endPoint /api/mileage/charts/total-score
 */

interface IMileageData {
  semester: string;
  averageMileage: number;
  myMileage: number;
}

interface IGetTotalPointCompChart {
  description: string;
  count: number;
  list: IMileageData[];
}

export const getTotalPointCompChart = async (): Promise<AxiosResponse<IGetTotalPointCompChart>> => {
  const response = await axiosInstance.get(ChartTwoURI);

  return response;
};

/**
 * @brief 통계 페이지 - 시각화 차트 2 : 마일리지 카테고리 타입별 비교
 * @endPointName chartTwoURI
 * @endPoint /api/mileage/charts/category-type
 */

export const getCategoryTypeCompChart = async () => {
  const response = await axiosInstance.get(ChartTwoURI);

  return response;
};
