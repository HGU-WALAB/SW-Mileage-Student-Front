import axiosInstance from 'src/utils/axios';
import { ChartTwoURI } from 'src/utils/endPoints';

/**
 * @breif 통계 페이지 - 시각화 차트 1 : 마일리지 총점 비교
 * @endPointName chartTwoURI
 * @endPoint /api/mileage/charts/total-score
 */

export const getTotalPointCompChart = async () => {
  const response = await axiosInstance.get(ChartTwoURI);

  return response;
};
