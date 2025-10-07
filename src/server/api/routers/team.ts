import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const teamRouter = createTRPCRouter({
  getUserTeam: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.auth.userId,
      },
    });

    if (!user?.team_id) {
      return null;
    }

    return ctx.db.team.findFirst({
      where: {
        id: user.team_id,
      },
      include: {
        members: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            university_name: true,
            university_year: true,
          },
        },
        teamSearch: true,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        teamName: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const team = await ctx.db.team.create({
          data: {
            name: input.teamName,
            code: Math.random().toString(36).substring(2, 7).toUpperCase(),
            created_by: ctx.auth.userId,
            teamSearch: {
              create: {
                status: "hidden",
              },
            },
          },
        });

        const client = await clerkClient();

        await client.users.updateUserMetadata(ctx.auth.userId, {
          publicMetadata: {
            team_id: team.id,
          },
        });

        await ctx.db.user.update({
          where: {
            id: ctx.auth.userId,
          },
          data: {
            team_id: team.id,
          },
        });

        return await ctx.db.team.findFirst({
          where: {
            id: team.id,
          },

          include: {
            members: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        });
      } catch (err) {
        console.error(err);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  join: protectedProcedure
    .input(
      z.object({
        team_code: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findFirst({
        where: {
          code: input.team_code,
        },
      });

      if (!team) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const client = await clerkClient();

      await client.users.updateUserMetadata(ctx.auth.userId, {
        publicMetadata: {
          team_id: team.id,
        },
      });

      await ctx.db.user.update({
        where: {
          id: ctx.auth.userId,
        },
        data: {
          team_id: team?.id,
        },
      });

      const updatedTeam = await ctx.db.team.findFirst({
        where: {
          id: team.id,
        },
        include: {
          members: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      });
      if (updatedTeam && updatedTeam.members.length >= 6) {
        await (ctx.db as any).teamSearch.updateMany({
          where: {
            team_id: team.id,
          },
          data: {
            status: "hidden",
          },
        });
      }

      return updatedTeam;
    }),
  leave: protectedProcedure
    .input(
      z.object({
        team_id: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findFirst({
        where: {
          id: input.team_id,
        },
      });

      if (!team) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const client = await clerkClient();

      await client.users.updateUserMetadata(ctx.auth.userId, {
        publicMetadata: {
          team_id: null,
        },
      });

      await ctx.db.user.update({
        where: {
          id: ctx.auth.userId,
        },
        data: {
          team_id: null,
        },
      });

      return team;
    }),
  rename: protectedProcedure
    .input(
      z.object({
        team_id: z.string().min(1),
        name: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findFirst({
        where: {
          id: input.team_id,
        },
      });

      if (!team) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (team.created_by !== ctx.auth.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only team creator can rename the team",
        });
      }

      await ctx.db.team.update({
        where: {
          id: input.team_id,
        },
        data: {
          name: input.name,
        },
      });

      return team;
    }),
  removeMember: protectedProcedure
    .input(
      z.object({
        team_id: z.string().min(1),
        user_id: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findUnique({
        where: {
          id: input.team_id,
        },
      });

      if (!team) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Team not found",
        });
      }

      if (team.created_by !== ctx.auth.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only team creator can remove members",
        });
      }

      const client = await clerkClient();

      await client.users.updateUserMetadata(input.user_id, {
        publicMetadata: {
          team_id: null,
        },
      });

      await ctx.db.user.update({
        where: {
          id: input.user_id,
        },
        data: {
          team_id: null,
        },
      });

      return { success: true };
    }),
  deleteTeam: protectedProcedure
    .input(
      z.object({
        team_id: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findFirst({
        where: {
          id: input.team_id,
        },
        include: {
          members: true,
        },
      });

      if (!team) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (team.created_by !== ctx.auth.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only team creator can delete the team",
        });
      }

      const client = await clerkClient();

      for (const member of team.members) {
        await client.users.updateUserMetadata(member.id, {
          publicMetadata: {
            team_id: null,
          },
        });
      }

      await ctx.db.user.updateMany({
        where: {
          team_id: input.team_id,
        },
        data: {
          team_id: null,
        },
      });

      await ctx.db.team.delete({
        where: {
          id: input.team_id,
        },
      });

      return { success: true };
    }),
  updateTeamSearch: protectedProcedure
    .input(
      z.object({
        team_id: z.string().min(1),
        about: z.string().optional(),
        note: z.string().optional(),
        contact: z.string().optional(),
        status: z.enum(["discoverable", "hidden"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findFirst({
        where: {
          id: input.team_id,
        },
      });

      if (!team) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (team.created_by !== ctx.auth.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only team creator can update team info",
        });
      }

      const teamSearch = await (ctx.db as any).teamSearch.upsert({
        where: {
          team_id: input.team_id,
        },
        create: {
          team_id: input.team_id,
          about: input.about,
          note: input.note,
          contact: input.contact,
          status: input.status || "hidden",
        },
        update: {
          about: input.about,
          note: input.note,
          contact: input.contact,
          status: input.status,
        },
      });

      return teamSearch;
    }),
  getDiscoverableTeams: protectedProcedure.query(async ({ ctx }) => {
    const teams = await ctx.db.team.findMany({
      where: {
        teamSearch: {
          status: "discoverable",
        },
      },
      include: {
        members: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        teamSearch: true as any,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const availableTeams = teams.filter((team) => team.members.length < 6);

    return availableTeams;
  }),
});
