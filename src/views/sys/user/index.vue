<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <Table
      :options="options"
      @handleInfo="handleInfo"
      @handleEdit="handleEdit"
      @handleRemove="handleRemove"
      ref="table"
    ></Table>
    <el-dialog
      v-model="userShowVisable"
      title="提示"
      width="30%"
      :before-close="handleUsershowClose"
    >
      <el-form ref="userInfo" :model="userInfo" label-width="4vw" class="userInfo">
        <el-form-item label="ID">
          <div>{{ userInfo.id }}</div>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <div>{{ userInfo.username }}</div>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!disabled">
          <el-input v-model="userInfo.password" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="邀请码" prop="code">
          <div>{{ userInfo.code }}</div>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="userInfo.status" :label="1" :disabled="disabled"
            >启用</el-radio
          >
          <el-radio v-model="userInfo.status" :label="0" :disabled="disabled"
            >禁用</el-radio
          >
        </el-form-item>
        <el-form-item label="创建时间">
          <div>{{ userInfo.createdAt }}</div>
        </el-form-item>
        <el-form-item label="更新时间">
          <div>{{ userInfo.updatedAt }}</div>
        </el-form-item>
      </el-form>
      <div class="btns" v-if="!disabled">
        <el-button type="primary" @click="handleUserEdit">修改</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-model="reomveVisable"
      title="提示"
      width="30%"
      :before-close="
        () => {
          reomveVisable = false;
        }
      "
    >
      <span>是否删除该条数据？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="reomveVisable = false">取消</el-button>
          <el-button type="primary" @click="handleUserRemove">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Table from "@/components/Table.vue";
import { user_show, user_update, user_delete } from "@/api/user";
import { parseTime } from "@/utils";
export default {
  components: {
    Breadcrumb,
    Table,
  },
  data() {
    const options = {
      columns: [
        { prop: "actions", label: "操作", scoped: "actions" },
        { prop: "id", label: "ID" },
        { prop: "username", label: "账号" },
        { prop: "status", label: "状态", scoped: "status" },
        { prop: "code", label: "邀请码" },
        { prop: "createdAt", label: "创建时间", formatter: "time" },
        { prop: "updatedAt", label: "更新时间", formatter: "time" },
      ],
      api: "user_list",
    };
    return {
      options,
      userShowVisable: false,
      reomveVisable: false,
      userInfo: {},
      disabled: true,
      removeId: 0,
    };
  },
  methods: {
    formatTime(val) {
      return parseTime(new Date(val));
    },
    handleInfo(item) {
      this.userShowVisable = true;
      user_show(item.id).then((res) => {
        this.userInfo = res.data;
        this.userInfo.createdAt = this.formatTime(res.data.createdAt);
        this.userInfo.updatedAt = this.formatTime(res.data.updatedAt);
      });
    },
    handleEdit(item) {
      this.userShowVisable = true;
      this.disabled = false;
      user_show(item.id).then((res) => {
        this.userInfo = res.data;
        this.$set(this.userInfo, "password", "");
        this.userInfo.createdAt = this.formatTime(res.data.createdAt);
        this.userInfo.updatedAt = this.formatTime(res.data.updatedAt);
      });
      console.log(item);
    },
    handleRemove(item) {
      console.log(item);
      this.removeId = item.id;
      this.reomveVisable = true;
    },
    handleUserEdit() {
      console.log(this.userInfo);
      const data = {
        status: this.userInfo.status,
        password: this.userInfo.password,
      };
      console.log(data, this.userInfo.id);
      user_update(this.userInfo.id, data).then(() => {
        this.handleUsershowClose();
        this.$refs["table"].init();
      });
    },
    handleUserRemove() {
      this.reomveVisable = false;
      user_delete(this.removeId).then(() => {
        this.$refs["table"].init();
        this.removeId = 0;
      });
    },
    handleUsershowClose() {
      this.userShowVisable = false;
      this.disabled = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: center;
}
</style>
