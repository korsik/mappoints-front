import React from "react";
import { getEntriesQ } from "../../../queries/EntriesQueries";
import { useSelectCategory } from "../../../state/AppState";
import LoadingSpinner from "../../utils/LoadingSpinner";

export const Reports = () => {
  const selectCategory = useSelectCategory((state) => state.selectCategory);
  const { data, refetch, isLoading } = getEntriesQ(selectCategory?.pub_id);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col w-full justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className=" flex flex-col w-full justify-center items-center">
        Reports
      </div>
    </div>
  );
};
