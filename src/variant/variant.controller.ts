import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';
import { VariantService } from './variant.service';

@Controller('variant')
@ApiTags('Variants')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard())
@UseInterceptors(ResponseInterceptor)
export class VariantController {
    constructor(private variantService: VariantService) {}
}
