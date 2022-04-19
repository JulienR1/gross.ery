import { IsMongoId } from 'class-validator';

export class DeleteItemDto {
  @IsMongoId()
  listId: string;

  @IsMongoId()
  itemId: string;
}
