"use client";
import { useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/store";

export default function ErrorToast() {
  const { toast } = useToast();
  const { error } = useAppSelector((store) => store.user);
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
  }, [error, toast]);
  return <></>;
}
