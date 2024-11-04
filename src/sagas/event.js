import { all, fork, takeLatest, put } from "redux-saga/effects";
import { EVENT } from "../reducers/event";
import { apiCall } from "../utils/api";

function* getList(action) {
  const data = action.data;
  console.log(data);
  try {
    const result = yield apiCall(`/events?active=${data.isActive}&category=${data.category}`, {
      method: "GET",
    });
    yield put({ type: EVENT.GET_LIST_SUCCESS, data: result.data });
  } catch (error) {
    console.log(error);
  }
}

function* createWatcher(actionType, saga) {
  yield takeLatest(actionType, saga);
}

export default function* applicantSage() {
  yield all([fork(createWatcher, EVENT.GET_LIST_REQUEST, getList)]);
}
