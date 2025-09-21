"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, CircleDollarSign, Settings, FileUser, Plus, Menu, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/editor", label: "Editor", icon: FileUser },
  { href: "/billing", label: "Billing", icon: CircleDollarSign },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-50 text-foreground w-full">
      <div className={`grid ${isCollapsed ? 'grid-cols-[80px_1fr]' : 'grid-cols-[260px_1fr]'} min-h-screen transition-all duration-300 w-full`}>
        <aside className="bg-sidebar text-sidebar-foreground border-r border-sidebar-border relative">
          <div className="h-16 flex items-center px-6 justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-2 font-extrabold tracking-tight text-lg">
                <div className="size-7 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600" />
                CVHero
              </div>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          <Separator />
          <nav className="p-3">
            <div className="space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                    title={isCollapsed ? label : undefined}
                  >
                    <Icon className="size-4" />
                    {!isCollapsed && label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 px-3">
              <Button className={`w-full gap-2 ${isCollapsed ? 'px-2' : ''}`} title={isCollapsed ? "New Resume" : undefined}>
                <Plus className="size-4" /> 
                {!isCollapsed && "New Resume"}
              </Button>
            </div>
          </nav>
        </aside>
        <main className="w-full">
          <header className="h-16 flex items-center justify-between px-6 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
            <Input className="w-80" placeholder="Search resumes..." />
            <div className="flex items-center gap-3">
              <UserButton />
            </div>
          </header>
          <div className="p-6 w-full max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}