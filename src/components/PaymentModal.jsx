import {
   
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
  } from "@headlessui/react";
  import { useEffect, useState } from "react";
  import { Elements } from "@stripe/react-stripe-js";
  import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";



  const loadStripePromise = async () => {
    return await loadStripe(import.meta.env.VITE_STRIPE_KEY)
    }  

  const PayMentModal = ({ open,pay }) => {
    let [isOpen, setIsOpen] = useState(false);
  
    // setIsOpen(open)
    useEffect(() => {
      setIsOpen(open);
    }, [open]);
  
    function close() {
      setIsOpen(false);
    }
  
    return (
      <>
        <Transition appear show={isOpen}>
          <Dialog
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 transform-[scale(95%)]"
                  enterTo="opacity-100 transform-[scale(100%)]"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 transform-[scale(100%)]"
                  leaveTo="opacity-0 transform-[scale(95%)]"
                >
                  <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                    <DialogTitle
                      as="h3"
                      className="text-base/7 font-medium text-white text-center"
                    >
                      Pay First 
                    </DialogTitle>
                    <div className="mt-2 text-sm/6 text-white/50">
                      <Elements stripe={loadStripePromise()}>
                        <CheckoutForm pay={pay}/>
                      </Elements>
                    </div>
                   
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  };
  
  export default PayMentModal;