ALTER TABLE "voluntariosDemandas" RENAME COLUMN "usuarioId" TO "nome";--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" DROP CONSTRAINT "voluntariosDemandas_usuarioId_unique";--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" DROP CONSTRAINT "voluntariosDemandas_usuarioId_usuarios_id_fk";
--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD COLUMN "telefone" text;--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD COLUMN "endereco" text NOT NULL;--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD CONSTRAINT "voluntariosDemandas_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD CONSTRAINT "voluntariosDemandas_telefone_unique" UNIQUE("telefone");