-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('GRATIS', 'PRO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'GRATIS';
