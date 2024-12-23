import { Request, Response } from 'express';

/**
 * @swagger
 * /health:
 *   get:
 *    tags: [Health]
 *    summary: Check if the API is running
 *    description: Check if the API is running
 *    responses:
 *     200:
 *      description: API is running
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          properties:
 *           ok:
 *            type: boolean
 *            example: true
 *
 *
 */

export default function (_request: Request, response: Response) {
  response.status(200).json({ ok: true });
}
