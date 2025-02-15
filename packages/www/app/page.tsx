import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyList,
  TypographyP,
} from "@/components/ui/typography";

export default function Page() {
  return (
    <div>
      <main>
        <section id="hero" className="bg-gray-100 py-20">
          <div className="container mx-auto px-6 text-center">
            <TypographyH1>Entitlements Made Simple</TypographyH1>
            <TypographyP>
              Seamlessly manage user permissions and feature access for your
              SaaS application with Stripe and Lemon Squeezy integration.
            </TypographyP>
            <a
              href="#"
              className="bg-accent text-primary px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
            >
              Start Building
            </a>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-6">
            <TypographyH2>Why Choose Us</TypographyH2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <TypographyH3>Multi-Payment Integration</TypographyH3>
                <TypographyP>
                  Native support for both Stripe and Lemon Squeezy payment
                  processing.
                </TypographyP>
              </div>
              <div className="text-center">
                <TypographyH3>Feature Flags</TypographyH3>
                <TypographyP>
                  Granular control over feature access based on subscription
                  tiers.
                </TypographyP>
              </div>
              <div className="text-center">
                <TypographyH3>Developer-First API</TypographyH3>
                <TypographyP>
                  Simple REST API with comprehensive SDKs for major languages.
                </TypographyP>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-gray-100 py-20">
          <div className="container mx-auto px-6">
            <TypographyH2>Simple Pricing</TypographyH2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <TypographyH3>Starter</TypographyH3>
                <TypographyP>
                  $49<span className="text-sm font-normal">/month</span>
                </TypographyP>
                <TypographyList>
                  <li>Up to 1,000 users</li>
                  <li>Basic feature flags</li>
                  <li>Stripe OR Lemon Squeezy</li>
                </TypographyList>
                <a
                  href="#"
                  className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Choose Plan
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <TypographyH3>Growth</TypographyH3>
                <TypographyP>
                  $99<span className="text-sm font-normal">/month</span>
                </TypographyP>
                <TypographyList>
                  <li>Up to 10,000 users</li>
                  <li>Advanced feature flags</li>
                  <li>Both payment providers</li>
                </TypographyList>
                <a
                  href="#"
                  className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Choose Plan
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <TypographyH3>Scale</TypographyH3>
                <TypographyP>
                  $249<span className="text-sm font-normal">/month</span>
                </TypographyP>
                <TypographyList>
                  <li>Unlimited users</li>
                  <li>Custom integrations</li>
                  <li>Priority support</li>
                </TypographyList>
                <a
                  href="#"
                  className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Choose Plan
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-6 text-center">
            <TypographyH2>Ready to Simplify Your Entitlements?</TypographyH2>
            <TypographyP>
              Join other developers who trust us with their entitlements
              management.
            </TypographyP>
            <a
              href="#"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
            >
              Get API Access
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <TypographyP>
            &copy; {new Date().getFullYear()} Grantly. All rights reserved.
          </TypographyP>
        </div>
      </footer>
    </div>
  );
}
