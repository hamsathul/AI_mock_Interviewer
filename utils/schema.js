
import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";

export const mockInterview=pgTable('mockInterview', {
	id: serial('id').primaryKey(),
	jsonMockResp: text('jsonMockResp').notNull(),
	jobPosition: varchar('jobPosition').notNull(),
	jobDesc: varchar('jobDesc').notNull(),
	jobExperience: varchar('jobExperience').notNull(),
	createdBy: varchar('createdBy').notNull(),
	createdAt: varchar('createdAt').notNull(),
	mockId: varchar('mockId').notNull(),
})

export const UserAnswers=pgTable('UserAnswers', {
	id: serial('id').primaryKey(),
	mockIdRef: varchar('mockId').notNull(),
	question: varchar('question').notNull(),
	correctAns: text('correctAns'),
	userAns: text('userAns'),
	feedback: varchar('feedback'),
	rating: varchar('rating'),
	userEmail: varchar('userEmail'),
	createdAt: varchar('createdAt'),
	
})