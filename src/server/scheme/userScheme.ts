import { z } from "zod";

export const inputGetUserByEmail = z.object({ email: z.string() });
