import { useCallback } from "react";

import {
  Box,
  Button,
  ContextView,
  Divider,
  Icon,
  Inline,
  Link,
} from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import { clipboardWriteText } from "@stripe/ui-extension-sdk/utils";

import BrandIcon from "./brand_icon.svg";

/**
 * This is a view that is rendered in the Stripe dashboard's customer detail page.
 * In stripe-app.json, this view is configured with stripe.dashboard.customer.detail viewport.
 * You can add a new view by running "stripe apps add view" from the CLI.
 */
const CustomerDetails = ({
  userContext,
  environment,
}: ExtensionContextValue) => {
  const CLIPBOARD_TEXT = "stripe apps add view";

  const writeToClipboard = useCallback(async () => {
    try {
      await clipboardWriteText(CLIPBOARD_TEXT);
      // Writing to the clipboard succeeded
    } catch (e) {
      // Writing to the clipboard failed
      console.error("Writing to the clipboard failed.");
    }
  }, []);

  return (
    <ContextView
      title="Customer details page"
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
      <Box css={{ font: "heading" }}>Next steps</Box>
      <Box css={{ stack: "y", rowGap: "large" }}>
        {/* UI Components resource */}
        <Box>
          Build your app with these{" "}
          <Inline>
            <Link
              external
              href="https://docs.stripe.com/stripe-apps/components"
            >
              UI Components.
            </Link>
          </Inline>
        </Box>

        {/* Creating a new view */}
        <Box>
          To create more views for your app use
          <Box
            css={{
              stack: "x",
              distribute: "space-between",
            }}
          >
            {/* Example of a UI Extension SDK method: https://docs.stripe.com/stripe-apps/reference/extensions-sdk-api#functions */}
            <Box
              css={{
                alignSelfY: "center",
                background: "container",
                borderRadius: "medium",
                padding: "small",
                fontFamily: "monospace",
              }}
            >
              $ {CLIPBOARD_TEXT}
            </Box>
            <Box css={{ alignSelfY: "center" }}>
              <Button onPress={writeToClipboard}>
                <Icon size="small" name="clipboard" />
              </Button>
            </Box>
          </Box>
        </Box>

        <Box>
          Learn more about views, authentication, and accessing data in{" "}
          <Link
            external
            href="https://stripe.com/docs/stripe-apps"
            target="_blank"
          >
            Stripe Apps docs
          </Link>
          .
        </Box>
        <Divider />
        <Box css={{ color: "info" }}>
          Edit the file{" "}
          <Inline css={{ fontFamily: "monospace" }}>
            src/views/CustomerDetails.tsx
          </Inline>{" "}
          and save to reload this view.
        </Box>
      </Box>
    </ContextView>
  );
};

export default CustomerDetails;
