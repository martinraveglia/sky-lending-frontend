"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
import { getUser, updateUserInformation } from "@/store/user/actions";
import { cn } from "@/utils";

import { Spinner } from "../Spinner";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";

interface ProfileFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserPersonalInformationYupSchema = object({
  firstName: string()
    .min(2, "first name is too short - should be 2 chars minimum")
    .max(30, "first name is too long - should be 30 chars maximum"),
  lastName: string()
    .min(2, "last name is too short - should be 2 chars minimum")
    .max(30, "last name is too long - should be 30 chars maximum"),
  phone: string().matches(/^\+[1-9]\d{10,12}$/, "phone number is invalid"),
  SSN: number()
    .positive()
    .integer()
    .test(
      "len",
      "SSN must be exactly 9 digits",
      (ssn) => ssn == null || ssn.toString().length === 9,
    ),
  DoB: date().max(new Date(), "DoB should be before today"),
});

export function UpdateProfileForm({ className, ...props }: ProfileFormProps) {
  const { isLoading, personalInformation } = useAppSelector(
    (store) => store.user,
  );
  const dispatch = useAppDispatch();

  const form = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: personalInformation,
    resolver: yupResolver(UserPersonalInformationYupSchema),
  });

  useEffect(() => {
    form.reset(personalInformation);
  }, [form, personalInformation]);

  const onSubmit = async (
    values: InferType<typeof UserPersonalInformationYupSchema>,
  ) => {
    try {
      await dispatch(updateUserInformation(values));
      await dispatch(getUser());
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
                  <Input type="number" placeholder="111222333" {...field} />
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
                            format(new Date(field.value), "PPP")
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
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
}
