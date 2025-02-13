import { WebhookEvent } from "@clerk/backend";
import events from "@grantly/events/clerk";
import { Resource } from "sst";
import { bus } from "sst/aws/bus";

export const sendEvent = async (evt: WebhookEvent) => {
  switch (evt.type) {
    case "user.created":
      return await bus.publish(Resource.bus, events["clerk.user.created"], evt);
    case "user.updated":
      return await bus.publish(Resource.bus, events["clerk.user.updated"], evt);
    case "user.deleted":
      return await bus.publish(Resource.bus, events["clerk.user.deleted"], evt);
    case "organization.created":
      return await bus.publish(
        Resource.bus,
        events["clerk.organization.created"],
        evt
      );
    case "organization.updated":
      return await bus.publish(
        Resource.bus,
        events["clerk.organization.updated"],
        evt
      );
    case "organization.deleted":
      return await bus.publish(
        Resource.bus,
        events["clerk.organization.deleted"],
        evt
      );
    case "organizationMembership.updated":
      return await bus.publish(
        Resource.bus,
        events["clerk.organizationMembership.updated"],
        evt
      );
    case "organizationMembership.deleted":
      return await bus.publish(
        Resource.bus,
        events["clerk.organizationMembership.deleted"],
        evt
      );
    default:
      return;
  }
};
