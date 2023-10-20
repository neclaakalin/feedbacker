import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTranslation } from "react-i18next";
import { ratings } from "../../utils/values";

const Chart: React.FunctionComponent<{ data: number[] }> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <BarChart
      xAxis={[
        {
          data: ratings.map((rating) => t(`RATING.${rating}`)),
          scaleType: "band",
        },
      ]}
      yAxis={[
        {
          label: t(`CHART.YAXIS`),
        },
      ]}
      series={[
        {
          data: data,
        },
      ]}
      width={500}
      height={300}
    />
  );
};

export default Chart;
