<template>
  <div class="g-asd">
    <router-link to="/" class="m-tit">岭南园论坛</router-link>
    <div class="m-userinfo">
      <div class="m-avatar"></div>
      <ul>
        <li>昵称:lisi</li>
        <li>文章:10</li>
        <li>性别:男</li>
      </ul>
    </div>
    <div class="m-nav">
      <router-link v-for="(item, index) in navs" @click.native="addClass(index)" :class="{'u-cur':index==cur}" :key="item.id" :to="{name: item.name,params: {uid: 1}}"><img :src='"../assets/img/" +item.img_name +".png"' alt="">{{ item.name }}</router-link>
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
          a_url: "#",
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
        }
      ]
    };
  },
  methods: {
    addClass(index) {
      console.log(index);
      this.cur = index;
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
  height: 200px;
  padding: 30px 0;
  ul {
    margin: 0;
    padding: 15px 25px 35px;
    li {
      height: 20px;
      line-height: 20px;
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