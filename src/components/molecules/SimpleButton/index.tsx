import clsx from "clsx";

type SimpleButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

const SimpleButton = ({
  title,
  onClick,
  className,
  disabled = false,
}: SimpleButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={clsx(
        className,
        "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400"
      )}
    >
      {title}
    </button>
  );
};

export default SimpleButton;
