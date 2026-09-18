import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticatedUser } from '../types/authenticated-user';

export interface JwtPayload {
    sub: string;
    email: string;
}

@Injectable() 
/** 
 *  @PassportStrategy handles the mechanism of extracting and verifying the JWT.
 * 
 */
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({ 
            /**
             * fromAuthHeaderAsBearerToken makes sure we have a bearer token
             */
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.J_SECRET as string,
        });
    }
    /**
        after validating successfull by passport strategy validate function will be fire
    */ 
    validate(payload: JwtPayload): AuthenticatedUser {
        return {
            id: payload.sub,
            email: payload.email,
        };
    }
}