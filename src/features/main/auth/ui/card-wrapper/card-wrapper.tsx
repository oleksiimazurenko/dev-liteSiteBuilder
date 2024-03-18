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
        "flex w-[300px] flex-col border-b-[0.2px] border-border/20 bg-background/95 px-5 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/10",
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
