import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
    @ApiProperty() @IsNotEmpty() title: string;
    @ApiProperty() @IsNotEmpty() price: number;
    @ApiProperty() @IsOptional() image: string;
    @ApiProperty() @IsOptional() description: string;
}
