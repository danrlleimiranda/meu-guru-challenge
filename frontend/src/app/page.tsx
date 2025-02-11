"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import logo from "../../public/logo-guru.jpg";

import EyePassword from "@/components/eye-password";
import useCheckToken from "./hooks/useCheckToken";
import useLogin from "./hooks/useLogin";
import style from "./login.module.css";

const formSchema = z.object({
  login: z.string().email({ message: "Login must follows email format" }),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters" }),
});

export default function Login() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const {
    mutate: mutateLogin,
    isSuccess: isLoginSuccess,
    isError,
    data: loginData,
  } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  useCheckToken();

  useEffect(() => {
    if (isLoginSuccess) {
      localStorage.setItem("GURU_TOKEN", loginData.data.token);
      router.push("/users");
    }
  }, [loginData?.data.token, isLoginSuccess]);

  const handleLogin = (values: z.infer<typeof formSchema>) =>
    mutateLogin(values);

  return (
    <motion.div
      className="flex items-center justify-center flex-col gap-8"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Image src={logo} alt="meu guru logo" className="w-32 rounded-3xl" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="space-y-8 flex justify-center items-center flex-col"
        >
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Digite seu email"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
                {isError && (
                  <FormDescription className="text-rose-700">
                    Usuário ou senha incorretos
                  </FormDescription>
                )}
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
                    placeholder="Digite sua senha"
                    type={isVisible ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <EyePassword
                  isVisible={isVisible}
                  setIsVisible={setIsVisible}
                />
                <FormMessage />
                <FormDescription className="text-xs underline text-purple-700">
                  <a href="/register">Não tem conta? Registre-se</a>
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={style.button}
            disabled={!form.formState.isValid}
          >
            Login
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
