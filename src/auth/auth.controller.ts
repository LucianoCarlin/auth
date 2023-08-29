import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthTokenResponseDto } from './dto/auth-tokenResponse.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('login')
  @ApiBody({
    description: 'Credenciais do usuário para autenticação',
    type: AuthLoginDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Autenticação bem-sucedida',
    type: AuthTokenResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credenciais inválidas',
  })
  @ApiBearerAuth()
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
