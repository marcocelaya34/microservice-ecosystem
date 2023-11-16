import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  readonly accountExternalIdDebit: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  readonly accountExternalIdCredit: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  readonly tranferTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  readonly value: number;
}
