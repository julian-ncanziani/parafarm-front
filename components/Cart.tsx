'use client'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Menu } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import SignInBtn from './SingInBtn';
import CartItem from './CartItem';

interface CartProps {
    
}

const Cart: React.FC<CartProps> = () => {
  
  const { cart, isOpen, closeCart } = useCart();
  const { data: session } = useSession();
  

  const setTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const printCheckoutOrSignIn = () => {
    if(session?.user){
      return(
        <div className="mt-6">
          <a
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </a>
        </div>
      )
    }else{
      return(
        <div
        className="block w-full px-4 py-2 text-sm font-medium text-center bg-blue-600 rounded hover:bg-blue-500 transition duration-300 ease-in-out cursor-pointer"
        >   
          <SignInBtn text='Logeate para continuar' textColor='white'/>
        </div>
      )
    }

  }


  return (
    <Dialog open={isOpen} onClose={closeCart} className="relative z-20">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={closeCart}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cart.map((product) => (
                          <CartItem product={product}/>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>${setTotal()}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Continua con el pago</p>
                  {printCheckoutOrSignIn()}
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      o{' '}
                      <button
                        type="button"
                        onClick={closeCart}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Volver al shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Cart;