import { z } from "zod";

export const inputGetUserByEmail = z.object({ email: z.string() });

export const inputGetUsersByPage = z.object({
  page: z.number().optional(),
  searchTarget: z.string().optional(),
});

export const inputGetUser = z.object({
  id: z.string().nullable(),
});