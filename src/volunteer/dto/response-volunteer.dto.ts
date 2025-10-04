import { ApiProperty } from "@nestjs/swagger";

import { ResponseAttendanceCertificateDto } from "./response-attendance-certificate.dto";

export class ResponseVolunteerDto {
  @ApiProperty({ description: "Volunteer identifier" })
  id: string;

  @ApiProperty({ description: "Volunteer name" })
  name: string;

  @ApiProperty({ description: "Volunteer email" })
  email: string;

  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Volunteer birthdate",
  })
  birthdate: Date;

  @ApiProperty({ description: "Related school identifier", nullable: true })
  schoolId: string | null;

  @ApiProperty({ description: "Accumulated volunteer points" })
  points: number;

  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Creation timestamp",
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Last update timestamp",
  })
  updatedAt: Date;

  @ApiProperty({
    description: "Attendance certificates issued for the volunteer",
    type: ResponseAttendanceCertificateDto,
    isArray: true,
  })
  certificates: ResponseAttendanceCertificateDto[];
}
