import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { getRootLayoutInitialData } from "@/utils/getRootLayoutInitialData";
import UserContext from '@/contexts/UserContext'; // Adjust the import path based on your file structure
import ThreadContext from "@/contexts/ThreadContext";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, threads } = await getRootLayoutInitialData();

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <UserContext.Provider value={{ user }}>
          <ThreadContext.Provider value={{ currentEditingThreadId: "", currentEditingThreadTitle: "", isEditingThreadTitle: false }}>
            <main className="min-h-screen flex flex-col items-center">
              <Sidebar threads={threads} />
              <Header />
              <Main>
                {children}
              </Main>
            </main>
          </ThreadContext.Provider>
        </UserContext.Provider>
      </body>
    </html>
  );
}
