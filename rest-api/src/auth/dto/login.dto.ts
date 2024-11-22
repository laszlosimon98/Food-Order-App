import { OmitType } from '@nestjs/swagger';
import { AuthDTO } from './auth.dto';

export class LoginDTO extends OmitType(AuthDTO, ['full_name']) {}
