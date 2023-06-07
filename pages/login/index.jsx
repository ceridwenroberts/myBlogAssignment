// import Heading from "@components/heading";

// export default function Login() {
//   return <Heading>Login</Heading>;
// }


import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react' //finns användare, och info om användare
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const LoginPage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser();
  const router = useRouter();
  // console.log(user);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router])


  // const [data, setData] = useState()

  // useEffect(() => {
  //   async function loadData() {
  //     const { data } = await supabaseClient.from('test').select('*')
  //     setData(data)
  //   }
  //   // Only run query once user is logged in.
  //   if (user) loadData()
  // }, [user])

  if (!user)
    return (
      <Auth
        redirectTo="http://localhost:3000/" //kopplad till providers, inte "denhär", anv useRouter
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient} //från _app.tsx
        providers={['google', 'github']}
        socialLayout="horizontal"
      />
    )

  // return (
  //   <>
  //     <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
  //     <p>user:</p>
  //     <pre>{JSON.stringify(user, null, 2)}</pre>
  //     {/* <p>client-side data fetching with RLS</p>
  //     <pre>{JSON.stringify(data, null, 2)}</pre> */}
  //   </>
  // )
}

export default LoginPage
