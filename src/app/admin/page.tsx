"use client";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { UsersTable } from "@/components/UsersTable/UsersTable";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserList, signOut } from "@/store/user/actions";

export default function Home() {
  const { username } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  return (
    <div className="container relative flex-1 flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <Button
        variant={"ghost"}
        onClick={() => dispatch(signOut())}
        className={"absolute right-4 top-4 md:right-8 md:top-8"}
      >
        Log Out
      </Button>
      <div className="absolute px-4 py-2 left-4 top-4 md:left-8 md:top-8 flex items-center text-lg font-medium">
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
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {username && `Hello ${username}!`}
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome to Sky Lending
            </p>
            <p className="text-sm text-muted-foreground">Active Users List</p>
          </div>
          <UsersTable />
        </div>
      </div>
    </div>
  );
}
