import { Controller, Get, Redirect } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@ApiTags("App")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  @ApiOperation({ summary: "Health check" })
  @ApiOkResponse({ type: String })
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Get()
  @ApiOperation({ summary: "Redirect to Swagger UI" })
  @ApiOkResponse({ type: String })
  @Redirect("/api", 302)
  redirectToApi() {
    // Intentionally empty - @Redirect handles the response
  }
}
