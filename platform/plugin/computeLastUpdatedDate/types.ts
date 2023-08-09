interface Profile {
  meta: {
    entityType: string;
  };
}

export interface EntitiesWebhookPayload {
  meta: {
    eventType: string;
  };
  entityId: string;
  primaryProfile: Profile;
  languageProfiles: Profile[];
  changedFields: {
    fieldNames: string[];
  };
}