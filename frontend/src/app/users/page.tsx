"use client"

import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import useGetUsers from "../hooks/useGetUsers";
import { columns } from "./columns";

export default function Users() {
  const [pagination, setPagination] = useState({page: '0', offset: '5', filters: ''});
  const { data, isLoading } = useGetUsers({...pagination});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <Header />
      <DataTable columns={columns} data={data ? data : []} />
    </div>
  );
}
