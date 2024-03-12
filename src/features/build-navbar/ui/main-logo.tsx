"use client";

import Image from "next/image";
import Link from "next/link";

type MainLogoProps = {
  siteUrl: string | undefined;
  imagePath: string | undefined;
};

export function MainLogo({ siteUrl, imagePath }: MainLogoProps) {
  return (
    <Link href={`${siteUrl}`} className="w-[50px] h-[50px] rounded-full overflow-hidden">
      <Image src={imagePath ? imagePath : "/img-icon.svg"} objectFit='cover' fill={true} alt="logo" className='!relative'/>
    </Link>
  );
}
