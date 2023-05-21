import PageLayout from "@/components/Layout/PageLayout";
import NewPostForm from "@/components/Posts/NewPostForm";
import PostHeading from "@/components/Posts/PostForm/PostHeading";

const SubmitPage = () => {
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
