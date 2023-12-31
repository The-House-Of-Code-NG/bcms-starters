import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  HomePageEntry,
  HomePageEntryMeta,
} from "~~/bcms/types/entry/home_page";
import { apiRoute } from "./_api-route";
import { HomePageData } from "~~/types";
import {
  ServiceItemEntry,
  ServiceItemEntryMeta,
  AboutPageEntry,
  AboutPageEntryMeta,
  PortfolioItemEntry,
  PortfolioItemEntryMeta,
  PortfolioPageEntry,
  PortfolioPageEntryMeta,
  TestimonialItemEntry,
  TestimonialItemEntryMeta,
  TestimonialsPageEntry,
  TestimonialsPageEntryMeta,
  ServicesPageEntry,
  ServicesPageEntryMeta,
} from "~~/bcms/types";

export const HomeApi = createBcmsMostServerRoutes({
  "/home.json": apiRoute<HomePageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "home_page",
        async () => true
      )) as unknown as HomePageEntry;

      if (!entry) {
        throw new Error("Home page entry does not exist.");
      }

      const services = (await bcms.content.entry.findOne(
        "services_page",
        async () => true
      )) as unknown as ServicesPageEntry;

      const servicesMeta = services.meta.en as ServicesPageEntryMeta;

      const serviceItems = (await bcms.content.entry.find(
        "service_item",
        async () => true
      )) as unknown as ServiceItemEntry[];

      const about = (await bcms.content.entry.findOne(
        "about_page",
        async () => true
      )) as unknown as AboutPageEntry;

      const aboutMeta = about.meta.en as AboutPageEntryMeta;

      const portfolio = (await bcms.content.entry.findOne(
        "portfolio_page",
        async () => true
      )) as unknown as PortfolioPageEntry;

      const portfolioMeta = portfolio.meta.en as PortfolioPageEntryMeta;

      const portfolioItems = (await bcms.content.entry.find(
        "portfolio_item",
        async () => true
      )) as unknown as PortfolioItemEntry[];

      const testimonials = (await bcms.content.entry.findOne(
        "testimonials_page",
        async () => true
      )) as unknown as TestimonialsPageEntry;

      const testimonialsMeta = testimonials.meta
        .en as TestimonialsPageEntryMeta;

      const testimonialsItems = (await bcms.content.entry.find(
        "testimonial_item",
        async () => true
      )) as unknown as TestimonialItemEntry[];

      return {
        meta: entry.meta.en as HomePageEntryMeta,
        services: {
          title: servicesMeta.title,
          description: servicesMeta.description,
          items: serviceItems.map((s) => s.meta.en) as ServiceItemEntryMeta[],
        },
        about: {
          title: aboutMeta.title,
          description: aboutMeta.description,
          education: aboutMeta.education,
          workHistory: aboutMeta.work_history,
        },
        portfolio: {
          title: portfolioMeta.title,
          description: portfolioMeta.description,
          items: portfolioItems
            .map((e) => e.meta.en as PortfolioItemEntryMeta)
            .slice(0, 4),
        },
        testimonials: {
          title: testimonialsMeta.title,
          description: testimonialsMeta.description,
          items: testimonialsItems.map(
            (e) => e.meta.en as TestimonialItemEntryMeta
          ),
        },
      };
    },
  }),
});
