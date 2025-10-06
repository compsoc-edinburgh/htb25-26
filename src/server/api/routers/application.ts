import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { Resend } from "resend";
import { TRPCError } from "@trpc/server";

export const applicationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        team_id: z.string().optional(),
        type: z.enum(["individual", "team"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isApplicationClose = true;

      if (isApplicationClose) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "Applications are currently closed. Please check back later.",
        });
      }

      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.auth.userId,
        },
      });

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      const existingApplication = await ctx.db.application.findFirst({
        where: { user_id: ctx.auth.userId },
        include: {
          team: {
            include: {
              members: {
                select: { first_name: true, last_name: true },
              },
            },
          },
        },
      });

      if (existingApplication) {
        return existingApplication;
      }

      const resend = new Resend(process.env.RESEND_API_KEY);

      void resend.emails
        .send({
          from: "applications@hacktheburgh.com",
          to: user.email,
          subject: "We received your application",
          html: `<!DOCTYPE html>
                  <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Application Confirmation</title>
                      <style>
                          body {
                              width: 100%;
                              max-width: 600px;
                              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                              display: flex;
                              flex-direction: column;
                              align-items: center;
                              justify-content: center;
                              gap: 2rem;
                              margin: 0 auto;
                              background: white;
                              padding: 2rem;
                              line-height: 1.6;
                          }
                          
                          .container {
                              background-color: white;
                              border: 2px solid black;
                              border-radius: 0;
                              padding: 2rem;
                              text-align: left;
                              max-width: 500px;
                              margin: 0 auto;
                              box-shadow: 4px 4px 0 black;
                          }
                          
                          #header-logo {
                              width: 100px;
                              height: auto;
                              margin: 0 auto 2rem auto;
                              display: block;
                          }
                          
                          h1 {
                              color: black;
                              font-size: 2rem;
                              font-weight: bold;
                              margin-bottom: 1rem;
                              text-align: center;
                          }
                          
                          p {
                              color: black;
                              line-height: 1.6;
                              margin-bottom: 1rem;
                              font-size: 1rem;
                          }
                          
                          .highlight {
                              font-weight: bold;
                          }
                          
                          footer {
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              flex-direction: column;
                              color: #666;
                              font-size: 0.875rem;
                              text-align: center;
                              margin-top: 2rem;
                              padding-top: 2rem;
                              border-top: 1px solid #e5e5e5;
                          }
                          
                          footer p {
                              color: #666;
                              margin: 0.5rem 0;
                          }
                          
                          footer a {
                              color: black;
                              text-decoration: underline;
                          }
                          
                          footer a:hover {
                              text-decoration: none;
                          }
                      </style>
                  </head>

                  <body>
                      <svg id="header-logo" width="356" height="310" viewBox="0 0 356 310" xmlns="http://www.w3.org/2000/svg">
                        <path d="M202.781 211.063C203.485 214.113 207.803 214.182 208.604 211.157L214.941 187.242C215.289 185.926 216.48 185.01 217.841 185.01H308.338C310.652 185.01 312.095 187.518 310.931 189.518L254.573 286.393C254.036 287.316 253.048 287.884 251.98 287.884H104.112C103 287.884 101.98 287.27 101.46 286.288L97.249 278.334C96.7711 277.431 96.7853 276.347 97.2866 275.457L147.382 186.537C147.914 185.594 148.913 185.01 149.996 185.01H194.382C195.779 185.01 196.991 185.974 197.305 187.335L202.781 211.063ZM127.207 44.3822C127.809 45.3175 127.844 46.5092 127.298 47.4785L97.3081 100.726C96.7951 101.637 96.7933 102.749 97.3032 103.662L112.385 130.651C113.512 132.668 116.4 132.707 117.582 130.722L145.606 83.6527C146.783 81.6764 149.654 81.7049 150.791 83.7042L167.45 112.991C167.977 113.917 167.973 115.052 167.44 115.975L87.5872 254.242C86.4719 256.173 83.714 256.255 82.4855 254.394L64.832 227.646C64.2048 226.696 64.1696 225.472 64.7412 224.488L95.6017 171.322C96.1456 170.385 96.142 169.227 95.5923 168.294L78.7545 139.696C77.5791 137.7 74.6806 137.732 73.5505 139.755L47.8428 185.758C46.7299 187.75 43.8892 187.819 42.68 185.885L25.2988 158.075C24.7094 157.131 24.69 155.94 25.2485 154.978L101.438 23.7803C101.975 22.8558 102.963 22.2869 104.032 22.2869H111.344C112.364 22.2869 113.315 22.8052 113.867 23.6629L127.207 44.3822ZM169.745 219.301C168.654 219.301 167.649 219.894 167.12 220.849L152.001 248.17C150.895 250.169 152.341 252.622 154.626 252.622H182.385C184.294 252.622 185.717 250.863 185.318 248.996L179.483 221.675C179.187 220.291 177.964 219.301 176.549 219.301H169.745ZM233.311 219.301C231.977 219.301 230.804 220.182 230.431 221.462L222.473 248.783C221.914 250.703 223.354 252.622 225.354 252.622H231.643C232.688 252.622 233.657 252.079 234.202 251.188L250.913 223.867C252.136 221.868 250.697 219.301 248.354 219.301H233.311ZM194.305 161.794C195.411 163.793 193.965 166.247 191.68 166.247H163.579C161.245 166.247 159.805 163.699 161.009 161.699L175.649 137.377C176.84 135.398 179.726 135.451 180.845 137.471L194.305 161.794ZM243.204 161.699C244.408 163.699 242.968 166.247 240.634 166.247H217.286C216.202 166.247 215.203 165.663 214.672 164.719L199.287 137.398C198.161 135.398 199.606 132.926 201.901 132.926H224.188C225.241 132.926 226.216 133.477 226.759 134.378L243.204 161.699ZM272.183 53.0657C273.321 55.0656 271.876 57.5489 269.576 57.5489H238.534C236.222 57.5489 234.779 60.0548 235.94 62.0548L293.793 161.741C294.954 163.741 293.511 166.247 291.199 166.247H260.623C259.546 166.247 258.552 165.67 258.018 164.735L197.632 59.0605C197.098 58.1258 196.104 57.5489 195.028 57.5489H156.768C155.696 57.5489 154.706 56.9777 154.17 56.0502L137.257 26.7881C136.101 24.7881 137.545 22.2869 139.855 22.2869H252.931C254.01 22.2869 255.006 22.866 255.539 23.8036L272.183 53.0657ZM329.823 154.98C330.363 155.942 330.332 157.122 329.742 158.054L325.437 164.852C324.887 165.72 323.93 166.247 322.902 166.247H310.192C309.077 166.247 308.053 165.628 307.535 164.64L293.212 137.319C292.164 135.321 293.613 132.926 295.869 132.926H315.68C316.765 132.926 317.765 133.511 318.296 134.456L329.823 154.98Z" fill="black"/>
                        <path d="M92.8375 0.439444C90.294 1.26119 88.2201 2.47423 86.694 4.07857C85.168 5.64379 1.78105 148.783 0.841921 151.483C0.0593128 153.596 0.137574 158.37 0.959312 160.404C2.28975 163.731 85.2462 304.483 86.8506 306.165C87.7114 307.065 89.5114 308.278 90.8419 308.904L93.2288 310H178.337C261.137 310 263.485 309.961 265.598 309.257C270.333 307.613 268.259 310.939 313.259 232.717C335.72 193.665 354.385 161.031 354.659 160.17C354.972 159.348 355.207 157.313 355.207 155.67C355.207 153.048 355.05 152.305 353.876 149.957C353.133 148.431 334.507 115.522 312.437 76.7828C284.694 28.0655 271.781 5.72207 270.529 4.31338C269.433 3.10033 267.79 1.84817 266.459 1.18294L264.229 0.087271L179.316 0.00902389C111.464 -0.0300996 94.0897 0.0481474 92.8375 0.439444ZM261.372 11.5916C262.037 11.8655 272.563 30.022 302.968 83.435C325.35 122.722 343.703 155.2 343.781 155.591C343.898 156.296 262.781 297.596 261.92 298.143C261.685 298.3 224.159 298.457 178.494 298.457C99.9593 298.457 95.4592 298.417 94.8723 297.752C93.8549 296.617 11.6419 156.452 11.6419 155.865C11.6419 154.887 94.9114 11.8655 95.6549 11.5525C96.7114 11.1612 260.316 11.1612 261.372 11.5916Z" fill="black"/>
                      </svg>
                      
                      <div class="container">
                          <h1>Application Received!</h1>
                          <p>We've received your application to <span class="highlight">Hack The Burgh 2025</span>.</p>
                          <p>You can keep updating your profile until the deadline. We'll be in touch with more information about the event soon.</p>
                          <p>Thank you for your interest in our hackathon. We're excited to see what you'll build!</p>
                      </div>
                      
                      <footer>
                          <p>
                              Please don't reply to this email. For questions, contact us at 
                              <a href="mailto:team@hacktheburgh.com">team@hacktheburgh.com</a>
                          </p>
                          <p>
                              <a href="https://www.hacktheburgh.com/documents/HTB-Privacy-Policy.pdf" target="_blank">
                                  Privacy Policy
                              </a>
                          </p>
                      </footer>
                  </body>
                  </html>
          `,
        })
        .catch((err) => {
          console.error("Failed to send application email:", err);
        });
      try {
        return ctx.db.application.create({
          data: {
            user_id: ctx.auth.userId,
            team_id: input.team_id,
          },
          include: {
            team: {
              include: {
                members: {
                  select: { first_name: true, last_name: true },
                },
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create application",
        });
      }
    }),
  getUserApplication: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.auth.userId) {
      return null;
    }

    const application = await ctx.db.application.findFirst({
      where: { user_id: ctx.auth.userId },
      include: {
        team: {
          include: {
            members: {
              select: { first_name: true, last_name: true },
            },
          },
        },
        user: {
          include: {
            team: {
              include: {
                members: {
                  select: { first_name: true, last_name: true },
                },
              },
            },
          },
        },
      },
    });

    if (!application) return null;

    const user = application.user;

    const hasRequiredPersonalInfo = Boolean(
      user?.first_name && user?.last_name && user?.pronouns
    );

    const hasUniversityBasics = Boolean(
      user?.university_name &&
        user?.university_year &&
        user?.email &&
        user?.country
    );

    const hasExperience = Boolean(
      user?.placements_count && user?.hackathons_count
    );

    const hasCvAndPortfolio = Boolean(user?.cv_url && user?.portfolio_url);

    if (
      !hasRequiredPersonalInfo ||
      !hasUniversityBasics ||
      !hasExperience ||
      !hasCvAndPortfolio
    ) {
      return null;
    }

    return {
      ...application,
      status: application.status,
    };
  }),
  getApplications: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.auth.sessionClaims.metadata.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    const applications = await ctx.db.application.findMany({
      include: {
        user: {
          include: {
            team: {
              include: {
                members: {
                  select: { first_name: true, last_name: true },
                },
              },
            },
          },
        },
      },
      orderBy: [
        { user: { team_id: "asc" } },
        { user: { team: { name: "asc" } } },
        { user: { last_name: "asc" } },
        { user: { first_name: "asc" } },
        { created_at: "asc" },
      ],
    });

    return applications.map((app) => ({
      ...app,
      team: app.user.team,
    }));
  }),
  checkEmailExists: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });

      return { exists: Boolean(user) };
    }),
});
