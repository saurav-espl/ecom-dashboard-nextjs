import type { Metadata } from "next";
import HomeBanner from "@/pages/components/HomeBanner";
import CategorySec from "@/pages/components/CategorySec";
import PostList from "@/pages/components/Postlist";

export const metadata: Metadata = {
  title: "Homepage | Dashboard",
  description: "Homepage | Dashboard",
};
export default function Home() {

  return (
    <>
      <div className="page_wrapper">
        <HomeBanner />
        <CategorySec />
        <PostList />
      </div>
    </>
  );
}
