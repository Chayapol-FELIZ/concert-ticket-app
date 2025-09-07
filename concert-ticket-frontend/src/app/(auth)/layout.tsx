
import Sidebar from "@/components/Sidebar";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full min-h-screen font-sans bg-gray-100">
            <Sidebar />
            {children}
        </div>
    )
}