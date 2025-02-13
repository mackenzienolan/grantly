import {
  OrganizationInvitationJSONSchema,
  OrganizationJSONSchema,
  OrganizationMembershipJSONSchema,
  PermissionJSONSchema,
  RoleJSONSchema,
  UserJSONSchema,
  WaitlistEntryJSONSchema,
  createWebhookSchema,
} from "@macknolandev/clerk-zod";
import { defineEvent } from "../../event";

const events = {
  "clerk.user.created": defineEvent(
    "clerk.user.created",
    createWebhookSchema(UserJSONSchema)
  ),
  "clerk.user.updated": defineEvent(
    "clerk.user.updated",
    createWebhookSchema(UserJSONSchema)
  ),
  "clerk.user.deleted": defineEvent(
    "clerk.user.deleted",
    createWebhookSchema(UserJSONSchema)
  ),
  "clerk.organization.created": defineEvent(
    "clerk.organization.created",
    createWebhookSchema(OrganizationJSONSchema)
  ),
  "clerk.organization.updated": defineEvent(
    "clerk.organization.updated",
    createWebhookSchema(OrganizationJSONSchema)
  ),
  "clerk.organization.deleted": defineEvent(
    "clerk.organization.deleted",
    createWebhookSchema(OrganizationJSONSchema)
  ),
  "clerk.organizationInvitation.created": defineEvent(
    "clerk.organizationInvitation.created",
    createWebhookSchema(OrganizationInvitationJSONSchema)
  ),
  "clerk.organizationInvitation.updated": defineEvent(
    "clerk.organizationInvitation.updated",
    createWebhookSchema(OrganizationInvitationJSONSchema)
  ),
  "clerk.organizationInvitation.deleted": defineEvent(
    "clerk.organizationInvitation.deleted",
    createWebhookSchema(OrganizationInvitationJSONSchema)
  ),
  "clerk.role.created": defineEvent(
    "clerk.role.created",
    createWebhookSchema(RoleJSONSchema)
  ),
  "clerk.role.updated": defineEvent(
    "clerk.role.updated",
    createWebhookSchema(RoleJSONSchema)
  ),
  "clerk.role.deleted": defineEvent(
    "clerk.role.deleted",
    createWebhookSchema(RoleJSONSchema)
  ),
  "clerk.permission.created": defineEvent(
    "clerk.permission.created",
    createWebhookSchema(PermissionJSONSchema)
  ),
  "clerk.permission.updated": defineEvent(
    "clerk.permission.updated",
    createWebhookSchema(PermissionJSONSchema)
  ),
  "clerk.permission.deleted": defineEvent(
    "clerk.permission.deleted",
    createWebhookSchema(PermissionJSONSchema)
  ),
  "clerk.organizationMembership.created": defineEvent(
    "clerk.organizationMembership.created",
    createWebhookSchema(OrganizationMembershipJSONSchema)
  ),
  "clerk.organizationMembership.updated": defineEvent(
    "clerk.organizationMembership.updated",
    createWebhookSchema(OrganizationMembershipJSONSchema)
  ),
  "clerk.organizationMembership.deleted": defineEvent(
    "clerk.organizationMembership.deleted",
    createWebhookSchema(OrganizationMembershipJSONSchema)
  ),
  "clerk.waitlistEntry.created": defineEvent(
    "clerk.waitlistEntry.created",
    createWebhookSchema(WaitlistEntryJSONSchema)
  ),
  "clerk.waitlistEntry.updated": defineEvent(
    "clerk.waitlistEntry.updated",
    createWebhookSchema(WaitlistEntryJSONSchema)
  ),
} as const;

export default events;
