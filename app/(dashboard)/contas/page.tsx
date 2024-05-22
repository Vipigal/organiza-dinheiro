"use client";

import { useNovaConta } from "@/app/features/contas/hooks/zustand/useNovaConta";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { columns } from "./colunas";
import { useGetContas } from "@/app/features/contas/hooks/queries/useGetContas";
import Loader from "@/components/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteConta } from "@/app/features/contas/hooks/queries/useDeleteConta";

export default function Contas() {
  const novaConta = useNovaConta();
  const { data, isLoading } = useGetContas(); //todo: add error handling
  const deleteConta = useDeleteConta();

  const isDisabled = isLoading || deleteConta.isPending;

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none shadow-md">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-48" />
            </>
          ) : (
            <>
              <CardTitle className="text-xl line-clamp-1">Contas</CardTitle>
              <Button
                size="sm"
                className="w-full lg:w-fit"
                onClick={novaConta.openContaSheet}
              >
                <Plus className="mr-2 size-4" />
                Adicionar Nova
              </Button>
            </>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader size="big" />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={data || []}
              filterKey="nom_conta"
              filterLabel="Conta"
              onDelete={async (rows) => {
                const ids = rows.map((row) => row.original.id_conta);
                await deleteConta.mutateAsync({ ids });
              }}
              disabled={isDisabled}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
