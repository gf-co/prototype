'use client'

import { useParams } from "next/navigation";
import { useState } from "react";

type Thread = {
  title: string;
  updated_at: string;
  user_id: string;
}

interface SidebarProps {
  threads: Thread[]
}

export default function Sidebar({ threads: firstBatch }: SidebarProps) {
  const [threads, setThreads] = useState(firstBatch);
  const { threadId } = useParams();

  console.log('Currently selected thread id: ', threadId);

  return (
    <div>
      <ul>
        {firstBatch.map((thread, index) => (
          <li key={index}>
            <h3>{thread.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
