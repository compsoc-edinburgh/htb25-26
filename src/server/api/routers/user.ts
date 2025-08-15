import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const CHALLENGE_ONE_SOLUTION = process.env.CHALLENGE_ANSWER;

export const userRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    console.log("in trpc", ctx.auth.userId);
    return ctx.db.user.findUnique({
      where: { id: ctx.auth.userId },
      include: {
        team: {
          include: {
            members: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
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
      })
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
          team: {
            include: {
              members: {
                select: {
                  first_name: true,
                  last_name: true,
                },
              },
            },
          },
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
        placementsCount: z.string().optional(),
        hackathonsCount: z.string().optional(),
        projectDescription: z.string().optional(),
        needsReimbursement: z.boolean().optional(),
        travellingFrom: z.string().optional(),
        portfolioUrl: z.string().optional(),
        calendarEmail: z.string().optional(),

        pronouns: z.string().optional(),
        dietaryRestrictions: z.string().optional(),
        shirtSize: z.string().optional(),
        meal1: z.string().optional(),
        meal2: z.string().optional(),
        meal3: z.string().optional(),
        pizza: z.string().optional(),
      })
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

      console.log(input.pronouns);

      const metadata = {
        country: input.country,
        university_name: input.university,
        university_year: input.universityYear,
        university_email: input.universityEmail,
        cv_url: input.cv,
        portfolio_url: input.portfolioUrl,
        placements_count: input.placementsCount,
        hackathons_count: input.hackathonsCount,
        project_description: input.projectDescription,
        needs_reimbursement: input.needsReimbursement,
        travelling_from: input.travellingFrom,
        calendar_email: input.calendarEmail,

        pronouns: input.pronouns,
        dietary_restrictions: input.dietaryRestrictions,
        shirt_size: input.shirtSize,
        food_choice_1: input.meal1,
        food_choice_2: input.meal2,
        food_choice_3: input.meal3,
        pizza_choice: input.pizza,
      };

      // Save other information in clerk metadata
      await client.users.updateUserMetadata(ctx.auth.userId, {
        publicMetadata: metadata,
      });

      return ctx.db.user.update({
        where: { id: ctx.auth.userId },
        data: {
          first_name: input.firstName,
          last_name: input.lastName,
          ...metadata,
        },
      });
    }),
  completeChallenge: protectedProcedure
    .input(
      z.object({
        solution: z.string().trim(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.challengeCompletion.findUnique({
        where: {
          userId: ctx.auth.userId,
        },
      });

      if (existing) {
        return {
          success: true,
          message: "Challenge already completed",
        };
      }

      if (input.solution !== process.env.CHALLENGE_ANSWER) {
        return {
          success: false,
          message: "Invalid solution",
        };
      }

      await ctx.db.challengeCompletion.create({
        data: {
          userId: ctx.auth.userId,
        },
      });

      return {
        success: true,
        message: "Challenge completed successfully",
      };
    }),
  getChallengeCompletion: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.challengeCompletion.findUnique({
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),
});
