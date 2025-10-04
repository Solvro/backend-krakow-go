import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChatModule } from "./chat/chat.module";
import { CoordinatorModule } from "./coordinator/coordinator.module";
import { EventModule } from "./event/event.module";
import { OrganizationModule } from "./organization/organization.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SchoolModule } from "./school/school.module";
import { SubmissionModule } from "./submission/submission.module";
import { TaskModule } from "./task/task.module";
import { VolunteerModule } from "./volunteer/volunteer.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    OrganizationModule,
    EventModule,
    SchoolModule,
    VolunteerModule,
    SubmissionModule,
    TaskModule,
    CoordinatorModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
