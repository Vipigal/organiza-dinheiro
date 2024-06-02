import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.transacoes)["delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transacoes)["delete"]["$post"]
>["json"];

export const useDeleteTransacao = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transacoes["delete"].$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transação(ões) Deletadas!");
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
      //todo: also invalidate summary
    },
    onError(error) {
      toast.error(`Erro ao Deletar Transação(ões): ${error.message}`);
    },
  });

  return mutation;
};
