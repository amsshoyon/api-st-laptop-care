import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
enum DiscountType { 'percentage', 'amount' }

export class CreateProductDto {
    @ApiProperty() @IsNotEmpty() title: string;
    @ApiProperty() @IsNotEmpty() price: number;
    @ApiProperty() @IsOptional() image: string;
    @ApiProperty() @IsOptional() discount: number;
    @ApiProperty() @IsOptional() description: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(DiscountType, { message: 'discountType must be either `percentage` or `amount`' })
    discountType: string;
}
