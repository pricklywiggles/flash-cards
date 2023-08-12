import { FComponent } from '@/types/common';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './forms/Button';
import { clsx } from 'clsx';

export const Modal: FComponent<{
  isOpen: boolean;
  toggle: () => void;
  title: string;
  description: string;
  width?: string;
  isTitleHidden?: boolean;
  isDescriptionHidden?: boolean;
  hasDismissButton?: boolean;
  dismissButtonText?: string;
}> = ({
  title,
  description,
  isOpen,
  toggle,
  width = 'fit-content',
  hasDismissButton = false,
  dismissButtonText = 'Close',
  isTitleHidden = false,
  isDescriptionHidden = false,
  children
}) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Dialog as="div" open={isOpen} onClose={toggle}>
          <div>
            {/* <div className="fixed inset-0 bg-[url('/prigib.png')]" /> */}
            <motion.div
              {...motionProps.overlay}
              className="fixed inset-0 rounded bg-black bg-opacity-50 backdrop-blur-[4px]"
            />
            <div className="fixed inset-0 flex items-center justify-center">
              <Dialog.Panel className="max-w-lg">
                <motion.div
                  key="contents"
                  {...motionProps.panel}
                  className="glass-window glare-slate isolate max-w-lg rounded-xl p-4 drop-shadow-2xl backdrop-blur-[10px]"
                >
                  <Dialog.Title className={clsx(isTitleHidden && 'sr-only')}>
                    {title}
                  </Dialog.Title>

                  <Dialog.Description
                    className={clsx(isDescriptionHidden && 'sr-only')}
                  >
                    {description}
                  </Dialog.Description>
                  {children}
                  {hasDismissButton ? (
                    <div>
                      <Button onPress={toggle}>{dismissButtonText}</Button>
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
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { delay: 0.1, duration: 0.1 } },
    transition: { duration: 0.1 }
  },
  panel: {
    initial: { opacity: 0, scale: 0.9, y: 100 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.1, delay: 0.15 }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: { duration: 0.15 }
    },
    transition: { duration: 0.15, delay: 0.1 }
  }
};
