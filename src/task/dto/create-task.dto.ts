export class CreateTaskDto {
  title: string;
  description?: string | null;
  startDate: Date;
  endDate: Date;
  isCompleted?: boolean;
  eventId: string;
  volunteerId?: string | null;
}
