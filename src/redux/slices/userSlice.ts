import { createSlice, Dispatch } from "@reduxjs/toolkit";

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
    name: "user", // Name of the slice
    initialState, // Initial state
    reducers: {
        addUserSession(state, action) {
            const resources = action.payload;
            state.user = resources.user
            state.isLogged = resources.isLogged
        },
        logOutSession(state, _) {
            state.user = null
            state.isLogged = false
        }
    },
});

// Export the action creator for getResourcesSuccess
export const { addUserSession, logOutSession } = userSlice.actions;
export const userState = (state: userSlice) => state.user

// Export the reducer
export default userSlice.reducer;

// Define an asynchronous action creator to fetch card resources from an API
// export function getResources() {
//     return async (dispatch: Dispatch) => {
//         try {
//             // Make an HTTP GET request to the API
//             const response = await axios.get(
//                 "https://www.boredapi.com/api/activity",
//             );

//             // Extract card resources from the API response
//             const resources: Card = response.data;

//             // Dispatch the getResourcesSuccess action to update the Redux state
//             dispatch(getResourcesSuccess(resources));
//         } catch (error) {
//             console.error("Error fetching card resources:", error);
//         }
//     };
// }