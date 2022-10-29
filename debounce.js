function debounce(fn, delay) {
    let time = null;
    return () => {
        if (time == null) {
            time = setTimeout(fn, delay);
        } else {
            clearTimeout(time);
        }
    }
}