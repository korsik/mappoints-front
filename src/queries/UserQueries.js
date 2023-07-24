import { useQuery } from "@tanstack/react-query";
import { getUsersService } from "../services/UserService";

export const getUsers = () => useQuery(
    ["users"],
    () => getUsersService(),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error) => {
        console.error("An error occurred:", error);
      },
    },
  );
