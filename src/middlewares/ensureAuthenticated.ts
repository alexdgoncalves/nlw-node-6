import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(
      token,
      "f2056642536285c7f429b6b30d63490d"
    ) as IPayload;

    request.user_id = sub;
    next();
  } catch (err) {
    return response.status(401).end();
  }
}
