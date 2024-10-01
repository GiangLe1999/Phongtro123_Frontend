import { FC } from "react";
import PrivateSidebarContent from "./private-sidebar-content";
import { getServerSession } from "next-auth";
import authOptions from "@/src/lib/configs/auth/authOptions";

interface Props {}

const PrivateSidebar: FC<Props> = async (props): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <PrivateSidebarContent session={session} />
    </>
  );
};

export default PrivateSidebar;
