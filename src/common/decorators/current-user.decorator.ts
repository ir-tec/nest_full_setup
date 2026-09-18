import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from '../../modules/auth/types/authenticated-user';
// type AuthenticatedUser = {
//     id: string;
//     email: string;
//     organizationId: string;
// };

type AuthenticatedRequest = {
    user?: AuthenticatedUser;
};

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        const request = context?.switchToHttp()?.getRequest<AuthenticatedRequest>();

        return request?.user;
    },
);