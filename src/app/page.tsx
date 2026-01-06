"use client";

import { AuthProvider } from "@/lib/auth/AuthProvider";
import { AuthDemoView } from "@/components/debug/AuthDemoView";

export default function Home() {
  return (
    <AuthProvider>
      <AuthDemoView />
    </AuthProvider>
  );
}
