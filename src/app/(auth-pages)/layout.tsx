import Header from "@/src/components/layout/header";
import { pageLinks } from "@/src/constants";
import authOptions from "@/src/lib/configs/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthPagesLayout: FC<Props> = async ({
  children,
}): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);

  if (session) redirect(pageLinks.home);

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AuthPagesLayout;
