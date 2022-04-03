import { IsBoolean, IsMongoId, IsString, MinLength } from 'class-validator';

export class UpdateItemDto {
  @IsMongoId()
  listId: string;

  item: ItemDto;
}

class ItemDto {
  @IsMongoId()
  id: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsBoolean()
  checked: boolean;
}
