<template>
  <div>
    <el-form ref="form" :model="form" label-width="4vw" class="form" :rules="rule">
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="action"
          name="blogImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="header"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 省市区动态懒加载 -->
      <el-form-item label="省市区">
        <!-- 解决回显 问题 -->
        <el-cascader
          :props="props"
          style="display: block"
          placeholder="请选择省市区"
          v-model="region"
        />
      </el-form-item>
      <!-- <el-form-item label="头像"> 1 </el-form-item> -->
      <el-form-item>
        <el-button @click="updateForm">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { public_province, public_city, public_area } from "@/api/public";
import { app_update_userInfo } from "@/api/app";
export default {
  data() {
    return {
      form: {
        name: "",
        mobile: "",
        avatar: "",
      },
      props: {
        lazy: true,
        lazyLoad: this.getRegion,
      },
      imageUrl: "",
      action: "http:admin/upload/img",
      header: {
        authorization: "",
      },
      rule: {
        name: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            min: 11,
            max: 11,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
      },
      region: [],
    };
  },
  computed: {
    ...mapGetters(["user_info", "token"]),
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.form = {
        name: this.user_info.name,
        avatar: this.user_info.avatar,
        mobile: this.user_info.mobile,
        provinceId: this.user_info.provinceId,
        cityId: this.user_info.cityId,
        areaId: this.user_info.cityId,
      };
      if (this.user_info.avatar) {
        this.form.avatar = process.env.VUE_APP_BASEURL + this.user_info.avatar;
      }
      this.region = [
        this.user_info.provinceId,
        this.user_info.cityId,
        this.user_info.areaId,
      ];
      console.log(this.region);
      this.header.authorization = this.token;
    },
    getRegion(node, resolve) {
      const { data, level } = node;
      if (level === 0) {
        // 省
        public_province().then((res) => {
          const nodes = res.data.map((item) => {
            return {
              value: item.provinceCode,
              label: item.name,
              leaf: false,
            };
          });
          resolve(nodes);
        });
      } else if (level === 1) {
        // 市
        public_city(data.value).then((res) => {
          const nodes = res.data.map((item) => {
            return {
              value: item.cityCode,
              label: item.name,
              leaf: false,
            };
          });
          resolve(nodes);
        });
      } else {
        public_area(data.value).then((res) => {
          const nodes = res.data.map((item) => {
            return {
              value: item.areaCode,
              label: item.name,
              leaf: true,
            };
          });
          resolve(nodes);
        });
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(file.response.data.url);
      this.form.avatar = process.env.VUE_APP_BASEURL + file.response.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("头像必须是jpg格式");
      }
      if (!isLt2M) {
        this.$message.error("头像的大小不能超过2MB");
      }
      return isJPG && isLt2M;
    },
    updateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = { ...this.form };
          data.avatar = data.avatar.replace(process.env.VUE_APP_BASEURL, "");
          data.provinceId = this.region[0];
          data.cityId = this.region[1];
          data.areaId = this.region[2];
          console.log(this.region);
          console.log(data);
          app_update_userInfo(this.user_info.userId, data).then((res) => {
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
.form {
  width: 600px;
}
.avatar-uploader {
  /deep/.el-upload {
    border: 1px dotted #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  /deep/.el-upload:hover {
    border-color: #409eff;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
