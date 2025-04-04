"use client";

import { useParams } from 'next/navigation';

/**
 * Custom hook to localize URLs with the current language
 */
export function useLocalizedUrl() {
  const params = useParams<{ lang: string }>();
  const language = params?.lang || 'en';

  return (path: string) => {
    // Handle root path
    if (path === "/") {
      return `/${language}`;
    }

    // Handle other paths
    return `/${language}${path}`;
  };
} 