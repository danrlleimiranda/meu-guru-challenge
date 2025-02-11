import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../api";

type CreateUser = {
  document: string;
  email: string;
  password: string;
  phone: string;
  name: string;
  role: string;
};

const createUser = async (user: CreateUser) =>
  await api.post("/auth/signup", user);

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: CreateUser) => createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users-data"],
        exact: true,
        refetchType: "active",
      });
    },
  });
};

export default useCreateUser;
