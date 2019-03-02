export function throttle(fn, wait=50) {
    let start=0     // start赋值为0保证第一次必定触发
    return function(...args) {
        let now = Date.now()
        if(now-start>wait) {
            fn(args)
            start=now
        }
    }
}

export function is_impack (a,b) {
    let is_impack = false
    // 如果a和b没有发生碰撞,return false
    if(a.top>b.bottom||a.left>b.right||a.bottom<b.top||a.right<b.left)return false
    return true
}

export function ramdom(num) {
    return parseInt(Math.random()*num)
}