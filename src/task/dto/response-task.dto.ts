export class ResponseTaskDto {
  id: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  eventId: string;
  volunteerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
