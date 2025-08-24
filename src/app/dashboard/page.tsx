'use client';

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { House, Files, Mail, CircleDollarSign } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <>
      <div className="relative w-[201px] h-screen flex flex-col justify-between 
        bg-[linear-gradient(180deg,_#7C3BEE1A_0%,_#7C3BEE1A_100%)]"
      >
        {/* Bovenkant: Logo + Menu */}
        <div>
          {/* Logo */}
          <div className="flex justify-center mt-6 mb-8">
            <img src="logo.png" alt="Logo" className="h-[29px] w-[117px]" />
          </div>

          {/* Menu buttons */}
          <div className="flex flex-col gap-1 items-center h-[200px]">
              <Button
                className="w-[184px] justify-start rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5]"
              >
                <House className=" h-5 w-5" />
                Dashboard
              </Button>
              <Button
            className="w-[184px] justify-start rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5]"
              >
                <Files className="h-5 w-5" />
            Resumes
              </Button>
              <Button
            className="w-[184px] justify-start rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5]"
              >
                <Mail className=" h-5 w-5" />
            Cover Letter
              </Button>
              <Button
            className="w-[184px] justify-start rounded-full text-black bg-transparent hover:bg-[#7C3BEE1A] hover:text-[#4F46E5]"
              >
                 <CircleDollarSign className="h-5 w-5" />
            Billing
              </Button>
          </div>
        </div>

        {/* Onderkant: user info */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 p-2 w-[180px] h-[40px] bg-white rounded-full shadow">
            <UserButton />
            <span className="text-gray-800 font-medium truncate">
              {user?.fullName}
            </span>
          </div>
        </div>
      </div>

      {/* Top Dashboard */}
      <div className="">

      </div>
    </>
    
  );
}
