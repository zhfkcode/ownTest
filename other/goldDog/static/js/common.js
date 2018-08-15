
/**
 * 获取用户cookie
 */
function getUserCookie(cookieName) {
	var cookieValue = document.cookie;
	var cookieStartAt = cookieValue.indexOf("" + cookieName + "=");
	if (cookieStartAt == -1) {
		cookieStartAt = cookieValue.indexOf(cookieName + "=");
	}
	if (cookieStartAt == -1) {
		cookieValue = null;
	} else {
		cookieStartAt = cookieValue.indexOf("=", cookieStartAt) + 1;
		cookieEndAt = cookieValue.indexOf(";", cookieStartAt);
		if (cookieEndAt == -1) {
			cookieEndAt = cookieValue.length;
		}
		cookieValue = cookieValue.substring(cookieStartAt, cookieEndAt);
	}
	return decodeURIComponent(cookieValue); //使用 decodeURIComponent 解码
}