import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetCategorias = () => {
  const query = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => {
      const response = await client.api.categorias.$get();
      if (!response.ok) {
        throw new Error("Erro ao buscar categorias");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
