import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserResponse } from "@/types";

interface UserState {
	currentUser: UserResponse | null;
}

const initialState: UserState = {
	currentUser: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<UserResponse | null>) => {
			state.currentUser = action.payload;
		},
		clearCurrentUser: (state) => {
			state.currentUser = null;
		},
	},
});
export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state: { user: UserState }) => state.user.currentUser;
export const selectUserFullName = (state: { user: UserState }) => state.user.currentUser?.full_name || "";
export const selectUserEmail = (state: { user: UserState }) => state.user.currentUser?.email || "";

export default userSlice.reducer;
