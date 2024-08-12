'use client'

// React Imports
import React from 'react';

// MUI Imports
import Providers from '@/components/Providers';

export default function OMDBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}
