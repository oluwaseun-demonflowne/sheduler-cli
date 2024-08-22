import {defineConfig} from 'drizzle-kit';

require('dotenv').config();

export default defineConfig({
    schema: './src/db/schema.ts',
    dialect:"postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    out: './drizzle',
    verbose: true,
    strict: true,
});