import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* <div className="absolute left-5 top-5 ">
        <Link className={buttonVariants({variant:"secondary"})} href="/">
          <ArrowLeft className="size-4" />
          Go Back
        </Link>
      </div> */}

      <div className="w-full max-w-md mx-auto">
      {children}

      </div>

    </div>
  );
};

export default AuthLayout;

// RZVL-FZDL

