import { PageContent } from "@/components/layouts/PageContent";
import { NewPostForm } from "@/components/posts/NewPostForm";

export default function CommunityIdSubmitPage() {
  return (
    <PageContent>
      <>
        <div className="py-3.5 border-b border-b-white">
          <p>Create a post</p>
        </div>
        <NewPostForm />
      </>
      <>
        {/* <CommunityAbout /> */}
      </>
    </PageContent>
  )
}