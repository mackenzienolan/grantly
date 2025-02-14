import { UserJSONSchema } from "@macknolandev/clerk-zod";
import { z } from "zod";

export function getPrimaryEmailAddress(user: z.infer<typeof UserJSONSchema>) {
  return (
    user.email_addresses.find(
      (email) => email.id === user.primary_email_address_id
    ) ?? user.email_addresses[0]
  )?.email_address;
}

export function getPrimaryPhoneNumber(user: z.infer<typeof UserJSONSchema>) {
  return (
    user.phone_numbers.find(
      (phone) => phone.id === user.primary_phone_number_id
    ) ?? user.phone_numbers[0]
  )?.phone_number;
}
