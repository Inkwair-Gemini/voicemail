var blankArea = null; // 用于存储空白区域的引用

function insertBlankArea(event) {
    // 获取点击的播放图标所在的<div>块
    var clickedIcon = event.currentTarget;
    var targetElement = clickedIcon.parentElement;

    // 检查是否已经存在空白区域
    if (blankArea) {
        // 如果存在，移除它
        blankArea.parentNode.removeChild(blankArea);
        blankArea = null; // 将引用设为 null，表示空白区域已被移除
    } else {
        // 如果不存在，创建并添加空白区域
        blankArea = document.createElement("div");

        // 设置空白区域的样式，可以根据需要自定义
        blankArea.style.width = "100%";
        blankArea.style.height = "150px"; // 设置空白区域的高度
        blankArea.style.backgroundColor = "#f0f0f0"; // 设置背景颜色
        blankArea.style.marginTop = "20px"; // 设置顶部外边距，使信息顺势下移

        // 在目标位置之后插入空白区域
        targetElement.insertAdjacentElement("afterend", blankArea);
    }
}

// 获取所有播放图标，并为每个图标添加点击事件监听器
var playIcons = document.querySelectorAll(".image_2");

playIcons.forEach(function (playIcon) {
    playIcon.addEventListener("click", insertBlankArea);
});


const progressBar = document.querySelector(".progress-bar");
const progressTrack = document.querySelector(".progress-track");
const progressIndicator = document.querySelector(".progress-indicator");

if (!progressIndicator) {
    console.log(1111);
}

let isDragging = false;

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
