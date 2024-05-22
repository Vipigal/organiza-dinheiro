import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useContaExistente } from "../hooks/zustand/useContaExistente";
import { useConfirm } from "@/hooks/useConfim";
import { useDeleteConta } from "../hooks/queries/useDeleteConta";

interface Props {
  id: string;
}

export default function Actions({ id }: Props) {
  const { openContaSheet, closeContaSheet } = useContaExistente();
  const [ConfirmDialog, confirm] = useConfirm(
    "Você tem certeza?",
    "Você está prestes a deletar esta conta do seu perfil."
  );

  const deleteMutation = useDeleteConta();

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => openContaSheet(id)}
            className="cursor-pointer"
          >
            <Edit className="size-4 mr-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={onDelete}
            className="cursor-pointer text-red-500 focus:text-red-500 "
          >
            <Trash className="size-4 mr-2" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
