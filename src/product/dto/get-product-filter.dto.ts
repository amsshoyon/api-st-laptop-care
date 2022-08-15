import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetProductFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;
    
    @IsOptional()
    @IsNotEmpty()
    sortby: string;

    @IsOptional()
    @IsNotEmpty()
    sortbyoption: string;
    
    @IsOptional()
    @IsNotEmpty()
    page: string;
   
    @IsOptional()
    @IsNotEmpty()
    limit: string;
}
