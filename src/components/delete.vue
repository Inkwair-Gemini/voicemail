<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <div class="header2">
          <label class="headerlabel">最近删除</label>
        </div>
      </div>
      <el-table
        :data="
          deleteList.filter(
            (data) =>
              !search || data.title.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <span class="content"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ props.row.data }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="日期" prop="time"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="{}">
            <el-input
              class="search"
              v-model="search"
              size="mini"
              placeholder="关键字搜索 . ."
            />
            <i class="el-icon-search" />
          </template>
          <template slot-scope="scope">
            <el-button
              class="recover"
              size="mini"
              @click="handleReover(scope.$index, scope.row)"
            >
              <i class="el-icon-refresh-left"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Delete",
  data() {
    return {
      title: "最近删除",
      deleteList: [
        {
          id: 1,
          title: "title1",
          time: "2023-12-13",
          data: "testtetstetsetsttesttteste",
        },
        {
          id: 2,
          title: "会议主要议题",
          time: "2023-8-1",
          data: "传达集团于 10 月 7 日召开的经济工作会议精神，从集团各公司反映的情况来看，普遍存在资金紧张、 生产任务不足的问题，但公司与其他公司相比，面临的最大困难是没有资质。 集团要求，在市场开发方面要加大开发力度，特别是要加大滨海新区等具有潜力的市场和外埠市场的开发力度，将地域性市场变为全国性市场。同时，要做好地铁一号线、快速路等项目的结算准备， 列出合同值、期望值以及材差等清单；在资金方面，要认真对待施工 产值低与成本过高、当前施工产值完成量与年初制定的计划差距过大、亏损严重等几个关键问题，要把各项管理工作，特别是项目管理做细。要提前着手准备年底资金问题，要利用四季度认真运作。 XXX总经理要求，要正确认识现实，保持一个坚强的领导班 子是战胜困难的唯一出路；要立足自身，找出解决困难的招数；要 保持政令畅通，管理工作的覆盖面要全；要抓好稳定工作；要做好 过年关的准备。",
        },
        {
          id: 3,
          title: "老王的停车记录",
          time: "2023-2-27",
          data: "testtetstetsetsttesttteste",
        },
      ],
      search: "",
    };
  },
  methods: {
    handleReover() {},
  },
};
</script>

<style>
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
.header {
  width: 500px;
  height: 60px;
}
.header2 {
  position: relative;
  top: 7px;
  left: 13px;
}
.search {
  position: relative;
  left: -16px;
  width: 110px;
}
.recover {
  position: relative;
  left: -25px;
  width: 57px;
}
.el-icon-refresh-left {
  font-size: 16px;
}
.el-icon-search {
  position: relative;
  left: -10px;
}
.content {
  position: relative;
  right: -40px;
  width: 400px;
  display: inline-block;
  word-break: break-all;
  white-space: normal;
}
</style>