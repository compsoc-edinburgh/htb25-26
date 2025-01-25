import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const applicationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        team_id: z.string().optional(),
        type: z.enum(["individual", "team"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.application.create({
        data: {
          user_id: ctx.auth.userId,
          team_id: input.team_id,
        },
      });
    }),
  getUserApplication: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.application.findFirst({
      where: {
        user_id: ctx.auth.userId,
      },
      include: {
        team: true,
      },
    });
  }),
  getApplications: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.auth.sessionClaims.metadata.role !== "admin") {
      throw new Error("Unauthorized");
    }

    return ctx.db.application.findMany({
      include: {
        user: true,
        team: true,
      },
    });
  }),
});
