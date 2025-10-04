export class AttendanceCertificateEntity {
  id: string;
  volunteerId: string;
  eventId: string;
  tasksCount: number;
  points: number;
  issuedAt: Date;
}
