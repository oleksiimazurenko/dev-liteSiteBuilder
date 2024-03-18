"use client";

import {
  CheckUrlCell,
  DeleteCell,
  SwitchCell,
  ViewCell,
  ViewsCell,
} from "@/features/main/list-sites";
import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Badge } from "@/shared/ui/badge";

import { ScrollArea } from "@/shared/ui/scroll-area";

import cn from "classnames";
import { useState } from "react";

type Site = {
  id: string;
  name: string;
  imageName: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  status: boolean | null;
  views: number | null;
  url: string;
  userId: string;
};

type ListSitesMobileProps = {
  sites: Site[];
};

export default function ListSitesMobile({ sites }: ListSitesMobileProps) {
  const [valueAccordion, setValueAccordion] = useState("");

  useOutsideClick(
    !!valueAccordion,
    () => {
      setValueAccordion("");
    },
    ["[data-mobile-site-list]"],
  );

  const isRegisteredDomain = false;

  return (
    <>
      {sites && sites.length > 0 && (
        <ScrollArea className="md:hidden" data-mobile-site-list>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={valueAccordion}
            onValueChange={setValueAccordion}
          >
            {sites &&
              sites.map(({ name, status, views, url }) => (
                <AccordionItem
                  value="item-1"
                  key={url}
                  className="!border-none"
                >
                  <AccordionTrigger
                    className={cn(
                      "relative h-[20px] overflow-hidden rounded-sm p-0 [&>svg]:ml-2 [&>svg]:dark:stroke-white",
                    )}
                  >
                    <Badge
                      variant="outline"
                      className="rounded-md bg-neutral-200 dark:text-black"
                    >
                      {name}
                    </Badge>
                  </AccordionTrigger>
                  <AccordionContent className="mt-1 p-0">
                    <div className="space-y-2 rounded-md border-[0.5px] border-white/50 p-2 dark:bg-neutral-500/50">
                      <div className="flex items-center justify-between">
                        <div className="text-[12px]">STATUS - </div>
                        <SwitchCell status={status} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-[12px]">VIEWS - </div>
                        <ViewsCell value={views} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-[12px]">URL - </div>
                        <CheckUrlCell value={url} />
                      </div>

                      <div className="flex items-center justify-between">
                        <ViewCell value={url} />
                        <DeleteCell value={url} />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </ScrollArea>
      )}
    </>
  );
}
