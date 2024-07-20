import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../api";

type UserLogin = {
  login: string;
  password: string;
};

const deleteUser = async (id: string) => await api.delete(`/users/${id}`);
const useDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users-data"],
        exact: true,
        refetchType: "active",
      });
    },
  });
};

export default useDelete;
