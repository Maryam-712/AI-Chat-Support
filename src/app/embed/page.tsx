import EmbedClient from '@/components/EmbedClient'
import { getSession } from '@/lib/getSession'
import { Suspense } from "react";

const Embed = () =>  {
  return (
    <Suspense fallback={<p>Loading dashboard...</p>}>
      <EmbedContent />
    </Suspense>
  );
}
const EmbedContent = async () => {
    const session = await getSession()
  return (
    <>
    <EmbedClient  ownerId = {session?.user?.id!}/>
    </>
  )
}

export default Embed