let utils = {
  getPlatform: () => {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //判断是否是 android终端
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 iOS终端
    // console.log("是否是Android：" + isAndroid); //true,false
    // console.log("是否是iOS：" + isIOS);
    if (isAndroid) {
      return "Android";
    } else if (isIOS) {
      return "IOS";
    } else {
      return "PC";
    }
  },
  isIOS() {
    return this.getPlatform() === "IOS";
  },
  isAndroid() {
    return this.getPlatform() === "Android";
  }
};

export default utils;
