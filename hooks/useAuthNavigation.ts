import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { useRouter } from "next/navigation";
import { extractErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { setLogout } from "@/lib/redux/features/auth/authSlice";
import {useLogoutUserMutation} from "@/lib/redux/features/auth/authApiSlice";

export function useAuthNavigation(){
	const dispatch = useAppDispatch()
	const [logoutUser] = useLogoutUserMutation()
 /* select any piece of state in our store in this case auth */
	const {isAuthenticated} = useAppSelector((state) => state.auth)
	const router = useRouter()

	const handleLogout = async () => {
		try {
			/* Send logout request to backend and unwrap the Promise to handle success/error scenarios
			.unwrap() allows direct access to the resolved value or throws an error if the request fails */
			await logoutUser().unwrap()
			dispatch(setLogout())
			router.push("/login")
			toast.success("Logged out successfully")

		}catch (error) {
			 const errorMessage = extractErrorMessage(error)
		   toast.error(errorMessage || "An error occurred")
		}
  }

//return { handleLogout, filteredNavLinks, isAuthenticated};
return { handleLogout, isAuthenticated};
}