"use client";

import Container from "@/components/Container";
import Loader from "@/components/Loader";
import { useGetContas } from "@/hooks/querys/useGetContas";

export default function Home() {
  const { data, error, isError, isLoading } = useGetContas();

  if (isError) return <div>{error.message}</div>;

  if (isLoading) return <Loader size="big" />;

  return (
    <Container>
      <span>
        <h1 className="text-4xl font-bold ml-28 mt-20">Dashboard</h1>
        <span>
          {data?.map((conta) => {
            return (
              <span key={conta.id}>
                <p>{conta.id_usuario}</p>
              </span>
            );
          })}
        </span>
      </span>
    </Container>
  );
}
