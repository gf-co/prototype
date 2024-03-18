import { User } from "@/contexts/UserContext";
import { createClient } from "@/utils/supabase/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { redirect } from "next/navigation";
import ThreadClient from "./_client";

// Reference: https://nextjs.org/docs/app/api-reference/file-conventions/page#props
export interface PageProps {
    params: Params;
    searchParams: { [key: string]: string | string[] | undefined };
};

export type Thread = {
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    user_id: string;
}

export default async function ThreadPage({ params, searchParams }: PageProps) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // Fetch thread info and messages concurrently
    const [threadResponse, messagesResponse] = await Promise.all([
        supabase
            .from('threads')
            .select('*')
            .eq('id', params.threadId)
            .maybeSingle(),
        supabase
            .from('messages')
            .select('*')
            .eq('thread_id', params.threadId)
            .order('created_at', { ascending: false })
            .limit(10)
    ]);


    // Destructure responses to extract data and errors
    const { data: threadData, error: threadError } = threadResponse;
    const { data: messagesData, error: messagesError } = messagesResponse;

    // Automatically redirects to app/error.tsx if any errors occur
    if (threadError) throw threadError;
    if (messagesError) throw messagesError;

    return <ThreadClient thread={threadData} messages={messagesData} />
}