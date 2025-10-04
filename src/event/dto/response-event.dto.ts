import type { EventTopic } from "@prisma/client";

export class ResponseEventDto {
  id: string;
  title: string;
  topic: EventTopic;
  description: string | null;
  startDate: Date;
  endDate: Date;
  longitude: number;
  latitude: number;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}
