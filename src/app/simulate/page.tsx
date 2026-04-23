import { Metadata } from "next";
import { SimulateIndexClient } from "./simulate-index-client";

export const metadata: Metadata = {
  title: "Simulations",
};

export default function SimulateIndexPage() {
  return <SimulateIndexClient />;
}
