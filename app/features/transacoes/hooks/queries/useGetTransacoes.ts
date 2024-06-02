import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetTransacoes = () => {
  const params = useSearchParams();
  const dat_inicio = params.get("dat_inicio") || "";
  const dat_fim = params.get("dat_fim") || "";
  const id_conta = params.get("id_conta") || "";

  const query = useQuery({
    queryKey: ["transacoes", { dat_inicio, dat_fim, id_conta }],
    queryFn: async () => {
      const response = await client.api.transacoes.$get({
        query: {
          dat_fim,
          dat_inicio,
          id_conta,
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar transacoes");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
