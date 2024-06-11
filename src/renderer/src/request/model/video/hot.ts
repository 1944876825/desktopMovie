export interface HotData {
    banner: banner,
    banners: banners,
    notices: notices[],
    sections: sections[],
}

interface banner {
    autoplay: boolean,
    autoplay_delay: number, 
    long: number,
    radius: number,
    viewport_fraction: number,
    width: number,
}

interface banners {
    banner_id: number,
    image_url: string,
    title: string,
    payload: number,
    type: number,
}

interface notices {
    id: number,
    title: string,
}

export interface sections {
    id: string,
    title: string,
    items: section_item[],
    scroll: number,
    section: section,
    rows: number,
}

interface section {
    type: string,
    label: string,
    name: string,
    scroll: number,
    mold: number,
    value: string,
}

interface section_item {
    vod_id: number,
    vod_name: string,
    vod_pic: string,
    vod_actor: string,
    vod_score: string,
    vod_remarks: string,
    vod_points_play: number,
    vod_is_play: boolean,
    vod_type_name: string,
}

export interface VideoListItem {
    vod_id: number,
    vod_name: string,
    vod_pic: string,
    vod_actor: string,
    vod_score: string,
    vod_remarks: string,
    vod_points_play: number,
    vod_is_play: boolean,
    vod_type_name: string,
}

