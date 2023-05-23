import PageLayout from "@/components/Layout/PageLayout";
import NewPostForm from "@/components/Posts/NewPostForm";
import PostHeading from "@/components/Posts/PostForm/PostHeading";
import { getCommunityData } from "../page";
import { notFound } from "next/navigation";

type SubmitPageProps = {
  params: {
    communitypage: string;
  };
};

const SubmitPage = async ({ params }: SubmitPageProps) => {
  console.log(params);
  const { communitypage } = params;
  const communityData = await getCommunityData(communitypage);
  if (!communityData || communityData == null) {
    notFound();
  }
  return (
    <PageLayout>
      <>
        <PostHeading />
        <NewPostForm />
      </>
      <>riht side</>
    </PageLayout>
  );
};

export default SubmitPage;
