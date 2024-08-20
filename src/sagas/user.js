import { all, fork, takeLatest, put } from "redux-saga/effects";
import { LOG_IN } from "../reducers/user";
import { apiCall } from "../utils/api";

function* logIn(action) {
  try {
    const result = yield apiCall("/login", {
      method: "POST",
      data: action.data,
    });
    yield put({ type: LOG_IN.SUCCESS, data: result.data });
    action.history.push("/admin/applicant");
  } catch (error) {
    console.log(error);
    yield put({ type: LOG_IN.FAILURE, error: error.response.data });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN.REQUEST, logIn);
}

export default function* userSage() {
  yield all([fork(watchLogIn)]);
}
