import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createRequestHandler } from '@remix-run/express';
import { getServerBuild } from "@thibault/frontend";

@Controller()
export class RemixController {
  constructor() {}

  @All('*')
  async handler(@Req() request: Request, @Res() response: Response, @Next() next: NextFunction) {
    // This is where the magic happens
    return createRequestHandler({
        build: getServerBuild,
        getLoadContext: () => ({
            "toto": "Salut, ça va ?"
        })
    })(request, response, next);
  }
}
