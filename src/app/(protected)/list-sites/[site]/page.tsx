import { DNDSection } from "@/features/popover-tools";
import { RenderSection, sortPosition } from "@/generator";
import { getSiteByUrl } from '@/shared/actions/site/get/get-site-by-url'
import { getSites } from '@/shared/actions/site/get/get-sites'
import { auth } from '@/shared/lib/auth/model/auth'
import { Component, Page, Section, Site } from '@prisma/client'

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
  params: { site },
}: {
  params: { site: string };
}) {


  const { data } = await getSiteByUrl(site)
  const session = await await auth()
  
  const userId = session?.user.id

  const isEditable = data?.userId === userId;

  // Берем секции первой страницы новосозданного сайта
  const sections = data?.pages[0].sections;

  if (!data || !sections) {
    return (
      <div className="h-screen bg-red-400 flex justify-center items-center">
        Partition data not found in database. Notice in:
        src/app/(protected)/sites/[site]/page.tsx
      </div>
    );
  }

  const promisesSections = sections.sort(sortPosition).map(RenderSection);
  const renderedSections = await Promise.all(promisesSections);

  return (
    <>
      {isEditable && <DNDSection items={renderedSections} />}
      {!isEditable && renderedSections.map(({ content }) => content)}
    </>
  );
}
