import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PlaygroundRequestDto {
    @IsString()
    @IsNotEmpty()
    topics: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsNumber()
    @IsNotEmpty()
    level: number;

    @IsNumber()
    @IsNotEmpty()
    questionCount: number;
}