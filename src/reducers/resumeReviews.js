import produce from "immer";

export const initialState = {
  resumeReview: {},
  resumeReviewDetail: null,
};

export const RESUME_REVIEWS = {
  GET_REQUEST: "RESUME_REVIEWS_GET_REQUEST",
  GET_SUCCESS: "RESUME_REVIEWS_GET_SUCCESS",
  GET_DETAIL_REQUEST: "RESUME_REVIEWS_GET_DETAIL_REQUEST",
  GET_DETAIL_SUCCESS: "RESUME_REVIEWS_GET_DETAIL_SUCCESS",
  PATCH_APPROVE_REQUEST: "RESUME_REVIEWS_PATCH_APPROVE_REQUEST",
  PUT_REQUEST: "RESUME_REVIEWS_PUT_REQUEST",
  PATCH_STATUS_REQUEST: "RESUME_REVIEWS_PATCH_STATUS_REQUEST",
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case RESUME_REVIEWS.GET_SUCCESS:
        draft.resumeReview = action.data;
        break;
      case RESUME_REVIEWS.GET_DETAIL_SUCCESS:
        draft.resumeReviewDetail = action.data;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
