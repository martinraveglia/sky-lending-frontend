"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import { finishSignOut } from "@/store/user/actions";

const useLogOutRedirect = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { signingOut } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (signingOut) {
      router.push("/log-in");
      dispatch(finishSignOut());
    }
  }, [signingOut, router, dispatch]);

  return <></>;
};

export default useLogOutRedirect;
