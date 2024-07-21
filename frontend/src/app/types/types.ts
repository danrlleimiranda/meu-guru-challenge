export type PaginationType = {
  page: number;
  offset: number;
  filters: string | undefined;
};

export type UpdateUser = {
  document: string;
  phone: string;
  name: string;
  role: string;
};

export type UpdateUserArgs = {
  id: string;
  user: UpdateUser;
};

export type User = {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
  role: string;
};