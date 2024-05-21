import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetContas = () => {
  const query = useQuery({
    queryKey: ["contas"],
    queryFn: async () => {
      const response = await client.api.contas.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch contas");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
