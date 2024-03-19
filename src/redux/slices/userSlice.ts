import { createSlice } from "@reduxjs/toolkit";

export interface userSlice {
    user: userType | null,
    isLogged: boolean
}

const initialState: userSlice = {
    user: {
        id: "",
        first_name: "",
        last_name: "",
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
        city: [
            {
                id: 0,
                name: ""
            }
        ]
    },
    isLogged: false
}



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUserSession(state, action) {
            const resources = action.payload;
            state.user = resources.user
            state.isLogged = resources.isLogged
        },
        logOutSession(state) {
            state.user = null
            state.isLogged = false
        }
    },
});

export const { addUserSession, logOutSession } = userSlice.actions;
export const userState = (state: { user: any; }) => state.user
export default userSlice.reducer;