import { IsMongoId, IsString, MinLength } from 'class-validator';

export class CreateItemDto {
  @IsMongoId()
  listId: string;

  @IsString()
  @MinLength(1)
  itemName: string;
}
