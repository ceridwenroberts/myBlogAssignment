import Heading from "@components/heading";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Home() {
  const user = useUser()
  const supabaseClient = useSupabaseClient()
  return <>
  <Heading>Home</Heading>
  <div>
      <h1>Welcome to an åsöm blog</h1>
      {user ? (
        <p> Welcome. Your contact email is {user.email}</p>
      ) : (<>
        <p>Read and comment? – Go ahead! </p> 
        <p>To write post, please login.</p>
        </>
      )}
      </div>
      
  </>
}