"use client";

import { useNovaCategoria } from "@/app/features/categorias/hooks/zustand/useNovaCategoria";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { columns } from "./colunas";
import { useGetCategorias } from "@/app/features/categorias/hooks/queries/useGetCategorias";
import Loader from "@/components/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteCategoria } from "@/app/features/categorias/hooks/queries/useDeleteCategoria";

export default function Categorias() {
  const novaCategoria = useNovaCategoria();
  const { data, isLoading } = useGetCategorias(); //todo: add error handling
  const deleteCategoria = useDeleteCategoria();

  const isDisabled = isLoading || deleteCategoria.isPending;

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
              <CardTitle className="text-xl line-clamp-1">Categorias</CardTitle>
              <Button
                size="sm"
                className="w-full lg:w-fit"
                onClick={novaCategoria.openCategoriaSheet}
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
              filterKey="nom_categoria"
              filterLabel="Categoria"
              onDelete={async (rows) => {
                const ids = rows.map((row) => row.original.id_categoria);
                await deleteCategoria.mutateAsync({ ids });
              }}
              disabled={isDisabled}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
