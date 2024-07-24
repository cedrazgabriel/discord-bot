declare namespace NodeJS {
    interface ProcessEnv {
        DISCORD_TOKEN: string;
        DISCORD_CLIENT_ID: string;
        GEMINI_API_KEY: string;
        DATABASE_URL: string;
    }
}