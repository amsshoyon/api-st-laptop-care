export class GetProductFilterDto {
    readonly search: string = '';
    readonly sortby: string = 'title_asc';
    readonly page: number = 1;
    readonly limit: number = 10;
}
