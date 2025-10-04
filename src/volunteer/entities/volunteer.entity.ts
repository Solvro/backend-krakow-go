export class VolunteerEntity {
  id: string;
  name: string;
  email: string;
  birthdate: Date;
  schoolId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
