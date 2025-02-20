import { Button } from "@/components/ui/button";
import routes from "@/lib/routes";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
          Everything App
          <br />
          <span className="text-muted-foreground">for your teams</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10">
          Huly, an open-source platform, serves as an all-in-one replacement of
          Linear, Jira, Slack, and Notion.
        </p>
        <Button
          className="relative group px-8 py-6 text-lg hover:opacity-90"
          asChild
        >
          <Link href={routes.auth.signUp}>Try it free</Link>
        </Button>
      </div>
    </div>
  );
}
