"use client"
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Use @tanstack/react-query
// Correctly destructure the children prop and avoid recreating QueryClient on every render
const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient =  new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
export default QueryProvider;
