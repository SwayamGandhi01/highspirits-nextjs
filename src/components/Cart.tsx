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
      <SheetContent className="w-full sm:max-w-md flex flex-col glass-effect border-l border-white/10">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl font-playfair font-bold flex items-center gap-2">
            <ShoppingCart className="text-accent w-6 h-6" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-semibold">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some delicious items from our menu!</p>
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
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-6 py-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="flex-1 space-y-1">
                      <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                      
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-secondary/30">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-white/10 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-white/10 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="pt-6 space-y-4">
              <Separator className="bg-white/10" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl font-bold text-lg gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-600/20"
              >
                <MessageCircle className="w-6 h-6" />
                Order via WhatsApp
              </Button>
              
              <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest">
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
