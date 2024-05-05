import firebase from "../firebase-config"

export enum UserAction {
    LOGIN = "[USER] Login",
    LOGIN_SUCCESS = "[USER] Login successful",
    LOGOUT = "[USER] Logout",
  }
  
  export interface UserState {
    isAuthenticated: boolean;
    user: string | null;
  }
  
  export const initialUserState: UserState = {
    isAuthenticated: false,
    user: null,
  };
  
  export const userReducer = (state: UserState = initialUserState, action : any) => {
    switch (action.type) {
      case UserAction.LOGIN:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
  
      case UserAction.LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
  
      case UserAction.LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
  
      default:
        return state;
    }
  };
  