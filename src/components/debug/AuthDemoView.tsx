"use client";

import { useAuth } from "@/lib/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Status } from "@/components/debug/status";

export function AuthDemoView() {
  const { user, loading, login, logout } = useAuth();
  const userDebugInfo = JSON.stringify(user, null, 2);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-xl rounded bg-foreground p-6">
          <Status status="neutral" message="Loading..." />
        </div>
      </div>
    );
  }

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
