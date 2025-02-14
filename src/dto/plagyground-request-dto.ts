import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PlaygroundRequestDto {
    @IsString()
    @IsNotEmpty()
    topic: string;

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