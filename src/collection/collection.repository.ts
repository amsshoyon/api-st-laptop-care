import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { handleize } from "src/utils/common";
import { CreateCollectionDto, UpdateCollectionDto } from "./collection.dto";
import { Collection, CollectionDocument } from "./collection.model";

export class CollectionRepository {
    constructor(@InjectModel('collection') private readonly collectionModel: Model<CollectionDocument>) { }

    async createCollection(createCollectionDto: CreateCollectionDto): Promise<Collection> {
        const data = {...createCollectionDto, handle: handleize(createCollectionDto.title)}
        return await this.collectionModel.create(data);
    }

    async getAllCollections(): Promise<Collection[]> {
        return await this.collectionModel.find().exec();
    }

    async getCollectionByID(id: string): Promise<Collection> {
        return await this.collectionModel.findById(id)
            .populate('product')
            .exec();
    }
    
    async updateCollection(id: string, updateCollectionDto: UpdateCollectionDto): Promise<Collection> {
        return await this.collectionModel.findByIdAndUpdate({ _id: id }, updateCollectionDto, { new: true });
    }
    
    async deleteCollection(id: string): Promise<void> {
        await this.collectionModel.findOneAndRemove({_id: id});
    }
}
