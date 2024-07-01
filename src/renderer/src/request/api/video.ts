import request from 'axios'

const cmsApi = 'http://47.120.40.152:5003/addons/apptov3/app.php'

// 首页热门视频
export const getCateApi = () => {
  return request({
    url: cmsApi + '/index/home_cate',
    method: 'get'
  })
}

// 热门视频参数
interface DetailParams {
  id?: number
}
// 首页热门视频
export const getVideoDetailApi = (params?: DetailParams) => {
  return request({
    url: cmsApi + '/index/page_player',
    method: 'get',
    params
  })
}

// 热门视频参数
interface HotParams {
  id?: number
}
// 首页热门视频
export const getHotApi = (params?: HotParams) => {
  return request({
    url: cmsApi + '/index/home_data',
    method: 'get',
    params
  })
}

// 热门视频参数
interface ParseParams {
  url: string
  from: string
}
// 首页热门视频
export const videoParseApi = (params?: ParseParams) => {
  return request({
    url: cmsApi + '/index/page_parsing_config_v2',
    method: 'post',
    params
  })
}

// 视频分类
export const videoClassApi = (params: {}) => {
  return request({
    url: cmsApi + '/index/page_vod_lists',
    method: 'post',
    params
  })
}
