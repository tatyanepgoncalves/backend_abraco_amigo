ALTER TABLE "demandas" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "demandas" ALTER COLUMN "status" SET DEFAULT 'ABERTA'::text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('ABERTA', 'COMPLETA', 'CANCELADA');--> statement-breakpoint
ALTER TABLE "demandas" ALTER COLUMN "status" SET DEFAULT 'ABERTA'::"public"."status";--> statement-breakpoint
ALTER TABLE "demandas" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";