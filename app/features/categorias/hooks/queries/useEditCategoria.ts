import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.categorias)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categorias)[":id"]["$patch"]
>["json"];

export const useEditCategoria = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categorias[":id"]["$patch"]({
        param: { id },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Categoria editada!");
      queryClient.invalidateQueries({ queryKey: ["categoria", { id }] });
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
      //todo: invalidate summary and transactions
    },
    onError(error) {
      toast.error(`Erro ao editar categoria: ${error.message}`);
    },
  });

  return mutation;
};
