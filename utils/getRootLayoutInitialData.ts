import { Thread } from "@/app/threads/[threadId]/_client";
import { User } from "@/contexts/UserContext";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type GetRootLayoutInitialDataType = {
  user: User;
  threads: Thread[];
}

export const getRootLayoutInitialData = async (): Promise<GetRootLayoutInitialDataType> => {
  const supabase = createClient();

  // Protected page logic
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Use Promise.all to fetch user info and thread list concurrently
  const [usersResponse, threadsResponse] = await Promise.all([
    supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single(),
    supabase
      .from('threads')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10)
  ]);

  // Destructure responses to extract data and errors
  const { data: userData, error: userError } = usersResponse;
  const { data: threadsData, error: threadsError } = threadsResponse;

  // Automatically redirects to app/error.tsx if any errors occur
  if (userError) throw userError;
  if (threadsError) throw threadsError;

  return {
    user: userData,
    threads: threadsData
  }
}
