import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import resumeReviews from "./resumeReviews.js";
import user from "./user.js";
import applicant from "./applicant.js";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        resumeReviews,
        user,
        applicant,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
