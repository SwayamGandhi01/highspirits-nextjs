import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  categories: any[];
};

const MenuSidebar: React.FC<Props> = ({ open, onClose, categories }) => {
  const { addToCart } = useCart();
  const [expanded, setExpanded] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const handle = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    // Set initial
    setIsMobile(mq.matches);
    // Add listener
    if (mq.addEventListener) mq.addEventListener('change', handle);
    else mq.addListener(handle as any);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handle as any);
      else mq.removeListener(handle as any);
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        className={`fixed inset-0 bg-black/50 z-50 ${open ? 'block' : 'pointer-events-none'}`}
        ref={(el) => { overlayRef.current = el; }}
        onClick={(e) => {
          if (e.target === overlayRef.current) onClose();
        }}
      />

      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: open ? '0%' : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 h-full w-[86vw] sm:w-96 bg-card border-l border-border z-60 p-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-playfair font-semibold text-foreground">Menu</h3>
          <button onClick={() => onClose()} className="text-sm text-muted-foreground">Close</button>
        </div>

        {/* Sidebar shows categories only (no veg/non-veg filters) */}

        <div className="space-y-3">
          {/* If a category is selected on mobile, show its full item list with back button */}
          {selectedCategory ? (
            (() => {
              const cat = categories.find((c) => c.id === selectedCategory);
              const title = cat?.title || cat?.attributes?.title || 'Category';
              const items = cat?.menu_items || cat?.attributes?.menu_items?.data || [];
              return (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <button onClick={() => setSelectedCategory(null)} className="text-sm text-muted-foreground">← Back</button>
                    <div className="text-lg font-playfair font-semibold text-foreground">{title}</div>
                    <div />
                  </div>
                  <div className="space-y-3">
                    {items.map((it: any) => {
                      const itTitle = it.title || it.attributes?.title;
                      const price = it.price || it.attributes?.price || 0;
                      return (
                        <div key={it.id} className="flex items-center justify-between p-3 bg-card/10 rounded-lg border border-border">
                          <div>
                            <div className="font-medium text-foreground">{itTitle}</div>
                            <div className="text-sm text-muted-foreground">${Number(price).toFixed(2)}</div>
                          </div>
                          <button
                            onClick={() => addToCart({ id: it.id, title: itTitle, price, quantity: 1 })}
                            className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          ) : (
            categories.map((cat) => {
              const title = cat.title || cat.attributes?.title;
              const id = cat.id;
              const rawItems = cat.menu_items || cat.attributes?.menu_items?.data || [];
              const items = rawItems;

              return (
                <div key={id} className="border border-border rounded-lg">
                  <div
                    className="flex items-center justify-between p-3 bg-card/40 cursor-pointer"
                    onClick={() => {
                      // On mobile, open the category detail view; on larger screens, do nothing (expand handled by plus button)
                      if (isMobile) setSelectedCategory(id);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-foreground">{title}</div>
                      <div className="text-sm text-muted-foreground">{items.length}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const next = expanded === id ? null : id;
                          setExpanded(next);
                          // On mobile, ensure expanded content scrolls into view
                          if (isMobile && next) {
                            setTimeout(() => {
                              const el = document.getElementById(`cat-items-${id}`);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 80);
                          }
                        }}
                        className="px-3 py-1 rounded-full bg-secondary/30 text-muted-foreground text-sm"
                      >
                        {expanded === id ? '−' : '+'}
                      </button>
                    </div>
                  </div>

                  {expanded === id && (
                    <div id={`cat-items-${id}`} className="p-3 space-y-2 bg-card/20 border-t border-border">
                      {items.map((it: any) => {
                        const title = it.title || it.attributes?.title;
                        const price = it.price || it.attributes?.price || 0;
                        return (
                          <div key={it.id} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-foreground">{title}</div>
                              <div className="text-sm text-muted-foreground">${Number(price).toFixed(2)}</div>
                            </div>
                            <button
                              onClick={() => addToCart({ id: it.id, title, price, quantity: 1 })}
                              className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Add
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default MenuSidebar;
