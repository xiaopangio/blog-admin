import storage from "store";

export function getToken() {
  return storage.get("BLOG_TOKEN");
}
export function setToken(token) {
  storage.set("BLOG_TOKEN", token);
}
export function removeToken() {
  storage.remove("BLOG_TOKEN");
}

export function getUserId() {
  return storage.get("BLOG_USER_ID");
}
export function setUserId(id) {
  storage.set("BLOG_USER_ID", id);
}
export function removeUserId() {
  storage.remove("BLOG_USER_ID");
}
