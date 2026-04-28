CREATE TYPE "public"."categoria_enum" AS ENUM('SAUDE', 'ALIMENTOS', 'EDUCACAO', 'MEIO AMBIENTE', 'OUTROS');--> statement-breakpoint
CREATE TYPE "public"."prioridade" AS ENUM('INDEFINIDO', 'BAIXO', 'MÉDIO', 'ALTO', 'CRÍTICO');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('ABERTA', 'EM ANDAMENTO', 'COMPLETA', 'CANCELADA');--> statement-breakpoint
CREATE TABLE "demandas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gestorId" uuid NOT NULL,
	"locationId" uuid NOT NULL,
	"titulo" text NOT NULL,
	"descricao" text NOT NULL,
	"voluntariosNecessarios" integer DEFAULT 0 NOT NULL,
	"voluntariosConfirmados" integer DEFAULT 0,
	"prioridade" "prioridade" DEFAULT 'INDEFINIDO' NOT NULL,
	"status" "status" DEFAULT 'ABERTA' NOT NULL,
	"categoria" "categoria_enum" DEFAULT 'OUTROS' NOT NULL,
	"criadoEm" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizadoEm" timestamp with time zone,
	"deletadoEm" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "gestor" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"telefone" varchar(20),
	"senha" text NOT NULL,
	"endereco" text,
	"image" text,
	"criadoEm" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizadoEm" timestamp with time zone,
	"deletadoEm" timestamp with time zone,
	CONSTRAINT "gestor_email_unique" UNIQUE("email"),
	CONSTRAINT "gestor_telefone_unique" UNIQUE("telefone"),
	CONSTRAINT "gestor_endereco_unique" UNIQUE("endereco")
);
--> statement-breakpoint
CREATE TABLE "locais" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(255) NOT NULL,
	"endereco" text NOT NULL,
	"telefone" varchar(20) NOT NULL,
	"email" text,
	"gestorId" uuid,
	"image" text,
	"tipoLocal" text DEFAULT 'ABRIGO' NOT NULL,
	"criadoEm" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizadoEm" timestamp with time zone,
	"deletadoEm" timestamp with time zone,
	CONSTRAINT "locais_endereco_unique" UNIQUE("endereco"),
	CONSTRAINT "locais_email_unique" UNIQUE("email"),
	CONSTRAINT "locais_gestorId_unique" UNIQUE("gestorId")
);
--> statement-breakpoint
CREATE TABLE "voluntarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"telefone" varchar(20),
	"senha" text NOT NULL,
	"endereco" text,
	"image" text,
	"criadoEm" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizadoEm" timestamp with time zone,
	"deletadoEm" timestamp with time zone,
	CONSTRAINT "voluntarios_email_unique" UNIQUE("email"),
	CONSTRAINT "voluntarios_telefone_unique" UNIQUE("telefone"),
	CONSTRAINT "voluntarios_endereco_unique" UNIQUE("endereco")
);
--> statement-breakpoint
CREATE TABLE "voluntariosDemandas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"voluntarioId" uuid NOT NULL,
	"demandaId" uuid NOT NULL,
	"criadoEm" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_gestorId_gestor_id_fk" FOREIGN KEY ("gestorId") REFERENCES "public"."gestor"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_locationId_locais_id_fk" FOREIGN KEY ("locationId") REFERENCES "public"."locais"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locais" ADD CONSTRAINT "locais_gestorId_gestor_id_fk" FOREIGN KEY ("gestorId") REFERENCES "public"."gestor"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD CONSTRAINT "voluntariosDemandas_voluntarioId_voluntarios_id_fk" FOREIGN KEY ("voluntarioId") REFERENCES "public"."voluntarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD CONSTRAINT "voluntariosDemandas_demandaId_demandas_id_fk" FOREIGN KEY ("demandaId") REFERENCES "public"."demandas"("id") ON DELETE cascade ON UPDATE no action;