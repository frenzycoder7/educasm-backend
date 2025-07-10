// create decorator for static validation
import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';

const distMap = {
    1: 'static-1',
    2: 'static-2',
};

export const StaticValidation = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = request.params.id;
    const distFolder = distMap[id];
    if (!distFolder) {
        throw new BadRequestException('Invalid ID');
    }

    return distFolder;
});