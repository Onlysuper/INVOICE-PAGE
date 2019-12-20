export default {
 // 防抖
  _debounce(fn, delay) {
    var delay = delay || 200;
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay);
    };
  },
  // 节流
  _throttle(fn, interval) {
    var last;
    var timer;
    var interval2 = interval || 200;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval2) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval2);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
  }
}
