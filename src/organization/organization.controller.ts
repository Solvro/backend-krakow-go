import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { ResponseOrganizationDto } from "./dto/response-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { OrganizationService } from "./organization.service";

@ApiTags("Organization")
@Controller("organization")
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: "Create organization" })
  @ApiCreatedResponse({
    description: "Created organization",
    type: ResponseOrganizationDto,
  })
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ summary: "List organizations" })
  @ApiOkResponse({
    description: "Array of organizations",
    type: ResponseOrganizationDto,
    isArray: true,
  })
  async findAll() {
    return this.organizationService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get organization by id" })
  @ApiOkResponse({
    description: "Organization",
    type: ResponseOrganizationDto,
  })
  async findOne(@Param("id") id: string) {
    return this.organizationService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update organization" })
  @ApiOkResponse({
    description: "Updated organization",
    type: ResponseOrganizationDto,
  })
  async update(
    @Param("id") id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete organization" })
  @ApiOkResponse({
    description: "Deleted organization",
    type: ResponseOrganizationDto,
  })
  async remove(@Param("id") id: string) {
    return this.organizationService.remove(id);
  }
}
