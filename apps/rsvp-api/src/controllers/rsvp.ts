import { Request, Response } from "express";

export async function submitRsvp(req: Request, res: Response) {
  await appendRsvp(req.body);

  res.status(201).json({
    // TODO: improve res body
    success: true,
  });
}
