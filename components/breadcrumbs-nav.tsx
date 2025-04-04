"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbStructuredData } from "./structured-data";
import { useLocalizedUrl } from "@/app/hooks/use-localized-url";

interface BreadcrumbsNavProps {
  homeLabel?: string;
  className?: string;
}

export function BreadcrumbsNav({ homeLabel = "Home", className = "" }: BreadcrumbsNavProps) {
  const pathname = usePathname();
  const localizeUrl = useLocalizedUrl();
  
  if (!pathname) return null;
  
  // Extract the language code from the pathname
  const parts = pathname.split('/').filter(Boolean);
  const lang = parts[0];
  
  // Skip the language part for processing breadcrumbs
  const pathWithoutLang = parts.slice(1);
  
  // Generate breadcrumb items
  const breadcrumbs = [
    { name: homeLabel, path: "/" },
    ...pathWithoutLang.map((part, index) => {
      // Create a path up to this part
      const path = `/${pathWithoutLang.slice(0, index + 1).join("/")}`;
      
      // Format the label (replace hyphens with spaces and capitalize)
      let label = part.replace(/-/g, " ");
      label = label.charAt(0).toUpperCase() + label.slice(1);
      
      return { name: label, path };
    }),
  ];
  
  // Generate structured data for SEO
  const structuredDataItems = [
    { name: homeLabel, url: `https://soluvia.com/${lang}` },
    ...pathWithoutLang.map((part, index) => {
      const path = `/${pathWithoutLang.slice(0, index + 1).join("/")}`;
      let label = part.replace(/-/g, " ");
      label = label.charAt(0).toUpperCase() + label.slice(1);
      return { 
        name: label, 
        url: `https://soluvia.com/${lang}${path}` 
      };
    }),
  ];

  return (
    <>
      <BreadcrumbStructuredData items={structuredDataItems} />
      <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
        <ol className="flex flex-wrap items-center text-ivory/70">
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={breadcrumb.path} className="flex items-center">
                {index === 0 ? (
                  // Home link
                  <Link 
                    href={localizeUrl(breadcrumb.path)} 
                    className="flex items-center hover:text-ivory transition-colors duration-200"
                  >
                    <Home className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only">{breadcrumb.name}</span>
                  </Link>
                ) : (
                  // Other links
                  <Link 
                    href={localizeUrl(breadcrumb.path)} 
                    className={`${isLast ? 'text-ivory font-medium' : 'hover:text-ivory transition-colors duration-200'}`}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {breadcrumb.name}
                  </Link>
                )}
                
                {/* Separator */}
                {!isLast && (
                  <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0 text-ivory/40" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
} 