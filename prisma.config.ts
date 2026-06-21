import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
    schema: './prisma/schema.prisma',
    migrations: {
        path: './prisma/migrations',
        // 💡 Add this line. Choose the runner (tsx or ts-node) matching your setup
        seed: 'tsx ./prisma/seed.ts',
    },
    datasource: {
        url: env('DATABASE_URL'),
    },
});
