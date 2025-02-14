import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ExploreRequestDto {
    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    query: string;
}