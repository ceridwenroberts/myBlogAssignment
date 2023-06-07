import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "../components/root-layout";

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
    // Create a new supabase browser client on every first render.
    const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <>
        <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      {/* <Component {...pageProps} /> */}

      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    
      </SessionContextProvider>
      <div id="root" />
    </>
  );
}