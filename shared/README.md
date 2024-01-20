# Zod Schemas Shared Library

A shared library for using Zod schemas on both the backend and the frontend

## Usage
Schemas are stored in `./zodSchemas.ts`. 

Types can be inferred from schemas using z.infer, eg: `type TmySchema = z.infer<typeof mySchema>`

### Dependencies: 

- Zod (installed in root directory)



