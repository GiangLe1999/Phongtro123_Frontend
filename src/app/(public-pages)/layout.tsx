import Header from "@/src/components/layout/header";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PublicPagesLayout: FC<Props> = async ({
  children,
}): Promise<JSX.Element> => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PublicPagesLayout;
