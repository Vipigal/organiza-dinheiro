import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

function Login() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center flex-col gap-3">
        <h1 className="text-2xl font-bold">Bem Vindo de Volta!</h1>
        <p className="text-gray-400">Entre ou crie uma conta para continuar</p>
        <ClerkLoaded>
          <SignIn />
        </ClerkLoaded>
        <ClerkLoading>
          <div className="p-40 py-[13.5rem] flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        </ClerkLoading>
      </div>
      <div className="bg-orange-500 w-full h-full hidden lg:flex items-center justify-center">
        LOGIN LOGO
      </div>
    </div>
  );
}

export default Login;
