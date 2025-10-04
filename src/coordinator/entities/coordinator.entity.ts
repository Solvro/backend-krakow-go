export class CoordinatorEntity {
  id: string;
  name: string;
  email: string;
  schoolId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
