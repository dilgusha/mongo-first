import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export function validate<T extends ZodSchema>(
  schema: T,
  target: "body" | "params" | "query" = "body"
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[target]);

      req[target] = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
         res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error
        });
      }

      next(error);
    }
  };
}
