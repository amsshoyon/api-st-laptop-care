import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
enum DiscountType { 'percentage', 'amount' }

export class UpdateProductDto {
    @ApiProperty() @IsOptional() @IsNotEmpty() title: string;
    @ApiProperty() @IsOptional() @IsNotEmpty() price: number;
    @ApiProperty() @IsOptional() image: string;
    @ApiProperty() @IsOptional() discount: number;
    @ApiProperty() @IsOptional() description: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(DiscountType, { message: 'discountType must be either `percentage` or `amount`' })
    discountType: string;
}
