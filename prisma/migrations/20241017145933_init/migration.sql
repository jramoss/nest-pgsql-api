/*
  Warnings:

  - Added the required column `confirmationToken` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recoverToken` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "confirmationToken" VARCHAR(64) NOT NULL,
ADD COLUMN     "recoverToken" VARCHAR(64) NOT NULL,
ADD COLUMN     "salt" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;
