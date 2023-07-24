"use client";
import Link from "next/link";
import { useEffect } from "react";

import { Spinner } from "@/components/Spinner";
import { buttonVariants } from "@/components/ui/button";
import { UpdateProfileForm } from "@/components/UpdateProfileForm/UpdateProfileForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUser, signOut } from "@/store/user/actions";
import { cn } from "@/utils";

export default function Home() {
  const { username } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="container relative flex-1 flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/log-in"
        onClick={() => dispatch(signOut())}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
      >
        Log Out
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Sky Lending
        </div>
      </div>
      <div className="absolute flex px-4 py-2 left-4 top-4 md:left-8 md:top-8 lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Sky Lending
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {username && `Hello ${username}!`}
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome to Sky Lending
            </p>
          </div>
          <UpdateProfileForm />
        </div>
      </div>
    </div>
  );
}
