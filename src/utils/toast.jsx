import { Toaster, toast } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#fff",
          color: "#black",
        },
        error: {
          style: {
            background: "#FFF",
            color: "black"
          },
        },
      }}
    />
  );
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    icon: "✅",
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    icon: "❌",
  });
};