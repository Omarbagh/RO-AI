"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  CircleDollarSign,
  Settings,
  FileUser,
  Menu,
  ChevronLeft,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/editor", label: "Editor", icon: FileUser },
  { href: "/billing", label: "Billing", icon: CircleDollarSign },
  { href: "/profile", label: "Profile", icon: User }
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-50 text-foreground w-full flex">
      {/* Fixed Sidebar */}
      <aside
        className="h-screen fixed top-0 left-0 z-50 text-sidebar-foreground border-r border-sidebar-border"
        style={{
          background:
            "linear-gradient(180deg, rgba(79, 70, 229, 0.1) 0%, rgba(100, 49, 221, 0.1) 69.49%, rgba(109, 40, 217, 0.1) 100%)",
          width: isCollapsed ? "70px" : "220px",
          transition: "width 0.3s ease-in-out"
        }}
      >
        <div className="h-16 flex items-center px-6 justify-between backdrop-blur-sm bg-white/5">
          {!isCollapsed && (
            <div className="flex items-center gap-2 font-extrabold tracking-tight text-lg text-indigo-800">
              CVHero
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 bg-white/40 hover:bg-white/20 text-indigo-700"
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Separator className="bg-indigo-200/30" />
        <nav className="p-3">
          <div className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-black hover:bg-indigo-500/20 hover:text-indigo-800"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? label : undefined}
                >
                  <Icon className="size-5" />
                  {!isCollapsed && label}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content with proper spacing */}
      <main 
        className="flex-1 min-h-screen overflow-auto"
        style={{
          marginLeft: isCollapsed ? "70px" : "220px",
          transition: "margin-left 0.3s ease-in-out"
        }}
      >
        <div className="p-6 w-full max-w-full">{children}</div>
      </main>
    </div>
  );
}