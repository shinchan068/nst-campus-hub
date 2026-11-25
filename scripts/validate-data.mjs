import { readFile, readdir } from "node:fs/promises";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const root = new URL("../", import.meta.url);
const readJson = async (path) => JSON.parse(await readFile(new URL(path, root), "utf8"));
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
ajv.addFormat("https-url", {
  type: "string",
  validate(value) {
    if (!/^https:\/\/[^/\s]/.test(value)) return false;
    const url = URL.parse(value);
    return Boolean(url?.hostname && !url.username && !url.password);
  },
});

const collections = { students: "username", projects: "slug", events: "slug", resources: "slug" };
const errors = [];
const students = new Set();
const projects = [];
let count = 0;

for (const entry of await readdir(new URL("data/", root), { withFileTypes: true })) {
  // TypeScript content modules outside the JSON collections are covered by typecheck.
  if (entry.isFile() && entry.name.endsWith(".ts")) continue;
  if (!entry.isDirectory() || !Object.hasOwn(collections, entry.name)) {
    errors.push(`data/${entry.name}: expected a known data collection directory`);
  }
}

for (const [collection, key] of Object.entries(collections)) {
  const validate = ajv.compile(await readJson(`schemas/${collection}.json`));
  const ids = new Map();
  const entries = await readdir(new URL(`data/${collection}/`, root), { withFileTypes: true });
  for (const entry of entries) {
    const path = `data/${collection}/${entry.name}`;
    if (!entry.isFile() || !entry.name.endsWith(".json")) {
      errors.push(`${path}: expected a JSON file`);
      continue;
    }

    let data;
    try {
      data = await readJson(path);
    } catch (error) {
      errors.push(`${path}: ${error.message}`);
      continue;
    }

    if (!validate(data)) {
      for (const error of validate.errors) {
        errors.push(`${path}${error.instancePath}: ${error.message}`);
      }
      continue;
    }
    count++;
    if (entry.name === "_example.json") continue;

    const id = data[key];
    if (entry.name !== `${id}.json`) errors.push(`${path}: filename must be ${id}.json (matches ${key})`);
    if (ids.has(id)) errors.push(`${path}: duplicate ${key} "${id}" (also in ${ids.get(id)})`);
    ids.set(id, path);

    if (collection === "students") students.add(id);
    if (collection === "projects") projects.push({ path, author: data.author });
  }
}

for (const { path, author } of projects) {
  if (!students.has(author)) errors.push(`${path}: author "${author}" has no student profile`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${count} JSON files across ${Object.keys(collections).length} collections.`);
}
