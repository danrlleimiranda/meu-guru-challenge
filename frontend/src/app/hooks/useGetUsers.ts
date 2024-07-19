import { useQuery } from "@tanstack/react-query";

import { api } from "../../api";
import { PaginationType } from "../types/types";

type User = {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
  role: string;
};

const getUsers = async ({ page, offset, filters }: PaginationType) => {
  return await api.get<User[]>(
    `/users?page=${page}&offset=${offset}&filters=${filters}`
  );
};
const useGetUsers = ({ page, offset, filters }: PaginationType) => {
  const query = useQuery({
    queryFn: () => getUsers({ page, offset, filters }),
    queryKey: ["users-data"],
    retry: false,
  });

  return { ...query, data: query.data?.data };
};

export default useGetUsers;
