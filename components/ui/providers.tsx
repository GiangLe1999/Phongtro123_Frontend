"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }): JSX.Element => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
