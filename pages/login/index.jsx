import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Heading from "@components/heading";

const LoginPage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser();
  console.log(user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router])

  return (
    <>
      <Heading>Login</Heading>
      <Auth
        redirectTo="http://localhost:3000/"
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={['google', 'github']}
        socialLayout="horizontal"
      />
    </>
  )
}

export default LoginPage
