# Grantly

[![License](https://img.shields.io/github/license/mackenzienolan/feature-entitlements-sdk)](LICENSE)
[![npm version](https://img.shields.io/npm/v/feature-entitlements-sdk)](https://www.npmjs.com/package/feature-entitlements-sdk)

A powerful integration with **Stripe** and **LemonSqueezy** that enables developers to **manage feature enablements and entitlements** effortlessly. This SDK provides an easy-to-use API to handle **metered products, credits, and flexible pricing models**, allowing developers to focus on building great applications without worrying about complex authorization logic.

## Features

- 🔑 **Feature-based Access Control** – Easily grant or revoke feature access for users.
- 📊 **Metered Usage & Credits** – Support for usage-based billing, credit systems, and metered products.
- 🔄 **Multi-Provider Support** – Seamless integration with **Stripe** & **LemonSqueezy**.
- 🏗 **Flexible Authorization Models** – Build custom entitlement models with our API/SDK.
- 🚀 **Developer-Friendly** – Save time and effort managing feature access in your apps.

## Installation

### Node.js (NPM/Yarn)

```sh
npm install feature-entitlements-sdk
# or
yarn add feature-entitlements-sdk
```

## Getting Started

### Import and Initialize

```typescript
import { EntitlementSDK } from "feature-entitlements-sdk";

const sdk = new EntitlementSDK({
  apiKey: "your_api_key_here",
  provider: "stripe", // or 'lemonsqueezy'
});
```

### Check Feature Access

```typescript
const hasAccess = await sdk.hasFeatureAccess({
  userId: "user_123",
  featureKey: "premium_feature",
});
console.log(`User has access: ${hasAccess}`);
```

### Manage Credits & Metered Usage

```typescript
await sdk.addCredits({ userId: "user_123", amount: 50 });
const usage = await sdk.recordUsage({
  userId: "user_123",
  featureKey: "api_calls",
  quantity: 10,
});
console.log(`New usage recorded:`, usage);
```

## API Reference

### `EntitlementSDK(options)`

Creates a new instance of the SDK.

#### Options

- `apiKey` (string, required): API key for authentication.
- `provider` (string, required): `stripe` or `lemonsqueezy`.

### `hasFeatureAccess(params)`

Checks if a user has access to a feature.

#### Params

- `userId` (string, required): The user's ID.
- `featureKey` (string, required): The feature to check.

### `addCredits(params)`

Adds credits to a user's account.

#### Params

- `userId` (string, required): The user's ID.
- `amount` (number, required): The number of credits to add.

### `recordUsage(params)`

Records metered usage for a feature.

#### Params

- `userId` (string, required): The user's ID.
- `featureKey` (string, required): The metered feature.
- `quantity` (number, required): The amount used.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

This SDK is **not affiliated** with Stripe or LemonSqueezy. Use at your own risk.
