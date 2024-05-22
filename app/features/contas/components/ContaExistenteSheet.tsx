import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";
import FormConta, { FormValuesConta } from "./FormConta";
import { useContaExistente } from "../hooks/zustand/useContaExistente";
import { useGetConta } from "../hooks/queries/useGetConta";
import Loader from "@/components/Loader";
import { useEditConta } from "../hooks/queries/useEditConta";
import { useDeleteConta } from "../hooks/queries/useDeleteConta";
import { useConfirm } from "@/hooks/useConfim";

export default function ContaExistenteSheet() {
  const { closeContaSheet, isOpenContaSheet, id } = useContaExistente();
  const { data, isLoading } = useGetConta(id);

  const [ConfirmDialog, confirm] = useConfirm(
    "Você tem certeza?",
    "Você está prestes a deletar esta conta do seu perfil."
  );

  const mutation = useEditConta(id);
  const deleteMutation = useDeleteConta();

  const isPending = mutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: FormValuesConta) => {
    mutation.mutate(values, {
      onSuccess: () => {
        closeContaSheet();
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
            closeContaSheet();
          },
        }
      );
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpenContaSheet} onOpenChange={closeContaSheet}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Editar Conta</SheetTitle>
            <SheetDescription>Edite uma conta já existente.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <Loader size="big" />
          ) : (
            <FormConta
              id_conta={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={{
                nom_conta: data?.nom_conta ? data.nom_conta : "",
              }}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
