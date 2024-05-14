import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader } from "lucide-react";

function Cadastro() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-orange-500 w-full h-full hidden lg:flex items-center justify-center">
        LOGIN LOGO
      </div>
      <div className="flex items-center justify-center flex-col gap-3">
        <h1 className="text-2xl font-bold">Seja Muito Bem Vindo!</h1>
        <p className="text-gray-400">Entre ou crie uma conta para continuar</p>
        <ClerkLoaded>
          <SignUp />
        </ClerkLoaded>
        <ClerkLoading>
          <div className="p-40 py-[13.5rem] flex items-center justify-center">
            <Loader size="small" />
          </div>
        </ClerkLoading>
      </div>
    </div>
  );
}

export default Cadastro;
