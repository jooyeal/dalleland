/**
 * The type of basic modal's props
 */
type TModalProps = {
  /** Modal open flag */
  isOpen: boolean;
  /** Callback function when modal is closed */
  onClose: () => void;
};

/**
 * The type of callback's
 */
type TCallback = {
  onSuccess?: () => void;
  onError?: () => void;
};
