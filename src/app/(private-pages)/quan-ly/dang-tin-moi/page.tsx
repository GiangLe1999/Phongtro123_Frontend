import NewPostPageContent from "@/src/components/pages/private/new-post-page/new-post-page-content";
import { getProvinces } from "@/src/queries/location";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = async () => {
  const { data } = await getProvinces();

  return <NewPostPageContent provinces={data} />;
};

export default Page;
