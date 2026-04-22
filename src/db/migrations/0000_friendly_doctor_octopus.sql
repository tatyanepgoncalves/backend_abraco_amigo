CREATE TYPE "public"."prioridade" AS ENUM('INDEFINIDO', 'BAIXO', 'MÉDIO', 'ALTO', 'CRÍTICO');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('ABERTA', 'EM ANDAMENTO', 'COMPLETA', 'CANCELADA');--> statement-breakpoint
CREATE TYPE "public"."userTipo" AS ENUM('GESTOR', 'VOLUNTARIO');--> statement-breakpoint
CREATE TABLE "demandas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"usuarioId" uuid,
	"locationId" uuid,
	"titulo" text NOT NULL,
	"descricao" text NOT NULL,
	"voluntariosNecessarios" integer DEFAULT 0 NOT NULL,
	"voluntariosConfirmados" integer DEFAULT 0,
	"prioridade" "prioridade" DEFAULT 'INDEFINIDO' NOT NULL,
	"status" "status" DEFAULT 'ABERTA' NOT NULL,
	"criadoEm" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizadoEm" timestamp with time zone,
	"deletadoEm" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "locais" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(255) NOT NULL,
	"endereco" text NOT NULL,
	"telefone" text NOT NULL,
	"email" text,
	"gestorId" uuid,
	"tipoLocal" text DEFAULT 'ABRIGO' NOT NULL,
	"criadoEm" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizadoEm" timestamp with time zone,
	"deletadoEm" timestamp with time zone,
	CONSTRAINT "locais_endereco_unique" UNIQUE("endereco"),
	CONSTRAINT "locais_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"senha" text NOT NULL,
	"userTipo" "userTipo" DEFAULT 'VOLUNTARIO' NOT NULL,
	"criadoEm" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizadoEm" timestamp with time zone,
	"deletadoEm" timestamp with time zone,
	CONSTRAINT "usuarios_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "voluntariosDemandas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"usuarioId" uuid,
	"demandaId" uuid,
	"criadoEm" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_usuarioId_usuarios_id_fk" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_locationId_locais_id_fk" FOREIGN KEY ("locationId") REFERENCES "public"."locais"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locais" ADD CONSTRAINT "locais_gestorId_usuarios_id_fk" FOREIGN KEY ("gestorId") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD CONSTRAINT "voluntariosDemandas_usuarioId_usuarios_id_fk" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD CONSTRAINT "voluntariosDemandas_demandaId_demandas_id_fk" FOREIGN KEY ("demandaId") REFERENCES "public"."demandas"("id") ON DELETE no action ON UPDATE no action;