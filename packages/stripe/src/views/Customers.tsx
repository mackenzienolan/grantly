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
 * This is a view that is rendered in the Stripe dashboard's customer list page.
 * In stripe-app.json, this view is configured with stripe.dashboard.customer.list viewport.
 * You can add a new view by running "stripe apps add view" from the CLI.
 */
const Customers = ({ userContext, environment }: ExtensionContextValue) => {
  return (
    <ContextView
      title="Customers page"
      brandColor="#F6F8FA" // replace this with your brand color
      brandIcon={BrandIcon} // replace this with your brand icon
      externalLink={{
        label: "Stripe Apps docs",
        href: "https://stripe.com/docs/stripe-apps",
      }}
      footerContent={
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
      }
    >
      <Box css={{ stack: "y", rowGap: "large" }}>
        <Box>
          Click on a customer (or create a new one) to navigate to that
          customer&rsquo;s detail view.
        </Box>
        <Divider />
        <Box css={{ color: "info" }}>
          Edit the file{" "}
          <Inline css={{ fontFamily: "monospace", wordBreak: "break-all" }}>
            src/views/Customers.tsx
          </Inline>{" "}
          and save to reload this view.
        </Box>
      </Box>
    </ContextView>
  );
};

export default Customers;
