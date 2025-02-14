import { plainToClass } from 'class-transformer';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min,
    validateSync,
} from 'class-validator';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

class EnvironmentVariables {
    @IsEnum(Environment)
    SERVER_ENV: Environment;

    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;

    @IsString()
    @IsNotEmpty()
    OPENAI_API_KEY: string;

    @IsString()
    @IsNotEmpty()
    GEMINI_API_KEY: string;

    @IsString()
    @IsNotEmpty()
    GEMINI_ENGINE: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validatedConfig;
}
