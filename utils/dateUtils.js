import { format } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * '00월 00일' 형식으로 포맷
 * @param {string} dateString - 포맷할 날짜 문자열
 * @returns {string} - 포맷된 날짜 문자열
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return format(date, "MM월 dd일", { locale: ko });
};

/**
 * '00시 00분' 형식으로 포맷
 * @param {string} timeString - 포맷할 시간 문자열
 * @returns {string} - 포맷된 시간 문자열
 */
export const formatTime = (timeString) => {
  if (!timeString) return "";

  const date = new Date(timeString);
  return format(date, "HH시 mm분", { locale: ko });
};
