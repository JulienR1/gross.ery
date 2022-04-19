import { IsMongoId } from 'class-validator';

export class DeleteListDto {
  @IsMongoId()
  listId: string;
}
