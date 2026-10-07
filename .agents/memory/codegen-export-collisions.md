---
name: Codegen export collisions
description: Why contract schema names must differ from operation-derived validation names.
---

Keep reusable OpenAPI schema names distinct from the names Orval derives for operation validation schemas.

**Why:** The generator exports TypeScript contract types and Zod validation values through separate wildcard exports. Identical names can cause ambiguous barrel exports. The generator may also restore wildcard type exports, so fixing only the barrel is not durable.

**How to apply:** When regeneration reports ambiguous exports, rename the reusable contract schema and its references without changing the JSON contract. Regenerate and confirm the complete codegen command succeeds, including its library type check.
