import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCollectionDto {
    @ApiProperty() @IsNotEmpty() title: string;
    @ApiProperty() @IsOptional() image: string;
    @ApiProperty() @IsOptional() body_html: string;
    @ApiProperty() @IsOptional() active: string;
}

export class UpdateCollectionDto {
    @ApiProperty() @IsNotEmpty() title: string;
    @ApiProperty() @IsOptional() image: string;
    @ApiProperty() @IsOptional() body_html: string;
    @ApiProperty() @IsOptional() active: string;
    @ApiProperty() @IsOptional() tags: string[];
    @ApiProperty() @IsOptional() types: string[];
    @ApiProperty() @IsOptional() handle: string;
}
