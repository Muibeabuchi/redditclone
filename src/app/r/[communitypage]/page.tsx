import { Community } from "@/atoms/communitiesAtom";
import { notFound } from "next/navigation";
import { db } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import CommunityHeader from "@/components/Community/CommunityHeader";
import PageLayout from "@/components/Layout/PageLayout";
import safeJsonStringify from "safe-json-stringify";
import CommunityCreatePostLink from "@/components/Community/CommunityCreatePostLink";
import Posts from "@/components/Posts/Posts";
import CommunityAbout from "@/components/Community/CommunityAbout/CommunityAbout";

type CommunityPageProps = {
  params: {
    communitypage: string;
  };
};

export const dynamic = "force-dynamic";

export async function getCommunityData(page: string) {
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
    imageUrl: response?.data()?.imageUrl,
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
  // console.log(communityData);
  return (
    <>
      <CommunityHeader communityData={communityData} />
      <PageLayout>
        <>
          <CommunityCreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <CommunityAbout communityData={communityData} />
        </>
      </PageLayout>
    </>
  );
};

export default CommunityPage;
