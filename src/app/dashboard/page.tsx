import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { House, CircleDollarSign, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <Dashboard />;
}

function Dashboard() {
  return (
    <>
      {/* Sidebar */}
      <div
        className="fixed left-0 top-0 w-[201px] h-screen flex flex-col justify-between
           bg-[linear-gradient(180deg,_#7C3BEE1A_0%,_#7C3BEE1A_100%)]"
      >
        {/* Top: Logo + Menu */}
        <div>
          <div className="flex justify-center mt-6 mb-8">
            <Image src="/logo.png" alt="Logo" className="h-[29px] w-[117px]" width={117} height={29} />
          </div>

          <nav className="flex flex-col gap-1 items-center">
            <Button className="w-[184px] justify-start gap-2 rounded-full text-[#4F46E5] bg-[#7C3BEE1A] hover:bg-[#7C3BEE1A] hover:text-[#4F46E5] shadow-none cursor-pointer font-bold">
              <House className="h-5 w-5" />
              Dashboard
            </Button>
            <Link href="/editor">
              <Button className="w-[184px] justify-start gap-2 rounded-full text-[#4F46E5] bg-[#7C3BEE1A] hover:bg-[#7C3BEE1A] hover:text-[#4F46E5] shadow-none cursor-pointer font-bold">
                <House className="h-5 w-5" />
                Editor
              </Button>
            </Link>
            <Button className="w-[184px] justify-start gap-2 rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5] shadow-none cursor-pointer">
              <CircleDollarSign className="h-5 w-5" />
              Billing
            </Button>
            <Button className="w-[184px] justify-start gap-2 rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5] shadow-none cursor-pointer">
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="ml-[201px] p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between w-full text-xl font-semibold">
          <div className="flex items-center gap-2">
            <House className="h-6 w-6" aria-hidden="true" />
            <span>Dashboard</span>
            <UserButton></UserButton>
          </div>
        </div>
      </main>
    </>
  );
}
