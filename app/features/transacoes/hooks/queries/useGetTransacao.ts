import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetTransacao = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transacao", { id }],
    queryFn: async () => {
      const response = await client.api.transacoes[":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar transacao");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
