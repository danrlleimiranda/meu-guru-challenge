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
import { z } from "zod";
import logo from "../../public/logo-guru.jpg";
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
  const {
    mutate: mutateLogin,
    isSuccess: isLoginSuccess,
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
    <div className={style.container}>
      <Image src={logo} alt="" className={style.logo} />
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
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage className="text-xs"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
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
    </div>
  );
}
