"use client";

import useDelete from "@/app/hooks/useDeleteUser";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { jwtDecode } from "jwt-decode";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type ActionProps = {
  cell: any;
};

type Payload = {
  sub: string;
  role: string;
};


export default function Actions({ cell }: ActionProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    mutate: mutateDelete,
    isSuccess: isLoginSuccess,
    isError,
    data: loginData,
  } = useDelete();

  useEffect(() => {
    const token = localStorage.getItem("GURU_TOKEN");
    if (token) {
      const { role } = jwtDecode<Payload>(token);
      setIsAdmin(role === "admin");
    }
  }, []);



  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você não conseguirá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDelete(id);
        Swal.fire({
          title: "Deletado!",
          text: "O usuário foi deletado.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(cell.document)}
          >
            Copie o CPF
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(cell.email)}
          >
            Copie o email
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(cell.name)}
          >
            Copie o nome
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(cell.email)}
            >
              Editar
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem onClick={() => handleDelete(cell.id)}>
              Apagar
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
