import { useQuery } from "@tanstack/react-query";

import { api } from "../../api";

type User = {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
  role: string;
};

const getUser = async (id: string) => {
  return await api.get<User>(`/users/${id}`);
};
const useGetUserByid = (id: string) => {
  const query = useQuery({
    queryFn: () => getUser(id),
    queryKey: ["user-data"],
    enabled: !!id,
  });

  return { ...query, data: query.data?.data };
};

export default useGetUserByid;
