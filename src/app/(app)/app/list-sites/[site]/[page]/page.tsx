import { DNDSection } from "@/features/drawer-tools";
import { RenderSection, sortPosition } from "@/generator";
import { getPageByUrl } from "@/shared/actions/page/get/get-page-by-url";
import { getPages } from "@/shared/actions/page/get/get-pages";
import { getSiteById } from "@/shared/actions/site/get/get-site-by-id";
import { Component, Page, Section, Site } from "@prisma/client";

type SectionWithComponents = {
  components: Component[];
} & Section;

type PagesWithSections = {
  sections: SectionWithComponents[];
} & Page;

type SiteWithPages = {
  pages: PagesWithSections[];
} & Site;

export async function generateStaticParams() {
  const { data } = await getPages();
  if (!data) return [];

  return data.map(({ url }) => ({
    page: url,
  }));
}

export async function generateMetadata({
  params: { page },
}: {
  params: { page: string };
}) {
  const { data } = await getPageByUrl(page);

  return {
    title: data?.name,
  };
}

export default async function Page({
  params: { page },
}: {
  params: { page: string };
}) {
  const { data } = await getPageByUrl(page);

  const siteId = data?.siteId;

  if (!data || !siteId) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-slate-800 via-teal-800 to-slate-800 text-[20px] text-slate-50">
        Partition data not found in database. Error in file:
        src/app/(protected)/sites/[site]/page.tsx
      </div>
    );
  }

  const { data: site } = await getSiteById(siteId);
  const userId = site?.userId;

  // Берем секции первой страницы новосозданного сайта
  const sections = data?.sections;

  const promisesSections = sections.sort(sortPosition).map(RenderSection);
  const renderedSections = await Promise.all(promisesSections);

  return <DNDSection items={renderedSections} />;
}
