<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <HomePageHero :data="data.data.meta.hero" :recipes="data.data.recipes" />
    <HomePageRecipes :data="data.data.meta.recipes" />
    <HomePageAboutUs :data="data.data.meta.about_us" />
    <HomePageLetsTalk :data="data.data.meta.lets_talk" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { APIResponse, HomePageData } from "~~/types";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<HomePageData>>({
    url: "/home.json",
  });
});

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.data.meta.title,
  })
);
</script>
