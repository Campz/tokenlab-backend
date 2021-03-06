import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';

import authConfig from '../config/auth';

interface TokenPayLoad {
    iat: number;
    exp: number;
    sub: string;
}

interface Context {
    req: Request;
    token?: string;
}

const ensureAuthenticated: AuthChecker<Context> = ({
    context: Context,
}): boolean => {
    const authHeader = Context.token;

    if (!authHeader) {
        return false;
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayLoad;

        Context.req.user = {
            id: sub,
        };

        return true;
    } catch {
        return false;
    }
};

export default ensureAuthenticated;
