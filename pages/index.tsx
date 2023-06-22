import Heading from "@components/heading";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

// export default function Home() {
//   const user = useUser;
//   return <Heading>Home</Heading>
// }

export default function Home() {
  const user = useUser()
  const supabaseClient = useSupabaseClient()
  return <>
  <Heading>Home</Heading>
  <div>
      <h1>Welcome to my app</h1>
      {user ? (
        <p> Welcome {user.email}</p>
      ) : (
        <p>To write post, please login</p>
      )}
      </div>
      
  </>
}


// import { useState, useEffect } from 'react'

// function MyComponent() {
//   const user = useUser()
//   const supabaseClient = useSupabaseClient()
//   const [data, setData] = useState()

//   useEffect(() => {
//     async function loadData() {
//       const { data } = await supabaseClient.from('my_table').select('*')
//       setData(data)
//     }
//     if (user) loadData()
//   }, [user])

//   return (
//     <div>
//       <h1>Welcome to my app</h1>
//       {user ? (
//         <button >Is user</button>
//       ) : (
//         <p>No user</p>
//       )}
//       {/* <div>
//         {data ? (
//           <ul>
//             {data.map((item) => (
//               <li key={item.id}>{item.name}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>Loading data...</p>
//         )}
//       </div> */}
//     </div>
//   )
// }
