import { AxiosResponse } from 'axios';
import axiosInstance from 'src/utils/axios';
import {
  CharThirdURI,
  ChartFourURI,
  ChartOneURI,
  ChartTwoURI,
  ICategoryTypeCompChartReqData,
} from 'src/utils/endPoints';

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
  const response = await axiosInstance.get(ChartOneURI);

  return response;
};

/**
 * @brief 통계 페이지 - 시각화 차트 2 : 마일리지 카테고리 타입별 비교
 * @endPointName chartTwoURI
 * @endPoint /api/mileage/charts/category-type
 */

interface IMileageType {
  averageMileage: number;
  myMileage: number;
  type: string;
}

interface IGetCategoryTypeCompChart {
  description: string;
  count: number;
  list: IMileageType[];
}

export const getCategoryTypeCompChart = async (
  data: ICategoryTypeCompChartReqData
): Promise<AxiosResponse<IGetCategoryTypeCompChart>> => {
  const response = await axiosInstance.get(ChartTwoURI(data));

  return response;
};

/**
 * @brief 통계 페이지 - 시각화 차트 3 : 인기 마일리지 아이템
 * @endPointName chartThreeURI
 * @endPoint /api/mileage/charts/popular-item
 */

interface IMileageRecord {
  type: string;
  rank: number;
  description: string;
  recordCount: number;
  name: string;
}

interface IGetPopularItemChart {
  description: string;
  count: number;
  list: IMileageRecord[];
}

export const getPopularItemChart = async (): Promise<AxiosResponse<IGetPopularItemChart>> => {
  const response = await axiosInstance.get(CharThirdURI);
  return response;
};

/**
 * @breif 마이 페이지 - 마일리지 총점 비교
 * @endPointName chartFourURI
 * @endPoint /api/mileage/charts/category-type/upper
 */

export interface IGetMyMilageCompChart {
  description: string;
  count: number;
  list: IMileageData[];
}

interface IMileageData {
  myMileage: number;
  type: string;
  upperLimitMileage: number;
}

export const getMyCategoryTypeCompChart = async (): Promise<
  AxiosResponse<IGetMyMilageCompChart>
> => {
  const response = await axiosInstance.get(ChartFourURI);

  return response;
};
