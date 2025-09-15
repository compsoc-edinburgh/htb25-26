import { z } from "zod";

export const UserFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    ),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or less")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Last name can only contain letters, spaces, hyphens, and apostrophes"
    ),
  pronouns: z
    .string()
    .min(1, "Pronouns are required")
    .max(20, "Pronouns must be 20 characters or less"),
  countryAlpha3: z.string().min(1, "Please select a country"),
  universityName: z.string().min(1, "University name is required"),
  universityYear: z.string().min(1, "Please select your year of study"),
  universityEmail: z
    .string()
    .email("Please enter a valid email address")
    .regex(
      /\.edu$|\.ac\.|\.edu\.|university|college/i,
      "Please use your university email address"
    ),
  verificationCode: z.string().optional(),
  codeSent: z.boolean(),
  authFlow: z.enum(["signup", "signin"]).optional(),
});

export type UserFormValues = z.infer<typeof UserFormSchema>;

export const ApplicationFormSchema = z
  .object({
    teamId: z.string().min(1).optional(),
    type: z.enum(["individual", "team"]),

    cvUrl: z
      .string()
      .min(1, "CV URL is required")
      .refine(
        (val) => !val || val === "" || z.string().url().safeParse(val).success,
        {
          message: "Please provide a valid URL for your CV",
        }
      ),
    portfolioUrl: z
      .string()
      .min(1, "Portfolio/LinkedIn link is required")
      .url("Please provide a valid URL for your portfolio or LinkedIn profile"),

    placementsCount: z
      .string()
      .min(0, "Please select the number of placements you've completed"),

    hackathonsCount: z
      .string()
      .min(0, "Please select the number of hackathons you've attended"),

    projectAim: z
      .string()
      .max(500, "Project aim must be 500 characters or less")
      .optional()
      .or(z.literal("")),

    projectStack: z
      .string()
      .max(200, "Technology stack must be 200 characters or less")
      .optional()
      .or(z.literal("")),

    projectLink: z.string().optional(),

    needsReimbursement: z.boolean({
      required_error: "Please specify if you need travel reimbursement",
    }),

    travellingFrom: z
      .string()
      .max(100, "Location must be 100 characters or less")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (
        data.needsReimbursement &&
        (!data.travellingFrom || data.travellingFrom.trim() === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "Please specify where you'll be travelling from for reimbursement calculations",
      path: ["travellingFrom"],
    }
  );

export type ApplicationFormValues = z.infer<typeof ApplicationFormSchema>;

export interface SectionConfig {
  id: string;
  title: string;
  fields: number;
  disabled: boolean;
}
