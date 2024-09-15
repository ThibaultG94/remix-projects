import { NextFunction, Request, Response } from 'express';
export declare class RemixController {
    constructor();
    handler(request: Request, response: Response, next: NextFunction): Promise<void>;
}
