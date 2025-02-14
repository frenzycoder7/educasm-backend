import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ExploreRequestDto {
    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    query: string;

    @IsOptional()
    @IsString()
    followUP: string | null = null;
}
