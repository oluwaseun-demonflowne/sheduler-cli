CREATE TABLE IF NOT EXISTS "emailList" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"period" varchar(255) NOT NULL,
	CONSTRAINT "emailList_email_unique" UNIQUE("email")
);
