import PropTypes from "prop-types";
import React, { createContext, useContext, useReducer } from "react";
import { UserState } from "./user-reducer";

interface ContextProps {
    state: UserState;
    dispatch: ({ type, payload }: { type: string; payload? : any}) => void;
  }
  
  export const StateContext = createContext({} as ContextProps);
  
  export const StateProvider = ({ reducer, initialState, children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <StateContext.Provider value={{ state, dispatch } as ContextProps}>
        {children}
      </StateContext.Provider>
    );
  };
  
  StateProvider.propTypes = {
    children: PropTypes.node.isRequired,
    initialState: PropTypes.shape({}).isRequired,
    reducer: PropTypes.func.isRequired,
  };
  
  export const getAppState = () => useContext(StateContext);