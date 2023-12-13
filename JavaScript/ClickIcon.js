var blankArea = null; // 用于存储空白区域的引用

function insertBlankArea(event) {
    // 获取点击的播放图标所在的<div>块
    var clickedIcon = event.currentTarget;
    var targetElement = clickedIcon.parentElement;
    if (blankArea != null) {
        console.log("already existed.")
    }
    // 检查是否已经存在空白区域
    if (blankArea) {
        // 如果存在，移除它
        // console.log("already existed.")
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