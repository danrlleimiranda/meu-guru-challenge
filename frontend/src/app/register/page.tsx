"use client";

import EyePassword from "@/components/eye-password";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";
import logo from "../../../public/meu-guru.svg";
import useCreateUser from "../hooks/useCreateUser";
import { cpfMask, phoneMask } from "../utils/masks";

const formSchema = z
  .object({
    document: z.string({ required_error: "document is required" }).max(15),
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "password is required" }).min(6),
    confirm_password: z.string().min(6).optional(),
    phone: z.string({ required_error: "phone is required" }).max(15),
    name: z.string({ required_error: "name is required" }).min(5),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "As senhas não são iguais.",
    path: ["confirm_password"],
  });

export default function RegisterUser() {
  const { push } = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const {
    mutate: mutateCreateUser,
    error: userError,
    isSuccess: isCreatedSuccess,
  } = useCreateUser();

  useEffect(() => {
    if (isCreatedSuccess) {
      Swal.fire({
        title: "Registrado com sucesso!",
        text: "Agora faça o login",
        icon: "success",
        timer: 2000,
      }).then(() => {
        push("/");
      });
    }

    if (userError) {
      Swal.fire({
        title: "Algo deu errado!",
        text: "Tente novamente",
        icon: "error",
        timer: 2000,
      });
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
    return mutateCreateUser({
      ...values,
      role: "user",
      document: cpfMask(values.document),
      phone: phoneMask(values.phone),
    });
  };

  return (
    <main className={`flex flex-col items-center justify-center gap-12 p-24`}>
      <Image src={logo} alt="meu guru logo" className="" />
      <h1 className="text-3xl font-bold ">Crie a sua conta</h1>
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
                    <Input
                      placeholder="Digite o seu cpf"
                      maxLength={15}
                      {...field}
                      onChange={(e) => {
                        field.onChange(cpfMask(e.target.value));
                      }}
                    />
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
                    <Input
                      placeholder="Telefone"
                      {...field}
                      maxLength={15}
                      onChange={(e) => {
                        let input = e.target;
                        input.value = phoneMask(input.value);
                        field.onChange(input.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      placeholder="Senha"
                      type={isVisible ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <EyePassword
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                  />
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
                    <Input
                      placeholder="Confirme sua senha"
                      type={isVisible ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-[#7A2EC5] hover:bg-purple-800"
              disabled={!form.formState.isValid}
            >
              Registrar
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
