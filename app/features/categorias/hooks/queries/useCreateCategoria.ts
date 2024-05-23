import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categorias.$post>;
type RequestType = InferRequestType<typeof client.api.categorias.$post>["json"];

export const useCreateCategoria = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categorias.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Categoria criada!");
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
    onError(error) {
      toast.error(`Erro ao criar Categoria: ${error.message}`);
    },
  });

  return mutation;
};
