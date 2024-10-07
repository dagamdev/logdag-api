import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator'

export class CreateLogDto {
  @IsUUID()
  @IsOptional()
  groupId?: string

  @IsString()
  content: string

  @IsOptional()
  @IsDateString()
  eventDate?: string
}
