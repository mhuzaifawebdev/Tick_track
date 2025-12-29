import { Suspense } from "react";
import { AuthLayout } from "../../components/layout/AuthLayout";
import VerifyOtp from "../../components/authentication/verifyOtp";

export default function VerifyOtpPage() {
  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Enter the code we sent to your email"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyOtp />
      </Suspense>
    </AuthLayout>
  );
}
