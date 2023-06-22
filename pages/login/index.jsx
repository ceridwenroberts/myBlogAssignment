import Heading from "@components/heading";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react' //finns användare, och info om användare
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const LoginPage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser();
  console.log(user);
  const router = useRouter(); //hanterar navigering i projekt
  // console.log("router", router);

  useEffect(() => {
    //om inloggad, skicka till den här URL:en (med router.push())
    if (user) {
      router.push("/");
    }
  }, [user, router])

    return (
      <>
      <Heading>Login</Heading>
      <Auth
        redirectTo="http://localhost:3000/" //kopplad till providers, inte "denhär". Vi kommer inte till den här adressen vid email inloggning.  anv useRouter
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient} //från _app.tsx
        providers={['google', 'github']}
        socialLayout="horizontal"
      />
      </>
    )
}

export default LoginPage
