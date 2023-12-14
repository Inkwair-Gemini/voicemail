<template>
  <div class="container">
    <div class="main">
      <div class="header">
            <div class="header2">
                <label class="headerlabel">最近删除</label>   
            </div>
        </div>
      <div class="flex-col items-center">
        <div class="search-form mt-13">
          <input
            type="text"
            name="search"
            placeholder="搜索..."
            v-model="searchQuery"
          />
          <!-- <img
            src="../img/search_icon.png"
            class="search-icon"
            @click="search"
          /> -->
        </div>
      </div>
      <div class="flex-col justify-start flex-1 group">
        <div class="flex-col">
          <div
            v-for="item in items"
            :key="item.id"
            class="flex-row justify-between items-center list-item_2"
          >
            <span class="font">{{ item.name }}</span>
            <div class="progress-bar"></div>
            <img
              class="image_2"
              :src="item.image"
              @click="insertBlankArea(item.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      items: [
        {
          id: 1,
          name: "张三",
          image:
            "https://ide.code.fun/api/image?token=6578012c28456c001169c2e7&name=3338c56c6b618462630b8dc1f253636f.png",
        },
        {
          id: 2,
          name: "李四",
          image:
            "https://ide.code.fun/api/image?token=6578012c28456c001169c2e7&name=3338c56c6b618462630b8dc1f253636f.png",
        },
      ],
    };
  },
  methods: {
    insertBlankArea(itemId) {
      // 获取点击的项目ID并执行插入空白区域的方法
      // 可以根据需要自定义插入空白区域的逻辑
      console.log("Inserting blank area for item with ID:", itemId);
    },
    search() {
      // 执行搜索操作的方法
      // 使用this.searchQuery获取搜索关键字
      // 可以根据需要自定义搜索逻辑
      console.log("Searching for:", this.searchQuery);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使容器铺满整个视口高度 */
  color: #b4bac3;
}

.main {
  width: 500px;
  height: 700px;
  border-radius: 2px; /* 设置圆角边框 */
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
}

  .header{
    width: 500px;
    height: 60px;
  }
  .header2{
    position: relative;
    top: 7px;
    left: 13px;
  }

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    "Microsoft Yahei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}

body * {
  box-sizing: border-box;
  flex-shrink: 0;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.justify-evenly {
  justify-content: space-evenly;
}

.items-start {
  align-items: flex-start;
}

.items-end {
  align-items: flex-end;
}

.items-center {
  align-items: center;
}

.items-baseline {
  align-items: baseline;
}

.items-stretch {
  align-items: stretch;
}

.self-start {
  align-self: flex-start;
}

.self-end {
  align-self: flex-end;
}

.self-center {
  align-self: center;
}

.self-baseline {
  align-self: baseline;
}

.self-stretch {
  align-self: stretch;
}

.flex-1 {
  flex: 1 1 0%;
}

.flex-auto {
  flex: 1 1 auto;
}

.grow {
  flex-grow: 1;
}

.grow-0 {
  flex-grow: 0;
}

.shrink {
  flex-shrink: 1;
}

.shrink-0 {
  flex-shrink: 0;
}

.relative {
  position: relative;
}

.ml-2 {
  margin-left: 0.13rem;
}

.mt-2 {
  margin-top: 0.13rem;
}

.ml-4 {
  margin-left: 0.25rem;
}

.mt-4 {
  margin-top: 0.25rem;
}

.ml-6 {
  margin-left: 0.38rem;
}

.mt-6 {
  margin-top: 0.38rem;
}

.ml-8 {
  margin-left: 0.5rem;
}

.mt-8 {
  margin-top: 0.5rem;
}

.ml-10 {
  margin-left: 0.63rem;
}

.mt-10 {
  margin-top: 0.63rem;
}

.ml-12 {
  margin-left: 0.75rem;
}

.mt-12 {
  margin-top: 0.75rem;
}

.ml-14 {
  margin-left: 0.88rem;
}

.mt-14 {
  margin-top: 0.88rem;
}

.ml-16 {
  margin-left: 1rem;
}

.mt-16 {
  margin-top: 1rem;
}

.ml-18 {
  margin-left: 1.13rem;
}

.mt-18 {
  margin-top: 1.13rem;
}

.ml-20 {
  margin-left: 1.25rem;
}

.mt-20 {
  margin-top: 1.25rem;
}

.ml-22 {
  margin-left: 1.38rem;
}

.mt-22 {
  margin-top: 1.38rem;
}

.ml-24 {
  margin-left: 1.5rem;
}

.mt-24 {
  margin-top: 1.5rem;
}

.ml-26 {
  margin-left: 1.63rem;
}

.mt-26 {
  margin-top: 1.63rem;
}

.ml-28 {
  margin-left: 1.75rem;
}

.mt-28 {
  margin-top: 1.75rem;
}

.ml-30 {
  margin-left: 1.88rem;
}

.mt-30 {
  margin-top: 1.88rem;
}

.ml-32 {
  margin-left: 2rem;
}

.mt-32 {
  margin-top: 2rem;
}

.ml-34 {
  margin-left: 2.13rem;
}

.mt-34 {
  margin-top: 2.13rem;
}

.ml-36 {
  margin-left: 2.25rem;
}

.mt-36 {
  margin-top: 2.25rem;
}

.ml-38 {
  margin-left: 2.38rem;
}

.mt-38 {
  margin-top: 2.38rem;
}

.ml-40 {
  margin-left: 2.5rem;
}

.mt-40 {
  margin-top: 2.5rem;
}

.ml-42 {
  margin-left: 2.63rem;
}

.mt-42 {
  margin-top: 2.63rem;
}

.ml-44 {
  margin-left: 2.75rem;
}

.mt-44 {
  margin-top: 2.75rem;
}

.ml-46 {
  margin-left: 2.88rem;
}

.mt-46 {
  margin-top: 2.88rem;
}

.ml-48 {
  margin-left: 3rem;
}

.mt-48 {
  margin-top: 3rem;
}

.ml-50 {
  margin-left: 3.13rem;
}

.mt-50 {
  margin-top: 3.13rem;
}

.ml-52 {
  margin-left: 3.25rem;
}

.mt-52 {
  margin-top: 3.25rem;
}

.ml-54 {
  margin-left: 3.38rem;
}

.mt-54 {
  margin-top: 3.38rem;
}

.ml-56 {
  margin-left: 3.5rem;
}

.mt-56 {
  margin-top: 3.5rem;
}

.ml-58 {
  margin-left: 3.63rem;
}

.mt-58 {
  margin-top: 3.63rem;
}

.ml-60 {
  margin-left: 3.75rem;
}

.mt-60 {
  margin-top: 3.75rem;
}

.ml-62 {
  margin-left: 3.88rem;
}

.mt-62 {
  margin-top: 3.88rem;
}

.ml-64 {
  margin-left: 4rem;
}

.mt-64 {
  margin-top: 4rem;
}

.ml-66 {
  margin-left: 4.13rem;
}

.mt-66 {
  margin-top: 4.13rem;
}

.ml-68 {
  margin-left: 4.25rem;
}

.mt-68 {
  margin-top: 4.25rem;
}

.ml-70 {
  margin-left: 4.38rem;
}

.mt-70 {
  margin-top: 4.38rem;
}

.ml-72 {
  margin-left: 4.5rem;
}

.mt-72 {
  margin-top: 4.5rem;
}

.ml-74 {
  margin-left: 4.63rem;
}

.mt-74 {
  margin-top: 4.63rem;
}

.ml-76 {
  margin-left: 4.75rem;
}

.mt-76 {
  margin-top: 4.75rem;
}

.ml-78 {
  margin-left: 4.88rem;
}

.mt-78 {
  margin-top: 4.88rem;
}

.ml-80 {
  margin-left: 5rem;
}

.mt-80 {
  margin-top: 5rem;
}

.ml-82 {
  margin-left: 5.13rem;
}

.mt-82 {
  margin-top: 5.13rem;
}

.ml-84 {
  margin-left: 5.25rem;
}

.mt-84 {
  margin-top: 5.25rem;
}

.ml-86 {
  margin-left: 5.38rem;
}

.mt-86 {
  margin-top: 5.38rem;
}

.ml-88 {
  margin-left: 5.5rem;
}

.mt-88 {
  margin-top: 5.5rem;
}

.ml-90 {
  margin-left: 5.63rem;
}

.mt-90 {
  margin-top: 5.63rem;
}

.ml-92 {
  margin-left: 5.75rem;
}

.mt-92 {
  margin-top: 5.75rem;
}

.ml-94 {
  margin-left: 5.88rem;
}

.mt-94 {
  margin-top: 5.88rem;
}

.ml-96 {
  margin-left: 6rem;
}

.mt-96 {
  margin-top: 6rem;
}

.ml-98 {
  margin-left: 6.13rem;
}

.mt-98 {
  margin-top: 6.13rem;
}

.ml-100 {
  margin-left: 6.25rem;
}

.mt-100 {
  margin-top: 6.25rem;
}

.mt-13 {
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}

.page {
  width: 400px;
  height: 800px;
  border: 1px solid #818182;
  box-sizing: border-box;
  margin: 0 auto;
}

.header {
  padding: 1.13rem 0 0.81rem;
  height: 1.2rem;
}

.text {
  margin-left: 1.13rem;
  color: #818182;
  font-size: 1.25rem;
  font-family: SourceHanSansCN;
  line-height: 1.16rem;
}

.image {
  width: 100vw;
  height: 11vw;
}

.group {
  padding-bottom: 21.38rem;
  overflow-y: auto;
}

.list-item {
  padding: 0 1.25rem 0.5rem;
  border-bottom: solid 0.063rem #0000000f;
}

.font {
  font-size: 0.88rem;
  font-family: SourceHanSansCN;
  line-height: 0.79rem;
  color: #818182;
}

.progress-bar {
  background-color: #78788033;
  border-radius: 0.19rem;
  width: 13.44rem;
  height: 0.38rem;
  cursor: pointer;
}

.progress-track {
  background-color: #1890ff;
  border-radius: 0.19rem;
  width: 6.25rem;
  height: 0.38rem;
  position: relative;
}

.progress-indicator {
  width: 0.38rem;
  height: 0.38rem;
  background-color: #1890ff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}

.image_2 {
  margin-right: 0.63rem;
  border-radius: 1.56rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}

.image_3 {
  margin-right: 0.5rem;
}

.list-item_2 {
  padding: 1.5rem 1.25rem 1.5rem 1.25rem;
  border-bottom: solid 0.063rem #0000000f;
}

.text_2 {
  line-height: 0.8rem;
}

.text_3 {
  line-height: 0.71rem;
}

.search-form input[type="text"] {
  border-radius: 20px;
  height: 30px;
  width: 325px;
  border: 1px solid #818182;
  padding-right: 30px;
  padding-left: 20px;
}

.search-icon {
  position: absolute;
  top: 5px;
  right: 12px;
  padding: 0px;
  cursor: pointer;
  width: 22px;
  height: 22px;
}

.search-form {
  position: relative;
  width: 330px;
}
</style>
