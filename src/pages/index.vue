<template>
  <div class="m-index">

    <div v-for="(items, index) in car" class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <router-link :to="{ name:'版面列表', params: { id: items.id }}" :class="['card-tit',{blue: index%3==0},{orange: index%3==1},{green: index%3==2}]">{{ items.car_tit }}</router-link>
          <span style="float: right; padding: 3px 0;color:#F29C9F ;" type="text">{{ items.tip}}</span>
        </div>
        <div v-for="(item, index) in items.pages" class="text item">
          <router-link :to="item.page_url" style="display:block;">{{'列表内容 ' + item.page_tit }}</router-link>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("routeStore");
export default {
  data() {
    return {
      car: [
        {
          car_tit: "卡片名称",
          car_tit_url: "/section",
          tip: "热门话题",
          id: 1,
          pages: [
            {
              page_tit: "page1",
              page_url: "/page1_url"
            },
            {
              page_tit: "page2",
              page_url: "/page2_url"
            },
            {
              page_tit: "page3",
              page_url: "/page3_url"
            },
            {
              page_tit: "page4",
              page_url: "/page4_url"
            }
          ]
        },
        {
          car_tit: "卡片名称",
          car_tit_url: "/car_tit_url",
          tip: "热门话题",
          id: 2,
          pages: [
            {
              page_tit: "page1",
              page_url: "/page1_url"
            },
            {
              page_tit: "page2",
              page_url: "/page2_url"
            }
          ]
        },
        {
          car_tit: "卡片名称",
          car_tit_url: "/car_tit_url",
          tip: "热门话题",
          pages: [
            {
              page_tit: "page1",
              page_url: "/page1_url"
            },
            {
              page_tit: "page2",
              page_url: "/page2_url"
            }
          ]
        },
        {
          car_tit: "卡片名称",
          car_tit_url: "/car_tit_url",
          tip: "热门话题",
          pages: [
            {
              page_tit: "page1",
              page_url: "/page1_url"
            },
            {
              page_tit: "page2",
              page_url: "/page2_url"
            }
          ]
        },
        {
          car_tit: "卡片名称",
          car_tit_url: "/car_tit_url",
          tip: "热门话题",
          pages: [
            {
              page_tit: "page1",
              page_url: "/page1_url"
            },
            {
              page_tit: "page2",
              page_url: "/page2_url"
            }
          ]
        },
        {
          car_tit: "卡片名称",
          car_tit_url: "/car_tit_url",
          tip: "热门话题",
          pages: [
            {
              page_tit: "page1",
              page_url: "/page1_url"
            },
            {
              page_tit: "page2",
              page_url: "/page2_url"
            }
          ]
        },
        {
          car_tit: "卡片名称",
          car_tit_url: "/car_tit_url",
          tip: "热门话题",
          pages: [
            {
              page_tit: "page1",
              page_url: "/page1_url"
            },
            {
              page_tit: "page2",
              page_url: "/page2_url"
            }
          ]
        },
        {
          car_tit: "卡片名称",
          car_tit_url: "/car_tit_url",
          tip: "热门话题",
          pages: [
            {
              page_tit: "page1",
              page_url: "/page1_url"
            },
            {
              page_tit: "page2",
              page_url: "/page2_url"
            }
          ]
        },
        {
          car_tit: "卡片名称",
          car_tit_url: "/car_tit_url",
          tip: "热门话题",
          pages: [
            {
              page_tit: "page1",
              page_url: "/page1_url"
            },
            {
              page_tit: "page2",
              page_url: "/page2_url"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  methods: {
    ...mapActions(["setRouteList"])
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/index";
</style>