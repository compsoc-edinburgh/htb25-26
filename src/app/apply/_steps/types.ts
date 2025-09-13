import { z } from "zod";

export const FormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  pronouns: z.string().optional(),
  teamId: z.string().optional(),
  type: z.enum(["individual", "team"]),
  countryAlpha3: z.string().min(1),
  universityName: z.string().min(1),
  universityYear: z.string().min(1),
  universityEmail: z.string().email(),

  cvUrl: z.string().url().optional().or(z.literal("")),
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

export type FormValues = z.infer<typeof FormSchema>;

export interface SectionConfig {
  id: string;
  title: string;
  fields: number;
}
