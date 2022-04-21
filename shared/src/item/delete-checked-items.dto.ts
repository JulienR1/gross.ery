import { IsMongoId } from "class-validator";

export class DeleteCheckedItemsDto {
  @IsMongoId()
  listId: string;
}
