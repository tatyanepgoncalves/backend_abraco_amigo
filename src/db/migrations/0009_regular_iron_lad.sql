ALTER TABLE "voluntariosDemandas" DROP CONSTRAINT "voluntariosDemandas_demandaId_unique";--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ALTER COLUMN "demandaId" SET NOT NULL;