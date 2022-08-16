import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateVariantDto {
    @ApiProperty() @IsNotEmpty() productId: string;
    @ApiProperty() @IsNotEmpty() option: any;
    @ApiProperty() @IsOptional() price: number;
    @ApiProperty() @IsOptional() sale_price: number;
    @ApiProperty() @IsOptional() image: string;
    @ApiProperty() @IsOptional() sku: string;
    @ApiProperty() @IsOptional() stock: number;
    @ApiProperty() @IsOptional() sell_when_out_of_stock: boolean;
}
