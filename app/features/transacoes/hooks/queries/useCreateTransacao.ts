import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transacoes.$post>;
type RequestType = InferRequestType<typeof client.api.transacoes.$post>["json"];

export const useCreateTransacao = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transacoes.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transação criada!");
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
    },
    onError(error) {
      toast.error(`Erro ao criar Transação: ${error.message}`);
    },
  });

  return mutation;
};
