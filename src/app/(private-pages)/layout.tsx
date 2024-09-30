import { pageLinks } from "@/src/constants";
import authOptions from "@/src/lib/configs/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PrivatePagesLayout: FC<Props> = async ({
  children,
}): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (session && !session.user.verified) {
    redirect(pageLinks.verify);
  }

  if (!session) {
    redirect(pageLinks.login);
  }

  return <>{children}</>;
};

export default PrivatePagesLayout;
