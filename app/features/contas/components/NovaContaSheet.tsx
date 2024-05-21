import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";
import { useNovaConta } from "../hooks/zustand/useNovaConta";
import FormConta, { FormValuesConta } from "./FormConta";
import { useCreateConta } from "../hooks/queries/useCreateConta";

export default function NovaContaSheet() {
  const { closeContaSheet, isOpenContaSheet } = useNovaConta();

  const mutation = useCreateConta();

  const onSubmit = (values: FormValuesConta) => {
    mutation.mutate(values, {
      onSuccess: () => {
        closeContaSheet();
      },
    });
  };

  return (
    <Sheet open={isOpenContaSheet} onOpenChange={closeContaSheet}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Nova Conta</SheetTitle>
          <SheetDescription>
            Adicione uma nova conta para organizar suas transações.
          </SheetDescription>
        </SheetHeader>
        <FormConta
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            nom_conta: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
