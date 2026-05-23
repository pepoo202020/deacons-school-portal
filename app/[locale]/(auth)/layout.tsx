import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen w-screen overflow-hidden">
            {children}
        </main>
    );
}