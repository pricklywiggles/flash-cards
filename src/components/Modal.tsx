import { FComponent } from "@/types/common";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./forms/Button";
import { clsx } from "clsx";

export const Modal: FComponent<{
  isOpen: boolean;
  toggle: () => void;
  title: string;
  description: string;
  width?: string;
  isTitleHidden?: boolean;
  isDescriptionHidden?: boolean;
  withButton?: boolean;
}> = ({
  title,
  description,
  isOpen,
  toggle,
  width = "fit-content",
  withButton = false,
  isTitleHidden = false,
  isDescriptionHidden = false,
  children,
}) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Dialog as="div" open={isOpen} onClose={toggle}>
          <div>
            <div className="fixed inset-0 bg-[url('/prigib.png')]" />
            <motion.div
              {...motionProps.overlay}
              className="fixed inset-0 rounded bg-black bg-opacity-50"
            />
            <div className="fixed inset-0 flex items-center justify-center">
              <Dialog.Panel className="relative max-w-lg">
                <motion.div
                  {...motionProps.panel}
                  className="glass-window absolute inset-0 isolate max-w-lg rounded-[13px] bg-white bg-opacity-30 p-4 drop-shadow-2xl backdrop-blur-[2px]"
                />

                <motion.div
                  key="contents"
                  {...motionProps.panel}
                  className="isolate rounded-xl p-4"
                >
                  <Dialog.Title className={clsx(isTitleHidden && "sr-only")}>
                    {title}
                  </Dialog.Title>

                  <Dialog.Description
                    className={clsx(isDescriptionHidden && "sr-only")}
                  >
                    {description}
                  </Dialog.Description>
                  {children}
                  {withButton ? (
                    <div>
                      <Button onPress={toggle}>Close</Button>
                    </div>
                  ) : null}
                </motion.div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

const motionProps = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, transition: { delay: 0.1, duration: 0.1 } },
    transition: { duration: 0.1 },
  },
  panel: {
    initial: { opacity: 0, scale: 0.9, y: 100 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.1, delay: 0.15 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: { duration: 0.15 },
    },
    transition: { duration: 0.15, delay: 0.1 },
  },
};
