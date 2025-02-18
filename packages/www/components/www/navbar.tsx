"use client";

import { Button } from "@/components/ui/button";
import routes from "@/lib/routes";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { user } = useUser();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href={routes.www.root}
              className="text-2xl font-bold  bg-clip-text "
            >
              grantly
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-8">
                <Link
                  href={routes.www.pricing}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Pricing
                </Link>
                {/* <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Resources
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Community
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Download
                </Link> */}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Button className="text-sm hover:opacity-90" asChild>
                <Link href={routes.app.dashboard.root}>Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" className="text-sm" asChild>
                  <Link href={routes.auth.signIn}>Sign In</Link>
                </Button>
                <Button className="text-sm  hover:opacity-90" asChild>
                  <Link href={routes.auth.signUp}>Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
