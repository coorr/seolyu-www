import { all, fork } from "redux-saga/effects";

import resumeReviewsSage from "./resumeReviews.js";
import userSage from "./user.js";
import applicantSage from "./applicant.js";
import eventSage from "./event.js";

export default function* rootSaga() {
  yield all([fork(resumeReviewsSage), fork(userSage), fork(applicantSage), fork(eventSage)]);
}
