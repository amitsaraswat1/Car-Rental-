import { MetadataRoute } from "next";
import { citiesData } from "@/data/cities";
import { routesData } from "@/data/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://royalroute.in";
  const lastModified = new Date("2026-02-01");

  // Core static pages
  const staticPages = [
    "",
    "/fleet",
    "/services",
    "/rates",
    "/about",
    "/contact",
    "/faq",
    "/terms",
    "/cancellation-policy",
    "/privacy-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic city pages
  const cityPages = citiesData.map((city) => ({
    url: `${baseUrl}/cities/${city.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic route pages
  const routePages = routesData.map((route) => ({
    url: `${baseUrl}/routes/${route.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...cityPages, ...routePages];
}
