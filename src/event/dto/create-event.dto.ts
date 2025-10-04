import type { EventTopic } from "@prisma/client";

export class CreateEventDto {
  title: string;
  topic: EventTopic;
  description?: string | null;
  startDate: Date;
  endDate: Date;
  longitude: number;
  latitude: number;
  organizationId: string;
}
