import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(255, "Le nom est trop long"),

  email: z
    .string()
    .email("Adresse email invalide")
    .toLowerCase(),

  phone: z
    .string()
    .regex(
      /^(\+590|0690|0691|0692|0693|0694|0695|0696|0697|0698|0699)/,
      "Format téléphone invalide. Ex: +590690123456 ou 0690123456"
    )
    .optional()
    .or(z.literal("")),

  company: z
    .string()
    .max(255, "Nom d'entreprise trop long")
    .optional()
    .or(z.literal("")),

  project_type: z.enum(
    ["vitrine", "ecommerce", "facturation", "application", "saas", "content", "custom"],
    { required_error: "Veuillez sélectionner un type de projet" }
  ),

  budget: z.enum(["<500", "500-1000", "1000-2000", ">2000"], {
    required_error: "Veuillez sélectionner une fourchette de budget",
  }),

  description: z
    .string()
    .min(20, "Veuillez décrire votre projet (minimum 20 caractères)")
    .max(2000, "Description trop longue (maximum 2000 caractères)"),

  urgency: z
    .enum(["low", "normal", "high", "urgent"])
    .default("normal"),

  source: z
    .string()
    .max(100)
    .default("site-web"),

  // Produit concerné par le lead (pour la segmentation CRM multi-produits).
  // Optionnel : si absent, l'API le déduit de `source`.
  product_source: z
    .enum(["solyb_agency", "factu_gp", "resa_gp"])
    .optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
