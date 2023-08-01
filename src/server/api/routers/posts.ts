import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      select: {
        title: true,
        author: { select: { firstName: true, lastName: true } },
        slug: true,
        description: true,
        publishedAt: true,
      },
      where: { isPublished: true },
    });
  }),
});
