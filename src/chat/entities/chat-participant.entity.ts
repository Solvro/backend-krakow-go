export class ChatParticipantEntity {
  id: string;
  chatId: string;
  volunteerId?: string | null;
  organizationId?: string | null;
  createdAt: Date;
}
