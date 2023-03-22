import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  RecipeEntry,
  RecipeEntryMeta,
  RecipesPageEntry,
  RecipesPageEntryMeta,
} from "~~/bcms/types";
import { RecipeLight, RecipesPageData } from "~~/types";
import { apiRoute } from "./_api-route";

export const recipeToLight = (recipes: RecipeEntry[]): RecipeLight[] => {
  return recipes.map((e) => {
    const meta = e.meta.en as RecipeEntryMeta;

    return {
      title: meta.title,
      slug: meta.slug,
      cover: meta.cover_image,
      categories: meta.categories.map((i) => i.meta.en?.title || ""),
      description: meta.description,
      popular: meta.popular,
    };
  });
};

export const RecipesApi = createBcmsMostServerRoutes({
  "/recipes.json": apiRoute<RecipesPageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "recipes_page",
        async () => true
      )) as unknown as RecipesPageEntry;

      const recipes = (await bcms.content.entry.find(
        "recipe",
        async () => true
      )) as unknown as RecipeEntry[];

      if (!entry) {
        throw new Error("Recipes page entry does not exist.");
      }

      return {
        meta: entry.meta.en as RecipesPageEntryMeta,
        recipes: recipeToLight(recipes),
      };
    },
  }),
});