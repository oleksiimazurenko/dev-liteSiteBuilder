import { PopoverTools } from "@/features/popover-tools";
import { getSiteByUrl } from "@/shared/actions/site/get/get-site-by-url";
import { getSites } from "@/shared/actions/site/get/get-sites";
import { BuildFooter } from "@/widgets/build-footer";
import { BuildHeader } from "@/widgets/build-header";
import cn from "classnames";
import { JetBrains_Mono } from "next/font/google";

const merienda = JetBrains_Mono({ subsets: ["latin"] });

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
    description: data?.description,
  };
}

type LayoutProps = {
  children: React.ReactNode;
  params: { site: string };
};

export default async function Layout({
  children,
  params: { site },
}: LayoutProps) {
  const { data } = await getSiteByUrl(site);

  if (!data)
    return (
      <div className="flex h-screen items-center justify-center bg-red-400">
        Site URL not found in database. Notice in:
        src/app/(app)/app/list-sites/[site]/layout.tsx
      </div>
    );

  return (
    <div
      className={cn("m-auto max-w-[2400px]", {
        [merienda.className]: true,
      })}
    >
      <BuildHeader className="m-auto max-w-[2400px]" siteId={data.id} />
      {children}
      <PopoverTools />
      <BuildFooter className="m-auto max-w-[2400px]" />
    </div>
  );
}
