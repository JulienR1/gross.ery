import { Length } from "class-validator";

export class CodeValidationDto {
  @Length(5, 5)
  code: string;
}
