import { Metadata } from "next";
import AwardsClientPage from "@/components/awards/AwardsClientPage";

export const metadata: Metadata = {
  title: "Awards & Achievements | Babasaheb Kavad",
  description: "Explore achievements, recognitions and institutional milestones.",
};

export default function AwardsPage() {
  return <AwardsClientPage />;
}
