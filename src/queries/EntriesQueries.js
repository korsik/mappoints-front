import { useMutation, useQuery } from "@tanstack/react-query";
import { createEntryService, getEntries } from "../services/EntriesService";

export const getEntriesQ = (categoryId) => useQuery(
    ["entries"],
    () => getEntries(categoryId),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error) => {
        console.error("An error occurred:", error);
      },
    },
  );


  // export const saveEntry = useMutation(createEntryService, {
  //   onSuccess: (data) => {
  //     console.log("Success")
  //   },
  // });
  // useMutation(

  //   () => createEntryService(entry),
  //   {
  //     onSuccess: (data) => {
  //       // console.log(data);
  //     },
  //     onError: (error) => {
  //       console.error("An error occurred:", error);
  //     },
  //   },
  // );