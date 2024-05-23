import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useCategoriaExistente } from "../hooks/zustand/useCategoriaExistente";
import { useConfirm } from "@/hooks/useConfim";
import { useDeleteCategoria } from "../hooks/queries/useDeleteCategoria";

interface Props {
  id: string;
}

export default function Actions({ id }: Props) {
  const { openCategoriaSheet, closeCategoriaSheet } = useCategoriaExistente();
  const [ConfirmDialog, confirm] = useConfirm(
    "Você tem certeza?",
    "Você está prestes a deletar esta categoria do seu perfil."
  );

  const deleteMutation = useDeleteCategoria();

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => openCategoriaSheet(id)}
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
