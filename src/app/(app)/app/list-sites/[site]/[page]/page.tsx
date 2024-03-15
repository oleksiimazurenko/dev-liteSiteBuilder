import { DNDSection } from "@/features/drawer-tools";
import { RenderSection, sortPosition } from "@/generator";
import { getPageByUrl } from "@/shared/actions/page/get/get-page-by-url";
import { getPages } from "@/shared/actions/page/get/get-pages";
import { getSiteById } from "@/shared/actions/site/get/get-site-by-id";
import { auth } from "@/shared/lib/auth/model/auth";
import { Component, Page, Section, Site } from "@prisma/client";
import { revalidatePath } from 'next/cache'
import { redirect, useRouter } from "next/navigation";

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
  params: { page: pageUrl },
}: {
  params: { page: string };
}) {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const { data: page } = await getPageByUrl(pageUrl);
  const siteId = page?.siteId;

  if (!page || !siteId || !currentUserId) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-slate-800 via-teal-800 to-slate-800 text-[20px] text-slate-50">
        Error in file: src/app/(protected)/sites/[site]/page.tsx
      </div>
    );
  }

  const { data: site } = await getSiteById(siteId);
  const userId = site?.userId;

  if (userId !== currentUserId) {
    redirect("/app/list-sites");
  }

  // Берем секции первой страницы новосозданного сайта
  const sections = page?.sections;

  const promisesSections = sections.sort(sortPosition).map(RenderSection);
  const renderedSections = await Promise.all(promisesSections);

  return <DNDSection items={renderedSections} />;
}
