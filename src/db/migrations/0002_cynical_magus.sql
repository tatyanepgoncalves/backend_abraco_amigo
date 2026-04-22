ALTER TABLE "demandas" DROP CONSTRAINT "demandas_usuarioId_usuarios_id_fk";
--> statement-breakpoint
ALTER TABLE "demandas" DROP CONSTRAINT "demandas_locationId_locais_id_fk";
--> statement-breakpoint
ALTER TABLE "locais" DROP CONSTRAINT "locais_gestorId_usuarios_id_fk";
--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" DROP CONSTRAINT "voluntariosDemandas_usuarioId_usuarios_id_fk";
--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" DROP CONSTRAINT "voluntariosDemandas_demandaId_demandas_id_fk";
--> statement-breakpoint
ALTER TABLE "locais" ALTER COLUMN "telefone" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_usuarioId_usuarios_id_fk" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_locationId_locais_id_fk" FOREIGN KEY ("locationId") REFERENCES "public"."locais"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locais" ADD CONSTRAINT "locais_gestorId_usuarios_id_fk" FOREIGN KEY ("gestorId") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD CONSTRAINT "voluntariosDemandas_usuarioId_usuarios_id_fk" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD CONSTRAINT "voluntariosDemandas_demandaId_demandas_id_fk" FOREIGN KEY ("demandaId") REFERENCES "public"."demandas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_usuarioId_unique" UNIQUE("usuarioId");--> statement-breakpoint
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_locationId_unique" UNIQUE("locationId");--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD CONSTRAINT "voluntariosDemandas_usuarioId_unique" UNIQUE("usuarioId");--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD CONSTRAINT "voluntariosDemandas_demandaId_unique" UNIQUE("demandaId");