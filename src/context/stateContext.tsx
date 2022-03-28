import React, {createContext, useContext, useReducer} from 'react';

const initialState = {
  hasSomethingBeenAdded: 0,
};

const stateReducer = (state: {hasSomethingBeenAdded: number}, payload: any) => {
  switch (payload.action) {
    case 'SET_HAS_SOMETHING_BEEN_ADDED':
      return {...state, hasSomethingBeenAdded: state.hasSomethingBeenAdded + 1};
    default:
      return state;
  }
};

export const StateContext = createContext({});

export const StateContextProvider = ({children}: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const StateContextStore = {
    hasSomethingBeenAdded: state.hasSomethingBeenAdded,
    handleHasSomethingBeenAdded: () => dispatch({action: 'SET_HAS_SOMETHING_BEEN_ADDED'}),
    dispatch,
  };

  return <StateContext.Provider value={StateContextStore}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
