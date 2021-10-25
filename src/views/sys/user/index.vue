<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <Table :options="options"></Table>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Table from "@/components/Table.vue";
export default {
  components: {
    Breadcrumb,
    Table,
  },
  data() {
    const options = {
      columns: [
        { prop: "id", label: "ID" },
        { prop: "username", label: "账号" },
        { prop: "status", label: "状态" },
        { prop: "code", label: "邀请码" },
        { prop: "createdAt", label: "创建时间", formatter: "time" },
        { prop: "updatedAt", label: "更新时间", formatter: "time" },
      ],
    };
    return {
      options,
    };
  },
};
</script>
<style></style>
