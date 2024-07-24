-- CreateTable
CREATE TABLE "CommandHistory" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "command_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response" TEXT NOT NULL,

    CONSTRAINT "CommandHistory_pkey" PRIMARY KEY ("id")
);
