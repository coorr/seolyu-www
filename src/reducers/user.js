import produce from "immer";

export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
};

export const LOG_IN = {
  REQUEST: "LOG_IN_REQUEST",
  SUCCESS: "LOG_IN_SUCCESS",
  FAILURE: "LOG_IN_FAILURE",
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN.REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN.SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.userInfo = action.data;
        break;
      case LOG_IN.FAILURE:
        draft.logInLoading = false;
        draft.logInDone = false;
        draft.logInError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
