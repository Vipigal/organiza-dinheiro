import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.categorias)["delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categorias)["delete"]["$post"]
>["json"];

export const useDeleteCategoria = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categorias["delete"].$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Categoria(s) Deletadas!");
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
      //todo: also invalidate summary
    },
    onError(error) {
      toast.error(`Erro ao Deletar Categoria(s): ${error.message}`);
    },
  });

  return mutation;
};
