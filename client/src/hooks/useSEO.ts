import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export function useSEO({ title, description, keywords, canonicalUrl, ogImage }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMeta("description", description);
    
    if (keywords) {
      setMeta("keywords", keywords);
    }

    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    
    if (ogImage) {
      setMeta("og:image", ogImage, true);
    }

    setMeta("twitter:title", title, true);
    setMeta("twitter:description", description, true);

    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }

    return () => {
      document.title = "Alynthe | The Infrastructure of Growth";
    };
  }, [title, description, keywords, canonicalUrl, ogImage]);
}
