import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const mailingListRouter = createTRPCRouter({
    addEmailToMailingList: publicProcedure
    .input(z.string().email())
    .mutation(
        async ({ ctx, input }) => {
            return ctx.db.mailingList.create({
                data: {
                    email: input
                }
            })
        }
    ),
    checkExisting: publicProcedure
    .input(z.string().email())
    .mutation(async ({ ctx, input }) => {
        const mailinglistuser = await ctx.db.mailingList.findUnique({
          where: { email: input },
        });
        return !!mailinglistuser;
      }),
})