<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <div class="btns">
      <el-button type="primary" @click="handleCreate" size="mini">
        添加一级菜单</el-button
      >
    </div>
    <el-tree
      class="tree"
      :data="menuList"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <template #default="{ data }">
        <span class="custom-tree-node">
          <span>{{ data.menuName }}</span>
          <span v-if="data.children">
            <el-button type="success" @click="handleUpdate(data)" size="mini"
              >修改一级菜单</el-button
            >
            <el-button type="primary" @click="handleCreate(data)" size="mini"
              >添加二级菜单</el-button
            >
            <el-button type="danger" @click="handleDelete(data)" size="mini">
              删除一级菜单</el-button
            >
          </span>
          <span v-if="!data.children">
            <el-button type="success" @click="handleUpdate(data)" size="mini"
              >修改二级菜单</el-button
            >
            <el-button type="danger" @click="handleDelete(data)" size="mini">
              删除二级菜单</el-button
            >
          </span>
        </span>
      </template>
    </el-tree>
    <el-dialog v-model="Visable" title="提示" width="30%" :before-close="hideVisable">
      <el-form :model="menuForm" ref="menuForm" label-width="4vw" :rules="rule">
        <el-form-item label="路径" prop="path">
          <el-input v-model="menuForm.path"></el-input>
        </el-form-item>
        <el-form-item label="菜单名" prop="menuName">
          <el-input v-model="menuForm.menuName"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="menuForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="menuForm.component"></el-input>
        </el-form-item>
        <el-form-item label="重定向路径" prop="redirect">
          <el-input v-model="menuForm.redirect"> </el-input>
        </el-form-item>
        <el-form-item label="权限" prop="roleLevel">
          <el-checkbox-group v-model="menuForm.roleLevel">
            <el-checkbox :label="3">admin</el-checkbox>
            <el-checkbox :label="2">author</el-checkbox>
            <el-checkbox :label="1">user</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="btns">
        <el-button v-if="type === 'create'" type="primary" @click="CreateMenu"
          >添加</el-button
        >
        <el-button v-if="type === 'update'" type="primary" @click="updateMenu"
          >修改</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      v-model="DeleteVisable"
      title="提示"
      width="30%"
      :before-close="handleRemoveVisable"
    >
      <span>是否删除该条数据？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleRemoveVisable">取消</el-button>
          <el-button type="primary" @click="removeMenu">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { menu_list, menu_create, menu_delete, menu_update } from "@/api/menu";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    const rule = {
      path: [
        {
          required: true,
          message: "请输入路径名",
          trigger: "blur",
        },
      ],
      menuName: [
        {
          required: true,
          message: "请输入菜单名",
          trigger: "blur",
        },
      ],
    };
    return {
      menuList: [],
      defaultProps: {
        children: "children",
        label: "path",
      },
      Visable: false,
      menuForm: {
        path: "",
        menuName: "",
        icon: "",
        pid: 0,
        component: "",
        redirect: "",
        roleLevel: [1, 2, 3],
      },
      rule,
      chooseId: 0,
      DeleteVisable: false,
      type: "",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      menu_list().then((res) => {
        this.menuList = res.data;
      });
    },
    initData() {
      this.menuForm = {
        path: "",
        menuName: "",
        icon: "",
        pid: 0,
        component: "",
        redirect: "",
        roleLevel: [1, 2, 3],
      };
    },
    handleRemoveVisable() {
      this.DeleteVisable = false;
      this.chooseId = 0;
    },
    hideVisable() {
      this.Visable = false;
      this.initData();
    },
    handleCreate(data) {
      if (data) {
        this.menuForm.pid = data.id;
      }
      this.type = "create";
      this.Visable = true;
    },
    CreateMenu() {
      this.$refs["menuForm"].validate((valid) => {
        if (valid) {
          const data = { ...this.menuForm };
          if (data.pid === 0) {
            delete data.pid;
          }
          menu_create(data).then(() => {
            this.hideVisable();
            this.getList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleDelete(data) {
      if (data?.children?.length) {
        this.$message({
          type: "error",
          message: "请先删除子菜单",
        });
        return 0;
      }
      this.chooseId = data.id;
      this.DeleteVisable = true;
    },
    removeMenu() {
      menu_delete(this.chooseId).then(() => {
        this.getList();
        this.handleRemoveVisable();
      });
    },
    handleUpdate(data) {
      this.type = "update";
      this.chooseId = data.id;
      this.Visable = true;
      this.menuForm.path = data.path;
      this.menuForm.menuName = data.menuName;
      this.menuForm.icon = data.icon;
      this.menuForm.component = data.component;
      this.menuForm.redirect = data.redirect;
      this.menuForm.pid = data.pid;
      this.menuForm.roleLevel = JSON.parse(data.roleLevel);
    },
    updateMenu() {
      this.$refs["menuForm"].validate((valid) => {
        if (valid) {
          const data = { ...this.menuForm };
          if (data.pid === 0) {
            delete data.pid;
          }
          menu_update(this.chooseId, data).then(() => {
            this.hideVisable();
            this.getList();
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
<style scoped lang="scss">
/deep/.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.tree {
  margin-top: 20px;
  width: 50%;
  /deep/.el-tree-node__content {
    margin-top: 15px;
  }
}
.btns {
  width: 50%;
  text-align: right;
  margin-top: 20px;
}
</style>
