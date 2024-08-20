import { all, fork, takeLatest, put } from "redux-saga/effects";
import { APPLICANT } from "../reducers/applicant";
import { apiCall } from "../utils/api";

function* postCreate(action) {
  try {
    yield apiCall("/applicants", {
      method: "POST",
      data: action.data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("신청 완료되었습니다.");
    action.history.push("/success");
  } catch (error) {
    console.log(error);
  }
}

function* getList(action) {
  const data = action.data;
  try {
    const result = yield apiCall(
      `/admin/applicants?name=${data.name}&email=${data.email}&status=${data.status}&startedDate=${data.startedDate}&endedDate=${data.endedDate}&page=${data.page}&size=20`,
      {
        method: "GET",
        data: action.data,
      }
    );
    yield put({ type: APPLICANT.GET_LIST_SUCCESS, data: result.data });
  } catch (error) {
    console.log(error);
  }
}

function* createWatcher(actionType, saga) {
  yield takeLatest(actionType, saga);
}

export default function* applicantSage() {
  yield all([fork(createWatcher, APPLICANT.POST_CREATE_REQUEST, postCreate), fork(createWatcher, APPLICANT.GET_LIST_REQUEST, getList)]);
}
