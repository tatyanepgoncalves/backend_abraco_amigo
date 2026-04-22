ALTER TABLE "usuarios" ADD COLUMN "telefone" varchar(20);--> statement-breakpoint
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_telefone_unique" UNIQUE("telefone");