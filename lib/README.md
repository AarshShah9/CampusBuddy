A library for sharing Zod schemas with both backend and frontend

### Dependencies: 

-Zod
- The Zod schemas generated from the prisma schemas with zod-prisma-types


To update the generated schemas, run the genSchemas script in the backend directory. This will use the prettier-plugin-organize-imports to automatically remove the unused prisma client import in generated/zod/index.ts
`
cd backend
npm run genSchemas
`


