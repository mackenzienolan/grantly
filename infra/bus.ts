import { postgres } from "./db";
import { REDIS_SECRETS } from "./redis";
import { API_SECRETS } from "./secrets";

export const bus = new sst.aws.Bus("bus");

const DEFAULT_LINK = [...API_SECRETS, ...REDIS_SECRETS, postgres];

bus.subscribe(
  "clerkUserCreated",
  {
    handler: "packages/functions/src/bus/clerk/user/created/insert.handler",
    link: DEFAULT_LINK,
  },
  {
    pattern: {
      detailType: ["clerk.user.created"],
    },
  }
);
bus.subscribe(
  "clerkUserUpdated",
  {
    handler: "packages/functions/src/bus/clerk/user/updated/sync.handler",
    link: DEFAULT_LINK,
  },
  {
    pattern: {
      detailType: ["clerk.user.updated"],
    },
  }
);
bus.subscribe(
  "clerkUserDeleted",
  {
    handler:
      "packages/functions/src/bus/clerk/user/deleted/soft-delete.handler",
    link: DEFAULT_LINK,
  },
  {
    pattern: {
      detailType: ["clerk.user.deleted"],
    },
  }
);
bus.subscribe(
  "clerkOrganizationCreated",
  {
    handler:
      "packages/functions/src/bus/clerk/organization/created/insert.handler",
    link: DEFAULT_LINK,
  },
  {
    pattern: {
      detailType: ["clerk.organization.created"],
    },
  }
);
bus.subscribe(
  "clerkOrganizationUpdated",
  {
    handler:
      "packages/functions/src/bus/clerk/organization/updated/sync.handler",
    link: DEFAULT_LINK,
  },
  {
    pattern: {
      detailType: ["clerk.organization.updated"],
    },
  }
);
bus.subscribe(
  "clerkOrganizationDeleted",
  {
    handler:
      "packages/functions/src/bus/clerk/organization/deleted/soft-delete.handler",
    link: DEFAULT_LINK,
  },
  {
    pattern: {
      detailType: ["clerk.organization.deleted"],
    },
  }
);
bus.subscribe(
  "clerkOrganizationMembershipCreated",
  {
    handler:
      "packages/functions/src/bus/clerk/organizationMembership/created/insert.handler",
    link: DEFAULT_LINK,
  },
  {
    pattern: {
      detailType: ["clerk.organizationMembership.created"],
    },
  }
);
bus.subscribe(
  "clerkOrganizationMembershipUpdated",
  {
    handler:
      "packages/functions/src/bus/clerk/organizationMembership/updated/sync.handler",
    link: DEFAULT_LINK,
  },
  {
    pattern: {
      detailType: ["clerk.organizationMembership.updated"],
    },
  }
);
bus.subscribe(
  "clerkOrganizationMembershipDeleted",
  {
    handler:
      "packages/functions/src/bus/clerk/organizationMembership/deleted/soft-delete.handler",
    link: DEFAULT_LINK,
  },
  {
    pattern: {
      detailType: ["clerk.organizationMembership.deleted"],
    },
  }
);
