// import { TRPCError } from "@trpc/server";
import z from 'zod';

import { createRouter } from '../createRouter';

export const someSchema = z.object({
  title: z
    .string()
    .min(5, 'Minimum title length is 5 characters')
    .max(256, 'Maximum title length is 256 characters'),
  body: z.string().min(10, 'Minimum body length is 10 characters'),
});

export const someRouter = createRouter().mutation('mutation-here', {
  input: someSchema,
  async resolve({ ctx, input }) {
    await Promise.resolve('');
  },
});
