"use client";

import Container from "@/components/Container";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useGetContas } from "@/hooks/querys/useGetContas";
import { useNovaConta } from "@/app/features/contas/hooks/useNovaConta";

export default function Home() {
  const { data, error, isError, isLoading } = useGetContas();
  const { openContaSheet } = useNovaConta();

  if (isError) return <div>{error.message}</div>;

  if (isLoading) return <Loader size="big" />;

  return (
    <Container>
      <span>
        <h1 className="text-4xl font-bold mt-20">Dashboard</h1>
        <span>
          {data?.map((conta) => {
            return (
              <span key={conta.id_conta}>
                <p>
                  {conta.nom_conta}, Criada em: {conta.dat_registro}
                </p>
              </span>
            );
          })}
        </span>
      </span>
      <Button onClick={openContaSheet} size={"default"} className="ml-4">
        Adicionar uma conta
      </Button>
    </Container>
  );
}
