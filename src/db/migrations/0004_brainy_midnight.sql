ALTER TABLE "usuarios" ADD COLUMN "endereco" text;--> statement-breakpoint
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_endereco_unique" UNIQUE("endereco");