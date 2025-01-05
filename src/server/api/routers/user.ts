import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: { id: ctx.auth.userId },
      include: {
        team: true,
      },
    });
  }),
  checkExisting: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input },
      });

      return !!user;
    }),
  create: publicProcedure
    .input(
      z.object({
        clerkId: z.string().min(1),
        email: z.string().min(1).email(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          id: input.clerkId,
          email: input.email,
          first_name: input.firstName,
          last_name: input.lastName,
        },
        include: {
          team: true,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        universityEmail: z.string().email().optional(),
        cv: z.string().optional(),
        country: z.string().optional(),
        university: z.string().optional(),
        universityYear: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = await clerkClient();

      // Beware of the naming, only the database fields are snake_case
      if (input.firstName || input.lastName) {
        await client.users.updateUser(ctx.auth.userId, {
          firstName: input.firstName,
          lastName: input.lastName,
        });
      }

      // Save other information in clerk metadata
      await client.users.updateUserMetadata(ctx.auth.userId, {
        publicMetadata: {
          cvUrl: input.cv,
          country: input.country,
          universityName: input.university,
          universityYear: input.universityYear,
        },
      });

      return ctx.db.user.update({
        where: { id: ctx.auth.userId },
        data: {
          university_email: input.universityEmail,
          first_name: input.firstName,
          last_name: input.lastName,
          cv_url: input.cv,
          country: input.country,
          university_name: input.university,
          university_year: input.universityYear,
        },
      });
    }),
});
