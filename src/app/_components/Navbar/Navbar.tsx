"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();
  // const pathName = usePathname();
  const { setTheme } = useTheme();
  return (
    <nav className="w-full py-5 items-center flex justify-between">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Next <span className="text-blue-500">Pro</span>
          </h1>
        </Link>

        {/* Links */}

        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <Link className={buttonVariants({ variant: "ghost" })} href="/">
              Home
            </Link>
            <Link className={buttonVariants({ variant: "ghost" })} href="/blog">
              Blog
            </Link>
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href="/create"
            >
              Create
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <Link
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.add({
                      title: "Logged out successfully",
                      type: "success",
                    });
                    router.push("/auth/login");
                  },
                  onError: (error) => {
                    toast.add({
                      title: error.error.message,
                      type: "error",
                    });
                  },
                },
              })
            }
            className={buttonVariants()}
            href=""
          >
            Log out
          </Link>
        ) : (
          <>
            <Link className={buttonVariants()} href="/auth/sign-up">
              Sign Up
            </Link>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/auth/login"
            >
              Login
            </Link>
          </>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger
            className={buttonVariants({
              variant: "outline",
              size: "icon",
            })}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />

            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

            <span className="sr-only">Toggle theme</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
