"use client";

import { ApolloWrapper } from "@/src/lib/apollo/wrapper";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }): JSX.Element => {
  return (
    <SessionProvider>
      <ApolloWrapper>{children}</ApolloWrapper>
    </SessionProvider>
  );
};

export default Providers;
