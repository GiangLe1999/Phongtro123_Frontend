"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import useGetUserForClient from "@/src/hooks/use-get-user-for-client";
import { pageLinks } from "@/src/constants";

const IsVerified = (Component: any) => {
  return function IsVerified(props: any) {
    const user = useGetUserForClient();
    const isVerified = user?.verified;

    useEffect(() => {
      if (!isVerified) {
        return redirect(pageLinks.verify);
      }
    }, []);

    if (!isVerified) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default IsVerified;
