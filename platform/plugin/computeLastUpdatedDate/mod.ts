import { EntitiesWebhookPayload } from "./types.ts";

declare const API_KEY: string;
declare const LAST_UPDATED_DATE_FIELD_ID: string;

export async function updateLastUpdatedDate(event: EntitiesWebhookPayload) {
  if (!(isEntityCreate(event) || isEntityUpdate(event))) return;

  const today = new Date();
  const timestamp = `${today.getFullYear()}-${
    String(today.getMonth() + 1).padStart(2, "0")
  }-${String(today.getDate()).padStart(2, "0")}`;

  const updateReqBody = { [LAST_UPDATED_DATE_FIELD_ID]: timestamp };

  const headers = new Headers();
  headers.set("content-type", "application/json");
  const res = await fetch(
    `https://api.yext.com/v2/accounts/me/entities/${event.entityId}?v=20221010&api_key=${API_KEY}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(updateReqBody),
    },
  );

  const json = await res.json();
  console.log("The response JSON is", json);
  return json;
}

function isEntityCreate(event: EntitiesWebhookPayload) {
  return event.meta.eventType === "ENTITY_CREATED";
}

function isEntityUpdate(event: EntitiesWebhookPayload) {
  return event.meta.eventType === "ENTITY_UPDATED";
}
