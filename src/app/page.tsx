import { Suspense } from "react";
import HomeClient from "@/components/HomeClient";
import { getSession } from "@/lib/getSession";

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
};

const HomeContent = async () => {
  const session = await getSession();

  return <HomeClient email={session?.user?.email!} />;
};

export default Home;