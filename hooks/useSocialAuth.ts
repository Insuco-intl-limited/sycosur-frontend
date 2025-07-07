import { setAuth } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

/**
 * Custom hook for handling OAuth authentication flow.
 *
 * This hook processes the OAuth callback by extracting state and code from URL parameters,
 * authenticating the user with the provided credentials, and managing the app state accordingly.
 *
 * @param authenticate - Authentication mutation function from RTK Query
 * @param provider - OAuth provider name (e.g., 'google')
 * @returns void
 */

export default function useSocialAuth(authenticate: any, provider: string) {
	// Redux dispatch for updating auth state
	const dispatch = useAppDispatch();
	// Next.js router for navigation after auth
	const router = useRouter();
	// Access to URL query parameters from the OAuth callback
	const searchParams = useSearchParams();

	// Prevents effect from running twice in development mode and during re-renders
	const effectRan = useRef(false);

	useEffect(() => {
		// Extract OAuth parameters from the callback URL
		const state = searchParams.get("state");
		const code = searchParams.get("code");

		// Only process the authentication if all required parameters are present
		// and we haven't already processed this effect
		if (state && code && !effectRan.current) {
			// Call the authentication API with provider and OAuth tokens
			authenticate({ provider, state, code })
				.unwrap() // Unwrap the Promise from the RTK Query mutation
				.then(() => {
					// Update Redux state to reflect authentication
					dispatch(setAuth());
					// Notify user of successful login
					toast.success("Logged in successfully");
					// Redirect to dashboard upon successful authentication
					router.push("/dashboard");
				})
				.catch(() => {
					// Handle authentication failures
					toast.error("Login Failed, Try Again!");
					// Redirect back to login page
					router.push("/login");
				});
		}

		// Cleanup function to prevent duplicate processing
		return () => {
			effectRan.current = true;
		};
	}, [authenticate, dispatch, provider, router, searchParams]);
}
