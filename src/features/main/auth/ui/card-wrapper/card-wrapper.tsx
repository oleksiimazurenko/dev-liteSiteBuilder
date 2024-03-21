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
        "card-primary flex w-[300px] flex-col px-5 shadow-xl",
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
