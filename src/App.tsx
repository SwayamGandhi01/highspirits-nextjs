import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import WalkInPopup from "./components/WalkInPopup";
import LunchWelcomePopup from "./components/LunchWelcomePopup";
import { WalkInPopupProvider, useWalkInPopup } from "./context/WalkInPopupContext";
import { LunchWelcomePopupProvider, useLunchWelcomePopup } from "./context/LunchWelcomePopupContext";

import Index from "./pages/Index";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isOpen, closePopup } = useWalkInPopup();
  const { isOpen: isLunchOpen, closePopup: closeLunchPopup } = useLunchWelcomePopup();

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <LunchWelcomePopup isOpen={isLunchOpen} onClose={closeLunchPopup} />
        <WalkInPopup isOpen={isOpen} onClose={closePopup} />
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LunchWelcomePopupProvider>
        <WalkInPopupProvider>
          <AppContent />
        </WalkInPopupProvider>
      </LunchWelcomePopupProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
