import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirectIfAuthenticated = () => {
	const router = useRouter();
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/dashboard");
		}
	}, [isAuthenticated, router]);
};

export default useRedirectIfAuthenticated;