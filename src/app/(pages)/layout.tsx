'use client'

// React Imports
import React from 'react';

// MUI Imports
import Providers from '@/components/Providers';
import HorizontalLayout from '@/components/layout/horizontal/HorizontalLayout';
import Header from '@/components/layout/horizontal/Header';

export default function OMDBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <HorizontalLayout header={<Header title="OMDB Movies" />} >
        {children}
      </HorizontalLayout>
    </Providers>
  );
}
