<script setup lang="ts">
import {ref, onBeforeUnmount, Ref} from 'vue';
import { useRouter } from 'vue-router'
import Artplayer from "artplayer";
import { getVideoDetailApi } from '../../request/api/video'
import { VideoInfo } from '../../request/model/video/detail'
import { videoParseApi } from '../../request/api/video'
import {
  SemiSelect,
  CloseBold,
  FullScreen, BottomLeft,
} from '@element-plus/icons-vue'
import {HandleWindow} from "../../utils/win";
// import {WindowIsFullscreen} from "../../../wailsjs/runtime";

const router = useRouter()
const id = ref(parseInt(router.currentRoute.value.params.id as string))
const activeName = ref('简介')
const ju_index = ref(0)
const xl_index = ref(0)
const isShowAll = ref(false)
const isCollect = ref(false)
const instance:Ref<Artplayer|null> = ref(null);
const artRef = ref(null);
// const playRateChoose = ref(false)
const videoInfo = ref(<VideoInfo>{})
const videoPlayUrl = ref(null)

let option = {
  theme: '#FB7299',
  setting: true,
  flip: true,
  playbackRate: true,
  aspectRatio: true,
  fullscreen: true,
  fullscreenWeb: true,
  controls: [
    // {
    //     name: 'playRate',
    //     index: 10,
    //     position: 'right',
    //     html: '<span style="font-weight: bold; color: #fff">倍速<span>',
    //     tooltip: '倍速播放（长按->）',
    //     click: function (...args) {
    //         let temp = document.getElementsByClassName('playRateCol')
    //         let playRateCol = temp[0]
    //         playRateChoose.value = !playRateChoose.value
    //         if (playRateChoose.value == true) {
    //             playRateCol.style = 'display: flex;';
    //         } else {
    //             playRateCol.style = 'display: none;';
    //         }
    //         // instance.value.playbackRate = 2;
    //         // playRateChoose.value = !playRateChoose.value
    //         // playRateChoose.value.style = 'display: none'
    //     },
    //     mounted: function (...args) {
    //         let temp_list = document.getElementsByClassName('art-video-player')
    //         const art_video_player = temp_list[0]
    //         console.log(art_video_player)
    //         var divv = '<div class="playRateCol"><div>2.0</div><div>1.5</div><div>1.25</div><div>1.0</div><div>0.75</div><div>0.5</div></div>'
    //         var divx = document.createElement('div')
    //         divx.innerHTML = divv

    //         art_video_player.appendChild(divx)
    //     },
    // },
  ],
}

const initVideoPlayer = () => {
  instance.value = new Artplayer({
    url: videoPlayUrl.value ?? '',
    ...option,
    container: artRef.value!,
  }) as any;
  if (ju_index.value != 0) {
    instance.value!.play()
  }
  instance.value!.on('fullscreen', () => {
    handFullWindow()
  });
}

onBeforeUnmount(() => {
  if (instance.value) {
    instance.value.destroy(false)
  }
});

// 选集
const chooseJuJi = (index:number) => {
  ju_index.value = index
  videoParse()
}

// 收藏
const toCollect = () => {
  isCollect.value = !isCollect.value
}

// 简介/评论 切换
const handleClick = () => {

}

// 视频解析
const videoParse = () => {
  let vod_play = videoInfo.value.vod_play_list[xl_index.value]
  videoParseApi({url: vod_play.urls[ju_index.value].url, from: vod_play.from}).then(res => {
    if (!res.data.data.url) {
      videoPlayUrl.value = null
    } else {
      videoPlayUrl.value = res.data.data.url
      if (!instance.value) {
        initVideoPlayer()
      } else {
        if (instance.value) {
          instance.value.url = videoPlayUrl.value!
          if (ju_index.value != 0) {
            instance.value!.play()
          }
        }
      }
    }
  })
}

// 获取视频详情
const getVideoDetail = () => {
  getVideoDetailApi({id: id.value}).then( res => {
    videoInfo.value = res.data.data
    videoParse()
  })
}
getVideoDetail()

