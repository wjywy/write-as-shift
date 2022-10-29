function throttle(fn, delay) {
    let time = null;
    return () => {
        if (!time) {
            time = setTimeout(() => {
                fn();
                time = null;
            }, delay);
        }
    }
}