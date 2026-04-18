const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
      <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-100">
        <svg viewBox="0 0 14 14" fill="none" width="10" height="10">
          <path
            d="M7 4v3.5"
            stroke="#E24B4A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="7" cy="10" r="0.75" fill="#E24B4A" />
        </svg>
      </span>
      {message}
    </p>
  );
};

export default ErrorMessage;
