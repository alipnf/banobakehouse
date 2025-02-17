import { supabase } from "./supabase-config";

export const serviceGoogleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const serviceEmailLogin = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Ambil data pengguna dari tabel `users`
    const { data: userDoc, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (userError) throw userError;

    return userDoc;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const serviceEmailRegister = async (email, password, username) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          role: "user",
        },
      },
    });

    if (error) throw error;

    // Simpan data tambahan ke tabel `users`
    const { error: userError } = await supabase.from("users").insert([
      {
        id: data.user.id,
        email,
        name: username,
        role: "user",
      },
    ]);

    if (userError) throw userError;

    return data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const serviceLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