// 前往首页
const toIndex =() => {
  router.push({name: 'home'})
}
// 处理全屏
const isFullscreen = ref(false);
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
    <el-col style="height: 100%;overflow: hidden">
        <!-- 头部 -->
        <el-row class="drag" style="box-sizing: border-box; height: 80px;padding: 10px 15px;background-color: rgb(30, 32, 34);" align="middle" justify="space-between">
            <router-link to="/home" style="text-decoration: none;-webkit-app-region:no-drag;">
                <div class="main-text-color" style="background-color: rgb(47, 49, 52);padding: 5px 15px;font-weight: bold;font-size: 16px; border-radius: 5px;line-height: 30px;">
                    回到主界面
                </div>
            </router-link>

            <el-row align="middle">
                <div style="padding: 0 60px;-webkit-app-region:no-drag;">
                    <el-input
                        class="searchinput w-50 m-2"
                        size="large"
                        placeholder="搜索你感兴趣的视频"
                    />
                </div>
                <el-row align="middle" style="-webkit-app-region:no-drag;">
                    <div class="max_min" @click="HandleWindow('min')">
                        <el-icon :size="20" style="padding: 8px;"><SemiSelect /></el-icon>
                    </div>
                    <div class="max_min" @click="handFullWindow">
                        <el-icon :size="20" style="padding: 8px;">
                          <FullScreen v-if="!isFullscreen" />
                          <BottomLeft v-else />
                        </el-icon>
                    </div>
                    <div class="max_min" @click="toIndex">
                        <el-icon :size="20" style="padding: 8px;"><CloseBold /></el-icon>
                    </div>
                </el-row>
            </el-row>
        </el-row>

        <el-row style="height: calc(100% - 80px);">
            <!-- 视频播放器 -->
            <div style="width: 70%;height: 100%;background-color: #000;">
                <el-row style="width: 100%; height: 100%;" align="middle">
                    <div ref="artRef" class="artplayer-app" style="width: 100%;height: 100%;"></div>
                </el-row>
            </div>
            <!-- 视频详情 -->
            <div style="width: 30%;height: 100%;background-color: rgb(25, 25, 28);">
                <el-col>
                    <div style="padding: 0 20px;border-bottom: 1px solid rgb(35, 34, 39);">
                        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                            <el-tab-pane label="简介" name="简介"></el-tab-pane>
                            <el-tab-pane label="评论" name="评论"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div style="padding: 20px 20px 0;">
                        <el-row justify="space-between">
                            <!-- 视频名称 -->
                            <div style="font-size: 18px;" class="main-text-color">
                                {{ videoInfo.vod_name }}
                            </div>
                            <div
                                @click="toCollect"
                                class="cursor"
                                :style="isCollect ? 'color: #fff;background-color: #FB7299;' : 'color: rgb(118, 122, 128);background-color: rgb(35, 37, 39);'"
                                style="padding: 3px 8px;font-size: 14px;font-weight: bold;border-radius: 3px;">
                                {{ isCollect ? '已收藏' : '未收藏' }}
                            </div>
                        </el-row>
                        <!-- 备注 -->
                        <div style="padding-top: 8px;font-size: 14px;color: rgb(118, 122, 128);">
                            {{ videoInfo.vod_remarks }}
                        </div>
                        <el-row justify="space-between" style="font-size: 12px;padding-top: 8px;">
                            <div style="color: chocolate;">
                                7.8分
                            </div>
                            <div
                                @click="isShowAll=!isShowAll"
                                class="cursor blbl-color-hover" style="color: rgb(118, 122, 128);">
                                {{ isShowAll ? '收起' : '展开' }}
                            </div>
                        </el-row>
                        <!-- 简介 -->
                        <div
                            :class="isShowAll ? '' : 'line_2'"
                            style="font-size: 14px;color: rgb(118, 122, 128);padding-top: 8px;">
                            <!-- {{ videoInfo.vod_content.replace('<p>', '').replace('</p>', '') }} -->
                            {{ videoInfo.vod_blurb }}
                        </div>
                    </div>

                    <div style="padding: 8px;margin: 0 10px;border-bottom: 2px solid rgb(35, 34, 39);" />

                    <!-- 选集 -->
                    <el-col style="background-color: rgb(35, 37, 39);margin: 20px;min-width: 300px; border-radius: 8px;">
                        <el-row justify="space-between" style="font-size: 13px;padding: 10px 20px;">
                            <div v-if="videoInfo.vod_play_list" class="main-text-color">
                                {{ '选集（' + (ju_index+1) + '/' + videoInfo.vod_play_list[xl_index].urls.length + '）'}}
                            </div>
                            <div class="cursor main-text-color">
                                排序
                            </div>
                        </el-row>

                        <el-row style="padding: 10px 20px;">
                            <div
                                v-for="(xl, index) in videoInfo.vod_play_list"
                                @click="xl_index = index"
                                class="cursor main-text-color"
                                :class="xl_index == index ? 'blbl-color' : ''"
                                style="padding: 0 10px;font-size: 13px;">{{ xl.player_info.show }}</div>
                        </el-row>

                        <el-scrollbar height="240px" v-if="videoInfo.vod_play_list">
                            <el-row justify="space-between" class="cursor jujiList" v-for="(ju_item, i) in videoInfo.vod_play_list[xl_index].urls" @click="chooseJuJi(i)"
                                :style="ju_index == i ? 'background-color: rgb(55, 44, 51);color: #FB7299' : ''">
                                <div style="width: 200px;">{{ ju_item.name }}</div>
                                <div class="blbl-bgc main-text-color" style="width: 40px; height: 20px;text-align: center;line-height: 20px;border-radius: 2px;font-size: 12px;">会员</div>
                            </el-row>
                        </el-scrollbar>
                    </el-col>
                </el-col>
            </div>
        </el-row>
    </el-col>
</template>

<style>
.playRateCol {
    display: none;
    position: absolute;
    right: 45px;
    left: auto;
    bottom: var(--art-control-height);
    flex-direction: column;
    background-color: rgb(21, 21, 20);
    z-index: 999;
    padding: 10px;
    border-radius: 8px;
}
.playRateCol div {
    padding: 8px 15px;
    text-align: center;
    border-radius: 8px;
}
.playRateCol div:hover {
    background-color: rgb(45, 44, 44);
}
.cursor {
    cursor: pointer;
}
.jujiList {
    font-size: 13px;
    padding: 15px 25px;
    border-radius: 8px;
}
.jujiList:hover {
    background-color: rgb(55, 44, 51);
    color: #FB7299;
}
</style>
