// DB schema
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  boolean,
  unique,
} from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import type { AdapterAccountType } from "next-auth/adapters"

const connectionString = "postgres://postgres:postgres@localhost:5432/drizzle"
const pool = postgres(connectionString, { max: 1 })

export const db = drizzle(pool)

export const users = pgTable("user", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  points: integer("points").default(0).notNull(),
  leagueId: uuid("league_id")
    .references(() => leagues.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow()
})

export const leagues = pgTable("league", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  minPoints: integer("min_points").notNull(),
  maxPoints: integer("max_points").notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .defaultNow()
    .notNull(),
});

export const pointsHistory = pgTable("points_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  points: integer("points").notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .defaultNow()
    .notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
)

export const tests = pgTable("test", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  authorId: uuid("authorId").notNull().references(() => users.id, { onDelete: "cascade" }),
  durationMinutes: integer("durationMinutes").notNull(),
  isPublic: boolean("is_public").default(true).notNull(),
  startsAt: timestamp("starts_at", { mode: "date" }),
  endsAt: timestamp("ends_at", { mode: "date" }),
  tags: text("tags").array().$type<string[]>(),
  attemptCount: integer("attempt_count").default(0).notNull(),
  isAnsKeyProvided: boolean("is_ans_key_provided").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
})


export const questions = pgTable("question", {
  id: text("id").primaryKey().notNull(),
  testId: text("test_id")
    .references(() => tests.id),
  authorId: uuid("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tags: text("tags").array().$type<string[]>(),
  questionText: text("question_text"),
  questionImages: text("question_images").array().$type<string[]>(),
  subject: text("subject"),
  topic: text("topic"),
  questionType: text("question_type").$type<"MCQ" | "MSQ" | "INTEGER">().notNull().default("MCQ"),
  correctOption: text("correct_option"),
  correctOptions: text("correct_options").array().$type<string[]>(),
  correctAnswer: integer("correct_answer"),
  marks: integer("marks").default(4).notNull(),
  negativeMarks: integer("negative_marks").default(1).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
})

export const options = pgTable("option", {
  id: uuid("id").primaryKey().defaultRandom(),
  questionId: text("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  label: text("label").$type<"A" | "B" | "C" | "D">().notNull(),
  text: text("text"),
  images: text("images").array().$type<string[]>(),
  isCorrect: boolean("is_correct").default(false),
});

export const attempts = pgTable("attempt", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  testId: text("test_id")
    .notNull()
    .references(() => tests.id, { onDelete: "cascade" }),
  score: integer("score").default(0).notNull(),
  correctCount: integer("correct_count").default(0).notNull(),
  incorrectCount: integer("incorrect_count").default(0).notNull(),
  timeTaken: integer("time_taken").default(0).notNull(),
  submittedAt: timestamp("submitted_at", { mode: "date" }).defaultNow().notNull(),
  rank: integer("rank").default(0)
});

export const questionAttempts = pgTable("question_attempt", {
  id: uuid("id").primaryKey().defaultRandom(),
  attemptId: uuid("attempt_id")
    .notNull()
    .references(() => attempts.id, { onDelete: "cascade" }),
  questionId: text("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  questionType: text("question_type").$type<"MCQ" | "MSQ" | "INTEGER">().notNull(),
  selectedOption: text("selected_option"),
  selectedOptions: text("selected_options").array().$type<string[]>(),
  integerAnswer: integer("integer_answer"),
  isCorrect: boolean("is_correct").default(false),
  marksAwarded: integer("marks_awarded").default(0).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
})

export const bookmarks = pgTable("bookmark", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  questionId: text("question_id").notNull().references(() => questions.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
}, (t) => ({
  unique: unique("user_question_unique").on(t.userId, t.questionId),
}));

export const savedTests = pgTable("saved_test", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  testId: text("test_id")
    .notNull()
    .references(() => tests.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
}, (t) => ({
  unique: unique("user_test_unique").on(t.userId, t.testId),
}))


