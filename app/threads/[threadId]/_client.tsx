import SubHeader from "@/components/SubHeader";
import { MODELS } from "@/contants/models";
import { useState } from "react";

export type Thread = {
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    user_id: string;
}

type Message = {
    id: string;
    created_at: string;
    content: string;
    thread_id: string;
    sender: string;
}

type ThreadClientProps = {
    thread: Thread;
    messages: Message[]
}

export default function ThreadClient({ thread: threadInitialData, messages: messagesInitialData }: ThreadClientProps) {
    const [thread, setThread] = useState(threadInitialData);
    const [messages, setMessages] = useState(messagesInitialData);
    const models = MODELS;
    const [selectedModel, setSelectedModel] = useState(models[0]);

    return <div>
        <SubHeader models={models} selectedModel={selectedModel} threadId={thread.id} setSelectedModel={setSelectedModel} threadTitle={thread.title} />
        <div>
            <code>{JSON.stringify(thread)}</code>
            <code>{JSON.stringify(messages)}</code>
        </div>
    </div>
}