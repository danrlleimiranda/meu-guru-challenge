"use client";

import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import useGetUsers from "../hooks/useGetUsers";
import { columns } from "./columns";

export default function Users() {
  const [pagination, setPagination] = useState({
    page: 0,
    offset: 2,
    filters: "",
  });
  const { data, refetch } = useGetUsers({ ...pagination });

  useEffect(() => {
    refetch();
  }, [pagination.page]);

  const handlePagination = (page: number) => {
    if (page === -1 && pagination.page > 0) {
      setPagination({ ...pagination, page: pagination.page - 1 });
    }
    if (
      page === 1 &&
      data &&
      pagination.page < data.total / pagination.offset - 1
    ) {
      setPagination({ ...pagination, page: pagination.page + 1 });
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#7B2EC6]">
      <Header />
      <DataTable
        columns={columns}
        data={data ? data.data : []}
        handlePagination={handlePagination}
      />
    </div>
  );
}
