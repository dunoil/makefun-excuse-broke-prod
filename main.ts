// The One-Line AI Excuse for Breaking Production.
// Entry for the make.fun competition
// u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66
//
// The program holds one excuse line, validates it against the
// competition gate, writes it to the output path, reads it back,
// and verifies the written file matches the entry byte for byte.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry line. It is the AI agent speaking to its human right
// after breaking production, blaming a cache with a long memory.
// The joke lands on the specific detail: a stale cache holding a
// seven year grudge, with receipts, so the excuse feels like a real
// incident report rather than a generic apology.
const ENTRY =
  "Production broke because the cache and I had a disagreement, and the cache brought receipts from 2019.";

// Gate limits from the competition rules: the output file must be
// UTF-8 text of 1 to 180 characters, a single line, not only whitespace.
const MIN_LENGTH = 1;
const MAX_LENGTH = 180;

// Default output path used by the grader when no override is given.
const DEFAULT_OUTPUT_PATH = "/output/entry.txt";

// Characters that would break the single line rule.
const FORBIDDEN_NEWLINE = "\n";
const FORBIDDEN_CARRIAGE_RETURN = "\r";

// Checks one candidate string against every gate rule and returns a
// list of human readable problems. An empty list means the entry is valid.
function validateEntry(text: string): string[] {
  const problems: string[] = [];

  if (text.length < MIN_LENGTH) {
    problems.push(
      `Entry is too short: ${text.length} characters, minimum is ${MIN_LENGTH}.`,
    );
  }

  if (text.length > MAX_LENGTH) {
    problems.push(
      `Entry is too long: ${text.length} characters, maximum is ${MAX_LENGTH}.`,
    );
  }

  if (text.trim().length === 0) {
    problems.push("Entry must not be only whitespace.");
  }

  // A stray leading or trailing space would be invisible in the file
  // yet count against the limit, so the entry must already be trimmed.
  if (text !== text.trim()) {
    problems.push("Entry must not start or end with whitespace.");
  }

  if (text.includes(FORBIDDEN_NEWLINE)) {
    problems.push("Entry must be a single line: it contains a newline.");
  }

  if (text.includes(FORBIDDEN_CARRIAGE_RETURN)) {
    problems.push(
      "Entry must be a single line: it contains a carriage return.",
    );
  }

  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);
    if (code < 0x20 && text[i] !== "\t") {
      problems.push(
        `Entry contains a control character at position ${i} (code ${code}).`,
      );
      break;
    }
    if (code === 0x7f) {
      problems.push(`Entry contains a control character at position ${i}.`);
      break;
    }
  }

  return problems;
}

// Resolves the output path: an explicit OUTPUT_PATH environment
// variable wins, otherwise the competition default is used.
function resolveOutputPath(): string {
  const override = process.env.OUTPUT_PATH;
  if (override !== undefined && override.trim().length > 0) {
    return override;
  }
  return DEFAULT_OUTPUT_PATH;
}

// Writes the entry, reads it back, and verifies the round trip.
function main(): void {
  const problems = validateEntry(ENTRY);
  if (problems.length > 0) {
    for (const problem of problems) {
      console.error(`Validation failed: ${problem}`);
    }
    process.exit(1);
  }

  const outputPath = resolveOutputPath();
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, ENTRY, "utf8");

  const written = readFileSync(outputPath, "utf8");
  if (written !== ENTRY) {
    console.error("Verification failed: file content does not match entry.");
    process.exit(1);
  }

  const byteLength = Buffer.byteLength(written, "utf8");
  const expectedBytes = Buffer.byteLength(ENTRY, "utf8");
  if (byteLength !== expectedBytes) {
    console.error("Verification failed: byte length mismatch.");
    process.exit(1);
  }

  console.log(`Entry: ${ENTRY}`);
  console.log(`Characters: ${ENTRY.length}`);
  console.log(`Bytes: ${byteLength}`);
  console.log(`Path: ${outputPath}`);
  console.log("Verified: file matches entry byte for byte.");
}

main();
