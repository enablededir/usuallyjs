/** @module Function */

/**
 * 将函数fn转为一次函数。返回函数，函数只能执行一次。
 * @function noce
 * @param {function} fn - 执行的函数。
 * @return {function}
 * @example
 * const fn = once(() => '5')
 * console.log([fn(), fn()])
 * // => ['5', undefined]
 */
export const once = fn => {
  let called = false
  return function (...args) {
    if (called) return
    called = true
    return fn.apply(this, args)
  }
}

/**
 * 创建一个新的函数fn，在调用时设置this关键字为提供的值。并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。
 * @function bind
 * @param {function} fn - 函数。
 * @param {obj} context - this绑定的对象。
 * @param {*} [boundArgs] - 默认参数。
 * @return {function}
 * @example
 * function greet(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation
 * }
 * const freddy = { user: 'fred' }
 * const freddyBound = U.bind(greet, freddy)
 * console.log(freddyBound('hi', '!')); 
 * // => 'hi fred!'
 */
export const bind = (fn, context, ...boundArgs) => (...args) => fn.apply(context, [...boundArgs, ...args])

/**
 * 将函数fn转为防抖函数。返回防抖函数。
 * @function debounce
 * @param {function} fn - 函数。
 * @param {number} [delay=0] - 可选，防抖动延迟时长，单位为ms，默认为0。
 * @returns {function}
 * @example
 * window.addEventListener('resize', U.debounce(() => {
 *   console.log(window.innerWidth);
 *   console.log(window.innerHeight);
 * }, 250));
 * // => 调整浏览器窗口尺寸，在250ms后控制台将打印一次窗口尺寸
 */
export const debounce = (fn, delay = 0) => {
  let timeoutId
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

/**
 * 将函数fn转为节流函数。返回节流函数。
 * @function throttle
 * @param {function} fn - 函数。
 * @param {number} wait - 节流时长，单位为ms。
 * @return {function}
 * @example
 * window.addEventListener('resize', U.throttle(function(evt) {
 *   console.log(window.innerWidth);
 *   console.log(window.innerHeight);
 * }, 250));
 * // 调整浏览器窗口尺寸，没间隔250ms控制台将打印一次窗口尺寸
 */
export const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime
  return function() {
    const context = this, args = arguments
    if (!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}
