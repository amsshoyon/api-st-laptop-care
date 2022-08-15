import { Transform } from 'class-transformer';
import { IsOptional, IsNotEmpty, Min, IsInt, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class GetProductFilterDto {
    @IsOptional() @IsNotEmpty() search: string;
    @IsOptional() @IsNotEmpty() sortby = 'title_asc';
    @IsOptional() @IsNotEmpty() @Transform(({ value }) => parseInt(value)) @IsInt() @Min(1) page: number;
    @IsOptional() @IsNotEmpty() @Transform(({ value }) => parseInt(value)) @Min(10) limit: number;

    @IsOptional() 
    @IsNotEmpty()
    @Transform(({ value }) => value.split(',').reduce((acc: [], curr: any) => [...acc, parseInt(curr)], []))
    @ArrayMinSize(2, { message: 'price range must have 2 element with format price=minPrice,maxPrice' })
    @ArrayMaxSize(2, { message: 'price range must have 2 element with format price=minPrice,maxPrice' })
    price: number[];
}
