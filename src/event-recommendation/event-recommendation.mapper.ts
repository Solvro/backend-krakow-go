import type { Event, EventRecommendation } from "@prisma/client";
import type { ResponseEventDto } from "src/event/dto/response-event.dto";

import type { ResponseEventRecommendationDto } from "./dto/response-event-recommendation.dto";

type EventWithChat = Event & { chat: { id: string } | null };
export type RecommendationWithEvent = EventRecommendation & {
  event: EventWithChat;
};

export function toEventRecommendationResponse(
  recommendation: RecommendationWithEvent,
): ResponseEventRecommendationDto {
  return {
    id: recommendation.id,
    message: recommendation.message,
    coordinatorId: recommendation.coordinatorId,
    volunteerId: recommendation.volunteerId,
    eventId: recommendation.eventId,
    createdAt: recommendation.createdAt,
    updatedAt: recommendation.updatedAt,
    event: toEventResponse(recommendation.event),
  };
}

function toEventResponse(event: EventWithChat): ResponseEventDto {
  return {
    id: event.id,
    title: event.title,
    topic: event.topic,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    longitude: event.longitude,
    latitude: event.latitude,
    placeName: event.placeName,
    organizationId: event.organizationId,
    chatId: event.chat?.id ?? null,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  };
}
