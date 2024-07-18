import { useQuery } from "@tanstack/react-query";

import { api } from "../../api";

type Assignors = {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
  role: string;
};

const getUsers = async () => {
  return await api.get<Assignors[]>("/users");
};
const useGetUsers = () => {
  const query = useQuery({
    queryFn: getUsers,
    queryKey: ["users-data"],
    retry: false,
  });

  return { ...query, data: query.data?.data };
};

export default getUsers;
