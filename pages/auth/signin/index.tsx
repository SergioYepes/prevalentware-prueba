import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }: { providers: any }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
      <h1>Iniciar sesión</h1>
      {providers &&
        Object.values(providers).map((provider: any) => (
          <button key={provider.name} onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
            Iniciar sesión con {provider.name}
          </button>
        ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}