import { MainLogo } from "@/features/editor/editor-navbar";
import { DrawerTools } from "@/features/main/drawer-tools";
import { getSiteByUrl } from "@/shared/actions/site/get/get-site-by-url";
import { getSites } from "@/shared/actions/site/get/get-sites";
import { EditorFooter } from "@/widgets/editor/editor-footer";
import cn from "classnames";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { join } from "path";

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
  params: { site: url },
}: LayoutProps) {
  const { data: site } = await getSiteByUrl(url);

  if (!site) {
    return (
      <div className="flex min-h-[calc(100svh-59.5px)] w-full flex-col items-center justify-center space-y-4 bg-red-500/20">
        <p>
          Site URL not found in database. Notice in: src/app/[site]/layout.tsx
        </p>
        <Link
          href="/"
          className={cn(
            "rounded-md p-2 text-white underline underline-offset-4 transition-all hover:scale-105 dark:text-black",
          )}
        >
          BACK HOME PAGE
        </Link>
      </div>
    );
  }

  const imagePath = join("/images/users", site.userId, site.imageName);

  return (
    <div
      className={cn("relative min-h-[calc(100svh-59.5px)]", {
        [merienda.className]: true,
      })}
    >
      {/* <EditorHeader siteId={data.id} /> */}
      {/* <MainLogo imagePath={imagePath} /> */}
      <main>{children}</main>
      <DrawerTools />
      <EditorFooter />
    </div>
  );
}
