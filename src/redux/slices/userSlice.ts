import { createSlice } from "@reduxjs/toolkit";

const initialState: userSlice = {
    user: {
        username: "",
        email: "",
        tel: 0,
        picture: "",
        seller: false,
        admin: false,
        created_at: (() => { return new Date() })(),
        lng: 0,
        lat: 0,
        status: false,
        banned: false,
        trusted: false,
        description: "",
        activeAreaId: ""
    },
    isLogged: false,
    userId: ""
}



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUserSession(state, action) {
            const resources = action.payload;
            state.user = resources.user
            state.isLogged = resources.isLogged
            state.userId = resources.userId
        },
        logOutSession(state) {
            state.user = null
            state.isLogged = false
            state.userId = ""
        }
    },
});

export const { addUserSession, logOutSession } = userSlice.actions;
export const userState = (state: { user: userSlice }) => state.user
export default userSlice.reducer;