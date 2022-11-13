import { ItemService } from './item.service';
import { CreateItemDto, DeleteCheckedItemsDto, DeleteItemDto, UpdateItemDto } from 'shared';
export declare class ItemController {
    private itemService;
    constructor(itemService: ItemService);
    createNewItem({ listId, itemName }: CreateItemDto): Promise<{
        success: boolean;
    }>;
    updateItem({ listId, item }: UpdateItemDto): Promise<{
        success: boolean;
    }>;
    removeItem({ listId, itemId }: DeleteItemDto): Promise<{
        success: boolean;
    }>;
    removeCheckedItems({ listId }: DeleteCheckedItemsDto): Promise<{
        success: boolean;
    }>;
}
