import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';
import { CreateCollectionDto, UpdateCollectionDto } from './collection.dto';
import { Collection } from './collection.model';
import { CollectionService } from './collection.service';

@Controller('collection')
@ApiTags('Collection')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard())
@UseInterceptors(ResponseInterceptor)
export class CollectionController {
    constructor(private collectionService: CollectionService) {}

    @Post()
    createProject(@Body() createCollectionDto: CreateCollectionDto): Promise<Collection> {
        return this.collectionService.createCollection(createCollectionDto);
    }

    @Get()
    getAllCollections(): Promise<Collection[]> {
        return this.collectionService.getAllCollections();
    }
    
    @Get('/:id')
    getCollectionByID(@Param('id') id: string): Promise<Collection> {
        return this.collectionService.getCollectionByID(id);
    }

    @Patch('/:id')
    updateCollection(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto): Promise<Collection> {
        return this.collectionService.updateCollection(id, updateCollectionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.collectionService.deleteCollection(id);
    }
}
