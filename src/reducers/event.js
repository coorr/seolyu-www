import produce from "immer";

export const initialState = {
  events: [],
  event: null,
  isActive: false,
};

export const EVENT = {
  GET_LIST_REQUEST: "EVENT_GET_LIST_REQUEST",
  GET_LIST_SUCCESS: "EVENT_GET_LIST_SUCCESS",
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case EVENT.GET_LIST_SUCCESS:
        if (Array.isArray(action.data) && action.data.length > 0) {
          draft.event = action.data[0];
          draft.isActive = true;
        }
        break;
      default:
        return state;
    }
  });
};

export default reducer;
