import { DrawerTools } from "@/features/main/drawer-tools";
import { getSiteByUrl } from "@/shared/actions/site/get/get-site-by-url";
import { getSites } from "@/shared/actions/site/get/get-sites";
import { EditorFooter } from "@/widgets/editor/editor-footer";
import { EditorHeader } from "@/widgets/editor/editor-header";
import cn from "classnames";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";

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
      <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-red-400">
        <p>
          {" "}
          Site URL not found in database. Notice in:
          src/app/(app)/app/home/[site]/layout.tsx
        </p>
        <Link
          href="/app/home"
          className={cn(
            "rounded-md p-2 text-white underline underline-offset-4 transition-all hover:scale-105 dark:text-black",
          )}
        >
          Go back
        </Link>
      </div>
    );

  return (
    <div
      className={cn("m-auto max-w-[2400px]", {
        [merienda.className]: true,
      })}
    >
      <EditorHeader siteId={data.id} />
      <main>{children}</main>
      <DrawerTools />
      <EditorFooter />
    </div>
  );
}
