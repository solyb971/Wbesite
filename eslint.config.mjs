import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) })

/**
 * Dette relevée à la mise en place du lint (sept. 2026) : ces fichiers existaient
 * avant qu'une configuration ne soit posée. Leurs erreurs restent affichées en
 * avertissements, sans bloquer le build ; tout nouveau code suit les règles strictes.
 * Retirer un fichier de cette liste une fois corrigé.
 */
const DETTE = [
  "src/app/api/cron/alerts/route.ts",
  "src/app/api/cron/analytics-snapshot/route.ts",
  "src/app/api/cron/email-sequences/route.ts",
  "src/components/admin/Shared/FilterBar.tsx",
  "src/components/admin/Templates/TemplateEditor.tsx",
  "src/components/site/Navigation.tsx",
  "src/hooks/useLeads.ts",
  "src/middleware.ts",
  "src/types/lead.types.ts",
]

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: DETTE,
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "react/no-unescaped-entities": "warn",
      "@next/next/no-html-link-for-pages": "warn",
    },
  },
  {
    ignores: [".next/**", "node_modules/**", "out/**", "public/**", "docs/**", "next-env.d.ts"],
  },
]

export default config
