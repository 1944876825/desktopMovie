<template>
  <div>
    <div class="flex-row tab">
      <text
          v-for="(tab, index) in tabHeaderList"
          @click="handleTabHeaderClick(index)"
          class="hand"
          :class="currentTabHeaderIndex == index ? 'tab-active' : ''">{{tab}}</text>
    </div>
    <div class="flex-row tab" v-for="(tabColumn, indexColumn) in currentTabColumn">
      <text
          v-for="(tab, index) in tabColumn.items"
          @click="handleTabColumnClick(indexColumn, index)"
          class="hand"
          :class="currentTabColumnIndex[indexColumn] == index ? 'tab-active' : ''">{{tab}}</text>
    </div>

    <div class="flex-row flex-wrap" style="margin-top: 10px">
      <router-link v-for="video in videos" :to="'/play/'+video.vod_id" style="text-decoration: none;width: 16.6666%;height: 260px">
        <div style="height: 80%;overflow: hidden;border-radius: 4px;">
          <el-image class="mvImg" :src="video.vod_pic" lazy>
            <template #placeholder>
              <el-image src="/src/assets/images/load.gif" />
            </template>
            <template #error>
              <div style="text-align: center;margin-top: 50px;">
                <el-icon size="48" color="#9f9f9f">
                  <icon-picture />
                </el-icon>
              </div>
            </template>
          </el-image>
        </div>
        <div style="height: 20%;overflow: hidden;">
          <div class="mvName main-text-color" style="font-size: 14px; padding: 5px 0; font-weight: 600;">
            {{ video.vod_name }}
          </div>
          <div class="mvRemarks main-text-color" style="font-size: 12px;">
            {{ video.vod_remarks }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import {videoClassApi} from "../../request/api/video";
import {VideoListItem} from "../../request/model/video/hot";
import { Picture as IconPicture } from '@element-plus/icons-vue'

const currentTabHeaderIndex = ref(0)
const currentTabColumnIndex: Ref<Array<number>> = ref([])
const tabHeaderList = ref(['全部', '电影', '电视剧'])
let tabColumnList = [
  [
    {
      'name': '分类',
      'key': 'class',
      'items': ['全部', '短片', '剧情', '戏剧', '爱情', '动作', '恐怕', '科幻']
    },
    {
      'name': '分类',
      'key': 'class',
      'items': ['最多播放', '最近更新', '最新上映', '爱情', '动作', '恐怕', '科幻']
    },
    {
      'name': '分类',
      'key': 'class',
      'items': ['全部风格', '剧情', '情感', '励志', '家庭', '青春', '动作']
    }
  ],
  [
    {
      'name': '分类',
      'key': 'class',
      'items': ['短片', '剧情', '戏剧', '爱情', '动作', '恐怕', '科幻']
    }
  ],
  [
    {
      'name': '分类',
      'key': 'class',
      'items': ['短片', '剧情', '戏剧', '爱情', '动作', '恐怕', '科幻']
    }
  ],
  [
    {
      'name': '分类',
      'key': 'class',
      'items': ['短片', '剧情', '戏剧', '爱情', '动作', '恐怕', '科幻']
    }
  ]
];
const currentTabColumn = ref();
const videos = ref(<VideoListItem[]>[])
const handleTabHeaderClick = (index: number) => {
  currentTabHeaderIndex.value = index;
  currentTabColumn.value = tabColumnList[index];
  const len = currentTabColumn.value.length;
  currentTabColumnIndex.value = [];
  for (let i = 0; i < len; i++) {
    currentTabColumnIndex.value.push(0);
  }
}
handleTabHeaderClick(0)
const handleTabColumnClick = (indexColumn: number, index: number) => {
  if (indexColumn >= currentTabColumnIndex.value.length){
    return
  }
  currentTabColumnIndex.value[indexColumn] = index;
}

const getVideoList = () => {
  videoClassApi({}).then(res => {
    videos.value = res.data.data.list;
    console.log(videos.value)
  })
}

getVideoList()
</script>

<style scoped lang="scss">
.tab text {
  margin: 5px 4px;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 13px;
}
.tab-active {
  background-color: rgb(44, 27, 34);
  color: rgb(217, 94, 136);
}
.tab text:hover {
  color: rgb(194, 84, 122);
}
.mvName:hover {
  color: #FB7299 !important;
}
.mvImg {
  width: 85%;
  height: 100%;
  border-radius: 4px;
  transition: transform 0.2s ease-in-out;
}
.mvImg:hover {
  transform: scale(1.05);
}
.mvRemarks:hover {
  color: #FB7299 !important;
}
</style>