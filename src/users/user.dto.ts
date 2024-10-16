import { PartialType } from '@nestjs/mapped-types'
import { RegisterAuthDto } from 'src/auth/auth.dto'

export class UpdateUserDto extends PartialType(RegisterAuthDto) {}
