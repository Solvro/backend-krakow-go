export class CreateVolunteerDto {
  name: string;
  email: string;
  birthdate: Date;
  schoolId?: string | null;
}
