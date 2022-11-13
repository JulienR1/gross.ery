import { CreateListDto, CreateListEntity, DeleteListDto, FindListDto, ListEntity } from 'shared';
import { ListService } from './list.service';
export declare class ListController {
    private listService;
    constructor(listService: ListService);
    find({ listId }: FindListDto): Promise<ListEntity>;
    createNew({ name }: CreateListDto): Promise<CreateListEntity>;
    remove({ listId }: DeleteListDto): Promise<ListEntity>;
}
