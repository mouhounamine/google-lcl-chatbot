"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/auth-context'; // Custom auth context

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth(); // Get the current user from your auth context or hook
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login'); // Redirect to login if user is not authenticated
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>; // Optionally, show a loading spinner while checking auth status
  }

  return <>{children}</>; // Render protected content if user is authenticated
};

export default AuthGuard;
