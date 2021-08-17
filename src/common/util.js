/**
 * 工具函数 - 事件转换
 * @param {*} date 传入时间总毫秒数 
 * @param {*} fmt 传入所需时间格式 例：yyyy-MM-dd hh:mm:ss
 * 正则表达式规则： 
 * + 代表1个或者多个
 * * 代表0个或者多个
 * ? 代表0个或者1个
 * / 为正则表达式的开始和结束
 * RegExp 表示这则表达式对象
 * $1 为匹配到的第一段对象
 */
export function formatDate(date, fmt) {
  //获取年份格式
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  //获取月份、日、小时、分钟、秒
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}