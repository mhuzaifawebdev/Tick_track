import { Suspense } from "react";
import { AuthLayout } from "../../components/layout/AuthLayout";
import ResetPassword from "../../components/authentication/resetPassword";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Create new password"
      subtitle="Choose a strong password for your account"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
      </Suspense>
    </AuthLayout>
  );
}
