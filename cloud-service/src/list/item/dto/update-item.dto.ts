import { IsBoolean, IsMongoId, IsString, MinLength } from 'class-validator';

export class UpdateItemDto {
  @IsMongoId()
  listId: string;

  @IsMongoId()
  id: string;

  @IsString()
  @MinLength(1)
  itemName: string;

  @IsBoolean()
  checked: boolean;
}
