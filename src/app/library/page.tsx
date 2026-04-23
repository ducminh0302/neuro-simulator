import { Metadata } from "next";
import { LibraryClient } from "./library-client";

export const metadata: Metadata = {
  title: "Content Library",
};

export default function LibraryPage() {
  return <LibraryClient />;
}
