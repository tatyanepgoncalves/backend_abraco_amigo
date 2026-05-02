CREATE TYPE "public"."prioridade" AS ENUM('BAIXA', 'MÉDIA', 'ALTA', 'CRÍTICA');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('ABERTA', 'COMPLETA', 'CANCELADA');--> statement-breakpoint
CREATE TYPE "public"."tipoUser" AS ENUM('GESTOR', 'VOLUNTARIO');--> statement-breakpoint
CREATE TABLE "categorias" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"criadoEm" timestamp DEFAULT now() NOT NULL,
	"atualizadoEm" timestamp DEFAULT now(),
	"deletadaEm" timestamp,
	CONSTRAINT "categorias_nome_unique" UNIQUE("nome")
);
--> statement-breakpoint
CREATE TABLE "demandas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gestorId" uuid NOT NULL,
	"locationId" uuid NOT NULL,
	"titulo" text NOT NULL,
	"descricao" text NOT NULL,
	"voluntariosNecessarios" integer DEFAULT 0 NOT NULL,
	"voluntariosConfirmados" integer DEFAULT 0,
	"prioridade" "prioridade" DEFAULT 'BAIXA' NOT NULL,
	"status" "status" DEFAULT 'ABERTA' NOT NULL,
	"categoriaId" uuid NOT NULL,
	"criadoEm" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizadoEm" timestamp with time zone,
	"deletadoEm" timestamp with time zone
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
	CONSTRAINT "locais_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"telefone" varchar(20),
	"senha" text NOT NULL,
	"endereco" text,
	"image" text,
	"tipoUsuario" "tipoUser" DEFAULT 'VOLUNTARIO' NOT NULL,
	"criadoEm" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizadoEm" timestamp with time zone,
	"deletadoEm" timestamp with time zone,
	CONSTRAINT "usuarios_email_unique" UNIQUE("email"),
	CONSTRAINT "usuarios_telefone_unique" UNIQUE("telefone"),
	CONSTRAINT "usuarios_endereco_unique" UNIQUE("endereco")
);
--> statement-breakpoint
CREATE TABLE "voluntariosDemandas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"voluntarioId" uuid NOT NULL,
	"demandaId" uuid NOT NULL,
	"criadoEm" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_gestorId_usuarios_id_fk" FOREIGN KEY ("gestorId") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_locationId_locais_id_fk" FOREIGN KEY ("locationId") REFERENCES "public"."locais"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_categoriaId_categorias_id_fk" FOREIGN KEY ("categoriaId") REFERENCES "public"."categorias"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locais" ADD CONSTRAINT "locais_gestorId_usuarios_id_fk" FOREIGN KEY ("gestorId") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD CONSTRAINT "voluntariosDemandas_voluntarioId_usuarios_id_fk" FOREIGN KEY ("voluntarioId") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD CONSTRAINT "voluntariosDemandas_demandaId_demandas_id_fk" FOREIGN KEY ("demandaId") REFERENCES "public"."demandas"("id") ON DELETE cascade ON UPDATE no action;