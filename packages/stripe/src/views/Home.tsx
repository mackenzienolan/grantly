import {
  Box,
  ContextView,
  Divider,
  Inline,
  Link,
} from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";

import BrandIcon from "./brand_icon.svg";

/**
 * This is a view that is rendered in the Stripe dashboard homepage.
 * In stripe-app.json, this view is configured with stripe.dashboard.home.overview viewport.
 * You can add a new view by running "stripe apps add view" from the CLI.
 */
const Home = ({ userContext, environment }: ExtensionContextValue) => {
  return (
    <ContextView
      title="Dashboard homepage"
      brandColor="#F6F8FA" // replace this with your brand color
      brandIcon={BrandIcon} // replace this with your brand icon
      externalLink={{
        label: "Stripe Apps docs",
        href: "https://stripe.com/docs/stripe-apps",
      }}
      footerContent={
        <>
          <Box css={{ marginBottom: "medium" }}>
            Questions? Get help with your app from the{" "}
            <Link
              external
              href="https://stripe.com/docs/stripe-apps"
              target="_blank"
              type="secondary"
            >
              Stripe Apps docs
            </Link>
            ,
            <Link
              external
              href="https://support.stripe.com/"
              target="_blank"
              type="secondary"
            >
              Stripe Support
            </Link>
            , or the{" "}
            <Link
              external
              href="https://discord.com/invite/stripe"
              target="_blank"
              type="secondary"
            >
              Stripe Developers Discord
            </Link>
            .
          </Box>
        </>
      }
    >
      <Box css={{ stack: "y", rowGap: "large" }}>
        <Box>
          <Box css={{ font: "heading" }}>Welcome to Stripe Apps</Box>
          This Hello World app will introduce you to the basics of developing
          your own app and consists of three{" "}
          <Link
            external
            href="https://docs.stripe.com/stripe-apps/reference/viewports"
          >
            viewports
          </Link>
          :
        </Box>
        <Box css={{ whiteSpace: "break-spaces" }}>
          1. Dashboard homepage{" "}
          <Inline css={{ color: "secondary" }}>[currently on]</Inline> {"\n"}
          2. Customers page {"\n"}
          3. Customer details page
        </Box>
        <Box>
          First navigate to the customer list view by clicking on the{" "}
          <Inline css={{ fontFamily: "monospace" }}>Customers</Inline> tab in
          the left sidebar.
        </Box>
        <Divider />
        <Box css={{ color: "info" }}>
          Edit the file{" "}
          <Inline css={{ fontFamily: "monospace", wordBreak: "break-all" }}>
            src/views/Home.tsx
          </Inline>{" "}
          and save to reload this view.
        </Box>
      </Box>
    </ContextView>
  );
};

export default Home;
