import { NextPage } from "next";

interface Props {}

const page: NextPage<Props> = () => {
  return (
    <div className="bg-background min-h-screen">
      <main className="max-w-[600px] mx-auto py-16">page</main>
    </div>
  );
};

export default page;
