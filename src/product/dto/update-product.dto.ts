import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
enum DiscountType { 'percentage', 'amount' }

export class UpdateProductDto {
    @ApiProperty() @IsOptional() title: string;
    @ApiProperty() @IsOptional() price: number;
    @ApiProperty() @IsOptional() sale_price: number;
    @ApiProperty() @IsOptional() media: string[];
    @ApiProperty() @IsOptional() discount: number;
    @ApiProperty() @IsOptional() description: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(DiscountType, { message: 'discountType must be either `percentage` or `amount`' })
    discountType: string;

    @ApiProperty() @IsOptional() status: boolean;
    @ApiProperty() @IsOptional() tags: string[];
    @ApiProperty() @IsOptional() sku: string;
    @ApiProperty() @IsOptional() stock: number;
    @ApiProperty() @IsOptional() sell_when_out_of_stock: boolean;
    @ApiProperty() @IsOptional() options: { name: string, value: string[] }[];
    @ApiProperty() @IsOptional() vendor: string;
    @ApiProperty() @IsOptional() physical_product: boolean;
    @ApiProperty() @IsOptional() suffix: string;
    @ApiProperty() @IsOptional() categoryId: string;
    @ApiProperty() @IsOptional() collections: string[];
}
