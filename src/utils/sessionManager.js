let isType = (obj) => {
  var type = Object.prototype.toString.call(obj);
  if (type == '[object Array]') {
    return 'Array';
  } else if (type == '[object Object]') {
    return 'Object';
  } else {
    return 'Other';
  }
}
export default {
  set(key, value) {
    if (isType(value) === 'Object' || isType(value) === 'Array') {
      value = JSON.stringify(value)
    }

    sessionStorage.setItem(key, value)
  },
  get(key) {
    let value = sessionStorage.getItem(key)
    if (!value) {
      return value;
    }
    if (value.indexOf('{') == 0 || value.indexOf('[') == 0) {
      value = JSON.parse(value)
    }
    return value
  },
  remove(key) {
    sessionStorage.removeItem(key)
  },
  clear() {
    sessionStorage.clear()
  }
}
