const progressBar = document.querySelector(".progress-bar");
const progressTrack = document.querySelector(".progress-track");
const progressIndicator = document.querySelector(".progress-indicator");

let isDragging = false;

if (!progressIndicator) {
    console.log("1111");
}

if (progressIndicator) {
    progressIndicator.addEventListener("mousedown", () => {
        isDragging = true;
        console.log(isDragging);
    });
}

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        // 获取鼠标相对于进度条的位置
        const newPosition = e.clientX - progressBar.getBoundingClientRect().left;

        // 限制进度条的最小和最大宽度，可以根据需要自定义
        const minWidth = 0;
        const maxWidth = progressBar.clientWidth;

        // 计算新的进度条长度
        const newWidth = Math.min(Math.max(newPosition, minWidth), maxWidth);

        const indicatorLeft = newWidth - progressIndicator.clientWidth;
        // 更新进度条的宽度
        progressTrack.style.width = `${newWidth}px`;

        // 更新指示器的位置
        progressIndicator.style.left = `${indicatorLeft}px`;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

progressBar.addEventListener("click", (e) => {
    // 获取鼠标相对于进度条的位置
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;

    // 更新进度条的宽度
    progressTrack.style.width = `${clickPosition}px`;

    // 计算指示器的左侧位置，减去指示器自身的宽度
    const indicatorLeft = clickPosition - progressIndicator.clientWidth;

    // 更新指示器的位置
    progressIndicator.style.left = `${indicatorLeft}px`;
});
