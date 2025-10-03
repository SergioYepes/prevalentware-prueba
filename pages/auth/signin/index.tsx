import { getProviders, signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignIn({ providers }: { providers: any }) {
  return (
    <div className="flex flex-col items-center mt-24">
      <h1 className="text-2xl font-bold mb-6">Iniciar sesión</h1>
      <div className="flex flex-col gap-4 w-64">
        {providers &&
          Object.values(providers).map((provider: any) => (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className={`flex items-center justify-center gap-3 w-full px-4 py-2 rounded-lg font-medium shadow-md transition 
                ${provider.id === "google"
                  ? "bg-red-700 border text-white hover:bg-gray-800"
                  : provider.id === "github"
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              {provider.id === "google" && <FaGoogle className="text-white" />}
              {provider.id === "github" && <FaGithub />}
              Iniciar sesión con {provider.name}
            </button>
          ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
