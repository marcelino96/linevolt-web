import { type SchemaTypeDefinition } from "sanity";
import { portfolioSchema } from "./portfolio";
import { blogSchema } from "./blog";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioSchema, blogSchema],
};
