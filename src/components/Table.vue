<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column
      v-for="column in options.columns"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :formatter="column.formatter === 'time' ? formatterTime : null"
      width="180"
    >
    </el-table-column>
  </el-table>
</template>
<script>
import { user_list } from "@/api/user";
import { parseTime } from "@/utils";
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
      },
      tableData: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      user_list(this.page).then((res) => {
        this.tableData = res.data.rows;
      });
    },
    formatterTime(row, column, cellValue) {
      return parseTime(new Date(cellValue));
    },
  },
};
</script>
<style></style>
