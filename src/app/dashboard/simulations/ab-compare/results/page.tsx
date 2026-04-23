import { Metadata } from "next";
import { Suspense } from "react";
import { AbCompareResultsClient } from "./ab-compare-results-client";

export const metadata: Metadata = {
  title: "A/B Comparison Results",
};

export default function AbCompareResultsPage() {
  return (
    <Suspense fallback={null}>
      <AbCompareResultsClient />
    </Suspense>
  );
}
