import { getStripeIntegration } from '@/app/(app)/app/settings/stripe/data';
import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import routes from '@/lib/routes';
import { auth } from '@clerk/nextjs/server';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default async function StripePage() {
  const stripeOAuthUrl = process.env.NEXT_PUBLIC_STRIPE_OAUTH_URL;

  const { getToken } = await auth();
  const token = await getToken();
  const [stripeIntegration] = await getStripeIntegration({ token });

  console.log(stripeIntegration);
  return (
    <div>
      <AppHeader
        breadcrumbs={[
          { title: 'Settings', href: routes.app.settings.general },
          { title: 'Stripe', href: routes.app.settings.stripe },
        ]}
      />
      <div className="p-4 space-y-4">
        <div className="max-w-2xl">
          <h2 className="text-lg font-semibold mb-2">Connect with Stripe</h2>
          <p className="text-muted-foreground mb-4">
            Connect your Stripe account to start accepting payments through your application.
          </p>
          {stripeIntegration ? (
            <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-300">
              Stripe Connected
            </Button>
          ) : (
            <Button asChild variant="outline" className="bg-white hover:bg-gray-50 border-gray-300">
              <a
                href={stripeOAuthUrl}
                className="inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/stripe-logo.svg"
                  alt="Stripe"
                  width={60}
                  height={25}
                  className="mr-1"
                />
                <span className="border-l border-gray-300 h-5 mx-2" />
                Connect with Stripe
                <ExternalLink className="h-4 w-4 ml-1 opacity-70" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
