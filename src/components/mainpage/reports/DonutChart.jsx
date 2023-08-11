import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

import ChartDataLabels from "chartjs-plugin-datalabels";

const DonutChart = ({ data }) => {
  const options = {
    maintainAspectRatio: false,
    legend: {
      position: "bottom",
    },
    plugins: {
      datalabels: {
        color: "#fff", // Data label text color
        formatter: (value, ctx) => {
          const sum = ctx.dataset.data.reduce((acc, data) => acc + data, 0);
          const percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
      },
    },
  };

  return <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />;
};

export default DonutChart;
