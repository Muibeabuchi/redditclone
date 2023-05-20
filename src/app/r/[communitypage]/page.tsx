import { Community } from "@/atoms/communitiesAtom";
import { notFound } from "next/navigation";
import { db } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import CommunityHeader from "@/components/Community/CommunityHeader";
import PageLayout from "@/components/Layout/PageLayout";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  params: {
    communitypage: string;
  };
};
async function getCommunityData(page: string) {
  const communityRef = doc(db, "community", page);
  // if(!communityRef) return
  const response = await getDoc(communityRef);
  console.log(response.data());
  if (!response) throw new Error("There was an error loading the page");
  if (!response.data()) notFound();
  const communityData: Community = {
    id: response?.id,
    creatorId: response?.data()?.creatorId,
    privacyType: response?.data()?.privacyType,
    numberOfMembers: response?.data()?.numberOfMembers,
    createdAt: response?.data()?.createdAt,
  };
  return JSON.parse(safeJsonStringify(communityData));
}

/* @ts-expect-error Async Server Component */
const CommunityPage: React.FC<CommunityPageProps> = async ({ params }) => {
  //   console.log(params);
  const communityData = await getCommunityData(params.communitypage);
  if (!communityData || communityData == null) {
    notFound();
  }
  console.log(communityData);
  return (
    <>
      <CommunityHeader communityData={communityData} />
      <PageLayout>
        <>
          <div>child 1</div>
        </>
        <>
          <div>child 2</div>
        </>
      </PageLayout>
    </>
  );
};

export default CommunityPage;