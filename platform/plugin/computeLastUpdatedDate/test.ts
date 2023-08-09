// deno-lint-ignore-file no-var
import { updateLastUpdatedDate } from './mod.ts'
import sampleEntitiesWebhook from './testing/sampleWebhook.json' assert {
    type: "json",
  };

declare global {
  var API_KEY: string;
  var LAST_UPDATED_DATE_FIELD_ID: string;
}

// ADD YOUR GLOBAL VARIABLES FOR TESTING HERE
globalThis.API_KEY = "MY_API_KEY"; // an API Key which has R/W permissions on the Entities API
globalThis.LAST_UPDATED_DATE_FIELD_ID = "FIELD_ID_TO_WRITE_LAST_UPDATED_DATE_TO"; // The ID of the field which you plan to write the update to

Deno.test("Test Processing a Webhook and Updating Last Updated Timestamp", async () => {
    const _entity = await updateLastUpdatedDate(sampleEntitiesWebhook);
  });