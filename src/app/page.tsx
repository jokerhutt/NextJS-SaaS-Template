"use client";

import { AuthProvider, useAuth } from "@/lib/auth/AuthProvider";
import { Button } from "@/components/button";
import { Status } from "@/components/debug/status";

export default function Home() {
  return (
    <AuthProvider>
      <AuthDemoView />
    </AuthProvider>
  );
}

function AuthDemoView() {
  const { user, login, logout } = useAuth();
  const userDebugInfo = JSON.stringify(user, null, 2);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-xl rounded bg-foreground p-6">
        {!user ? (
          <>
            <Status status="disabled" message="Logged out" />
            <Button className="w-full" onClick={login}>
              Login
            </Button>
          </>
        ) : (
          <>
            <Status status="success" message="Logged in" />
            <pre className="mb-4 overflow-auto bg-surface rounded p-3 text-xs">
              {userDebugInfo}
            </pre>
            <Button className="w-full" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
