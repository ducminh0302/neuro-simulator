import { notFound } from "next/navigation";

import { AbVariantCompareSimulatorSection } from "@/components/simulations/ab-variant-compare-simulator-section";
import { GalaReadySimulatorSection } from "@/components/simulations/gala-ready-simulator-section";
import { HaileyBieberSimulatorSection } from "@/components/simulations/hailey-bieber-simulator-section";
import { SimulacrumFocusSimulatorSection } from "@/components/simulations/simulacrum-focus-simulator-section";
import { NiacinamideLaunchSimulatorSection } from "@/components/simulations/niacinamide-launch-simulator-section";
import { PostContentSimulatorSection } from "@/components/simulations/post-content-simulator-section";
import { WorkspaceProductivitySimulatorSection } from "@/components/simulations/workspace-productivity-simulator-section";
import { GridDataopsSimulatorSection } from "@/components/simulations/grid-dataops-simulator-section";
import { AfterboardsSimulatorSection } from "@/components/simulations/afterboards-simulator-section";
import { AfterboardsCuetIpmat2026SimulatorSection } from "@/components/simulations/afterboards-cuet-ipmat-2026-simulator-section";
import { SiteShell } from "@/components/site-shell";
import { Card, Pill, SectionHeading } from "@/components/ui";
import { getSimulationSection } from "@/lib/site";

type Props = {
  params: Promise<{
    section: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { section: sectionSlug } = await params;
  const section = getSimulationSection(sectionSlug);
  return {
    title: section ? section.title : "Simulation",
  };
}

export default async function SimulationSectionPage({ params }: Props) {
  const { section: sectionSlug } = await params;
  const section = getSimulationSection(sectionSlug);

  if (!section) {
    notFound();
  }

  return (
    <SiteShell
      active="simulate"
      title="Simulations"
      subtitle={section.title}
      ctaLabel="Run Simulation"
    >
      {section.slug === "post-content-simulator" ? (
        <PostContentSimulatorSection />
      ) : section.slug === "deep-analysis-lab" ? (
        <GalaReadySimulatorSection />
      ) : section.slug === "workspace-productivity" ? (
        <WorkspaceProductivitySimulatorSection />
      ) : section.slug === "simulacrum-focus-attention-heatmap" ? (
        <SimulacrumFocusSimulatorSection />
      ) : section.slug === "ab-variant-compare" ? (
        <AbVariantCompareSimulatorSection />
      ) : section.slug === "hailey-bieber-instagram-feed" ? (
        <HaileyBieberSimulatorSection />
      ) : section.slug === "niacinamide-launch-acne-solutions" ? (
        <NiacinamideLaunchSimulatorSection />
      ) : section.slug === "grid-dataops-india-humanoid-training" ? (
        <GridDataopsSimulatorSection />
      ) : section.slug === "afterboards-cuet-ipmat-ad-evaluation" ? (
        <AfterboardsSimulatorSection />
      ) : section.slug === "afterboards-cuet-ipmat-ad-evaluation-35s" ? (
        <AfterboardsCuetIpmat2026SimulatorSection />
      ) : (
        <SimulationPlaceholder title={section.title} summary={section.summary} />
      )}
    </SiteShell>
  );
}

function SimulationPlaceholder({ title, summary }: { title: string; summary: string }) {
  return (
    <div className="space-y-8 pb-10">
      <SectionHeading
        eyebrow="Simulation section"
        title={<>{title}</>}
        description={summary}
        action={<Pill tone="soft">Draft</Pill>}
      />

      <Card className="p-8 sm:p-10">
        <p className="kicker">Section scaffold</p>
        <h2 className="headline mt-3 text-3xl sm:text-4xl">This simulation chat section is ready for content.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          The route and sidebar thread already exist. Add the specific analysis UI here and it will appear as a dedicated simulation conversation inside the Simulations group.
        </p>
      </Card>
    </div>
  );
}
