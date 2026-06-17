export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-700">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}