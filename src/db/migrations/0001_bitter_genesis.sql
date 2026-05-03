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
ALTER TABLE "gestor" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "voluntarios" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "gestor" CASCADE;--> statement-breakpoint
DROP TABLE "voluntarios" CASCADE;--> statement-breakpoint
ALTER TABLE "locais" DROP CONSTRAINT "locais_gestorId_unique";--> statement-breakpoint
ALTER TABLE "demandas" DROP CONSTRAINT "demandas_gestorId_gestor_id_fk";
--> statement-breakpoint
ALTER TABLE "locais" DROP CONSTRAINT "locais_gestorId_gestor_id_fk";
--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" DROP CONSTRAINT "voluntariosDemandas_voluntarioId_voluntarios_id_fk";
--> statement-breakpoint
ALTER TABLE "demandas" ALTER COLUMN "prioridade" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "demandas" ALTER COLUMN "prioridade" SET DEFAULT 'BAIXA'::text;--> statement-breakpoint
DROP TYPE "public"."prioridade";--> statement-breakpoint
CREATE TYPE "public"."prioridade" AS ENUM('BAIXA', 'MÉDIA', 'ALTA', 'CRÍTICA');--> statement-breakpoint
ALTER TABLE "demandas" ALTER COLUMN "prioridade" SET DEFAULT 'BAIXA'::"public"."prioridade";--> statement-breakpoint
ALTER TABLE "demandas" ALTER COLUMN "prioridade" SET DATA TYPE "public"."prioridade" USING "prioridade"::"public"."prioridade";--> statement-breakpoint
ALTER TABLE "demandas" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "demandas" ALTER COLUMN "status" SET DEFAULT 'ABERTA'::text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('ABERTA', 'COMPLETA', 'CANCELADA');--> statement-breakpoint
ALTER TABLE "demandas" ALTER COLUMN "status" SET DEFAULT 'ABERTA'::"public"."status";--> statement-breakpoint
ALTER TABLE "demandas" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "demandas" ADD COLUMN "categoriaId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_gestorId_usuarios_id_fk" FOREIGN KEY ("gestorId") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_categoriaId_categorias_id_fk" FOREIGN KEY ("categoriaId") REFERENCES "public"."categorias"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locais" ADD CONSTRAINT "locais_gestorId_usuarios_id_fk" FOREIGN KEY ("gestorId") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voluntariosDemandas" ADD CONSTRAINT "voluntariosDemandas_voluntarioId_usuarios_id_fk" FOREIGN KEY ("voluntarioId") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "demandas" DROP COLUMN "categoria";--> statement-breakpoint
DROP TYPE "public"."categoria_enum";