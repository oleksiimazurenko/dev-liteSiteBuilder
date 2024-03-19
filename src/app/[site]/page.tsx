import { DNDSection } from "@/features/main/drawer-tools";
import { RenderSection, sortPosition } from "@/generator";
import { getSiteByUrl } from "@/shared/actions/site/get/get-site-by-url";
import { getSites } from "@/shared/actions/site/get/get-sites";
import { auth } from "@/shared/lib/auth/model/auth";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  const { data } = await getSites();
  if (!data) return [];

  return data.map(({ url }) => ({
    site: url,
  }));
}

export async function generateMetadata({
  params: { site },
}: {
  params: { site: string };
}) {
  const { data } = await getSiteByUrl(site);

  return {
    title: data?.title,
  };
}

export default async function Site({
  params: { site: siteUrl },
}: {
  params: { site: string };
}) {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const { data: site } = await getSiteByUrl(siteUrl);
  const userId = site?.userId;

  userId !== currentUserId && redirect("/app/editor/list-sites");

  // Берем секции первой страницы новосозданного сайта
  const sections = site?.pages[0].sections;

  if (!site || !sections) {
    return (
      <div className="flex items-center justify-center bg-red-400">
        Partition data not found in database. Notice in:
        src/app/(protected)/sites/[site]/page.tsx
      </div>
    );
  }

  const promisesSections = sections.sort(sortPosition).map(RenderSection);
  const renderedSections = await Promise.all(promisesSections);

  return <DNDSection items={renderedSections} />;
}
