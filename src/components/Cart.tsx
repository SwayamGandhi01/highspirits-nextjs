import React from 'react';
import { useCart } from '@/context/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Minus, MessageCircle, ShoppingCart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, isOpen, setIsOpen } = useCart();

  const handleWhatsAppOrder = () => {
    const phoneNumber = '61420408809'; // Correct restaurant WhatsApp number
    
    let message = `Hello High Spirits! I would like to place an order:%0A%0A`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.title} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}%0A`;
    });
    
    message += `%0A*Total: $${totalPrice.toFixed(2)}*%0A%0APlease confirm my order. Thank you!`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[90%] sm:max-w-md flex flex-col glass-effect border-l border-white/10 p-4 sm:p-6">
        <SheetHeader className="pb-4 md:pb-6">
          <SheetTitle className="text-xl md:text-2xl font-playfair font-bold flex items-center gap-2">
            <ShoppingCart className="text-accent w-5 h-5 md:w-6 h-6" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 px-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary/50 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
            </div>
            <div>
              <p className="text-base md:text-lg font-semibold">Your cart is empty</p>
              <p className="text-xs md:text-sm text-muted-foreground">Add some delicious items from our menu!</p>
            </div>
            <Button 
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="mt-4"
            >
              Continue Browsing
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-2 px-2 sm:-mx-4 sm:px-4">
              <div className="space-y-5 md:space-y-6 py-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 md:gap-4 group">
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm md:text-base font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[10px] md:text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                      
                      <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-3">
                        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-secondary/30">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 md:p-2 hover:bg-white/10 transition-colors active:bg-white/20"
                          >
                            <Minus className="w-3 md:w-3.5 h-3 md:h-3.5" />
                          </button>
                          <span className="w-6 md:w-8 text-center text-xs md:text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 md:p-2 hover:bg-white/10 transition-colors active:bg-white/20"
                          >
                            <Plus className="w-3 md:w-3.5 h-3 md:h-3.5" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 md:w-4 h-3.5 md:h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm md:text-base font-bold text-accent">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="pt-4 md:pt-6 space-y-3 md:space-y-4">
              <Separator className="bg-white/10" />
              <div className="space-y-1 md:space-y-2">
                <div className="flex justify-between text-[11px] md:text-sm">
                  <span className="text-muted-foreground uppercase tracking-tight">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base md:text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-5 md:py-6 rounded-xl font-bold text-base md:text-lg gap-2 md:gap-3 transition-all duration-300 hover:scale-[1.01] active:scale-95 shadow-lg shadow-green-600/20"
              >
                <MessageCircle className="w-5 h-5 md:w-6 h-6" />
                Order via WhatsApp
              </Button>
              
              <p className="text-center text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest leading-none">
                No payment needed now. Pay on pickup/delivery.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
