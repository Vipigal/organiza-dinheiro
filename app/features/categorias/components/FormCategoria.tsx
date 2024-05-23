import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { insertCategoriaSchema } from "@/database/schemas/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = insertCategoriaSchema.pick({
  nom_categoria: true,
});

export type FormValuesCategoria = z.input<typeof formSchema>;

interface Props {
  id_categoria?: string;
  defaultValues?: FormValuesCategoria;
  onSubmit: (values: FormValuesCategoria) => void;
  onDelete?: () => void;
  disabled?: boolean;
}

export default function FormCategoria({
  onSubmit,
  defaultValues,
  disabled,
  id_categoria,
  onDelete,
}: Props) {
  const form = useForm<FormValuesCategoria>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValuesCategoria) => {
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
          name="nom_categoria"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ex.: Uber, Roupas, Comida, etc."
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id_categoria ? "Salvar alterações" : "Adicionar categoria"}
        </Button>
        {!!id_categoria && (
          <Button
            type="button"
            className="w-full text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
            disabled={disabled}
            onClick={handleDelete}
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Deletar Categoria
          </Button>
        )}
      </form>
    </Form>
  );
}
