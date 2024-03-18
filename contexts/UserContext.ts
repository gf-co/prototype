'use client'

import { createContext } from 'react';

export type User = {
    id: string;
    username: string;
}

export type UserContextType = {
    user: User | null; // This allows the user to be a User object or null
}


// Create a context with a default value of null for the user
const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
