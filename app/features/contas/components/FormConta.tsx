import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { insertContaSchema } from "@/database/schemas/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = insertContaSchema.pick({
  nom_conta: true,
});

export type FormValuesConta = z.input<typeof formSchema>;

interface Props {
  id_conta?: string;
  defaultValues?: FormValuesConta;
  onSubmit: (values: FormValuesConta) => void;
  onDelete?: () => void;
  disabled?: boolean;
}

export default function FormConta({
  onSubmit,
  defaultValues,
  disabled,
  id_conta,
  onDelete,
}: Props) {
  const form = useForm<FormValuesConta>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValuesConta) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="nom_conta"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ex.: Conta Corrente, Cartão de Crédito, etc."
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id_conta ? "Salvar alterações" : "Adicionar conta"}
        </Button>
        {!!true && (
          <Button
            type="button"
            className="w-full text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
            disabled={disabled}
            onClick={handleDelete}
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Deletar Conta
          </Button>
        )}
      </form>
    </Form>
  );
}
