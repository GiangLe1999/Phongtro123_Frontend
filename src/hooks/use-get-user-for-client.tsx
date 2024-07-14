"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const useGetUserForClient = (): Session["user"] | null => {
  const { data: session } = useSession();
  if (!session) return null;
  return session.user;
};

export default useGetUserForClient;
