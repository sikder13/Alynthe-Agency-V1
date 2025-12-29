import { useEffect } from "react";

interface SchemaMarkupProps {
  type?: "home" | "services" | "about" | "contact";
}

export function SchemaMarkup({ type = "home" }: SchemaMarkupProps) {
  useEffect(() => {
    const existingScript = document.querySelector('script[data-schema="alynthe"]');
    if (existingScript) {
      existingScript.remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Alynthe",
      "url": "https://alynthe.com",
      "logo": "https://alynthe.com/my-logo.png",
      "image": "https://alynthe.com/opengraph.webp",
      "description": "Digital solutions agency in Indianapolis specializing in AI marketing automation and web development.",
      "telephone": "+1-929-350-8374",
      "email": "info@alynthe.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1438 Spann Ave",
        "addressLocality": "Indianapolis",
        "addressRegion": "IN",
        "postalCode": "46203",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "39.7684",
        "longitude": "-86.1581"
      },
      "priceRange": "$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "sameAs": [
        "https://www.linkedin.com/company/alynthe"
      ],
      "areaServed": {
        "@type": "City",
        "name": "Indianapolis"
      },
      "serviceType": [
        "AI Marketing Automation",
        "Web Development",
        "Digital Marketing",
        "Process Automation",
        "CRM Integration"
      ],
      "knowsAbout": [
        "Artificial Intelligence",
        "Marketing Automation",
        "Web Development",
        "Digital Strategy",
        "Lead Generation"
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "alynthe");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-schema="alynthe"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type]);

  return null;
}
