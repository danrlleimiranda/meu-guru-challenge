"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { z } from "zod";
import logo from "../../../public/meu-guru.svg";
import useCreateUser from "../hooks/useCreateUser";

const formSchema = z
  .object({
    document: z.string({ required_error: "document is required" }),
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "password is required" }).min(6),
    confirm_password: z.string().min(6).optional(),
    phone: z.string({ required_error: "phone is required" }),
    name: z.string({ required_error: "name is required" }).min(5),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "As senhas não são iguais.",
    path: ["confirm_password"],
  });

export default function RegisterUser() {
  const { push } = useRouter();

  const {
    mutate: mutateCreateUser,
    error: userError,
    isSuccess: isCreatedSuccess,
  } = useCreateUser();

//  useCheckToken();


  useEffect(() => {
    if (isCreatedSuccess) {
      Swal.fire({
        title: "Registrado com sucesso!",
        text: "Agora faça o login",
        icon: "success",
        timer: 2000
      }).then(() => {
        push("/");
      })
    } else {
      Swal.fire({
        title: "Algo deu errado!",
        text: "Tente novamente",
        icon: "error",
        timer: 2000
      })
    }
  }, [isCreatedSuccess]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: "",
      email: "",
      password: "",
      confirm_password: "",
      phone: "",
      name: "",
    },
  });

  const handleUserCreate = (values: z.infer<typeof formSchema>) => {
    delete values.confirm_password;
    return mutateCreateUser({...values, role: 'user'});
  };

  return (
    <main
      className={`flex flex-col items-center justify-center gap-12 p-24`}
    >
      <Image src={logo} alt="meu guru logo" className="" />
      <h1 className="text-4xl font-bold">Registre-se</h1>
      <div className="bg-purple">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUserCreate)}
            className="space-y-8 flex justify-center items-center flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Digite o seu cpf" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Telefone" {...field} />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Senha" type="password"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Confirme sua senha" type="password"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className=""
              disabled={!form.formState.isValid}
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
