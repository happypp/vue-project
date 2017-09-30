/**
 * Created by pp on 2017/9/30.
 */
const STORAGE_KEY = "happy-Pp";
export default {
  fetch: function () {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)  || '[]');
  },
  save(items) {
    window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items));
  }
}
