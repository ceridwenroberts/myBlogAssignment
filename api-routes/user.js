export const getUser = async () => {
  //Handle get authenticated user information
let { data: users, error } = await supabase
.from('users')
.select('*')

// console.log("user user.js route", user);

return { data, error, status }
};
