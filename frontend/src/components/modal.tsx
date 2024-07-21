"use client";
import useUpdateUser from "@/app/hooks/useUpdateUser";
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
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cpfMask, phoneMask } from "../app/utils/masks";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const formSchema = z.object({
  document: z.string({ required_error: "document is required" }).max(15),
  phone: z.string({ required_error: "phone is required" }).max(16),
  name: z.string({ required_error: "name is required" }).min(5),
  role: z.string({ required_error: "role is required" }),
});

type EditModalProps = {
  isOpen: { id: string; isOpen: boolean };
  setIsOpen: (value: { id: string; isOpen: boolean }) => void;
  cell: any;
};

export default function EditModal({ setIsOpen, cell }: EditModalProps) {
  const {
    mutate: mutateUpdateUser,
    error: userError,
    isSuccess: isUpdatedSuccess,
  } = useUpdateUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: cell?.document,
      phone: cell?.phone,
      name: cell?.name,
      role: cell?.role,
    },
  });

  const handleUserupdate = (values: z.infer<typeof formSchema>) => {
    setIsOpen({ id: cell.id, isOpen: false });
    return mutateUpdateUser({ id: cell.id, user: values });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed bg-white top-32 left-1/3 w-1/3 h-2/3 rounded-3xl transition-all flex justify-center flex-col gap-5 z-50"
    >
      <div className="bg-purple">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUserupdate)}
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Telefone"
                      {...field}
                      maxLength={16}
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o papel do usuário" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="user">Usuário comum</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-around items-end w-full">
              <Button
                type="button"
                className="bg-[#7A2EC5] hover:bg-purple-800"
                disabled={form.formState.isValidating}
                onClick={() => setIsOpen({ id: cell.id, isOpen: false })}
              >
                Fechar
              </Button>
              <Button
                type="submit"
                className="bg-[#7A2EC5] hover:bg-purple-800"
                disabled={form.formState.isValidating}
              >
                Confirmar edição
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
