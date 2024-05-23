import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";
import { useNovaCategoria } from "../hooks/zustand/useNovaCategoria";
import FormCategoria, { FormValuesCategoria } from "./FormCategoria";
import { useCreateCategoria } from "../hooks/queries/useCreateCategoria";

export default function NovaCategoriaSheet() {
  const { closeCategoriaSheet, isOpenCategoriaSheet } = useNovaCategoria();

  const mutation = useCreateCategoria();

  const onSubmit = (values: FormValuesCategoria) => {
    mutation.mutate(values, {
      onSuccess: () => {
        closeCategoriaSheet();
      },
    });
  };

  return (
    <Sheet open={isOpenCategoriaSheet} onOpenChange={closeCategoriaSheet}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Nova Categoria</SheetTitle>
          <SheetDescription>
            Adicione uma nova categoria para organizar suas transações.
          </SheetDescription>
        </SheetHeader>
        <FormCategoria
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            nom_categoria: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
