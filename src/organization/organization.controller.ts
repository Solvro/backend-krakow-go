import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { OrganizationService } from "./organization.service";

@ApiTags("Organization")
@Controller("organization")
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: "Create organization" })
  @ApiOkResponse({ description: "Created organization" })
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ summary: "List organizations" })
  @ApiOkResponse({ description: "Array of organizations" })
  async findAll() {
    return this.organizationService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get organization by id" })
  @ApiOkResponse({ description: "Organization" })
  async findOne(@Param("id") id: string) {
    return this.organizationService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update organization" })
  @ApiOkResponse({ description: "Updated organization" })
  async update(
    @Param("id") id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete organization" })
  @ApiOkResponse({ description: "Deletion result" })
  async remove(@Param("id") id: string) {
    return this.organizationService.remove(id);
  }
}
