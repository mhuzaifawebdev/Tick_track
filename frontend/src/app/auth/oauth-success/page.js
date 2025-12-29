import { Suspense } from "react";
import OAuthSuccessContent from "./OAuthSuccessContent";
import { Spinner } from "../../components/ui";

export default function OAuthSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OAuthSuccessContent />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030303] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <Spinner size="lg" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Loading...
          </h2>
        </div>
      </div>
    </div>
  );
}


