import { z } from "zod";

export const UserFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  pronouns: z.string().optional(),
  countryAlpha3: z.string().min(1),
  universityName: z.string().min(1),
  universityYear: z.string().min(1),
  universityEmail: z.string().email(),
});

export type UserFormValues = z.infer<typeof UserFormSchema>;

export const ApplicationFormSchema = z.object({
  teamId: z.string().min(1),
  type: z.enum(["individual", "team"]),

  cvUrl: z.string().url().min(1).or(z.literal("")),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  placementsCount: z.string().min(1),
  hackathonsCount: z.string().min(1),
  projectAim: z.string().optional().or(z.literal("")),
  projectStack: z.string().optional().or(z.literal("")),
  projectLink: z.string().url().optional().or(z.literal("")),

  needsReimbursement: z.boolean().optional(),
  travellingFrom: z.string().optional().or(z.literal("")),
  calendarEmail: z.string().email().optional().or(z.literal("")),
});

export type ApplicationFormValues = z.infer<typeof ApplicationFormSchema>;

export interface SectionConfig {
  id: string;
  title: string;
  fields: number;
  disabled: boolean;
}
