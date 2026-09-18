import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../../common/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(
        private readonly reflector: Reflector,
    ) {
        super();
    }


    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [
                // this method check if the a single route in a controller in public or not
                context.getHandler(),
                // this method check if a whole controller is public or not
                context.getClass(),
            ],
        );

        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }
}