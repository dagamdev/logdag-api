import { PartialType } from '@nestjs/mapped-types'
import { IsOptional, IsString } from 'class-validator'

export class CreateGroupDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string
}

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
