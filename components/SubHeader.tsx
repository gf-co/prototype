import { Dispatch, SetStateAction } from "react";

interface SubHeaderProps {
    threadId: string;
    threadTitle: string;
    selectedModel: string;
    setSelectedModel: Dispatch<SetStateAction<string>>;
    models: string[];
}

export default function SubHeader({
    threadId,
    threadTitle,
    selectedModel,
    models
}: SubHeaderProps) {
    return <div>
        <h1>SubHeader</h1>
    </div>
}