import { useQuery } from "@tanstack/react-query";
import {  } from "../services/EntriesService";
import { getProfilesSerivce } from "../services/profileService";

export const getProfileQ = (categoryId) => useQuery(
    ["profiles"],
    () => getProfilesSerivce(categoryId),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error) => {
        console.error("An error occurred:", error);
      },
    },
  );