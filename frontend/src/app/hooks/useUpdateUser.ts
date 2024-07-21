import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../api";
import { UpdateUser, UpdateUserArgs } from "../types/types";

const updateUser = async (id: string, user: UpdateUser) =>
  await api.patch(`/users/${id}`, user);

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, user }: UpdateUserArgs) => updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users-data"],
        exact: true,
        refetchType: "active",
      });
    },
  });
};

export default useUpdateUser;
