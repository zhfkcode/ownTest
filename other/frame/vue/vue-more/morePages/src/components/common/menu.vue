<template>
    <div class='layout'>
        <Layout>
            <Sider :style="{minHeight: '100vh',minWidth:'170px',width:'170px',flex:'0 0 170px'}">
                <div class="lay-logon">
                    logo
                </div>
                <Menu ref="logonMenu"  width="auto" :theme="'dark'" :open-names="activeSub" :active-name="activeItem" @on-select="selectItem" @on-open-change="openSubMenu" accordion >
                    <template v-for="v in menuList">
                        <Submenu :name="v.path">
                            <template slot="title">
                                <Icon type="ios-paper"></Icon>
                            {{v.name}}
                            </template>
                            <template v-for="v2 in v.list">
                                <MenuItem :name="v2.path" >{{v2.name}}</MenuItem>
                            </template>
                        </Submenu>
                    </template>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{height:'80px',background: '#f8f8f8'}">
                   <div class="fr mr_20">
                        账号：<span>13525214563</span>
                   </div>
                </Header>
                <Content :style="{background: '#fff'}">
                    <slot></slot>
                </Content>
            </Layout>
        </Layout>
        

    </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [],
      activeSub: [],
      activeItem: ""
    };
  },
  methods: {
    selectItem(name) {
     console.log(this.activeSub);
            window.location.href = this.activeSub[this.activeSub.length-1] + '#/' + name;
    },
    openSubMenu(name) {
      // console.log("submenu" + name);
      this.activeSub = name;
    }
  },
  created: function() {
    var pathname = window.location.pathname;
    var mockData = {
      code: "succ",
      data: [
        {
          name: "公司信息",
          path: "index.html",
          list: [
            {
              name: "公司信息",
              path: "companyList"
            }
          ]
        },
        {
          name: "项目管理",
          path: "project.html",
          list: [
            {
              name: "项目管理",
              path: "projectList"
            }
          ]
        },
        {
          name: "竞标管理",
          path: "bidding.html",
          list: [
            {
              name: "竞标管理",
              path: "biddingList"
            }
          ]
        },
        {
          name: "分类管理",
          path: "classify.html",
          list: [
            {
              name: "分类管理",
              path: ""
            }
          ]
        },
        {
          name: "首付款管理",
          path: "payment.html",
          list: [
            {
              name: "首付款管理",
              path: ""
            }
          ]
        },
        {
          name: "活动管理",
          path: "activity.html",
          list: [
            {
              name: "公司信息",
              path: "activityList"
            }
          ]
        }
      ]
    };
    if (mockData.code == "succ") {
      this.menuList = mockData.data;

      this.activeItem = this.$route.path.slice(1);
      console.log(pathname,this.$route.path);
      for (var i = 0; i < this.menuList.length; i++) {
        // console.log(pathname.indexOf(this.menuList[i].path),this.menuList[i].path)
        if (pathname.indexOf(this.menuList[i].path) != -1) {
          this.activeSub.push(this.menuList[i].path);
        }
      }
      this.$nextTick(function() {
        this.$refs.logonMenu.updateOpened();
        this.$refs.logonMenu.updateActiveName();
      });
    }
  }
};
</script>
<style scoped>
.lay-logon {
  height: 150px;
  line-height: 150px;
  font-size: 16px;
  color: #fff;
  text-align: center;
}
</style>

