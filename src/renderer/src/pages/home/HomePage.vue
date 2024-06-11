<template>
    <div style="padding-left: 15px;">
        <el-skeleton style="" :loading="loading" animated>
            <template #template>
                <div v-for=" in 2" style="margin-bottom: 10px;">
                    <div style="padding: 15px 0;font-weight: bold;font-size: 18px;color: #fff;">
                        <el-skeleton-item variant="h3" style="width: 20%; height: 30px;" />
                    </div>
                    <div>
                        <el-row style="">
                            <div v-for=" in 6" style="width: 16.6666%;">
                                <router-link to="/play/1" style="text-decoration: none;">
                                    <div style="height: 80%;overflow: hidden;border-radius: 4px;">
                                        <el-skeleton-item variant="image" style="width: 85%;height: 220px;border-radius: 4px;" />
                                    </div>
                                    <div style="height: 20%;overflow: hidden;width: 85%;">
                                        <el-skeleton-item variant="text" style="width: 30%" />
                                        <el-skeleton-item variant="text" style="margin-right: 16px" />
                                    </div>
                                </router-link>
                            </div>
                        </el-row>
                    </div>
                </div>
            </template>
            <template #default>
                <div v-for="section in sectionList" style="margin-bottom: 10px;">
                    <div class="main-text-color" style="padding: 15px 0;font-weight: 600;font-size: 16px;">
                        {{ section.title }}
                    </div>
                    <div>
                        <el-row style="">
                            <div v-for="item in section.items.slice(0, 6)" style="width: 16.6666%;">
                                <router-link :to="'/play/'+item.vod_id" style="text-decoration: none;">
                                    <div style="height: 80%;overflow: hidden;border-radius: 4px;">
                                        <img 
                                            class="mvImg"
                                            style="width: 85%; border-radius: 4px;"
                                            :src="item.vod_pic" alt="" srcset="">
                                    </div>
                                    <div style="height: 20%;overflow: hidden;">
                                        <div class="mvName main-text-color" style="font-size: 14px; padding: 5px 0; font-weight: 600;">
                                            {{ item.vod_name }}
                                        </div>
                                        <div class="mvRemarks main-text-color" style="font-size: 12px;">
                                            {{ item.vod_remarks }}
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </el-row>
                    </div>
                </div>

            </template>
        </el-skeleton>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getHotApi } from '../../request/api/video'
import { sections } from "../../request/model/video/hot"

const props = defineProps({
    activeName: Number,
});
let current_tab_index = 0
let pageList = <any>{}
const loading = ref(true)
const sectionList = ref(<sections[]>[])

watch(props, () => {
    loading.value = true
    if (props.activeName != current_tab_index) {
        current_tab_index = props.activeName!
        if (pageList[current_tab_index]) {
            sectionList.value = pageList[current_tab_index]
            setTimeout(() => {
                loading.value = false
            }, 1000);
        } else {
            getHot()
        }
    }
});

const getHot = () => {
    getHotApi({id: props.activeName}).then( res => {
        sectionList.value = res.data.data.sections
        pageList[current_tab_index] = res.data.data.sections
        setTimeout(() => {
            loading.value = false
        }, 500);
    })
}
if (current_tab_index == 0) {
    getHot()
}

</script>

<style scoped>
    .mvName:hover {
        color: #FB7299 !important;
    }
    .mvImg {
        transition: transform 0.2s ease-in-out;
    }
    .mvImg:hover {
        transform: scale(1.05);
    }
    .mvRemarks:hover {
        color: #FB7299 !important;
    }
</style>