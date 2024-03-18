'use client'

import { createContext } from 'react';


export type ThreadContextType = {
    isEditingThreadTitle: boolean;
    currentEditingThreadId: string;
    currentEditingThreadTitle: string;
}


// Create a context with a default value of null for the user
const ThreadContext = createContext<ThreadContextType | null>(null);

export default ThreadContext;
