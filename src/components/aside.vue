<template>
  <div class="g-asd">
    <router-link to="/" class="m-tit">岭南园论坛</router-link>
    <div class="m-userinfo">
      <div class="m-avatar">
        <div v-if="this.$session.get('user')">
          <img v-if="this.$session.get('user').avatar" :src="this.$session.get('user').avatar" alt="">
        </div>
      </div>
      <ul>
        <li>昵称:
          <span v-if="this.$session.get('user')">{{this.$session.get('user').nickname}}</span>
        </li>
        <li>文章:
          <span v-if="this.$session.get('user')">{{this.$session.get('user').article_count}}</span>
        </li>
        <li>性别:
          <span v-if="this.$session.get('user')">{{this.$session.get('user').sex}}</span>
        </li>
        <li>用户级别:
          <span v-if="this.$session.get('user')">{{this.$session.get('user').position}}</span>
        </li>
        <li v-if="this.$session.get('section')">管理版块:
          <span>{{this.$session.get("section").sec_name}}</span>
        </li>
      </ul>
    </div>
    <div class="m-nav">
      <router-link v-for="(item, index) in navs" @click.native="addClass(index)" :class="{'u-cur':index==cur}" :key="item.id" :to="{name: item.name}"><img :src='"../assets/img/" +item.img_name +".png"' alt="">{{ item.name }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cur: 0,
      navs: [
        {
          name: "首页",
          a_url: "/",
          img_name: "icon-home"
        },
        {
          name: "好友",
          a_url: "/friend",
          img_name: "icon-friend"
        },
        {
          name: "我的帖子",
          a_url: "/myArticle",
          img_name: "icon-page"
        },
        {
          name: "我的收藏",
          a_url: "/myStar",
          img_name: "icon-star"
        },
        {
          name: "版主管理",
          a_url: "/sectionManager",
          img_name: "icon-sectionManager"
        },
        {
          name: "版块增删",
          a_url: "/sectionAdmin",
          img_name: "icon-addSection"
        },
        {
          name: "用户管理",
          a_url: "/userManager",
          img_name: "icon-userManager"
        }
      ]
    };
  },
  created() {
    this.cur = this.$session.get("navCur") || 0;
  },
  methods: {
    addClass(index) {
      this.cur = index;
      this.$session.set("navCur", index);
    }
  }
};
</script>

<style lang="scss" scoped>
$asd-color: #293134;
.g-asd {
  color: #fff;
  height: 100%;
  background-color: $asd-color;
  align-self: stretch;
}
.m-tit {
  background-color: #f29c9f;
  color: #fff;
  height: 50px;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
  display: flex;
  align-items: center;
}
.m-userinfo {
  background-color: #3d474b;
  height: 235px;
  padding: 30px 0;
  ul {
    margin: 0;
    padding: 15px 25px 35px;
    li {
      height: 25px;
      line-height: 25px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.m-avatar {
  width: 119px;
  height: 119px;
  margin: 0 auto;
  border-radius: 50%;
  background-image: url("../assets/img/avatar.png");
  background-repeat: no-repeat;
  img {
    width: 119px;
    height: 119px;
    border-radius: 50%;
  }
}
.m-nav {
  background-color: #293134;
  a {
    padding: 0 25px;
    color: #fefefe;
    display: block;
    font-family: -apple-system, "BlinkMacSystemFont", "Helvetica Neue", "Arial",
      "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei",
      "Microsoft JhengHei", "Source Han Sans SC", "Noto Sans CJK SC",
      "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC",
      "Noto Sans CJK TC", "WenQuanYi Micro Hei", SimSun, sans-serif;
    font-size: 13px;
    height: 50px;
    line-height: 50px;
    text-decoration: none;
    text-indent: 6px;
    &:hover {
      border-left: 4px #e97c62 solid;
      padding-left: 21px;
    }
    &.u-cur {
      background-color: #191d1f;
      border-left: 4px #e97c62 solid;
      padding-left: 21px;
    }
    img {
      position: relative;
      right: 6px;
      top: 2px;
    }
  }
}
</style>