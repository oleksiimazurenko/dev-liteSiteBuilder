import { DNDComponent } from "@/features/popover-tools";
import { auth } from "@/shared/lib/auth/model/auth";
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
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";

  const promisesComponents = components.sort(sortPosition).map(RenderComponent);
  const renderedComponents = await Promise.all(promisesComponents);

  return {
    id,
    content: (
      <section
        data-id={id}
        data-section
        key={id}
        className="min-h-[230px] !bg-cover !bg-center !bg-no-repeat"
        style={sectionStyles as React.CSSProperties}
      >
        <div
          data-container
          className="container"
          style={containerStyles as React.CSSProperties}
        >
          {isAdmin ? (
            <DNDComponent items={renderedComponents} />
          ) : (
            renderedComponents.map(({ content }) => content)
          )}
        </div>
      </section>
    ),
  };
}
