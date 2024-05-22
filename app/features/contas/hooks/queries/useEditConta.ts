import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.contas)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.contas)[":id"]["$patch"]
>["json"];

export const useEditConta = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.contas[":id"]["$patch"]({
        param: { id },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Conta editada!");
      queryClient.invalidateQueries({ queryKey: ["conta", { id }] });
      queryClient.invalidateQueries({ queryKey: ["contas"] });
      //todo: invalidate summary and transactions
    },
    onError(error) {
      toast.error(`Erro ao editar conta: ${error.message}`);
    },
  });

  return mutation;
};
