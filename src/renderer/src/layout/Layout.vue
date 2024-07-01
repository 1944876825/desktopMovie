<script setup lang="ts">
import { ref, watch } from 'vue'
import { getCateApi } from '../request/api/video'
import {
  Document,
  Menu as IconMenu,
  HomeFilled,
  Setting,
  SemiSelect,
  CloseBold,
  FullScreen,
  BottomLeft
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { HandleWindow } from '../utils/win'
// import {WindowIsFullscreen, WindowUnfullscreen} from "../../wailsjs/runtime";
const route = useRoute()
const activeName = ref(0)
const cateList = ref<{ id: number; title: string }[]>([])
const searchinput = ref(true)
const isFullscreen = ref(false)
const getHomeCate = () => {
  getCateApi().then((res) => {
    cateList.value = res.data.data
    if (activeName.value == 0) {
      activeName.value = cateList.value[0].id
    }
  })
}

const handleSearch = () => {
  console.log(searchinput.value)
  searchinput.value = false
}

const handleClick = () => {
  console.log('click')
}

watch(
  () => route.name,
  () => {
    initCate()
  }
)

const initCate = () => {
  if (route.name == 'home') {
    getHomeCate()
  } else {
    // var list = [
    //   {
    //     id: 1,
    //     title: '电影'
    //   },
    //   {
    //     id: 2,
    //     title: '电视剧'
    //   },
    //   {
    //     id: 3,
    //     title: '动漫'
    //   },
    //   {
    //     id: 4,
    //     title: '综艺'
    //   },
    // ];
    // cateList.value = list;
    // if (activeName.value == 0) {
    //   activeName.value = cateList.value[0].id
    // }
    cateList.value = []
  }
}
initCate()

const handFullWindow = async () => {
  // if (await WindowIsFullscreen()) {
  //   isFullscreen.value = false;
  //   HandleWindow('unmax')
  // } else {
  //   isFullscreen.value = true;
  //   HandleWindow('max')
  // }
}
</script>

<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <!-- 中部 -->
      <el-aside class="flex-col" style="height: 100%; width: 64px">
        <el-row
          style="width: 64px; background-color: rgb(30, 32, 34); height: 80px"
          align="middle"
          justify="center"
        >
          <el-avatar class="hand" :size="40" src="https://q1.qlogo.cn/g?b=qq&nk=1944876825&s=640" />
        </el-row>
        <el-menu
          default-active="home"
          class="flex-1"
          :collapse="true"
          text-color="#fff"
          active-text-color="#FB7299"
          style="height: 90%; background-color: rgb(30, 32, 34); border-right: 0"
          router
        >
          <el-menu-item index="home">
            <el-icon :size="30" color="#FFFFFF">
              <HomeFilled />
            </el-icon>
            <template #title><span>首页</span></template>
          </el-menu-item>

          <el-menu-item index="class">
            <el-icon :size="30" color="#FFFFFF"><icon-menu /></el-icon>
            <template #title>功能</template>
          </el-menu-item>

          <el-menu-item index="doc">
            <el-icon :size="30">
              <document />
            </el-icon>
            <template #title>文档</template>
          </el-menu-item>

          <el-menu-item index="setting">
            <el-icon :size="30">
              <setting />
            </el-icon>
            <template #title>设置</template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header
          class="drag no-select"
          style="
            background-color: rgb(23, 24, 26);
            height: 80px;
            border-bottom: 1px solid rgb(35, 37, 39);
            overflow: hidden;
          "
        >
          <el-row style="height: 100%" align="middle" justify="space-between">
            <el-row align="middle" style="height: 100%">
              <div class="main-text-color" style="font-size: 24px; font-weight: 600">旧梦影视</div>
              <div
                v-if="searchinput && cateList.length > 0"
                class="no-drag"
                style="padding-left: 50px; padding-top: 10px"
              >
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane
                    v-for="cate in cateList"
                    :label="cate.title"
                    :name="cate.id"
                  ></el-tab-pane>
                </el-tabs>
              </div>
            </el-row>

            <el-row align="middle">
              <div class="no-drag" style="padding: 0 30px">
                <el-input
                  class="searchinput"
                  size="large"
                  placeholder="搜索你感兴趣的视频"
                  @fouse="searchinput = false"
                  @blur="searchinput = true"
                  @click="handleSearch"
                />
              </div>
              <el-row align="middle" class="no-drag">
                <div class="max_min" @click="HandleWindow('min')">
                  <el-icon :size="20" style="padding: 8px">
                    <SemiSelect />
                  </el-icon>
                </div>
                <div class="max_min" @click="handFullWindow()">
                  <el-icon :size="20" style="padding: 8px">
                    <FullScreen v-if="!isFullscreen" />
                    <BottomLeft v-else />
                  </el-icon>
                </div>
                <div class="max_min" @click="HandleWindow('close')">
                  <el-icon :size="20" style="padding: 8px">
                    <CloseBold />
                  </el-icon>
                </div>
              </el-row>
            </el-row>
          </el-row>
        </el-header>
        <el-main>
          <router-view :active-name="activeName" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.max_min {
  border-radius: 8px;
}
.max_min:hover {
  background-color: rgb(47, 49, 52);
}
</style>
