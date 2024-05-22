import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.contas)["delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.contas)["delete"]["$post"]
>["json"];

export const useDeleteConta = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.contas["delete"].$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Conta(s) Deletadas!");
      queryClient.invalidateQueries({ queryKey: ["contas"] });
      //todo: also invalidate summary
    },
    onError(error) {
      toast.error(`Erro ao Deletar Conta(s): ${error.message}`);
    },
  });

  return mutation;
};
