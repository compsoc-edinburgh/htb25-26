import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const mailingListRouter = createTRPCRouter({
    addEmailToMailingList: publicProcedure.input(
        z.object({
            email: z.string().email(),
            subscribed: z.boolean(),
        })
        )
    .mutation(
        async ({ ctx, input }) => {
            return ctx.db.mailingList.create({
                data: {
                    email: input.email,
                    subscribed: input.subscribed
                }
            }
            )
        }
    )
})