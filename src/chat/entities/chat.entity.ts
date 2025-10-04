import type { ChatType } from "@prisma/client";

import type { ChatMessageEntity } from "./chat-message.entity";
import type { ChatParticipantEntity } from "./chat-participant.entity";

export class ChatEntity {
  id: string;
  type: ChatType;
  eventId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  participants: ChatParticipantEntity[];
  messages: ChatMessageEntity[];
}
