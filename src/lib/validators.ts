import { z } from "zod";

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
  key: z.string().min(2).max(80),
  value: z.string().min(1).max(2000),
});

export const galleryInputSchema = z.object({
  title: z.string().min(1, "Title is required").max(160),
  caption: z.string().min(0).max(320).default(""),
  imageUrl: z.string().min(1, "Image URL is required").max(800),
  section: z.string().min(1, "Section is required").max(80),
  isPublished: z.boolean().default(true),
  displayOrder: z.number().int().min(0).max(9999).default(0),
});

export const galleryPatchSchema = galleryInputSchema.partial();
