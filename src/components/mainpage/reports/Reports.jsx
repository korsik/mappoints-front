// Reports.jsx

import React from "react";
import { getEntriesQ } from "../../../queries/EntriesQueries";
import { useSelectCategory } from "../../../state/AppState";
import LoadingSpinner from "../../utils/LoadingSpinner";

import ErrorBoundary from "./ErrorBoundary";

import DonutChart from "./DonutChart";

const data = {
  labels: ["Label A", "Label B", "Label C"],
  datasets: [
    {
      data: [30, 45, 25],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

export const Reports = () => {
  const selectCategory = useSelectCategory((state) => state.selectCategory);
  // const { data, refetch, isLoading } = getEntriesQ(selectCategory?.pub_id);

  // if (isLoading) {
  //   return (
  //     <div className="h-screen flex flex-col w-full justify-center items-center">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="d-flex">
        <div>
          <div>
            <ErrorBoundary>
              <DonutChart data={data} style={{ width: "100%" }} />
            </ErrorBoundary>
          </div>
          <div>
            <DonutChart data={data} />
          </div>
        </div>
        <div>
          <div>
            <ErrorBoundary>
              <DonutChart data={data} style={{ width: "100%" }} />
            </ErrorBoundary>
          </div>
          <div>
            <DonutChart data={data} />
          </div>
        </div>
      </div>
    </>
  );
};
