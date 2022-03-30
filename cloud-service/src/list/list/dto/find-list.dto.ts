import { IsMongoId } from 'class-validator';

export class FindListDto {
  @IsMongoId()
  listId: string;
}
