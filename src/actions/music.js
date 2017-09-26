/**
 * Created by 0easy-23 on 2017/9/14.
 */
import * as actionTypes from '../constants/index';
import API from '../util/API';
import request from '../util/request';
import {spin_hide, spin_show} from './spin';
import {parseLyric} from '../util/tools';
// 获取歌单
const updateMusic = (data) => {
    return {
        type: actionTypes.MUSIC_UPDATE,
        data
    }
};
// 当前播放列表
const addMusic = (data) => {
    return {
        type: actionTypes.MUSIC_ADD,
        data
    }
};
// 移除播放列表歌曲
const removeMusic = (data) => {
    return {
        type: actionTypes.MUSIC_REMOVE,
        data
    }
};
// 获取音乐hash
const getMusic = (data) => {
    return {
        type: actionTypes.MUSIC_GET_HASH,
        data
    }
};
// 控制音乐播放
const control = (playing) => {
    return {
        type: actionTypes.MUSIC_CONTROL,
        playing
    }
};
// 播放进度
const updateProgress = (data) => {
    return {
        type: actionTypes.MUSIC_PLAYTIME,
        data
    }
};
// 传递音乐对象
const audioObj = (data) => {
    return {
        type: actionTypes.MUSIC_AUDIO,
        data
    }
};

// 歌词同步
const updateLyrics = (data) => {
    return {
        type: actionTypes.MUSIC_UPDATELYRICS,
        data
    }
};
// 保存音乐
const saveMusic = (data) => {
    return {
        type: actionTypes.SAVE_MUSIC,
        data
    }
};
// 请求数据
const fetchMusic = (id) => {
    return async dispatch => {
        dispatch(spin_show());
        try {
            let res_song = await request.asyncGet(`kugou/${API.song_detail}?cmd=playInfo&hash=${id}`);
            let res_song_detail = await res_song.json();
            let res_lyrics = await request.asyncGet(`kugou/${API.song_lyrics}?cmd=100&hash=${id}&timelength=${res_song_detail.timeLength}`);
            let res_lyrics_detail = await res_lyrics.text();
            let musicObj = {song: res_song_detail, lyrics: parseLyric(res_lyrics_detail)};
            dispatch(addMusic(musicObj));
        } catch (err) {
            console.log("Error", err);
        }
    }
};
export {updateMusic, addMusic, removeMusic, getMusic, control, updateProgress, audioObj, updateLyrics, saveMusic, fetchMusic};