/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */

declare module "sst" {
  export interface Resource {
    "CLERK_PUBLISHABLE_KEY": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "CLERK_SECRET_KEY": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "CLERK_WEBHOOK_SECRET": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "PUBLIC_CLERK_PUBLISHABLE_KEY": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "REDIS_TOKEN": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "REDIS_URL": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "api": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "apiRouter": {
      "type": "sst.aws.Router"
      "url": string
    }
    "bus": {
      "arn": string
      "name": string
      "type": "sst.aws.Bus"
    }
    "postgres": {
      "database": string
      "host": string
      "password": string
      "port": number
      "type": "sst.aws.Postgres"
      "username": string
    }
    "vpc": {
      "type": "sst.aws.Vpc"
    }
    "www": {
      "type": "sst.aws.Nextjs"
      "url": string
    }
  }
}
/// <reference path="sst-env.d.ts" />

import "sst"
export {}