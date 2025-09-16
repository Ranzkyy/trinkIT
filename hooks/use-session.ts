// filepath: hooks/use-session.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

// Fetch session dari BetterAuth API
async function fetchSession(): Promise<Session | null> {
  try {
    const response = await fetch("/api/auth/session", {
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.session || null;
  } catch (error) {
    console.error("Failed to fetch session:", error);
    return null;
  }
}

// Custom hook untuk session dengan cache
export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
}

// Hook untuk invalidate session cache
export function useInvalidateSession() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["session"] });
  };
}

// Hook untuk clear session cache
export function useClearSession() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.setQueryData(["session"], null);
  };
}
