import { z } from "zod";

export const editableSiteSettingKeys = [
  "ticker_message",
  "about_us_p1",
  "about_us_p2",
  "about_us_p3",
  "helpline_title",
  "helpline_subtitle",
] as const;

export const siteSettingKeySchema = z.enum(editableSiteSettingKeys);

export const updateInputSchema = z.object({
  title: z.string().min(1, "Title is required").max(180),
  summary: z.string().min(1, "Summary is required").max(320),
  body: z.string().min(1, "Body is required"),
  pdfUrl: z.string().optional().nullable(),
  type: z.enum(["NOTICE", "NEWS", "EVENT"]),
  isPublished: z.boolean().default(true),
  publishedAt: z.string().datetime().optional().nullable(),
});

export const updatePatchSchema = updateInputSchema.partial();

export const siteSettingInputSchema = z.object({
  key: siteSettingKeySchema,
  value: z.string().trim().min(1).max(5000),
});

export const siteSettingsBulkInputSchema = z.object({
  settings: z.array(siteSettingInputSchema).min(1).max(editableSiteSettingKeys.length),
});

export const galleryInputSchema = z.object({
  title: z.string().min(1, "Title is required").max(160),
  caption: z.string().min(0).max(320).default(""),
  imageUrl: z
    .string()
    .trim()
    .min(1, "Image URL is required")
    .max(800)
    .refine(
      (value) => !value.startsWith("/uploads/") && !/^https?:\/\/localhost(?::\d+)?\/uploads\//i.test(value),
      "Legacy /uploads paths are not allowed. Upload file again to store in MongoDB.",
    ),
  section: z.string().min(1, "Section is required").max(80),
  isPublished: z.boolean().default(true),
  displayOrder: z.number().int().min(0).max(9999).default(0),
});

export const galleryPatchSchema = galleryInputSchema.partial();
