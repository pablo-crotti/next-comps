"use client";
import Button from "../Button";

interface ModalProps {
  id: string;
  title: string;
  openButtonText: string;
  openButton?: "primary" | "secondary" | "danger";
  primaryButtonText: string;
  primaryButton?: "primary" | "secondary" | "danger";
  secondaryButtonText?: string;
  secondaryButton?: "primary" | "secondary" | "danger";
  icon?: React.ReactNode;
  children: React.ReactNode;
  onSubmit: () => void;
}

export default function Modal({
  id,
  title,
  openButtonText,
  openButton = "primary",
  primaryButtonText,
  primaryButton = "primary",
  secondaryButtonText,
  secondaryButton = "secondary",
  icon,
  children,
  onSubmit,
}: Readonly<ModalProps>) {
  return (
    <>
      <Button
        data-modal-target={id}
        data-modal-toggle={id}
        text={openButtonText}
        type="button"
        level={openButton}
        icon={icon ? icon : null}
      />

      <div
        id={id}
        aria-hidden="true"
        className="modal hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-xl max-h-full">
          <div className="relative bg-gray-100 rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 ">{title}</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide={id}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">{children}</div>
            <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b gap-4">
              {secondaryButtonText && (
                <Button
                  data-modal-hide={id}
                  text={secondaryButtonText}
                  level={secondaryButton}
                />
              )}
              <Button
                text={primaryButtonText}
                level={primaryButton}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
