import { supabase } from "../lib/supabaseClient";

console.log("supabase.storage", supabase.storage);

export const uploadImage = async (file) => {
  console.log("file", file);

  const fullFileName = file.name.split("."); //ger array of 2 - name and file format
  console.log("fullFileName", fullFileName);
  const fileName = fullFileName[0];
  const fileExt = fullFileName[1];

  const filePath = `${fileName}-${Math.random()}.${fileExt}`;

  console.log("filePath", filePath);

  const { data, error } = await supabase
  .storage
  .from("images")
  .upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  
  if(error) {
    return { error };
  }

  const {
    data: { publicUrl},
    error: publicUrlError,
  } = await supabase
  .storage.
  from('images')
  .getPublicUrl(data.path);
  
  if (publicUrlError) {
    return { error: publicUrlError };
  }

  return {
    error: false,
    publicUrl,
  }
  console.log(fileName, fileExt, filePath);
  console.log( {data} );
};
