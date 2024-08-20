import { all, fork, takeLatest, put } from "redux-saga/effects";
import { APPLICANT } from "../reducers/applicant";
import { RESUME_REVIEWS } from "../reducers/resumeReviews";
import { apiCall } from "../utils/api";

function* get(action) {
  try {
    const result = yield apiCall("/resume-reviews/" + action.id, {
      method: "GET",
    });
    yield put({ type: RESUME_REVIEWS.GET_SUCCESS, data: result.data });
  } catch (error) {
    console.log(error);
  }
}

function* getDetail(action) {
  try {
    const result = yield apiCall("/admin/resume-reviews/" + action.id, {
      method: "GET",
    });
    yield put({ type: RESUME_REVIEWS.GET_DETAIL_SUCCESS, data: result.data });
  } catch (error) {
    console.log(error);
  }
}

function* putRequest(action) {
  try {
    yield apiCall("/admin/resume-reviews/" + action.id, {
      method: "PUT",
      data: action.data,
    });
    alert("정상적으로 수정되었습니다.");
    action.history.push("/admin/applicant");
  } catch (error) {
    console.log(error);
  }
}

function* patchStatus(action) {
  try {
    yield apiCall("/admin/resume-reviews/" + action.id + "/status", {
      method: "PATCH",
      data: action.data,
    });
    alert("정상적으로 상태 변경되었습니다.");
    const searchParams = action.searchParams;
    const currentPage = action.currentPage;
    yield put({ type: APPLICANT.GET_LIST_REQUEST, data: { ...searchParams, page: currentPage } });
  } catch (error) {
    console.log(error);
  }
}

function* createWatcher(actionType, saga) {
  yield takeLatest(actionType, saga);
}

export default function* resumeReviewsSage() {
  yield all([
    fork(createWatcher, RESUME_REVIEWS.GET_REQUEST, get),
    fork(createWatcher, RESUME_REVIEWS.GET_DETAIL_REQUEST, getDetail),
    fork(createWatcher, RESUME_REVIEWS.PUT_REQUEST, putRequest),
    fork(createWatcher, RESUME_REVIEWS.PATCH_STATUS_REQUEST, patchStatus),
  ]);
}
