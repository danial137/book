import React, { ReactNode } from "react";
import Header from "@/components/Header";

interface LayoutProps {
    children: ReactNode;
}

const layout = ({ children }: LayoutProps) => {
    return (
        <main className="root-container min-h-screen flex flex-col">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 md:px-16">
                <Header />
                <div className="mt-20 flex-1">{children}</div>
            </div>
        </main>
    );
};

export default layout;
