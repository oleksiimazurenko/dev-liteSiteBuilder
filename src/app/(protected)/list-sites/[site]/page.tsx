import { DNDSection } from "@/features/popover-tools";
import { RenderSection, sortPosition } from "@/generator";

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

export default async function Page({
  params: { site },
}: {
  params: { site: string };
}) {
  const { data, error } = await getSiteByUrl(site);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-slate-800 via-teal-800 to-slate-800 text-[20px] text-slate-50">
        Partition data not found in database. Error in file:
        src/app/(protected)/sites/[site]/page.tsx
      </div>
    );
  }

  const promisesSections = data.sections.sort(sortPosition).map(RenderSection);
  const renderedSections = await Promise.all(promisesSections);

  return (
    <>
      {isEditable && <DNDSection items={renderedSections} />}
      {!isEditable && renderedSections.map(({ content }) => content)}
    </>
  );
}
