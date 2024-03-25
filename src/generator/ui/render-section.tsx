import { DNDComponent } from "@/features/editor/drawer-tools";
import { Component, Section } from "@prisma/client";
import { sortPosition } from "../utils/sortPosition";
import { RenderComponent } from "./render-component";

type RenderSectionType = {
  components: Component[];
} & Section;

export async function RenderSection({
  id,
  sectionStyles,
  containerStyles,
  components,
}: RenderSectionType) {
  // const session = await auth();

  const promisesComponents = components.sort(sortPosition).map(RenderComponent);
  const renderedComponents = await Promise.all(promisesComponents);

  return {
    id,
    content: (
      <section
        key={id}
        data-id={id}
        data-outer
        data-section
        className="min-h-[230px] !bg-cover !bg-center !bg-no-repeat"
        style={sectionStyles as React.CSSProperties}
      >
        <div
          data-inner
          data-container
          className="container"
          style={containerStyles as React.CSSProperties}
        >
          <DNDComponent items={renderedComponents} />
        </div>
      </section>
    ),
  };
}
