import { getPages } from "@/shared/actions/page/get/get-pages";
import { auth } from "@/shared/lib/auth/model/auth";
import cn from "classnames";
import { MainLogo } from "./main-logo";
import { NavLink } from "./nav-link";
import { getPagesBySiteId } from '@/shared/actions/page/get/get-pages-by-site-id'
import { getSiteById } from '@/shared/actions/site/get/get-site-by-id'

export type BuildNavbarProps = {
  CreatePageTrigger: () => JSX.Element;
  DeletePageTrigger: ({ idPage }: { idPage: string }) => JSX.Element;
  linkColor: "black" | "white";
  typeNavbar: "header" | "footer";
  siteId: string;
};

export async function BuildNavbar({
  linkColor,
  typeNavbar,
  CreatePageTrigger,
  DeletePageTrigger,
  siteId
}: BuildNavbarProps) {

  

  const { data } = await getPagesBySiteId(siteId);
  const imageName = (await getSiteById(siteId)).data?.imageName

  const siteUrl = data?.find(({ isMain }) => isMain === true)?.url;

  if (!data)
    return (
      <div className='bg-red-400 flex justify-center items-center'>Partition dataPages not found in database. Notice in: src/features/build-navbar/ui/build-navbar.tsx</div>
    );

  return (
    <nav
      className={cn("container flex items-end", {
        ["justify-start text-slate-100/90"]: linkColor === "white",
        ["justify-center text-slate-800/90"]: linkColor === "black",
      })}
    >
      <MainLogo siteUrl={siteUrl} imageName={imageName}/>
      <ul className="flex">
        {data
          .filter(({ isMain }) => isMain !== true)
          .map(({ id, name, url }) => (
            <li className="relative" key={id}>
              <NavLink slug={`/${url}`}>{name}</NavLink>
              <DeletePageTrigger idPage={id} />
            </li>
          ))}
        <CreatePageTrigger />
      </ul>
    </nav>
  );
}
