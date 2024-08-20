import produce from "immer";

export const initialState = {
  applicants: [],
  totalPages: 0,
  totalElements: 0,
  currentPage: 0,
  searchParams: {
    name: "",
    email: "",
    status: "",
    startedDate: "",
    endedDate: "",
  },
};

export const APPLICANT = {
  UPDATE_SEARCH_PARAMS: "APPLICANT_UPDATE_SEARCH_PARAMS", // 검색 파라미터 업데이트 액션
  UPDATE_CURRENT_PAGE: "APPLICANT_UPDATE_CURRENT_PAGE", // 현재 페이지 업데이트 액션

  POST_CREATE_REQUEST: "APPLICANT_POST_CRAETE_REQUEST",
  GET_LIST_REQUEST: "APPLICANT_GET_LIST_REQUEST",
  GET_LIST_SUCCESS: "APPLICANT_GET_LIST_SUCCESS",
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case APPLICANT.UPDATE_SEARCH_PARAMS:
        draft.searchParams = action.data;
        break;
      case APPLICANT.UPDATE_CURRENT_PAGE:
        draft.currentPage = action.data;
        break;
      case APPLICANT.GET_LIST_SUCCESS:
        draft.applicants = action.data.content;
        draft.totalPages = action.data.totalPages;
        draft.totalElements = action.data.totalElements;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
