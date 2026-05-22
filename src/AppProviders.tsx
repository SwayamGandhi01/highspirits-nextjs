import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CartProvider } from "./context/CartContext";
import { WalkInPopupProvider } from "./context/WalkInPopupContext";
import React from "react";

const queryClient = new QueryClient();

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CartProvider>
          <WalkInPopupProvider>{children}</WalkInPopupProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
