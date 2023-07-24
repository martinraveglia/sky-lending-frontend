"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppDispatch, useAppSelector } from "@/store";
import { logIn, signUp } from "@/store/user/actions";
import { Role } from "@/types/user";
import { cn } from "@/utils";
import { PASSWORD_VALIDATION } from "@/utils/regexs";

import { Spinner } from "../Spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isLogIn: boolean;
}

const CredentialYupSchema = object({
  username: string()
    .required("username is required")
    .min(2, "username is too short - 2 characters minimum")
    .max(30, "username is too long - 30 characters maximum"),
  password: string()
    .required("password is required")
    .matches(PASSWORD_VALIDATION, "password is invalid"),
});

export function AuthForm({ className, isLogIn, ...props }: AuthFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, role, error, personalInformationCreated } = useAppSelector(
    (store) => store.user,
  );
  const { toast } = useToast();

  const form = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: { username: "", password: "" },
    resolver: yupResolver(CredentialYupSchema),
  });

  useEffect(() => {
    if (role) {
      if (role === Role.admin || personalInformationCreated)
        return router.replace("/");
      return router.replace("/create-profile");
    }
  }, [personalInformationCreated, router, role]);

  const onSubmit = async ({
    username,
    password,
  }: InferType<typeof CredentialYupSchema>) => {
    if (isLogIn) {
      return dispatch(logIn({ username, password }));
    }
    return dispatch(signUp({ username, password }));
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormDescription>
                  Minimum 8 characters, maximum 50 characters, at least one
                  lowercase letter, one uppercase letter and one number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading === true && (
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLogIn ? "Log In" : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
