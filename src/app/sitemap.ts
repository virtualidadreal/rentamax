import type { MetadataRoute } from "next";
import { CCAA_NAMES } from "@/lib/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const ccaaPages = Object.keys(CCAA_NAMES).map((ccaa) => ({
    url: `https://rentamax.franmilla.com/deducciones/${ccaa}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://rentamax.franmilla.com",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: "https://rentamax.franmilla.com/cuestionario",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: "https://rentamax.franmilla.com/deducciones",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...ccaaPages,
  ];
}
