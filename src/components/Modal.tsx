import { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Props {
  className?: string;
  title?: string;
  showModal: boolean;
  children?: ReactNode;
  closeButton?: boolean;
  dataCy?: string | number;
  clickOutsideClose?: boolean;
  onCloseModal?: () => void;
}

const Modal = ({
  className,
  title,
  showModal,
  onCloseModal = () => null,
  children,
  closeButton = true,
  dataCy,
  clickOutsideClose = true,
}: Props) => (
  <Transition.Root show={showModal} as={Fragment}>
    <Dialog
      as="div"
      data-cy={dataCy}
      className="relative z-50"
      onClose={() => clickOutsideClose && onCloseModal()}
    >
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-[#000000A6]/60 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel
              className={`${
                className || 'bg-mds-gray-400 lg:min-w-[40rem]'
              } rounded-3xl max-w-[40rem] lg:max-w-[45rem] xl:max-w-[48rem] 2xl:max-w-[55rem] relative py-7 px-12 text-left transition-all duration-500`}
            >
              {closeButton && (
                <div
                  className="text-mds-white absolute top-8 right-12 cursor-pointer"
                  onClick={() => onCloseModal()}
                >
                  <i className="fa-solid fa-xmark text-xl text-stk-grey-400" />
                </div>
              )}
              {title && (
                <>
                  <span className="absolute -ml-12 top-[5.4rem] h-[0.2rem] w-full bg-[#292929]"></span>
                  <div className="pb-14 text-mds-white font-semibold text-3xl">{title}</div>
                </>
              )}
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);

export default Modal;
