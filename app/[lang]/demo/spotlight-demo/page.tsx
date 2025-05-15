'use client';

import React from 'react';
import { SpotlightCard } from '@/components/ui/spotlight-card';

export default function SpotlightDemoPage() {
  return (
    <div className="min-h-screen p-12 bg-charcoal">
      <h1 className="text-4xl font-bold text-ivory mb-8">Spotlight Card Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SpotlightCard>
          <h2 className="text-2xl font-bold text-ivory mb-4">Default Variant</h2>
          <p className="text-ivory/70">This is the default spotlight card. Hover over it to see the effect.</p>
        </SpotlightCard>
        
        <SpotlightCard variant="rose">
          <h2 className="text-2xl font-bold text-ivory mb-4">Rose Variant</h2>
          <p className="text-ivory/70">This card uses the rose color theme.</p>
        </SpotlightCard>
        
        <SpotlightCard variant="sapphire">
          <h2 className="text-2xl font-bold text-ivory mb-4">Sapphire Variant</h2>
          <p className="text-ivory/70">This card uses the sapphire color theme.</p>
        </SpotlightCard>
        
        <SpotlightCard variant="beige">
          <h2 className="text-2xl font-bold text-ivory mb-4">Beige Variant</h2>
          <p className="text-ivory/70">This card uses the beige color theme.</p>
        </SpotlightCard>
      </div>
    </div>
  );
} 