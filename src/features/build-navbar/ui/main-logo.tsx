"use client";

import Image from "next/image";
import Link from "next/link";

type MainLogoProps = {
  siteUrl: string | undefined;
  imageName?: string | null;
};

export function MainLogo({ siteUrl, imageName }: MainLogoProps) {
  return (
    <Link href={`${siteUrl}`} className="px-[20px]">
      <Image src={imageName ? `/${imageName}` : "/img-icon.svg"} width={50} height={50} alt="logo" />
    </Link>
  );
}
