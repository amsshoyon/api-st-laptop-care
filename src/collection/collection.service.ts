import { Injectable } from '@nestjs/common';
import { convertToSlug } from 'src/utils/common';
import { CreateCollectionDto, UpdateCollectionDto } from './collection.dto';
import { Collection } from './collection.model';
import { CollectionRepository } from './collection.repository';

@Injectable()
export class CollectionService {
    constructor(private collectionRepository: CollectionRepository) { }

    async createCollection(createCollectionDto: CreateCollectionDto): Promise<Collection> {
        const { title } = createCollectionDto;
        createCollectionDto['handle'] = convertToSlug(title);
        return await this.collectionRepository.createCollection(createCollectionDto);
    }
    
    async getAllCollections(): Promise<Collection[]> {
        return await this.collectionRepository.getAllCollections();
    }

    async getCollectionByID(id: string): Promise<Collection> {
        return this.collectionRepository.getCollectionByID(id);
    }
    
    async updateCollection(id: string, updateCollectionDto: UpdateCollectionDto): Promise<Collection> {
        return this.collectionRepository.updateCollection(id, updateCollectionDto);
    }
    
    async deleteCollection(id: string): Promise<void> {
        return this.collectionRepository.deleteCollection(id);
    }

}
