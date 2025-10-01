import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";
import {
	ProfileData,
	ProfileResponse,
	ProfilesResponse,
} from "@/types";

export const usersApiSlice = baseApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllUsers: builder.query<ProfilesResponse, void>({
			query: () => ({
				url: `/profiles/`,
				method: "GET",
			}),
			providesTags: ["User"],
		}),
		getUserProfile: builder.query<ProfileResponse, void>({
			query: () => "/profiles/user/me/",
			providesTags: ["User"],
		}),
		updateUserProfile: builder.mutation<ProfileData, ProfileData>({
			query: (formData) => ({
				url: "/profiles/user/update/",
				method: "PATCH",
				body: formData,
			}),
			invalidatesTags: ["User"],
		}),
		assignUserToProject: builder.mutation<void, { userId: number; projectId: number; role: string }>({
			query: ({ userId, projectId, role }) => ({
				url: `/projects/${projectId}/users/${userId}/assign/`,
				method: "POST",
				body: { role },
			}),
			invalidatesTags: ["User", "Project"],
		}),
		removeUserFromProject: builder.mutation<void, { userId: number; projectId: number }>({
			query: ({ userId, projectId }) => ({
				url: `/projects/${projectId}/users/${userId}/remove/`,
				method: "DELETE",
			}),
			invalidatesTags: ["User", "Project"],
		}),
	}),
});

export const {
	useGetAllUsersQuery,
	useGetUserProfileQuery,
	useUpdateUserProfileMutation,
	useAssignUserToProjectMutation,
	useRemoveUserFromProjectMutation,
} = usersApiSlice;
