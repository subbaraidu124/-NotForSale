import { userReducer, UserState, initialUserState } from "./user-reducer";

export interface AppState {
    userState: UserState;
}
  
export const initialAppState: AppState = {
userState: initialUserState,
};

export const appReducer = (state: AppState = initialAppState, action : any) => ({
userState: userReducer(state.userState, action),
});