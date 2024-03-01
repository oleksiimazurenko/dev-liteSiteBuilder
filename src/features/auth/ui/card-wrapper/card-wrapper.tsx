"use client";

import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import cn from "classnames";
import { Social } from "./social";

export type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
  className?: string;
};

export const CardWrapper = ({
  children,
  showSocial,
  className,
}: CardWrapperProps) => {
  return (
    <Card
      className={cn(
        "absolute bottom-5 left-1/2 z-50 flex w-[300px] -translate-x-1/2 transform flex-col border-none dark:bg-color-d2 px-5 shadow-xl bg-color-w2 md:relative md:bottom-auto md:left-auto md:translate-x-0",
        {
          [className as string]: className,
        },
      )}
    >
      {showSocial && (
        <CardHeader className="order-2 p-0 md:order-1">
          <Social />
        </CardHeader>
      )}

      <CardContent className="order-1 p-0 md:order-2">{children}</CardContent>
    </Card>
  );
};
