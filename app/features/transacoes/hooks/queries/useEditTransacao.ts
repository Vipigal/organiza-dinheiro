import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.transacoes)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transacoes)[":id"]["$patch"]
>["json"];

export const useEditTransacao = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transacoes[":id"]["$patch"]({
        param: { id },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("transacao editada!");
      queryClient.invalidateQueries({ queryKey: ["transacao", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
      //todo: invalidate summary
    },
    onError(error) {
      toast.error(`Erro ao editar transacao: ${error.message}`);
    },
  });

  return mutation;
};
