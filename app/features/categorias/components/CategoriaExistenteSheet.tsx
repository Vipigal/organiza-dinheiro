import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";
import FormCategoria, { FormValuesCategoria } from "./FormCategoria";
import { useCategoriaExistente } from "../hooks/zustand/useCategoriaExistente";
import { useGetCategoria } from "../hooks/queries/useGetCategoria";
import Loader from "@/components/Loader";
import { useEditCategoria } from "../hooks/queries/useEditCategoria";
import { useDeleteCategoria } from "../hooks/queries/useDeleteCategoria";
import { useConfirm } from "@/hooks/useConfim";

export default function CategoriaExistenteSheet() {
  const { closeCategoriaSheet, isOpenCategoriaSheet, id } =
    useCategoriaExistente();
  const { data, isLoading } = useGetCategoria(id);

  const [ConfirmDialog, confirm] = useConfirm(
    "Você tem certeza?",
    "Você está prestes a deletar esta categoria do seu perfil."
  );

  const mutation = useEditCategoria(id);
  const deleteMutation = useDeleteCategoria();

  const isPending = mutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: FormValuesCategoria) => {
    mutation.mutate(values, {
      onSuccess: () => {
        closeCategoriaSheet();
      },
    });
  };

  const onDelete = async () => {
    if (!id) return;

    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(
        { ids: id },
        {
          onSuccess: () => {
            closeCategoriaSheet();
          },
        }
      );
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpenCategoriaSheet} onOpenChange={closeCategoriaSheet}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Editar Categoria</SheetTitle>
            <SheetDescription>
              Edite uma categoria já existente.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <Loader size="big" />
          ) : (
            <FormCategoria
              id_categoria={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={{
                nom_categoria: data?.nom_categoria ? data.nom_categoria : "",
              }}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
