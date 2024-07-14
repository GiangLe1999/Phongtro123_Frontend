"use client";

import IsVerified from "@/components/wrappers/is-verified";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = () => {
  return <div>Page</div>;
};

export default IsVerified(Page);
