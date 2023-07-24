"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { date, InferType, number, object, string } from "yup";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/store";
import { createUserInformation } from "@/store/user/actions";
import { Role } from "@/types/user";
import { cn } from "@/utils";

import { Spinner } from "../Spinner";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";

interface ProfileFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserPersonalInformationYupSchema = object({
  firstName: string()
    .min(2, "first name is too short - should be 2 chars minimum")
    .max(30, "first name is too long - should be 30 chars maximum")
    .required(),
  lastName: string()
    .min(2, "last name is too short - should be 2 chars minimum")
    .max(30, "last name is too long - should be 30 chars maximum")
    .required(),
  phone: string()
    .matches(/^\+[1-9]\d{10,12}$/, "phone number is invalid")
    .required(),
  SSN: number()
    .positive()
    .integer()
    .required()
    .test(
      "len",
      "SSN must be exactly 9 digits",
      (ssn) => ssn == null || ssn.toString().length === 9,
    ),
  DoB: date().max(new Date(), "DoB should be before today").required(),
});

export function CreateProfileForm({ className, ...props }: ProfileFormProps) {
  const router = useRouter();
  const { isLoading, role, personalInformationCreated } = useAppSelector(
    (store) => store.user,
  );
  const dispatch = useAppDispatch();

  const form = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      DoB: undefined,
      SSN: undefined,
      phone: "",
    },
    resolver: yupResolver(UserPersonalInformationYupSchema),
  });

  useEffect(() => {
    if (role) {
      if (role === Role.admin || personalInformationCreated)
        return router.replace("/");
      return router.replace("/create-profile");
    }
  }, [personalInformationCreated, router, role]);

  const onSubmit = async (
    values: InferType<typeof UserPersonalInformationYupSchema>,
  ) => {
    try {
      const response = await dispatch(createUserInformation(values)).unwrap();
      if (response.message === "SUCCESS") router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormDescription>This is your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormDescription>This is your last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    placeholder="+123456789012"
                    {...field}
                    onChange={(e) => {
                      e.target.value?.replaceAll("+", "");
                      field.onChange(
                        "+" + e.target.value?.replace(/[^0-9]|^0*/g, ""),
                      );
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Enter your phone number with format +123456789012
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="SSN"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Last Name</FormLabel>
                <FormControl>
                  <Input
                    inputMode="numeric"
                    type="string"
                    placeholder="111223333"
                    {...field}
                    onChange={(e) => {
                      field.onChange(
                        e.target.value?.replace(/[^0-9]|^0*/g, ""),
                      );
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The SSN number has a length of 9 digits
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="DoB"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Last Name</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>
                  The Date of Birth should be before today
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading === true && (
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}
