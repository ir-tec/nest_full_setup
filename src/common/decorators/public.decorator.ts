import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * 
 * @SetMetadata doesn't itself make the route public.
    It only marks the route.
    Think of it like putting a label on the route that says this route is public and later auth guard read this label and skip authentication
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);