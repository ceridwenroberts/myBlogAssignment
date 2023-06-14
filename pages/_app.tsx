import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "../components/root-layout";

import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { supabase } from "@/lib/supabaseClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
        <div id="root" />
      </SessionContextProvider>
    </>
  );
}

// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
// import RootLayout from "../components/root-layout";

// import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
// import { SessionContextProvider } from '@supabase/auth-helpers-react';
// import { useState } from 'react';
// import { supabase } from "../lib/supabaseClient"

// export default function App({ Component, pageProps }: AppProps) {
//     // Create a new supabase browser client on every first render.
//     // const [supabaseClient] = useState(() => createPagesBrowserClient()); //ny client, även om det redan finns i lib/supabaseClient.js

//   return (
//     <>
//         <SessionContextProvider
//       // supabaseClient={supabaseClient}
//       supabaseClient={supabase}
//       initialSession={pageProps.initialSession}
//     >
//       <RootLayout>
//         <Component {...pageProps} />
//       </RootLayout>
//       <div id="root" />
//       </SessionContextProvider>
//     </>
//   );
// }