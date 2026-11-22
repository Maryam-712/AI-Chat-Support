import DashboardClient from "@/components/DashboardClient";
import { getSession } from "@/lib/getSession";

import { redirect } from "next/navigation";

// app/dashboard/page.tsx

import { Suspense } from "react";


const Dashboard = () =>  {
  return (
    <Suspense fallback={<p>Loading dashboard...</p>}>
      <DashboardContent />
    </Suspense>
  );
}

const DashboardContent = async() => {
  const session = await getSession();


  return <DashboardClient ownerId = {session?.user?.id!} />
    
}

export default Dashboard