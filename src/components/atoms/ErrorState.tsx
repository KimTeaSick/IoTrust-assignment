type Props = {
  message: string;
  description?: string;
  onRetry?: () => void;
};

const ErrorState = ({ message, description, onRetry }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-red-400 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <p className="text-gray-700 text-lg font-medium mb-2">{message}</p>
      {description && (
        <p className="text-gray-500 text-sm text-center mb-4">{description}</p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          재시도
        </button>
      )}
    </div>
  );
};

export default ErrorState;
