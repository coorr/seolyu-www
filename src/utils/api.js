import axios from "axios";
import { API_URL } from "../config/config.js";
import Router from "next/router";

axios.defaults.withCredentials = true;

export const apiCall = async (url, userOptions = {}) => {
  console.log(
    "url : " + url,
    "method : " + (userOptions.method || "GET"),
    "data : " + (userOptions.data || "None"),
    "headers : " + JSON.stringify(userOptions.headers || {}),
    "params : " + JSON.stringify(userOptions.params || {})
  );
  try {
    const config = createRequestConfig(url, userOptions);
    const response = await axios(config);
    console.log("api response : ", JSON.stringify(response));
    return response;
  } catch (error) {
    console.log("error : " + error);
    handleApiError(error);
    throw error;
  }
};

const handleApiError = (error) => {
  const status = error.response ? error.response.status : 500;
  const response = error.response ? error.response.data : {};

  if (!response || !response.errors || !response.errors.length) {
    alert("치명적인 에러가 발생하였습니다. 관리자에게 문의하세요.");
    return;
  }

  switch (status) {
    case 400:
      alert(response.errors[0].message);
      break;
    case 401:
      alert(response.errors[0].message);
      Router.push("/admin/login");
      break;
    case 403:
      alert("권한이 없습니다.");
      break;
    case 404:
      alert(response.errors[0].message);
      break;
    case 500:
      alert(response.errors[0].message);
      break;
    default:
      alert("치명적인 에러가 발생하였습니다. 관리자에게 문의하세요.");
      break;
  }
};

// 기본 Authorization 헤더를 설정하는 함수 (예: 토큰을 포함)
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

// 기본 요청 설정을 정의하는 함수
const createRequestConfig = (url, userOptions) => {
  return {
    url: `${API_URL}${url}`, // 요청 URL
    method: userOptions.method || "GET", // HTTP 메서드 (기본값은 'GET')
    data: userOptions.data || null, // 요청 데이터
    headers: {
      ...getAuthHeader(), // Authorization 헤더 추가
      ...userOptions.headers, // 사용자 정의 헤더 추가
    },
    params: userOptions.params || null, // URL 쿼리 파라미터 (옵션)
  };
};
