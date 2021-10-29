<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <el-row class="query-warp" :gutter="20">
      <el-col :span="10">
        <div style="margin-top: 15px">
          <el-input
            v-model="keywords"
            placeholder="请输入"
            class="input-with-select"
            clearable
          >
            <template #prepend>
              <el-select v-model="key" placeholder="请选择" style="width: 110px">
                <el-option
                  v-for="select in queryOptions"
                  :key="select.value"
                  :label="select.label"
                  :value="select.value"
                ></el-option>
              </el-select>
            </template>
            <template #append>
              <el-button icon="el-icon-search" @click="handleSearch('query')"></el-button>
            </template>
          </el-input></div
      ></el-col>
      <el-col :span="12">
        <el-button style="margin-top: 15px" type="info" @click="handleSearch('all')"
          >查看全部</el-button
        >
        <el-button style="margin-top: 15px" type="danger" @click="handleSearch(0)"
          >查看禁用</el-button
        >
        <el-button style="margin-top: 15px" type="success" @click="handleSearch(1)"
          >查看启用</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button style="margin-top: 15px" type="primary" @click="CreateVisable = true"
          >新增用户</el-button
        >
      </el-col>
    </el-row>
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
          <el-input
            v-model="userInfo.password"
            :disabled="disabled"
            type="password"
          ></el-input>
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
    <el-dialog
      v-model="CreateVisable"
      title="提示"
      width="30%"
      :before-close="
        () => {
          CreateVisable = false;
        }
      "
    >
      <el-form :model="user" ref="user" label-width="4vw" :rules="rule" class="user">
        <el-form-item label="账号" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="btns">
        <el-button type="primary" @click="handleCreate">注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Table from "@/components/Table.vue";
import { user_show, user_update, user_delete, user_create } from "@/api/user";
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
    const queryOptions = [
      {
        label: "用户名",
        value: "username",
      },
      {
        label: "邀请码",
        value: "code",
      },
    ];
    const rule = {
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
        { min: 4, max: 10, message: "用户名为4-10位", trigger: "blur" },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        { min: 6, max: 10, message: "密码为6-10位", trigger: "blur" },
      ],
    };
    return {
      options,
      userShowVisable: false,
      reomveVisable: false,
      CreateVisable: false,
      userInfo: {},
      disabled: true,
      removeId: 0,
      key: "",
      keywords: "",
      queryOptions,
      user: {
        username: "",
        password: "",
      },
      rule,
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
    handleSearch(type) {
      if (type == "query") {
        this.$refs["table"].init(this.key, this.keywords);
        this.keywords = "";
      } else if (type == "all") {
        this.$refs["table"].init();
        this.keywords = "";
      } else if (type == "0") {
        this.$refs["table"].init("status", "0");
        this.keywords = "";
      } else if (type == "1") {
        this.$refs["table"].init("status", "1");
        this.keywords = "";
      }
    },
    handleCreate() {
      this.$refs["user"].validate((valid) => {
        if (valid) {
          user_create(this.user).then((res) => {
            this.user = {
              username: "",
              password: "",
            };
            this.$refs["table"].init();
            this.CreateVisable = false;
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: center;
}
.query-warp {
  /deep/.input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>
