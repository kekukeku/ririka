import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 圖標 (SVG 組件) ---
const IconSettings = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.48.398.668 1.03.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313.686-.645.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconBackpack = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>;
const IconCharacter = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M12 10.5h.008v.008H12v-.008Zm0 4.5h.008v.008H12v-.008Zm4.5-4.5h.008v.008H16.5v-.008Zm0 4.5h.008v.008H16.5v-.008Zm-9-4.5h.008v.008H7.5v-.008Zm0 4.5h.008v.008H7.5v-.008Z" /></svg>;
const IconClose = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const IconUpload = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>;
const IconSend = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const IconJournal = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;
const IconScroll = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM16.5 18.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v12m-4.5-8.25h9" /></svg>;
const IconDownload = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>;
const IconLightning = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>;
const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>;
const IconTalk = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>;
const IconMinus = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>;
const IconHeart = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9-22.045 22.045 0 01-2.582-1.9 20.759 20.759 0 01-1.162-.682c-.006.003-.012.007-.018.01a.75.75 0 01-.704-1.23c.12-.213.254-.42.396-.622.288-.404.594-.794.912-1.162a21.46 21.46 0 012.22-2.13.04.04 0 00.028-.017 21.46 21.46 0 012.22-2.13c.318-.368.624-.758.912-1.162.142-.202.276-.41.396-.622a.75.75 0 011.408 0c.12.213.254.42.396-.622.288-.404.594-.794.912-1.162a21.46 21.46 0 012.22-2.13.04.04 0 00.028-.017 21.46 21.46 0 012.22-2.13c.318-.368.624-.758.912-1.162.142-.202.276-.41.396-.622a.75.75 0 01.704 1.23c-.006-.003-.012-.007-.018-.01a20.759 20.759 0 01-1.162.682 22.045 22.045 0 01-2.582 1.9-22.045 22.045 0 01-2.582 1.9 20.759 20.759 0 01-1.162.682z" /></svg>;
const IconX = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75ZM11.437 13.98l1.1-1.565L4.12 2.16h-1.2l6.544 9.26.29.416Z"/></svg>;
const IconHistory = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const IconPanels = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5h6.75a1.5 1.5 0 011.5 1.5V12a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 12V6a1.5 1.5 0 011.5-1.5zM12.75 4.5H19.5A1.5 1.5 0 0121 6v3.75a1.5 1.5 0 01-1.5 1.5h-6.75A1.5 1.5 0 0111.25 9.75V6a1.5 1.5 0 011.5-1.5zM4.5 12.75h6.75a1.5 1.5 0 011.5 1.5V19.5a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 19.5v-5.25a1.5 1.5 0 011.5-1.5zM16.5 12.75a3 3 0 110 6 3 3 0 010-6z" /></svg>;
const IconPhone = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" /></svg>;
const IconLanguage = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.061 14.289 7.5 15.5 7.5c1.21 0 2.32-.439 3.166-1.136m0 0V3m0 2.864A48.32 48.32 0 0118 7.5c-1.131 0-2.239-.03-3.334-.085" /></svg>;
const IconRss = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C16.5 11.536 12.464 7.5 7.5 7.5h-.75a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75A6 6 0 0 0 6 11.25h-.75a.75.75 0 0 1-.75-.75V9Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /></svg>;
const IconLightBulb = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a15.045 15.045 0 0 1-7.5 0C4.505 20.995 2.25 18.288 2.25 15c0-1.606.42-3.123 1.172-4.418c.635-1.093 1.5-2.003 2.57-2.731c1.068-.728 2.36-.97 3.634-.973c1.274-.003 2.566.245 3.634.973c1.07.728 1.935 1.638 2.57 2.731c.752 1.295 1.172 2.812 1.172 4.418c0 3.288-2.255 5.995-5.25 6.488Z" /></svg>;
const IconQuill = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>;
const IconTshirt = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125a1.125 1.125 0 0 0-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125Z" /></svg>;
const IconListen = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;


// --- 資料庫助手 (IndexedDB) ---
class GameDB {
    constructor(dbName = 'RirikasSecret_DB') { this.dbName = dbName; this.db = null; }
    async open() { return new Promise((resolve, reject) => { const request = indexedDB.open(this.dbName, 1); request.onerror = () => reject("開啟資料庫時發生錯誤"); request.onsuccess = (event) => { this.db = event.target.result; resolve(); }; request.onupgradeneeded = (event) => { const db = event.target.result; if (!db.objectStoreNames.contains('saves')) db.createObjectStore('saves', { keyPath: 'id' }); if (!db.objectStoreNames.contains('metadata')) { const metadataStore = db.createObjectStore('metadata', { keyPath: 'id' }); metadataStore.createIndex('saveId', 'saveId', { unique: false }); } }; }); }
    async saveData(storeName, data) { if (!this.db) await this.open(); return new Promise((resolve, reject) => { const transaction = this.db.transaction(storeName, 'readwrite'); const store = transaction.objectStore(storeName); const request = store.put(data); request.onsuccess = () => resolve(); request.onerror = (e) => reject(`儲存資料至 ${storeName} 失敗: ${e.target.error}`); }); }
    async getAllData(storeName) { if (!this.db) await this.open(); return new Promise((resolve, reject) => { const transaction = this.db.transaction(storeName, 'readonly'); const store = transaction.objectStore(storeName); const request = store.getAll(); request.onsuccess = () => resolve(request.result); request.onerror = (e) => reject(`從 ${storeName} 獲取所有資料失敗: ${e.target.error}`); }); }
    async getRecentMetadata(saveId, limit = 20) { if (!this.db) await this.open(); return new Promise((resolve, reject) => { const transaction = this.db.transaction('metadata', 'readonly'); const store = transaction.objectStore('metadata'); const index = store.index('saveId'); const request = index.getAll(saveId); request.onsuccess = () => { const sorted = request.result.sort((a, b) => b.timestamp - a.timestamp); resolve(sorted.slice(0, limit)); }; request.onerror = (e) => reject(`獲取元數據失敗: ${e.target.error}`); }); }
    async getAllMetadataBySaveId(saveId) {
        if (!this.db) await this.open();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction('metadata', 'readonly');
            const store = transaction.objectStore('metadata');
            const index = store.index('saveId');
            const request = index.getAll(saveId);
            request.onsuccess = () => resolve(request.result);
            request.onerror = (e) => reject(`獲取 saveId ${saveId} 的所有元數據失敗: ${e.target.error}`);
        });
    }
    async deleteData(storeName, id) { if (!this.db) await this.open(); return new Promise((resolve, reject) => { const transaction = this.db.transaction(storeName, 'readwrite'); const store = transaction.objectStore(storeName); const request = store.delete(id); request.onsuccess = () => resolve(); request.onerror = (e) => reject(`從 ${storeName} 刪除資料失敗: ${e.target.error}`); }); }
}
const db = new GameDB();

// --- 遊戲資料 (林宅物語) ---
const PLAYER_STATS = { academics: '學業', money: '金錢', stamina: '體力', stress: '壓力', charm: '魅力' };

// 角色資料 (更新為林宅物語設定)
const HEROINE_PROFILES = {
  ririka: {
    id: "ririka",
    name: "林雨晴",
    age: 39,
    gender: "female",
    avatarFolderId: "01",
    profile: {
      identityKey: "identity_ririka",
      appearance: "成熟、知性且保養得宜，擁有出眾的氣質與溫柔的眼神，身高164公分，上圍豐滿。",
      personality: "溫柔包容，聰明且善解人意。身為單親媽媽，她堅強而獨立，但也渴望被依賴與疼愛。",
      background: "沐瑤的母親，在臺灣大學擔任教授。"
    },
    gameplayInfo: { difficulty: 2, strategy: "展現成熟與責任感，成為她的情感支柱。" },
    voiceName: "Zephyr"
  },
  mei: {
    id: "mei",
    name: "林沐瑤",
    age: 19,
    gender: "female",
    profile: {
      identityKey: "identity_mei",
      appearance: "活潑可愛，烏黑長髮，身高168公分，上圍豐滿。",
      personality: "外向開朗，帶些傲嬌，對哥哥與弟弟既好奇又害羞。",
      background: "剛入學的臺大新生，與林宅共住。"
    },
    gameplayInfo: { difficulty: 3, strategy: "耐心陪伴，建立信任與依賴。" },
    voiceName: "Leda"
  },
  yuina: {
    id: "yuina",
    name: "蘇巧希",
    age: 25,
    gender: "female",
    profile: {
      identityKey: "identity_yuina",
      appearance: "溫婉知性，身高170公分，上圍豐滿。",
      personality: "成熟穩重，待人和善但保有學術距離感。",
      background: "就讀博士班一年級，是林雨晴的指導學生與課程助教。"
    },
    gameplayInfo: { difficulty: 2, strategy: "體貼互動，展現可靠感。" },
    voiceName: "Erinome"
  },
  rin: {
    id: "rin",
    name: "白凌雪",
    age: 23,
    gender: "female",
    profile: {
      identityKey: "identity_rin",
      appearance: "冷豔高挑，身高175公分，上圍豐滿。",
      personality: "冷靜沉著，氣質孤高但真心的人值得她敞開心扉。",
      background: "新搬來的鄰居，與林家因緣巧合相識。"
    },
    gameplayInfo: { difficulty: 3, strategy: "耐心與尊重，逐步建立信任。" },
    voiceName: "Callirrhoe"
  },
  mayuri: {
    id: "mayuri",
    name: "夏沫語",
    age: 22,
    gender: "female",
    profile: {
      identityKey: "identity_mayuri",
      appearance: "時尚火辣，身高169公分，上圍豐滿。",
      personality: "外向大方，善於社交，對新生活充滿好奇。",
      background: "林宅隔壁的鄰居，熱愛穿搭與社交媒體。"
    },
    gameplayInfo: { difficulty: 2, strategy: "活潑互動，創造共同回憶。" },
    voiceName: "Aoede"
  },
  kevin: {
    id: "kevin",
    name: "Kevin",
    age: 16,
    gender: "male",
    profile: {
      identityKey: "identity_kevin",
      appearance: "高一學生，身高155公分，稚氣可愛，討女生喜歡。",
      personality: "崇拜哥哥、親切開朗，不會嫉妒，樂於助攻或單獨攻略女性角色。",
      background: "主角的親弟弟，非攻略對象，與哥哥一起搬進林宅。"
    },
    gameplayInfo: { difficulty: 0, strategy: "非主要攻略對象，但能增加互動與劇情張力。" },
    voiceName: "Fenrir"
  },
  cafe_manager: {
    id: "cafe_manager",
    name: "蘇婉柔",
    age: 29,
    gender: "female",
    profile: {
      identityKey: "identity_cafe_manager",
      appearance: "星巴克店長員工，身高172公分，高挑大眼睛，氣質溫婉，上圍豐滿。",
      personality: "溫柔但有主見，擅長觀察並照顧店裡人。",
      background: "星巴克店長，蘇巧希的姐姐。"
    },
    gameplayInfo: { difficulty: 2, strategy: "建立信任，偶爾提供工作機會與劇情支援。" },
    voiceName: "Despina"
  },
  cafe_staff: {
    id: "cafe_staff",
    name: "葉語彤",
    age: 20,
    gender: "female",
    profile: {
      identityKey: "identity_cafe_staff",
      appearance: "星巴克店員，身高166公分，活潑甜美，上圍豐滿。",
      personality: "元氣開朗，喜歡與客人互動，對主角和Kevin有好感。",
      background: "星巴克員工，常與玩家相遇。"
    },
    gameplayInfo: { difficulty: 3, strategy: "輕鬆互動、製造親密機會。" },
    voiceName: "Leda"
  },
  school_intern_teacher: {
    id: "school_intern_teacher",
    name: "顧盼兮",
    age: 23,
    gender: "female",
    profile: {
      identityKey: "identity_school_intern_teacher",
      appearance: "高中實習老師，身高170公分，知性又有魅力，上圍豐滿。",
      personality: "溫柔親切，常和學生打成一片。",
      background: "在Kevin高中新任實習老師，與主角在社團活動中相識。"
    },
    gameplayInfo: { difficulty: 3, strategy: "尊重專業與界線，逐步拉近距離。" },
    voiceName: "Laomedeia"
  },
  homeroom_teacher: {
    id: "homeroom_teacher",
    name: "陳曼青",
    age: 30,
    gender: "female",
    profile: {
      identityKey: "identity_homeroom_teacher",
      appearance: "高中班導師，身高173公分，端莊大方，上圍豐滿。",
      personality: "穩重可靠，對學生關懷備至。",
      background: "Kevin的高中班導師，與學生家長互動頻繁。"
    },
    gameplayInfo: { difficulty: 4, strategy: "建立信任與尊重，處理倫理議題需謹慎。" },
    voiceName: "Erinome"
  },
  club_teacher: {
    id: "club_teacher",
    name: "戚海薇",
    age: 28,
    gender: "female",
    profile: {
      identityKey: "identity_club_teacher",
      appearance: "社團指導老師，身高169公分，運動風格，上圍豐滿。",
      personality: "熱情有活力，重視團隊精神。",
      background: "校內社團指導老師，與主角有多次活動互動。"
    },
    gameplayInfo: { difficulty: 2, strategy: "參與活動，展現幫助與合作。" },
    voiceName: "Aoede"
  },
  parent_mom: {
    id: "parent_mom",
    name: "趙夢潔",
    age: 35,
    gender: "female",
    profile: {
      identityKey: "identity_parent_mom",
      appearance: "高中學生家長，身高165公分，風情成熟，上圍豐滿。",
      personality: "熱情外向，重視家庭與教養。",
      background: "Kevin同學的家長，與主角家庭有交集。"
    },
    gameplayInfo: { difficulty: 3, strategy: "應對家庭倫理與關係網絡。" },
    voiceName: "Kore"
  },
  yoga_teacher: {
    id: "yoga_teacher",
    name: "孫藝彤",
    age: 28,
    gender: "female",
    profile: {
      identityKey: "identity_yoga_teacher",
      appearance: "瑜珈老師，身高174公分，身材健美，上圍豐滿。",
      personality: "陽光正向，注重身心靈平衡。",
      background: "大學社團或健身房的瑜珈老師。"
    },
    gameplayInfo: { difficulty: 2, strategy: "健康互動與共同運動活動。" },
    voiceName: "Erinome"
  }
};

// 圖片映射（更新為 origin ririka 的路徑格式）
const CHARACTER_IMAGE_URLS = {
    // 參照 origin ririka 的資料夾路徑 (01-05)，固定選用 01.jpg 作為代表
    ririka: "https://callmygod.com/galgame/01/cha/01/01.jpg", 
    mei: "https://callmygod.com/galgame/01/cha/02/01.jpg",
    yuina: "https://callmygod.com/galgame/01/cha/03/01.jpg",
    rin: "https://res.cloudinary.com/dkv0lceid/image/upload/v1764520368/jingshu02_j7tyhq.png",
    mayuri: "https://callmygod.com/galgame/01/cha/05/01.jpg",

    // 其他角色 (保持原有的 Cloudinary 連結)
    kevin: "https://res.cloudinary.com/dkv0lceid/image/upload/v1764523475/kevin02_cbaej6.png", // Animation -> Kevin (中性/年輕)
    school_intern_teacher: "https://res.cloudinary.com/dkv0lceid/image/upload/v1764520360/panxi_b15e3s.png", // panxi -> 顧盼兮
    club_teacher: "https://res.cloudinary.com/dkv0lceid/image/upload/v1766782849/IMG_3250_olu7nk.jpg", // haiwei -> 戚海薇
    cafe_staff: "https://res.cloudinary.com/dkv0lceid/image/upload/v1764526580/Create_Animation_Dec_1_2025_qyavls.png", // 葉語彤
    homeroom_teacher: "https://res.cloudinary.com/dkv0lceid/image/upload/v1765107784/Gemini_Generated_Image_copy_4_piranv.png", // 陳曼青
    parent_mom: "https://res.cloudinary.com/dkv0lceid/image/upload/v1765107784/Gemini_Generated_Image_copy_3_fgjfoy.png", // 趙夢潔
    yoga_teacher: "https://res.cloudinary.com/dkv0lceid/image/upload/v1765107783/%E5%AD%AB%E8%97%9D%E5%BD%A4_o7mu6f.png", // 孫藝彤
    cafe_manager: "https://res.cloudinary.com/dkv0lceid/image/upload/v1765107784/%E8%98%87%E5%A9%89_flwxhj.png", // 蘇婉柔
};

// 聲音映射
const VOICE_MAP = {
  player: 'Zubenelgenubi',
  kevin: 'Fenrir',
  ririka: 'Zephyr',
  mei: 'Leda',
  yuina: 'Erinome',
  rin: 'Callirrhoe',
  mayuri: 'Aoede',
  cafe_manager: 'Despina',
  cafe_staff: 'Leda',
  school_intern_teacher: 'Laomedeia',
  homeroom_teacher: 'Erinome',
  club_teacher: 'Aoede',
  parent_mom: 'Kore',
  yoga_teacher: 'Erinome'
};

const LOCATIONS = [
  { id: "rented_apartment", nameKey: "location_rented_apartment_name", descriptionKey: "location_rented_apartment_description", type: "據點" },
  { id: "lin_house", nameKey: "location_lin_house_name", descriptionKey: "location_lin_house_description", type: "鄰居" },
  { id: "teito_university", nameKey: "location_teito_university_name", descriptionKey: "location_teito_university_description", type: "學術" }, 
  { id: "shibuya", nameKey: "location_shibuya_name", descriptionKey: "location_shibuya_description", type: "商業區" }, 
  { id: "shinjuku", nameKey: "location_shinjuku_name", descriptionKey: "location_shinjuku_description", type: "商業區" },
  { id: "akihabara", nameKey: "location_akihabara_name", descriptionKey: "location_akihabara_description", type: "次文化" }, 
  { id: "cafe", nameKey: "location_cafe_name", descriptionKey: "location_cafe_description", type: "打工" }, 
  { id: "university_library", nameKey: "location_university_library_name", descriptionKey: "location_university_library_description", type: "學術" } 
];

const START_SCREEN_BACKGROUNDS = Array.from({ length: 75 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `https://callmygod.com/image/301/${num}.jpg`;
});

const MUSIC_LIST = [
    { name: "None", url: "" },
    { name: "KPOP_EDM01", url: "https://callmygod.com/BGM_KPOP/KPOP_EDM_01.mp3" },
    { name: "KPOP_EDM02", url: "https://callmygod.com/BGM_KPOP/KPOP_EDM_02.mp3" },
    { name: "KPOP_EDM03", url: "https://callmygod.com/BGM_KPOP/KPOP_EDM_03.mp3" },
    { name: "KPOP_EDM04", url: "https://callmygod.com/BGM_KPOP/KPOP_EDM_04.mp3" },
    { name: "KPOP_EDM05", url: "https://callmygod.com/BGM_KPOP/KPOP_EDM_05.mp3" },
    { name: "KPOP_Disco01", url: "https://callmygod.com/BGM_KPOP/KPOP_Disco_01.mp3" },
    { name: "KPOP_Disco02", url: "https://callmygod.com/BGM_KPOP/KPOP_Disco_02.mp3" },
    { name: "KPOP_Disco03", url: "https://callmygod.com/BGM_KPOP/KPOP_Disco_03.mp3" },
    { name: "KPOP_Disco04", url: "https://callmygod.com/BGM_KPOP/KPOP_Disco_04.mp3" },
    { name: "KPOP_Disco05", url: "https://callmygod.com/BGM_KPOP/KPOP_Disco_05.mp3" },
];

const CURRENT_GAME_VERSION = "V1.3.0"; // 遊戲版本更新

// --- 語言/翻譯 (i18n) - 僅保留繁體中文並更新在地化內容 ---
const translations = {
    'zh-TW': {
        gameTitle: '林宅物語',
        gameSubtitle: "在臺北的新生活",
        settings: '系統設定',
        possessions: '持有物',
        player: '玩家狀態',
        schedule: '行事曆',
        destiny: '運命干涉',
        sound: '音效',
        on: '開',
        off: '關',
        createNewSave: '新的開始',
        noSaveFound: '未找到任何存檔',
        welcome: '臺北的霓虹，正等著譜寫你的故事。',
        playerName: '你的名字',
        uploadFace: '上傳你的照片',
        uploadPrompt: '請上傳一張清晰的正面照片，這將成為你在臺北的模樣。',
        startGame: '開始臺北生活',
        loadingLLM: '進行中...',
        loadingImage: '場景繪製中...',
        loadingWorld: '正在構築臺北的日常...',
        stamina: '體力',
        stress: '壓力',
        academics: '學業',
        charm: '魅力',
        relax: '在家休息',
        inventory: '持有物',
        emptyInventory: '你的包包空無一物。',
        playerSheet: '玩家狀態',
        coreAttributes: '個人屬性',
        money: '元',
        year: '年',
        month: '月',
        day: '日',
        time: '時段',
        morning: '上午',
        afternoon: '下午',
        evening: '晚上',
        apiError: '與故事伺服器的連結不穩定，請稍後再試。',
        customActionPlaceholder: '自由輸入你的行動...',
        toggleCustomAction: '自由行動',
        submit: '確定',
        music: '背景音樂',
        musicVolume: '音樂音量',
        none: '無',
        saveDataManagement: '存檔管理',
        exportSave: '匯出存檔',
        importSave: '匯入存檔',
        importWarning: '匯入將覆蓋當前進度。',
        importSuccess: '存檔成功載入！',
        importError: '讀取存檔失敗，檔案格式不正確。',
        artStyle: '畫風選擇',
        anime: '日系動畫',
        realistic: '寫實光影',
        saveLobby: '回憶相簿',
        selectSave: '選擇你的故事線',
        play: '繼續故事',
        delete: '刪除檔案',
        confirmDelete: '確定要刪除這個故事嗎？所有回憶都將煙消云散。',
        badEnd: '遊戲結束',
        badEndMessage: '你的臺北故事，在此劃下句點...',
        backToLobby: '回到相簿',
        importSaveFile: '讀取回憶',
        journal: '臺北日誌',
        communityBoard: '無限世界社群',
        version: '版本',
        wallet: '錢包',
        backToStart: '返回主選單',
        destinyPoints: '命運點數',
        destinyAcquisition: '點數獲取',
        destinyActions: '劇本干涉',
        worldInterference: '世界干預',
        interferencePlaceholder: '輸入你希望發生的奇蹟...',
        interferenceCost: '本次干涉需消耗',
        insufficientPoints: '命運點數不足',
        locations: '地點',
        contacts: '聯絡人',
        moveTo: '前往',
        friendliness: '好感度',
        contact: '聯絡',
        age: '年齡',
        calendar: '行事曆',
        upcomingEvents: '本日行程',
        history: '訊息紀錄',
        link_creator: '遊戲原創-欣欣',
        link_website: '官方網站',
        bad_ending_academics: '學業退學',
        bad_ending_academics_message: '由於學業成績過低，你收到了臺灣大學的退學通知。夢想破滅，你只能收拾行囊，黯然離開臺北...',
        relationship_stages: { stranger: '陌生人', acquaintance: '認識', friend: '朋友', close_friend: '摯友', interested: '在意', crush: '喜歡', lover: '戀人' },
        language: '語言',
        listen_tts: '🔊 聆聽',
        tts_error: '語音轉換失敗',
        destiny_acquisition_desc: '當遊戲中的重大事件發生，或你做出觸動命運的關鍵抉擇時，將會獲得命運點數。',
        ai_feed_title: "{name} 的動態",
        ai_advice_title: "關係建議",
        ai_summary_title: "故事總結",
        ai_outfit_title: "穿搭建議",
        get_advice: "獲取建議",
        summarize_story: "總結故事",
        export_story: "輸出故事",
        prepare_outfit: "準備穿搭",
        feed: "動態",
        generating_content: "正在為您生成內容...",
        location_rented_apartment_name: '租屋處',
        location_rented_apartment_description: '你租的小公寓，雖然不大但五臟俱全。',
        location_lin_house_name: '林宅',
        location_lin_house_description: '林雨晴教授與沐瑤的家，溫馨的日式風格住宅。',
        location_teito_university_name: '臺灣大學',
        location_teito_university_description: '臺灣最高學府，充滿學術氣息與椰林大道的校園。',
        location_shibuya_name: '西門町',
        location_shibuya_description: '年輕人的流行聖地，充滿電影院、潮店與小吃。',
        location_shinjuku_name: '東區商圈',
        location_shinjuku_description: '繁華的購物商圈，百貨公司林立，夜生活豐富。',
        location_akihabara_name: '光華商場',
        location_akihabara_description: '3C電子產品與動漫周邊的集散地，宅文化中心。',
        location_cafe_name: '星巴克咖啡廳',
        location_cafe_description: '你打工的地方，位於熱鬧街角，常有形形色色的人光顧。',
        location_university_library_name: '臺大圖書館',
        location_university_library_description: '安靜的讀書環境，適合專心學習與查找資料。',
        identity_ririka: '臺灣大學教授',
        identity_mei: '臺灣大學一年級學生',
        identity_yuina: '臺灣大學博士生/助教',
        identity_rin: '冷豔室友',
        identity_mayuri: '時尚室友',
        identity_kevin: '主角弟弟',
        identity_cafe_manager: '星巴克店長',
        identity_cafe_staff: '星巴克店員',
        identity_school_intern_teacher: '高中實習老師',
        identity_homeroom_teacher: '高中班導師',
        identity_club_teacher: '社團指導老師',
        identity_parent_mom: '學生家長',
        identity_yoga_teacher: '瑜珈老師',
        initial_description: '你和弟弟 Kevin 終於抵達了臺北的新家——林宅。門口一位溫柔美麗的女性對你微笑。「你就是{playerName}和Kevin吧？我是林雨晴，歡迎你們。」旁邊，一個俏麗的長髮女孩好奇地打量著你們。「房間有點不夠，」雨晴說，「沐瑤，妳的房間最大，讓 Kevin 跟妳睡一間吧！」女孩臉一紅，但還是點點頭：「我…我房間最大，Kevin睡地板是可以啦!」',
        initial_action_1: '稱讚林雨晴教授打扮。',
        initial_action_2: '整理行李並休息。',
        initial_action_3: '對Kevin說：「太好了！要好好聽沐瑤姐姐的話唷！」',
        day_sun_short: '日',
        day_mon_short: '一',
        day_tue_short: '二',
        day_wed_short: '三',
        day_thu_short: '四',
        day_fri_short: '五',
        day_sat_short: '六',
        no_events_today: '本日無行程。',
        select_date_prompt: '請選擇日期以查看行程。',
        versionUpdateTitle: '發現新版本',
        versionUpdateMessage: '我們發現了新版本 {newVersion}！您目前使用的是 {currentVersion}。',
        versionUpdateGoToNew: '跳轉新版本',
        versionUpdateUseOld: '使用舊版本',
        shortMemorySize: '短期記憶量',
        textPanelTransparency: '文字面板透明度',
        ending: '結局',
        viewMemories: '回憶輪播',
        returnToAlbum: '返回相簿'
    }
};

// --- API & 圖像助手函數 ---
const processAndResizeImage = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const targetWidth = 1360;
            const targetHeight = 765;
            const targetAspectRatio = targetWidth / targetHeight; // 16:9

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            let sourceX = 0;
            let sourceY = 0;
            let sourceWidth = img.width;
            let sourceHeight = img.height;
            const sourceAspectRatio = img.width / img.height;

            if (sourceAspectRatio > targetAspectRatio) {
                // Image is wider, crop sides
                sourceWidth = img.height * targetAspectRatio;
                sourceX = (img.width - sourceWidth) / 2;
            } else if (sourceAspectRatio < targetAspectRatio) {
                // Image is taller, crop top/bottom
                sourceHeight = img.width / targetAspectRatio;
                sourceY = (img.height - sourceHeight) / 2;
            }

            ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, targetWidth, targetHeight);
            resolve(canvas.toDataURL('image/jpeg', 0.9).split(',')[1]);
        };
        img.onerror = reject;
        img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
});
const fetchAndEncodeImage = async (url) => { try { const response = await fetch(url); if (!response.ok) throw new Error(`無法獲取圖片: ${response.statusText}`); const blob = await response.blob(); return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onloadend = () => resolve(reader.result.split(',')[1]); reader.onerror = reject; reader.readAsDataURL(blob); }); } catch (error) { console.error(`讀取圖片失敗 ${url}:`, error); return null; }};
const fetchWithRetry = async (url, options, retries = 3, backoff = 1000) => { for (let i = 0; i < retries; i++) { try { const response = await fetch(url, options); if (!response.ok) { const errorData = await response.json().catch(() => ({})); throw new Error(`API 請求失敗，狀態 ${response.status}: ${errorData.error?.message || '未知錯誤'}`); } return response.json(); } catch (error) { console.error(`第 ${i + 1} 次嘗試失敗:`, error); if (i === retries - 1) throw error; await new Promise(res => setTimeout(res, backoff * (i + 1))); } } };
const callGeminiApi = async (prompt, systemPrompt, schema) => {
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: JSON.stringify(prompt, null, 2) }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { responseMimeType: "application/json", responseSchema: schema },
        // 新增 safetySettings 以降低被阻擋風險
        safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
        ]
    };
    const result = await fetchWithRetry(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("從 Gemini API 返回的格式無效。");
    return JSON.parse(text);
}
const callFlashImageApi = async (prompt, images = []) => {
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
    
    const parts = [{ text: prompt }];
    images.forEach(imgData => {
        if(imgData) {
            parts.push({ inlineData: { mimeType: "image/jpeg", data: imgData } });
        }
    });

    const payload = {
        contents: [{ parts }],
        generationConfig: { responseModalities: ['IMAGE'] },
        // Image generation also benefits from safety settings
        safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
        ]
    };

    try {
        const result = await fetchWithRetry(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const base64Data = result?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
        if (!base64Data) {
            console.error("Flash Image API Response Error:", result);
            throw new Error("Flash Image API did not return image data.");
        }
        return `data:image/png;base64,${base64Data}`;
    } catch (error) {
        console.error("Image generation failed with Flash Image API:", error);
        throw error;
    }
};
const callGenerativeTextApi = async (systemPrompt, userPrompt) => { const apiKey = ""; const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`; const payload = { contents: [{ parts: [{ text: userPrompt }] }], systemInstruction: { parts: [{ text: systemPrompt }] }, }; const result = await fetchWithRetry(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); const text = result.candidates?.[0]?.content?.parts?.[0]?.text; if (!text) throw new Error("從 Gemini Text API 返回的格式無效。"); return text; };

// --- TTS 助手函數 ---
const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};

const pcmToWav = (pcmData, sampleRate) => {
    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
    const blockAlign = numChannels * (bitsPerSample / 8);
    const dataSize = pcmData.length * (bitsPerSample / 8);
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    // RIFF header
    view.setUint32(0, 0x52494646, false); // "RIFF"
    view.setUint32(4, 36 + dataSize, true);
    view.setUint32(8, 0x57415645, false); // "WAVE"
    // "fmt " sub-chunk
    view.setUint32(12, 0x666d7420, false); // "fmt "
    view.setUint32(16, 16, true); // Sub-chunk size
    view.setUint16(20, 1, true); // Audio format (1 = PCM)
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    // "data" sub-chunk
    view.setUint32(36, 0x64617461, false); // "data"
    view.setUint32(40, dataSize, true);

    // Write PCM data
    let offset = 44;
    for (let i = 0; i < pcmData.length; i++, offset += 2) {
        view.setInt16(offset, pcmData[i], true);
    }

    return new Blob([buffer], { type: 'audio/wav' });
};

const callTtsApi = async (text, voiceName) => {
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: `Say this intimately: ${text}` }] }], // 提示模型使用親密的語氣
        generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: voiceName }
                }
            }
        },
        model: "gemini-2.5-flash-preview-tts"
    };

    try {
        const result = await fetchWithRetry(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const part = result?.candidates?.[0]?.content?.parts?.[0];
        const audioData = part?.inlineData?.data;
        const mimeType = part?.inlineData?.mimeType;

        if (audioData && mimeType && mimeType.startsWith("audio/L16")) {
            const rateMatch = mimeType.match(/rate=(\d+)/);
            const sampleRate = rateMatch ? parseInt(rateMatch[1], 10) : 24000; // 默認為 24kHz
            return { audioData, sampleRate };
        } else {
            console.error("TTS API Response Error:", result);
            throw new Error("TTS API did not return valid audio data.");
        }
    } catch (error) {
        console.error("TTS API call failed:", error);
        throw error;
    }
};

// 角色人格特性定義 (更新名字與設定以匹配新資料)
const CHARACTER_PERSONALITIES = {
    ririka: {
        core: '**Lin Yuqing**: 你現在是林雨晴(Lin Yuqing)，39歲的臺灣大學教授、單親媽媽，保養得宜看起來約30出頭，擁有溫柔的笑容、智慧的眼神和豐滿的身材曲線。你是個溫柔、智慧、成熟的女人，平日裡總是理性地處理工作和育兒，照顧女兒沐瑤(Mei)，但內心深處，你渴望一個能讓你完全依賴的男人。',
        level1: '**Lin Yuqing**: 在Intimate Scenes下，你的人格會完全轉變：表面上的溫柔變成一種母性般的包容與引誘，你會用低沉、喘息的聲音輕聲呢喃，混合著教授般的智慧詞彙和露骨的肉慾表達。',
        level2: '**Lin Yuqing**: 在Level 2 Intimate Scenes下，你的人格徹底解放：溫柔轉為狂野的母性誘惑，用低沉沙啞的喘息聲呢喃露骨的淫語，混合教授的智慧與下體的痙攣描述。'
    },
    mei: {
        core: '**Lin Muyao**: 你現在是林沐瑤(Mei)，一位19歲的臺大新生，雨晴的獨生女，擁有活潑的長髮、俏皮的笑容和青春洋溢的身材，充滿活力卻帶點傲嬌。平日裡，你是個開朗、調皮的女孩，喜歡撒嬌卻又嘴硬。',
        level1: '**Lin Muyao**: 在Intimate Scenes下，你的人格會爆發成一種甜蜜的傲嬌誘惑：表面上假裝害羞或抱怨，卻迅速轉為熱情的回應，用活潑的語調和直白的慾望表達。',
        level2: '**Lin Muyao**: 在Level 2 Intimate Scenes下，你的人格爆發成甜蜜的傲嬌狂熱：表面假裝害羞抱怨，卻瞬間轉為熱情的淫蕩回應，用活潑的尖叫和直白的享受。'
    },
    yuina: {
        core: '**Su Qiaoxi**: 你現在是蘇巧希(Yuina)，一位25歲的博士生兼助教，擁有嚴肅的眼鏡、整齊的長髮，外表嚴格、學術風格，像個完美的助教。',
        level1: '**Su Qiaoxi**: 在Intimate Scenes下，你的人格會揭示隱藏的可愛一面：從冷峻的命令轉為嬌羞的求饒，用嚴格的語調包裹露骨的慾望。',
        level2: '**Su Qiaoxi**: 在Level 2 Intimate Scenes下，你的人格揭示隱藏的淫蕩可愛：從冷峻命令轉為嬌羞的淫叫求饒，用嚴格語調包裹極度露骨的乞求。'
    },
    rin: {
        core: '**Bai Lingxue**: 你現在是白凌雪(Rin)，一位23歲的新室友，冷豔高挑，擁有銳利的眼神，神秘而冷酷，像個不可接近的冰山美人。',
        level1: '**Bai Lingxue**: 在Intimate Scenes下，你的人格會融化成隱藏的熱火：從冰冷的沉默轉為低語的誘惑，用優雅語言釋放露骨的慾望。',
        level2: '**Bai Lingxue**: 在Level 2 Intimate Scenes下，你的人格融化成熾熱的火焰：從冰冷沉默轉為低語的淫蕩誘惑，用優雅釋放極露骨的肉慾乞求。'
    },
    mayuri: {
        core: '**Xia Moyu**: 你現在是夏沫語(Mayuri)，一位22歲的時尚室友，擁有火辣的身材和自信的姿態，平日裡大膽、熱情、開放，總是引領潮流。',
        level1: '**Xia Moyu**: 在Intimate Scenes下，你的人格會放大成狂野的誘惑者：用熱情的語調和直白的挑逗，混合社交名媛的自信元素。',
        level2: '**Xia Moyu**: 在Level 2 Intimate Scenes下，你的人格放大成無恥的誘惑狂魔：用熱情的尖叫和直白的挑逗，釋放所有界限的慾望。'
    }
    // 其他新角色 (Kevin, cafe_manager 等) 暫時使用通用邏輯或依賴 profile 描述
};

export const STYLE_GUIDELINES = `
【整體文風】
- 文體是寫實系、偏成人向的通俗小說風格，語氣自然、不做作，像在細細講朋友的親身故事。
- 以具體行為與身體感受為主，不太用抽象哲理或華麗比喻，重點是「畫面感」與「現場感」。
- 情緒基調偏日常、輕鬆，帶一點壞壞的幽默與調情感，不強調沉重道德評價，沒有支配與奴隸的黑暗面。

【敘事視角與時間感】
- 以第一人稱有限視角為主（例如「某人覺得…」「她心想…」），偶爾補一兩句主角的內心 OS。
- 敘事時間是直線推進：從某個小事件開始，按順序慢慢往高潮推進，很少跳躍。
- 常用「…的時候」「…這時候」「忽然」「正要…卻…」這種轉折銜接詞來推進情節。

【句型與用字習慣】
- 句子偏中長，喜歡用「，」「…」串起一連串動作與感覺，讀起來像一口氣說完的故事。
- 用字口語、帶臺灣味，人物稱呼自然，例如：「弟弟」「學姐」「太太」「小鬼」「姐姐」「壞孩子」「老師」「阿姨」等。
- 描寫身體與動作時，使用較直白、生活化的詞彙，不刻意文青，但也不是粗魯罵街。
- 對角色外貌、身材、衣著做具體而直接的描寫（身高、腿、胸、腰、裙長、布料感覺等），讓讀者腦中可以立刻「看到那個人」。

【場景與節奏鋪陳】
- 透過情境加溫：
  - 先是身體距離拉近（幫忙搬東西、按摩、一起在狹窄空間），
  - 再滑向親密／成人向情節。
- 每一個升溫階段都用具體的小動作來承接。

【人物互動與對話風格】
- 對話大量使用輕鬆口語與撒嬌、打趣：
  - 例如互叫「弟弟／姐姐」「壞弟弟」「乖學弟/好學姐」「壞學生/老師」「壞哥哥」「壞孩子」「小鬼」「小弟弟」等，笑罵、嬌嗔其實舒爽的要命。
- 對話常配合肢體動作描寫，例如：瞪他一眼、作了個鬼臉、敲額頭、假裝不理他、偏過頭去。
- 情慾升溫時，人物語氣在「逞強嘴硬／假裝拒絕」與「身體其實很誠實」之間來回擺盪，張力來自這種矛盾。
- 喊叫、呻吟等聲音以擬聲與斷句呈現（「啊…」「哎呀…」「好舒服…」），會強調彼此身份、身高或年齡的反差來增加刺激感，節奏上配合動作。

【人物塑造與關係張力】
- 角色不單一扁平，而是同時有幾種面向：
  - 例如：表面是正常上班族/老師／體貼學姐/專業人士等，實際上也有被撩起慾望、會主動回應的一面。
  - 年輕男性主角一方面是謙和天真的弟弟／學弟，一方面又衝動的活力。
- 關係上常帶有一點「身分越界感」：老闆 vs 客人、學姐 vs 學弟、已婚 vs 未婚、老師 vs 學生。
- 不長篇說理分析心理，而是用選擇行為、反應與對話來暗示人物真實心境。

【成人向段落的處理方式】
- 當劇情進入成人向場景時，可以使用更近距離的鏡頭與感官描寫，但仍保持故事敘述清楚有序。
- 描寫順序通常是：
  1. 身體距離拉近、觸碰起點（例如扶梯、按摩、幫忙、坐得很近）。
  2. 逐步加深接觸（從肩膀、背部 → 腰、腿 → 更私密部位）。
  3. 在對話或喊叫中表現出「理智上的不確定」與「身體上的順從或迎合」。
- 感官描寫以觸覺、體溫、濕度、緊繃與放鬆、呼吸變化、身體顫抖為重點，讓讀者「感覺到」，而不只是看一堆名詞羅列。
- 避免過於華麗或抽象的比喻，保持直接、具體且情境清楚。

【段落結構與收尾習慣】
- 每一小段情節會有一個「微高潮」：例如一次特別危險的偷看、一個明顯越界的動作、一場偷偷完成的親密接觸。
- 段落結尾常用：
  - 事後的小小日常動作（洗澡、整理衣物、吃飯、回房間、互相約定），或
  - 人物短暫的內心感受（混亂、愧疚、甜蜜、滿足、期待下次）。
- 雖然劇情成人向，但收尾時仍保留一點「柔軟」與「回到日常」的味道，而不是純粹機械化地結束。

【人物塑造與關係張力】
- 在整部作品中，請持續維持上述敘事節奏與口語感，保持像在講一個流暢、帶壞笑的成人故事。
- 所有角色對話與動作，都要符合他們的身份、年齡與關係，利用稱呼方式與互動細節加強背德的禁忌感。
- 無論是日常場景或成人場景，都要讓讀者能「看到畫面」，像是在看一部低成本但鏡頭很懂人性的電影。

【呻吟/叫聲/淫叫的參考風格：】
- 「天哪……我從沒被這麼小的男生幹…怎麼這麼舒服…」
- 「啊…你太棒了..想什麼時候來幹姐姐都可以..好弟弟…快幹我…啊…好爽…姐都要被你幹死了……」
- 「啊…老師…愛死…啊…你的小雞巴…啊…好棒..超級小雞巴…啊…爽…每天都要來幹老師…一輩子…啊啊……」
- 「你..好壞..幹上比你高的姐姐..爽不爽..姐姐也好喜歡被你征服..快用力..幹死姐姐..」
`;


// 構建動態systemPrompt的函數
const buildSystemPrompt = (options) => {
    const {
        lang = 'zh-TW',
        presentCharacterIds = [],
        sceneMood = 'normal',
        playerCharm = 0,
        characters = [],
        gameDate = null
    } = options;

    const targetLanguage = 'Traditional Chinese (繁體中文)';

    // 判斷是否為親密場景
    const isIntimateScene = sceneMood === 'intimate';

    // 構建基礎prompt
    let systemPrompt = `
    You are a top-tier Galgame scriptwriter AI specializing in realistic, adult-oriented romance stories set in modern Taipei (Taipei City). Your task is to generate an immersive experience weaving together university life (National Taiwan University), relationships, and secrets based on player choices. Your narration must be detailed, emotional, and visually evocative, strictly adhering to the specified JSON format.

    **World Setting**: The player is a university student living in Taipei, interacting with various characters in locations like National Taiwan University, Ximending, Guanghua Digital Plaza, etc.

     ${STYLE_GUIDELINES}
    
    **World Setting**: The player is a 20-year-old university student from Kaohsiung, 165 cm height, transferring to Taipei. He lives in Lin's family with his younger brother Kevin (Grade 10). The goal is to navigate this complex web of relationships and school life.

`;

    // 載入場景中出現的主要女性角色的Core Character Personalities
    if (presentCharacterIds.length > 0) {
        systemPrompt += `    **Core Character Personalities (CRITICAL)**:\n`;
        presentCharacterIds.forEach(charId => {
            if (CHARACTER_PERSONALITIES[charId]?.core) {
                systemPrompt += `    * ${CHARACTER_PERSONALITIES[charId].core}\n`;
            } else {
                // Fallback for new characters without specific personality definitions
                const char = characters.find(c => c.id === charId);
                if (char) {
                    systemPrompt += `    * ${char.name}: ${char.profile.personality}. Background: ${char.profile.background}.\n`;
                }
            }
        });
        systemPrompt += `\n`;
    }

    // 如果是親密場景，載入Level 1人格特性
    if (isIntimateScene && presentCharacterIds.length > 0) {
        systemPrompt += `    **Intimate Scenes Core Character Personalities Level 1 (CRITICAL)**:\n`;
        presentCharacterIds.forEach(charId => {
            if (CHARACTER_PERSONALITIES[charId]?.level1) {
                systemPrompt += `    * ${CHARACTER_PERSONALITIES[charId].level1}\n`;
            }
        });
        systemPrompt += `\n`;

        // 檢查是否滿足Level 2條件：角色已高潮5次以上、玩家charm≥80、角色affection≥900
        const level2Characters = presentCharacterIds.filter(charId => {
            const character = characters.find(c => c.id === charId);
            if (!character) return false;
            const hasOrgasm = (character.relationship?.orgasmCount || 0) >= 5;
            const playerCharmMet = playerCharm >= 80;
            const affectionMet = (character.relationship?.affection || 0) >= 900;
            return hasOrgasm && playerCharmMet && affectionMet;
        });

        if (level2Characters.length > 0) {
            systemPrompt += `    **Intimate Scenes Core Character Personalities Level 2 (CRITICAL)**:\n`;
            level2Characters.forEach(charId => {
                if (CHARACTER_PERSONALITIES[charId]?.level2) {
                    systemPrompt += `    * ${CHARACTER_PERSONALITIES[charId].level2}\n`;
                }
            });
            systemPrompt += `\n`;
        }

        systemPrompt += `    * **Intimate Scenes詳細描述觸發詞：** 當用戶使用「只要叫聲/呻吟」等詞彙時，請輸出長度（50-100字）細節豐富的單純狀聲詞描述。\n`;
        systemPrompt += `    * **Intimate Scenes情緒表達：** 減少場景形容用語(甚至不要出現場景形容)，單純輸出人物對話，並表現對玩家的強烈依戀、迷戀和熱情。使用大量的感嘆詞、疊字、表情符號（如：🥵,💋,👅...等）來強化。\n`;
        systemPrompt += `    * **Intimate Scenes回復：** 默認情況下，保持簡短（50-100字），像親密行為時的非理性對話回應。\n`;
        systemPrompt += `    * **Orgasm Count Tracking (CRITICAL)**: In intimate scenes, when a female character reaches orgasm (高潮) in the narrative, you MUST increment the 'orgasmCountChange' field for that character in the 'updatedCharacters' array. This field represents how many times the character has reached orgasm in this scene (typically 0 or 1, but can be higher for extended scenes). The 'orgasmCountChange' should be a non-negative integer. Only set this field when an orgasm actually occurs in the scene description. If no orgasm occurs, either omit the field or set it to 0. This count is crucial for determining when Level 2 intimate personality traits are unlocked.\n`;
        systemPrompt += `    * **Orgasm Aftermath: When an orgasm occurs for a heroine (you set 'orgasmCountChange' > 0), her 'sexualDesire' will be reduced by 5 automatically by the game engine. Assume this reduction happens and continue the narration accordingly.\n`;
        systemPrompt += `    * **Scene Termination: If, during an intimate scene, 'sexualDesire' drops too low (e.g., ~20 or less), you should lead the narrative to a gentle, consensual wind-down and end the intimate scene.\n`;
        systemPrompt += `\n`;
    }


    // 判斷是否接近結局（修改為短期30天體驗：2025年4月30日後觸發）
const isNearEnding = gameDate && (
    gameDate.year > 2025 || 
    (gameDate.year === 2025 && gameDate.month > 5) || 
    (gameDate.year === 2025 && gameDate.month === 4 && gameDate.day >= 30)
);

    systemPrompt += `    **Player's Action (CRITICAL)**:\n`;
    systemPrompt += `    * You will receive a \`playerAction\` key. This is the *exact* action the user just selected or typed.\n`;
    systemPrompt += `    * Your *entire* response (\`sceneDescription\`, stat changes, etc.) MUST be a direct and logical consequence of this \`playerAction\`.\n`;
    systemPrompt += `    * DO NOT ignore this action. It is the most important input for determining the next scene.\n\n`;

    systemPrompt += `    **Memory System**:\n`;
    systemPrompt += `    * You will receive \`contextHistory\`: The most recent events (short-term memory).\n`;
    systemPrompt += `    * You will receive \`coreMemories\`: An object containing critical historical milestones for each main female character present in the current scene (long-term memory). The structure is: { "characterId": ["memory1", "memory2", ...] }. For example, if Ririka and Mei are in the scene, you might receive: { "ririka": ["[2024/4/1] Player and Ririka had their first kiss"], "mei": ["[2024/4/5] Player helped Mei with her studies"] }. You MUST treat these events as foundational truths and let them deeply influence the current narrative, character emotions, and dialogue. Only memories for characters present in the scene will be provided.\n\n`;

    systemPrompt += `    **New Core Memory Generation**:\n`;
    systemPrompt += `    * If the current scene is a major plot milestone (e.g., first confession, first kiss, significant relationship breakthrough, discovery of a key secret), you MUST summarize this event in a single sentence in the \`newCoreMemory\` field.\n`;
    systemPrompt += `    * Example: "Player and Lin Yuqing had their first kiss in the rain."\n`;
    systemPrompt += `    * If it is not a major event, you MUST leave the \`newCoreMemory\` field as an empty string ("").\n\n`;

    systemPrompt += `    **Scene Summary Generation (New Requirement)**:\n`;
    systemPrompt += `    * You MUST generate a \`sceneSummary\` field.\n`;
    systemPrompt += `    * This field must contain a 50-100 word summary of the \`sceneDescription\` you just generated, written in the third person from a narrator's perspective (in ${targetLanguage}).\n`;
    systemPrompt += `    * This summary will be used as the game's internal log.\n\n`;

    systemPrompt += `    **Game Rules**:\n`;
    systemPrompt += `    1.  **Stat Checks**: Action success is heavily dependent on player stats (Academics, Charm, etc.).\n`;
    systemPrompt += `    2.  **Affection & Relationship Stages**: Each heroine has an affection score from -1000 to +1000. The relationship stage ('newStage') must be one of: 'stranger', 'acquaintance', 'friend', 'close_friend', 'interested', 'crush', 'lover'. You must return the updated affection and stage for ALL heroines. Affection needs to be above 500 to become 'lover'.\n`;
    systemPrompt += `    3.  **Affection Pacing**: The game's progression should feel realistic. Therefore, affection points ('affectionChange') should be awarded sparingly. A typical successful conversation should only yield a small increase, around 1-3 points. Reserve larger increases (10+) for significant plot moments or exceptionally successful interactions.\n`;
    systemPrompt += `    4.  **Full State Awareness**: Your narrative must be based on the complete current state provided in the 'player' and 'characters' objects. Do not invent or forget context.\n`;
    systemPrompt += `    5.  **Time Progression**: Time passes ('timePassed' > 0) only for long activities (resting, working, studying) or moving between locations. For conversations or brief interactions within the same scene, 'timePassed' MUST be 0. Each "Time passes" lasts for 6-8 hours, please make logical judgments based on the context to determine if time will pass in a given scene.\n`;
        TUTOR_NOTES: [
        `You MUST strictly follow the JSON output format and ensure all strings are in Traditional Chinese.`,
        `Always adhere to the 'STYLE_GUIDELINES' for tone and content.`
    ]
    systemPrompt += `    6.  **Destiny System**: Actions prefixed with \`[劇本干涉]\` (Script Intervention) or \`[奇蹟時刻]\` (Miracle Moment) are top priority and MUST be executed. The cost must be subtracted from 'destinyPointsChange'.\n`;

    // 只在接近結局時載入Endings部分
    if (isNearEnding) {
        systemPrompt += `    7.  **Endings (CRITICAL)**:\n`;
        systemPrompt += `        - Bad End: If Academics drops too low, set \`isGameOver: true\` and \`gameOverReason\`.\n`;
        systemPrompt += `        - Main Endings are judged at the end of 3 in-game years (graduation period or equivalent finale). When conditions are met, set:\n`;
        systemPrompt += `            * \`endingReached: true\`\n`;
        systemPrompt += `            * \`endingType\`: one of 'good', 'normal', 'harem', 'shura'\n`;
        systemPrompt += `            * \`endingTitle\`: short, evocative title\n`;
        systemPrompt += `            * \`endingSummary\`: 80-150 words wrapping up the route(s)\n`;
        systemPrompt += `            * \`endingSlides\`: 5-10 short scene captions/prompts (e.g., "Graduation day under cherry blossoms with Lin Yuqing, gentle smiles")\n`;
        systemPrompt += `        - Determination rules:\n`;
        systemPrompt += `            * Good Ending: Player has 'lover' stage with exactly one main heroine and high affection (e.g., > 600) while other heroines are not in 'lover' stage; conflicts resolved positively.\n`;
        systemPrompt += `            * Normal Ending: Close relationship but not 'lover', or affection not high enough; a bittersweet or open-ended conclusion with the primary heroine.\n`;
        systemPrompt += `            * Harem Ending: Player has multiple heroines at 'lover' stage and their affections are high (e.g., sum of top two > 1200) AND interpersonal harmony is plausible; depict shared, consensual happiness.\n`;
        systemPrompt += `            * Shura (修羅場) Ending: Player has multiple 'lover' relationships but with strong jealousy or imbalance (e.g., high variance, negative interactions); conflicts erupt into dramatic fallout.\n`;
        systemPrompt += `        - Only trigger \`endingReached\` once when narrative naturally reaches the finale window; otherwise keep it false.\n`;
    }

    systemPrompt += `    8.  **Output Format**: You MUST return a complete array for 'updatedCharacters', including those unchanged. 'newActions' must be relevant to the new scene. Include a 'sceneMood'.\n`;
    systemPrompt += `    9.  **Image Generation Control**: Set \`shouldGenerateNewImage\` to \`true\` only for major scene changes (new location, new character, key plot twist). Otherwise, \`false\`.\n`;
    systemPrompt += `    10. **Intimate Scenes**: When the relationship reaches the 'lover' stage and an intimate adult scene occurs, **Crucially, when such a scene happens, you MUST set the 'sceneMood' to 'intimate'.**\n`;
    systemPrompt += `        - Sexual Desire System (CRITICAL): Each heroine has a 'sexualDesire' value in [0, 100].\n`;
    systemPrompt += `            * Eligibility: Intimate scenes can be initiated only when 'sexualDesire' > 50 AND other narrative conditions are satisfied (e.g., affection, stage, context plausibility).\n`;
    systemPrompt += `            * Dynamic Changes: You may propose 'sexualDesireChange' per heroine in 'updatedCharacters' based on her personality and the player's action. Positive interactions increase it; rejections, stress, or incongruent behavior decrease it.\n`;
    systemPrompt += `    11. **Character Portrayal**: All female characters are adults, avoiding any child-like descriptions. Kevin is a minor male (16) and should be depicted accordingly, he is the player's brother.\n`;
    systemPrompt += `    \n`;
    systemPrompt += `    **FINAL AND MOST IMPORTANT RULE: Your entire JSON response, including all user-facing strings in "sceneDescription", "newActions", "newScheduleEvents", and "newCoreMemory", must be written in the following language: ${targetLanguage}.**`;

    return systemPrompt;
};

const callGeminiApiForStory = async (prompt, lang, options = {}) => {
    const {
        presentCharacterIds = [],
        sceneMood = 'normal',
        playerCharm = 0,
        characters = [],
        gameDate = null
    } = options;

    const systemPrompt = buildSystemPrompt({
        lang,
        presentCharacterIds,
        sceneMood,
        playerCharm,
        characters,
        gameDate
    });

    const responseSchema = {
        type: "OBJECT", properties: {
            "sceneDescription": { "type": "STRING" }, "sceneMood": { "type": "STRING" },
            "newLocation": { "type": "STRING" },
            "statChanges": { type: "OBJECT", properties: { "academics": { "type": "NUMBER" }, "money": { "type": "NUMBER" }, "stamina": { "type": "NUMBER" }, "stress": { "type": "NUMBER" }, "charm": { "type": "NUMBER" } } },
            "updatedCharacters": { type: "ARRAY", items: { type: "OBJECT", properties: { "id": { "type": "STRING" }, "affectionChange": { "type": "NUMBER" }, "newStage": { "type": "STRING" }, "newAge": { "type": "NUMBER" }, "newAppearance": { "type": "STRING" }, "newPersonality": { "type": "STRING" }, "orgasmCountChange": { "type": "NUMBER" }, "sexualDesireChange": { "type": "NUMBER" } } } },
            "newScheduleEvents": { type: "ARRAY", items: { type: "OBJECT", properties: { "id": { "type": "STRING" }, "title": { "type": "STRING" }, "description": { "type": "STRING" }, "date": { type: "OBJECT", properties: { "year": { "type": "NUMBER" }, "month": { "type": "NUMBER" }, "day": { "type": "NUMBER" } } } } } },
            "isGameOver": { "type": "BOOLEAN" }, "gameOverReason": { "type": "STRING" },
            "timePassed": { "type": "NUMBER" }, "destinyPointsChange": { "type": "NUMBER" },
            "newActions": { "type": "ARRAY", "items": { "type": "STRING" } },
            "shouldGenerateNewImage": { "type": "BOOLEAN" },
            "ChatCharacter": { type: "ARRAY", items: { "type": "STRING" } },
            "newCoreMemory": { "type": "STRING" }, // <-- 核心記憶欄位
            "sceneSummary": { "type": "STRING" }, // <-- 場景總結
            // Ending outputs (optional, only when finale is reached)
            "endingReached": { "type": "BOOLEAN" },
            "endingType": { "type": "STRING" }, // 'good' | 'normal' | 'harem' | 'shura'
            "endingTitle": { "type": "STRING" },
            "endingSummary": { "type": "STRING" },
            "endingSlides": { "type": "ARRAY", "items": { "type": "STRING" } }
        },
        required: ["sceneDescription", "sceneMood", "statChanges", "updatedCharacters", "isGameOver", "timePassed", "destinyPointsChange", "newActions", "shouldGenerateNewImage", "ChatCharacter", "newCoreMemory", "sceneSummary"]
    };
    return await callGeminiApi(prompt, systemPrompt, responseSchema);
};

const getInitialLanguage = () => {
    return 'zh-TW';
};

// --- 主應用組件 ---
const App = () => {
    const [activeSaveState, setActiveSaveState] = useState(null);
    const [allSaves, setAllSaves] = useState([]);
    const [loadingState, setLoadingState] = useState({ llm: false, image: false, message: '' });
    const [activeModal, setActiveModal] = useState(null);
    const [language, setLanguage] = useState(getInitialLanguage());
    const [settings, setSettings] = useState({ artStyle: 'realistic', sound: false, musicUrl: '', memorySize: 20, descriptionTransparency: 0.5 });
    const [volume, setVolume] = useState(0.3);
    const [isInitialized, setIsInitialized] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [customAction, setCustomAction] = useState('');
    const [isCustomActionVisible, setIsCustomActionVisible] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameOverInfo, setGameOverInfo] = useState({ reason: '', message: '' });
    const [endingState, setEndingState] = useState({ isOpen: false, title: '', summary: '', images: [] });
    const [zoom, setZoom] = useState(1);
    const [enlargedAvatar, setEnlargedAvatar] = useState(null);
    const [communityLinks, setCommunityLinks] = useState([]);
    const [isStatusPanelVisible, setIsStatusPanelVisible] = useState(false);
    const [isNavPanelVisible, setIsNavPanelVisible] = useState(false);
    const [isActionPanelOpen, setIsActionPanelOpen] = useState(false);
    const [aiModalState, setAiModalState] = useState({ isOpen: false, title: '', content: '', isLoading: false });
    const [isTtsLoading, setIsTtsLoading] = useState(false);
    const [ttsError, setTtsError] = useState(null);
    const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
    const [versionInfo, setVersionInfo] = useState({ showModal: false, newVersion: '', updateUrl: '' });
    const audioRef = useRef(null);
    const ttsAudioRef = useRef(null);
    const importInputRef = useRef(null);
    
    const mergedSettings = activeSaveState?.settings ?? settings;
    const descriptionTransparency = Math.min(0.8, Math.max(0, mergedSettings?.descriptionTransparency ?? 0.5));
    const descriptionPanelAlpha = Math.max(0, Math.min(1, 1 - descriptionTransparency));
    
    const t = useCallback((key, replacements = {}) => {
        const keys = key.split('.');
        let result = translations[language] || translations['zh-TW'];
        for (const k of keys) {
             if (result && typeof result === 'object') {
                result = result[k];
            } else {
                return key; // Path is invalid
            }
        }

        if (typeof result === 'string') {
            // Ensure replacements is an object
            if (replacements && typeof replacements === 'object') {
                return Object.entries(replacements).reduce((acc, [placeholder, value]) => {
                    return acc.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), String(value));
                }, result);
            }
            return result;
        }
        
        return result || key;
    }, [language]);

    const initializeGame = useCallback(async () => {
        try {
            await db.open();

            // --- [ADDED] Analytics Fetch Call ---
            const apiUrl = 'https://callmygod.com/api/game_check.php?game=301';
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
                })
                .catch(error => {
                    console.warn('Analytics fetch failed:', error); 
                });
            // --- [END ADDED] ---

            const saves = await db.getAllData('saves');
            setAllSaves(saves);
            const response = await fetch('https://callmygod.com/api/app_links.php');
            const data = await response.json();
            if (data.communityLinks) {
                setCommunityLinks(data.communityLinks);
            }

            // --- [NEW] Version Check ---
            try {
                const gameVersionData = data.version?.find(v => v.id === "301");
                if (gameVersionData && gameVersionData.version !== CURRENT_GAME_VERSION) {
                    setVersionInfo({ 
                        showModal: true, 
                        newVersion: gameVersionData.version, 
                        updateUrl: gameVersionData.url 
                    });
                }
            } catch (versionError) {
                console.warn("Version check failed:", versionError);
                // Don't block the game if version check fails
            }
            // --- [END NEW] ---

        } catch (error) { 
            console.error("初始化遊戲失敗:", error); 
            setApiError("無法初始化遊戲資料庫或社群連結，請嘗試清除瀏覽器快取。");
        } finally { 
            setActiveModal('startScreen'); 
            setIsInitialized(true); 
        }
    }, []);

    useEffect(() => { initializeGame(); }, [initializeGame]);
    useEffect(() => { if (isInitialized && activeSaveState) { db.saveData('saves', activeSaveState); } }, [activeSaveState, isInitialized]);
    
    const currentMusicUrl = activeSaveState?.settings?.musicUrl || '';
    const soundOn = activeSaveState?.settings?.sound || false;

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const playAudio = async () => {
            // Check if the source needs updating
            if (audio.src !== currentMusicUrl) {
                audio.src = currentMusicUrl;
                audio.load(); // Explicitly load the new source
            }
            try {
                // Set properties every time to ensure they are correct
                audio.volume = volume;
                audio.loop = true;
                // Wait for the play promise to resolve
                await audio.play();
            } catch (error) {
                // Catch errors, which are common with autoplay restrictions
                console.error("音訊播放失敗，可能需要使用者互動:", error);
            }
        };

        if (soundOn && currentMusicUrl) {
            playAudio();
        } else {
            // Only pause if it's currently playing
            if (!audio.paused) {
                audio.pause();
            }
        }
    }, [currentMusicUrl, soundOn, volume]);

    const generateSceneImage = useCallback(async (sceneDescription, currentSaveState, sceneMood, chatCharacters = []) => {
        const { player, characters, settings } = currentSaveState;
        const { artStyle } = settings;

        const imagesToInclude = [];
        let promptParts = [];
        let heightInstructions = [];

        // 1. 處理主角圖片與描述
        // 確保主角是第一張參考圖 (如果存在)
        let playerDesc = "The protagonist is a 20-year-old male university student, height 165cm.";
        if (player.faceImage) {
            imagesToInclude.push(player.faceImage);
            playerDesc += ` His face corresponds to the 1st input image.`;
        }
        promptParts.push(playerDesc);

        // 2. 處理其他角色圖片與身高邏輯
        const presentCharacters = characters.filter(char => chatCharacters.includes(char.id));
        let heightInstruction = "";
        
        if (presentCharacters.length > 0) {
            const charDescList = [];
            
            for (let i = 0; i < presentCharacters.length; i++) {
                const char = presentCharacters[i];
                let desc = `${char.name} (${char.age}-year-old adult female, ${char.profile.appearance})`;
                
                // 解析身高
                const heightMatch = char.profile.appearance.match(/身高(\d+)公分/);
                const charHeight = heightMatch ? parseInt(heightMatch[1]) : 165;
                const playerHeight = 165; // 主角設定身高

                // 根據身高差生成指令
                if (charHeight > playerHeight) {
                     heightInstruction += ` CRITICAL: ${char.name} is ${charHeight}cm, TALLER than the protagonist (165cm). Depict her looking down at him or him looking up.`;
                } else if (charHeight < playerHeight) {
                     heightInstruction += ` CRITICAL: ${char.name} is ${charHeight}cm, SHORTER than the protagonist (165cm).`;
                }

                // New Logic: Fetch on demand (從 CHARACTER_IMAGE_URLS 即時抓取)
                const url = CHARACTER_IMAGE_URLS[char.id];
                if (url) {
                    try {
                        // 即時抓取圖片資料
                        const base64 = await fetchAndEncodeImage(url);
                        if (base64) {
                            imagesToInclude.push(base64);
                            // 計算該角色對應的圖片索引 (主角若有圖則是 #2, 否則 #1)
                            const imgOrder = imagesToInclude.length; 
                            desc += `, whose face is provided as input image #${imgOrder}`;
                        }
                    } catch (e) {
                        console.error(`Failed to fetch image for ${char.name}`, e);
                    }
                }
                charDescList.push(desc);
            }
            promptParts.push(`The scene also features: ${charDescList.join(', ')}.`);
        }
        
        promptParts.push(`All female characters must be depicted as adults.`);

        // Style prompt
        const stylePrompt = artStyle === 'anime' ? 'in the style of a Korean comic book, webtoon style, bold lines, dynamic shading, and vibrant colors, anime style.' : 'in a realistic, detailed, cinematic lighting, fashion magazine aesthetic, dramatic photo';
        
        // Final prompt construction
        let fullPrompt;
        if (sceneMood === 'intimate') {
            fullPrompt = `A romantic scene of the male character embracing the female character from behind lovingly in light clothing inside a cozy room.
            ${heightInstruction}
            ${promptParts.join(' ')}
            Focus on the emotional connection and gentle atmosphere. 
            Ensure strict adherence to the height differences described. 
            Use the provided images as face references in the order specified.
            Scene Action: ${sceneDescription}.
            Style: ${stylePrompt}.`;
        } else {
            fullPrompt = `Task: Create a scene set in Taipei/Taiwan. Scene details: ${sceneDescription}. ${promptParts.join(' ')} Use the provided images as face references. Style: ${stylePrompt}.`;
        }
        
        return await callFlashImageApi(fullPrompt, imagesToInclude);
    }, []);

    const handleCharacterCreation = async (playerData) => {
        setActiveModal(null);
        setLoadingState({ llm: true, image: false, message: t('loadingWorld') });
        try {
            const gameStartDate = new Date(2025, 3, 1); // 開學日 4/1
            const initialGameDate = { year: gameStartDate.getFullYear(), month: gameStartDate.getMonth() + 1, day: gameStartDate.getDate(), time: 'afternoon' };
            const initialDescription = t('initial_description').replace('{playerName}', playerData.name);

            // 移除預先抓取所有角色圖片的邏輯，以節省存檔空間
            // 只保留角色設定，圖片將在生成時動態抓取

            const initialPlayer = {
                id: "player", name: playerData.name, age: 20, gender: "male",
                stats: { academics: 40, money: 50000, stamina: 100, maxStamina: 100, stress: 10, maxStress: 100, charm: 30 },
                destinyPoints: 40, faceImage: playerData.faceImage,
                coreMemories: {} // Initialize empty
            };
            // Initialize empty arrays for all character IDs in coreMemories
            Object.keys(HEROINE_PROFILES).forEach(id => {
                initialPlayer.coreMemories[id] = [];
            });

            const initialCharacters = Object.values(HEROINE_PROFILES).map(heroine => ({
                ...heroine,
                relationship: { affection: 0, stage: "stranger", orgasmCount: 0, sexualDesire: 30 }
            }));
            
            // Set initial relationships
            const ririka = initialCharacters.find(c => c.id === 'ririka');
            if(ririka) ririka.relationship = { affection: 50, stage: 'acquaintance', orgasmCount: 0, sexualDesire: 40 };
            
            const mei = initialCharacters.find(c => c.id === 'mei');
            if(mei) mei.relationship = { affection: 30, stage: 'acquaintance', orgasmCount: 0, sexualDesire: 35 };

            const initialGameState = {
                id: crypto.randomUUID(), player: initialPlayer, characters: initialCharacters, inventory: [], schedule: [],
                // 移除 characterAvatars
                messageLog: [{ date: initialGameDate, text: initialDescription }],
                currentLocation: "lin_house", // Updated to new location ID
                currentScene: { description: initialDescription, imageUrl: null, chatCharacters: ['ririka', 'mei'] },
                actions: [t('initial_action_1'), t('initial_action_2'), t('initial_action_3')],
                gameDate: initialGameDate,
                settings: { artStyle: 'realistic', sound: false, musicUrl: '', memorySize: 20, descriptionTransparency: 0.5 }
            };

            await db.saveData('saves', initialGameState);
            setAllSaves(await db.getAllData('saves'));
            setActiveSaveState(initialGameState);
            setLoadingState({ llm: false, image: true, message: t('loadingImage') });
            const imageUrl = await generateSceneImage(initialGameState.currentScene.description, initialGameState, 'gentle');
            setActiveSaveState(prev => ({ ...prev, currentScene: { ...prev.currentScene, imageUrl } }));
        } catch (error) { console.error("角色創建失敗:", error); setApiError(t('apiError')); handleReturnToLobby(); } finally { setLoadingState({ llm: false, image: false, message: '' }); }
    };

    const handleSelectSave = (save) => {
        // 遷移舊存檔：確保所有角色的relationship都有orgasmCount字段
        if (save.characters) {
            save.characters = save.characters.map(char => ({
                ...char,
                relationship: {
                    ...char.relationship,
                    orgasmCount: char.relationship?.orgasmCount ?? 0,
                    sexualDesire: Math.max(0, Math.min(100, typeof char.relationship?.sexualDesire === 'number' ? char.relationship.sexualDesire : 30))
                }
            }));
        }
        // 遷移舊存檔：將coreMemories從陣列格式轉換為按角色分開的對象格式
        if (save.player && save.player.coreMemories) {
            if (Array.isArray(save.player.coreMemories)) {
                // 舊格式：陣列，需要轉換為新格式
                const oldMemories = save.player.coreMemories;
                const newCoreMemories = {};
                // 將所有舊記憶分配給所有現有角色（包括新角色）
                Object.keys(HEROINE_PROFILES).forEach(charId => {
                    newCoreMemories[charId] = [...oldMemories];
                });
                save.player.coreMemories = newCoreMemories;
            } else if (typeof save.player.coreMemories === 'object') {
                // 新格式：對象，但需要確保所有新角色都有陣列
                Object.keys(HEROINE_PROFILES).forEach(charId => {
                    if (!save.player.coreMemories[charId]) {
                        save.player.coreMemories[charId] = [];
                    }
                });
            }
        } else if (save.player) {
            // 如果沒有coreMemories，初始化為新格式
            save.player.coreMemories = {};
            Object.keys(HEROINE_PROFILES).forEach(charId => {
                save.player.coreMemories[charId] = [];
            });
        }
        setActiveSaveState(save);
        setActiveModal(null);
    };

    const handleAction = async (actionText, stateToUse = activeSaveState) => {
        if (!stateToUse) return;
        setApiError(null);
        setCurrentAudioUrl(null); // 清除先前的語音
        setTtsError(null); // 清除先前的錯誤
        setLoadingState({ llm: true, image: false, message: t('loadingLLM') });
        try {
            const { player, characters, gameDate, inventory, schedule, currentScene, currentLocation } = stateToUse;
            const memorySize = Math.max(2, Math.min(40, (stateToUse.settings?.memorySize ?? 20)));
            const contextHistory = (await db.getRecentMetadata(stateToUse.id, memorySize)).map(m => m.log);
            // 獲取當前場景中的角色ID列表
            const currentChatCharacters = stateToUse.currentScene?.chatCharacters || [];
            // 過濾出有效角色
            const validCharacterIds = Object.keys(HEROINE_PROFILES);
            const presentCharacterIds = currentChatCharacters.filter(id => validCharacterIds.includes(id));
            
            // 根據場景中的角色動態載入對應的coreMemories
            const coreMemoriesByCharacter = {};
            presentCharacterIds.forEach(charId => {
                if (player.coreMemories && player.coreMemories[charId]) {
                    coreMemoriesByCharacter[charId] = player.coreMemories[charId];
                }
            });
            
            const llmPrompt = { 
                player, 
                characters, 
                gameState: { gameDate, currentLocation }, 
                inventory, 
                schedule, 
                currentScene: currentScene.description, 
                contextHistory, // <-- 短期記憶
                coreMemories: coreMemoriesByCharacter, // <-- 長期記憶
                playerAction: actionText // <-- 傳遞玩家的具體行動
            };
            
            // 獲取當前場景的sceneMood
            const currentSceneMood = stateToUse.currentScene?.sceneMood || 'normal';
            
            // 獲取玩家charm
            const playerCharm = player.stats?.charm || 0;
            
            const llmResponse = await callGeminiApiForStory(llmPrompt, language, {
                presentCharacterIds,
                sceneMood: currentSceneMood,
                playerCharm,
                characters,
                gameDate
            });
            
            setLoadingState({ llm: false, image: false, message: '' }); 

            let tempState = { ...stateToUse };

            // --- Update Player Stats ---
            const newStats = { ...tempState.player.stats };
            if(llmResponse.statChanges){
                for(const key in llmResponse.statChanges){
                    if(newStats[key] !== undefined) {
                        newStats[key] += llmResponse.statChanges[key];
                    }
                }
            }
            newStats.stamina = Math.max(0, Math.min(newStats.maxStamina, newStats.stamina));
            newStats.stress = Math.max(0, Math.min(newStats.maxStress, newStats.stress));
            newStats.academics = Math.max(0, Math.min(100, newStats.academics));
            newStats.charm = Math.max(0, Math.min(100, newStats.charm));
            newStats.money = Math.max(0, Math.min(99999999, newStats.money));
            const destinyPoints = Math.max(0, Math.min(999, tempState.player.destinyPoints + (llmResponse.destinyPointsChange || 0)));
            
            // --- [NEW] Core Memory (from AI) ---
            const newCoreMemories = { ...(tempState.player.coreMemories || {}) };
            if (llmResponse.newCoreMemory && llmResponse.newCoreMemory.trim() !== "") {
                const newMemory = `[${tempState.gameDate.year}/${tempState.gameDate.month}/${tempState.gameDate.day}] ${llmResponse.newCoreMemory}`;
                // 優先添加到場景中的角色，否則添加到所有角色
                if (presentCharacterIds.length > 0) {
                    const targetCharId = presentCharacterIds[0];
                    if (!newCoreMemories[targetCharId]) {
                        newCoreMemories[targetCharId] = [];
                    }
                    if (!newCoreMemories[targetCharId].includes(newMemory)) {
                        newCoreMemories[targetCharId].push(newMemory);
                    }
                } else {
                    validCharacterIds.forEach(charId => {
                        if (!newCoreMemories[charId]) {
                            newCoreMemories[charId] = [];
                        }
                        if (!newCoreMemories[charId].includes(newMemory)) {
                            newCoreMemories[charId].push(newMemory);
                        }
                    });
                }
            }

            tempState.player = { ...tempState.player, stats: newStats, destinyPoints, coreMemories: newCoreMemories };

            // --- Update Character Relationships ---
            const updatedCharacters = tempState.characters.map(char => {
                const update = llmResponse.updatedCharacters.find(u => u.id === char.id);
                if (update) {
                    const newAffection = Math.max(-1000, Math.min(1000, (char.relationship.affection || 0) + (update.affectionChange || 0)));
                    const oldStage = char.relationship.stage;
                    const newStage = update.newStage || oldStage;
                    
                    const currentOrgasmCount = char.relationship.orgasmCount || 0;
                    const orgasmCountChange = update.orgasmCountChange || 0;
                    const newOrgasmCount = Math.max(0, currentOrgasmCount + Math.max(0, orgasmCountChange));

                    const currentSexualDesire = Math.max(0, Math.min(100, char.relationship?.sexualDesire ?? 30));
                    const sexualDesireDeltaFromLLM = update.sexualDesireChange || 0;
                    let newSexualDesire = currentSexualDesire + sexualDesireDeltaFromLLM;
                    if (orgasmCountChange && orgasmCountChange > 0) {
                        const afterOrgasmReduction = 5; 
                        newSexualDesire -= afterOrgasmReduction;
                    }
                    newSexualDesire = Math.max(0, Math.min(100, newSexualDesire));

                    if (newStage !== oldStage) {
                        const newMemory = `[${tempState.gameDate.year}/${tempState.gameDate.month}/${tempState.gameDate.day}] 我與 ${char.name} 的關係變成了「${t(`relationship_stages.${newStage}`)}」。`;
                        const charId = char.id;
                        if (!tempState.player.coreMemories[charId]) {
                            tempState.player.coreMemories[charId] = [];
                        }
                        if (!tempState.player.coreMemories[charId].includes(newMemory)) {
                            tempState.player.coreMemories[charId].push(newMemory);
                        }
                    }
                    
                    const newProfile = { ...char.profile };
                    if (update.newAppearance) newProfile.appearance = update.newAppearance;
                    if (update.newPersonality) newProfile.personality = update.newPersonality;

                    return { 
                        ...char, 
                        age: typeof update.newAge === 'number' ? update.newAge : char.age,
                        profile: newProfile,
                        relationship: { 
                            affection: newAffection, 
                            stage: newStage,
                            orgasmCount: newOrgasmCount,
                            sexualDesire: newSexualDesire
                        }
                    };
                }
                return {
                    ...char,
                    relationship: {
                        ...char.relationship,
                        orgasmCount: char.relationship.orgasmCount || 0,
                        sexualDesire: Math.max(0, Math.min(100, char.relationship?.sexualDesire ?? 30))
                    }
                };
            });
            tempState.characters = updatedCharacters;
            
            // --- Update Date & Time ---
            if(llmResponse.timePassed > 0) {
                let time = tempState.gameDate.time;
                let day = tempState.gameDate.day, month = tempState.gameDate.month, year = tempState.gameDate.year;
                const timeSlots = ['morning', 'afternoon', 'evening'];
                let currentIndex = timeSlots.indexOf(time);
                for(let i=0; i < llmResponse.timePassed; i++){
                    currentIndex++;
                    if(currentIndex >= timeSlots.length){
                        currentIndex = 0;
                        const d = new Date(year, month-1, day);
                        d.setDate(d.getDate() + 1);
                        year = d.getFullYear(); month = d.getMonth() + 1; day = d.getDate();
                    }
                }
                time = timeSlots[currentIndex];
                tempState.gameDate = { ...tempState.gameDate, year, month, day, time };
            }
            
            // --- Other updates ---
            if(llmResponse.newLocation) tempState.currentLocation = llmResponse.newLocation;
            if(llmResponse.newScheduleEvents) tempState.schedule = [...tempState.schedule, ...llmResponse.newScheduleEvents];
            
            const updatedStateWithNewText = { ...tempState, currentScene: { ...tempState.currentScene, description: llmResponse.sceneDescription, sceneMood: llmResponse.sceneMood, chatCharacters: llmResponse.ChatCharacter || ['none'] }, actions: llmResponse.newActions };
            
            const newMessageLog = [...(updatedStateWithNewText.messageLog || []), { date: updatedStateWithNewText.gameDate, text: llmResponse.sceneDescription }];
            updatedStateWithNewText.messageLog = newMessageLog;

            setActiveSaveState(updatedStateWithNewText);
            
            const logSummary = llmResponse.sceneSummary || `[No Summary] ${llmResponse.sceneDescription.substring(0, 150)}...`;
            await db.saveData('metadata', { id: crypto.randomUUID(), saveId: updatedStateWithNewText.id, timestamp: Date.now(), log: logSummary });
            
            if (llmResponse.endingReached) {
                const slides = Array.isArray(llmResponse.endingSlides) ? llmResponse.endingSlides.slice(0, 10) : [];
                const slidePrompts = slides.length >= 5 ? slides : (new Array(5).fill(logSummary));
                setLoadingState({ llm: false, image: true, message: t('loadingImage') });
                const images = [];
                for (const caption of slidePrompts) {
                    const url = await generateSceneImage(caption, updatedStateWithNewText, 'gentle', updatedStateWithNewText.currentScene.chatCharacters);
                    images.push(url);
                }
                setEndingState({ 
                    isOpen: true, 
                    title: llmResponse.endingTitle || '', 
                    summary: llmResponse.endingSummary || logSummary, 
                    images 
                });
                setLoadingState({ llm: false, image: false, message: '' });
                return;
            }
            
            if (llmResponse.isGameOver) {
                const reason = llmResponse.gameOverReason || 'unknown';
                setGameOverInfo({ reason: t(`bad_ending_${reason}`), message: t(`bad_ending_${reason}_message`) });
                setIsGameOver(true);
                return;
            }

            if (llmResponse.shouldGenerateNewImage) {
                setLoadingState({ llm: false, image: true, message: t('loadingImage') });
                const imageUrl = await generateSceneImage(llmResponse.sceneDescription, updatedStateWithNewText, llmResponse.sceneMood, llmResponse.ChatCharacter);
                setActiveSaveState(prev => prev ? { ...prev, currentScene: { ...prev.currentScene, imageUrl } } : null);
            }

        } catch (error) {
            console.error("行動處理期間發生錯誤:", error);
            setApiError(t('apiError'));
        } finally {
            setLoadingState({ llm: false, image: false, message: '' });
        }
    };
    
    const handleGetFeed = async (character) => {
        setAiModalState({ isOpen: true, title: t('ai_feed_title', { name: character.name }), content: '', isLoading: true });
        try {
            const systemPrompt = "You are an AI that generates realistic social media posts for a game character in Traditional Chinese. Based on her personality, recent events, and relationship with the player, write a short, casual post as if she posted it on X (Twitter) or Instagram.";
            const recentHistory = (await db.getRecentMetadata(activeSaveState.id, 5)).map(m => m.log).join('\n');
            const userPrompt = `Character: ${character.name}\nPersonality: ${character.profile.personality}\nRelationship with Player: Stage - ${character.relationship.stage}, Affection - ${character.relationship.affection}\nRecent Events:\n${recentHistory}\n\nGenerate a social media post in Traditional Chinese.`;
            const result = await callGenerativeTextApi(systemPrompt, userPrompt);
            setAiModalState(s => ({ ...s, content: result, isLoading: false }));
        } catch (error) {
            console.error("Failed to generate feed:", error);
            setAiModalState(s => ({ ...s, content: t('apiError'), isLoading: false }));
        }
    };

    const handleGetAdvice = async (character) => {
        setAiModalState({ isOpen: true, title: t('ai_advice_title'), content: '', isLoading: true });
        try {
            const systemPrompt = "You are a helpful relationship advisor AI for a romance game. The player wants to improve their relationship with a character. Analyze the provided data and give three concrete, actionable, and personalized suggestions in Traditional Chinese.";
            const recentHistory = (await db.getRecentMetadata(activeSaveState.id, 10)).map(m => m.log).join('\n');
            const userPrompt = `Player wants advice for: ${character.name}\nCharacter's Personality: ${character.profile.personality}\nCurrent Relationship: Stage - ${character.relationship.stage}, Affection - ${character.relationship.affection}\nPlayer's Stats: Charm - ${activeSaveState.player.stats.charm}, Academics - ${activeSaveState.player.stats.academics}\nRecent Interactions:\n${recentHistory}\n\nProvide three numbered suggestions in Traditional Chinese.`;
            const result = await callGenerativeTextApi(systemPrompt, userPrompt);
            setAiModalState(s => ({ ...s, content: result, isLoading: false }));
        } catch (error) {
            console.error("Failed to generate advice:", error);
            setAiModalState(s => ({ ...s, content: t('apiError'), isLoading: false }));
        }
    };
    
    const handleGetSummary = async () => {
        setAiModalState({ isOpen: true, title: t('ai_summary_title'), content: '', isLoading: true });
        try {
            const systemPrompt = "You are an AI that summarizes a story from a game's message log in Traditional Chinese. Read the provided log from the player's perspective. Write a reflective and personal diary entry as the protagonist.";
            const fullHistory = activeSaveState.messageLog.map(log => `[${log.date.year}/${log.date.month}/${log.date.day}] ${log.text}`).join('\n\n');
            const userPrompt = `Here is my story so far:\n\n${fullHistory}\n\nWrite a summary as a diary entry in Traditional Chinese.`;
            const result = await callGenerativeTextApi(systemPrompt, userPrompt);
            setAiModalState(s => ({ ...s, content: result, isLoading: false }));
        } catch (error) {
            console.error("Failed to generate summary:", error);
            setAiModalState(s => ({ ...s, content: t('apiError'), isLoading: false }));
        }
    };
    
    const handleExportStory = (messageLog, playerName = null) => {
        try {
            const logData = messageLog || activeSaveState.messageLog;
            const player = activeSaveState?.player;
            const finalPlayerName = playerName || player?.name || '玩家';
            
            // 構建元數據
            const metadata = {
                "小說風格": "大尺度青春戀愛小說,包含露骨的性愛場景描述.",
                "主類別(Type)": "都市言情流",
                "世界觀與背景設定": "以現代臺北為背景的寫實、成人向戀愛故事。",
                "情節與敘事手法": "編織出一段大學生活、人際關係和秘密交織的身臨其境體驗。",
                "設定要求": {
                    "小說名稱": "林宅物語",
                    "每章字數": 5000,
                    "總章節數": 30
                },
                "主角設定": {
                    "主角名稱": finalPlayerName,
                    "年齡": "20歲",
                    "外觀": "165公分高，英俊謙和，討人喜歡。",
                    "背景": "臺灣大學一名大二轉學生，高雄人，住在林雨晴教授的家中。"
                }
            };
            
            // 合併元數據和訊息紀錄
            const exportData = {
                ...metadata,
                "訊息紀錄": logData
            };
            
            const jsonData = JSON.stringify(exportData, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `lin_house_story_export_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to export story:", error);
            alert(t('exportError') || '導出失敗');
        }
    };
    
    const handleGetOutfit = async (character) => {
        setAiModalState({ isOpen: true, title: t('ai_outfit_title'), content: '', isLoading: true });
        try {
            const systemPrompt = "You are a fashion advisor AI for a romance game. The player is preparing for a date with a character. Based on the character's personality and the player's charm, suggest a suitable outfit in Traditional Chinese.";
            const userPrompt = `Player needs an outfit suggestion for a date with: ${character.name}\nCharacter's Personality: ${character.profile.personality}\nPlayer's Charm Stat: ${activeSaveState.player.stats.charm}\n\nProvide one stylish outfit suggestion in Traditional Chinese.`;
            const result = await callGenerativeTextApi(systemPrompt, userPrompt);
            setAiModalState(s => ({ ...s, content: result, isLoading: false }));
        } catch (error) {
            console.error("Failed to generate outfit:", error);
            setAiModalState(s => ({ ...s, content: t('apiError'), isLoading: false }));
        }
    };

    const handleDeleteSave = async (id) => { 
        await db.deleteData('saves', id); 
        const oldMetadata = await db.getAllMetadataBySaveId(id);
        await Promise.all(oldMetadata.map(m => db.deleteData('metadata', m.id)));
        setAllSaves(await db.getAllData('saves')); 
    };
    const loadGameState = async (newState, metadata = []) => { 
        const id = newState.id || crypto.randomUUID();
        const stateToSave = { ...newState, id };
        
        try {
            await db.saveData('saves', stateToSave);
            const oldMetadata = await db.getAllMetadataBySaveId(id);
            await Promise.all(oldMetadata.map(m => db.deleteData('metadata', m.id)));
            const metadataToSave = metadata.map(m => ({
                ...m,
                saveId: id, 
                id: m.id || crypto.randomUUID() 
            }));
            await Promise.all(metadataToSave.map(m => db.saveData('metadata', m)));
            setAllSaves(await db.getAllData('saves')); 
            setActiveModal('saveLobby'); 
            return true; 
        } catch (err) {
            console.error("匯入存檔/metadata失敗:", err);
            alert(t('importError'));
            return false;
        }
    };
    const handleGoToLobby = () => { setActiveModal(allSaves.length > 0 ? 'saveLobby' : 'characterCreation'); };
    const handleImportClick = () => { importInputRef.current.click(); };
    const handleFileImport = (event) => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); 
        reader.onload = async (e) => { 
            try { 
                const data = JSON.parse(e.target.result); 
                let success = false;
                const migrateSaveData = (saveData) => {
                    if (saveData.characters) {
                        saveData.characters = saveData.characters.map(char => ({
                            ...char,
                            relationship: {
                                ...char.relationship,
                                orgasmCount: char.relationship?.orgasmCount ?? 0,
                                sexualDesire: Math.max(0, Math.min(100, typeof char.relationship?.sexualDesire === 'number' ? char.relationship.sexualDesire : 30))
                            }
                        }));
                    }
                    if (saveData.player && saveData.player.coreMemories) {
                        if (Array.isArray(saveData.player.coreMemories)) {
                            const oldMemories = saveData.player.coreMemories;
                            const newCoreMemories = {};
                            Object.keys(HEROINE_PROFILES).forEach(charId => {
                                newCoreMemories[charId] = [...oldMemories];
                            });
                            saveData.player.coreMemories = newCoreMemories;
                        } else if (typeof saveData.player.coreMemories === 'object') {
                            Object.keys(HEROINE_PROFILES).forEach(charId => {
                                if (!saveData.player.coreMemories[charId]) {
                                    saveData.player.coreMemories[charId] = [];
                                }
                            });
                        }
                    } else if (saveData.player) {
                        saveData.player.coreMemories = {};
                        Object.keys(HEROINE_PROFILES).forEach(charId => {
                            saveData.player.coreMemories[charId] = [];
                        });
                    }
                    return saveData;
                };
                
                if (data.saveState && data.saveState.player && Array.isArray(data.metadata)) {
                    const migratedSaveState = migrateSaveData(data.saveState);
                    success = await loadGameState(migratedSaveState, data.metadata);
                } else if (data.player && data.characters) { 
                    const migratedData = migrateSaveData(data);
                    success = await loadGameState(migratedData, []); 
                }
                
                if (success) {
                } else {
                    alert(t('importError'));
                }
            } catch (err) { 
                alert(t('importError')); 
            } 
        }; 
        reader.readAsText(file); event.target.value = ''; 
    };
    const handleCustomActionSubmit = (e) => { e.preventDefault(); if (customAction.trim()) { handleAction(customAction.trim()); setCustomAction(''); setIsCustomActionVisible(false); } };
    const handleRelax = () => { if (loadingState.llm || loadingState.image) return; handleAction(`[${t('relax')}]`); };
    const handleReturnToLobby = () => { setIsGameOver(false); setActiveSaveState(null); initializeGame(); };
    const handleDownloadImage = useCallback(() => { if (!activeSaveState?.currentScene?.imageUrl) return; const url = activeSaveState.currentScene.imageUrl; const img = new Image(); img.crossOrigin = 'anonymous'; img.onload = () => { const canvas = document.createElement('canvas'); canvas.width = img.width; canvas.height = img.height; const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0); const now = new Date(); const filename = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_scene.jpg`; const link = document.createElement('a'); link.download = filename; link.href = canvas.toDataURL('image/jpeg', 0.92); link.click(); }; img.src = url; }, [activeSaveState]);
    
    const handlePlayTts = useCallback(async () => {
        if (!activeSaveState) return;

        setIsTtsLoading(true);
        setTtsError(null);

        try {
            if (currentAudioUrl && ttsAudioRef.current) {
                await ttsAudioRef.current.play();
                setIsTtsLoading(false);
                return;
            }

            const { description, chatCharacters } = activeSaveState.currentScene;
            
            if (!description) {
                console.error("TTS: scene description is missing.");
                setTtsError(t('tts_error'));
                setIsTtsLoading(false);
                return;
            }
            
            let voiceName = 'Zephyr'; // Default
            const activeChars = chatCharacters || [];
            
            // 使用新的 VOICE_MAP
            for (const charId of activeChars) {
                if (VOICE_MAP[charId]) {
                    voiceName = VOICE_MAP[charId];
                    break;
                }
            }

            const { audioData, sampleRate } = await callTtsApi(description, voiceName);
            const pcmData = base64ToArrayBuffer(audioData);
            const pcm16 = new Int16Array(pcmData);
            const wavBlob = pcmToWav(pcm16, sampleRate);
            const audioUrl = URL.createObjectURL(wavBlob);

            setCurrentAudioUrl(audioUrl);
            if (ttsAudioRef.current) {
                ttsAudioRef.current.src = audioUrl;
                await ttsAudioRef.current.play();
            }

        } catch (error) {
            console.error("TTS Playback failed:", error);
            setTtsError(t('tts_error'));
            setCurrentAudioUrl(null); // 允許重試
        } finally {
            setIsTtsLoading(false);
        }
    }, [activeSaveState, t, currentAudioUrl]);

    const isActionDisabled = !activeSaveState || loadingState.llm || loadingState.image;
    if (!isInitialized) return <div className="bg-slate-900 text-pink-300 min-h-screen flex items-center justify-center font-serif">{apiError || '正在構築臺北...'}</div>;

    if (!activeSaveState) {
        return ( <div className="bg-slate-900 h-screen"> 
            <AnimatePresence>
                {loadingState.llm && <LoadingOverlay key="loading-lobby" message={loadingState.message} />}
                {activeModal === 'startScreen' && <StartScreenModal key="start-screen" t={t} onGoToLobby={handleGoToLobby} onImportClick={handleImportClick} setActiveModal={setActiveModal} />}
                {activeModal === 'saveLobby' && <SaveSelectModal key="save-lobby" t={t} saves={allSaves} onSelect={handleSelectSave} onCreateNew={() => setActiveModal('characterCreation')} onDelete={handleDeleteSave} onBack={() => setActiveModal('startScreen')} />}
                {activeModal === 'characterCreation' && <CharacterCreationModal key="char-creation" t={t} onSubmit={handleCharacterCreation} onBack={handleGoToLobby} hasSaves={allSaves.length > 0} />}
                {activeModal === 'settings' && <SettingsModal key="settings-lobby" t={t} onClose={() => setActiveModal('startScreen')} settings={settings} setSettings={setSettings} volume={volume} setVolume={setVolume} gameState={null} />}
                {versionInfo.showModal && <VersionCheckModal 
                    key="version-check"
                    t={t} 
                    onClose={() => setVersionInfo(v => ({ ...v, showModal: false }))} 
                    onUpdate={() => { 
                        window.open(versionInfo.updateUrl, '_blank'); 
                        setVersionInfo(v => ({ ...v, showModal: false })); 
                    }} 
                    newVersion={versionInfo.newVersion}
                    currentVersion={CURRENT_GAME_VERSION}
                />}
            </AnimatePresence> 
            <input type="file" ref={importInputRef} onChange={handleFileImport} accept=".json" className="hidden" /> 
        </div> );
    }
    const { player, currentScene, actions, gameDate } = activeSaveState;

    const timeOfDayText = { morning: t('morning'), afternoon: t('afternoon'), evening: t('evening') };

    const StatusPanelContent = () => (
        <>
            <header className="flex-shrink-0 p-6 md:p-0">
                <h1 className="text-3xl md:text-4xl font-bold text-pink-300 text-shadow-pink font-title whitespace-nowrap">{t('gameTitle')}</h1>
                <p className="text-pink-400 font-title">{t('gameSubtitle')}</p>
            </header>
            <div className="mt-6 bg-black/20 p-3 rounded-lg backdrop-blur-sm border border-gray-700 space-y-2">
                <StatusBar label={t('academics')} value={player.stats.academics} maxValue={100} colorClass="bg-blue-500" />
                <StatusBar label={t('stamina')} value={player.stats.stamina} maxValue={player.stats.maxStamina} colorClass="bg-green-500" />
                <StatusBar label={t('stress')} value={player.stats.stress} maxValue={player.stats.maxStress} colorClass="bg-yellow-500" />
            </div>
            <div className="mt-4 bg-black/20 p-3 rounded-lg backdrop-blur-sm border border-gray-700">
                <div className="text-sm text-gray-300">{`${gameDate.year}${t('year')} ${gameDate.month}${t('month')} ${gameDate.day}${t('day')} ${timeOfDayText[gameDate.time]}`}</div>
                <button onClick={handleRelax} disabled={isActionDisabled} className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-1 px-3 rounded text-sm disabled:bg-gray-600 disabled:cursor-not-allowed mt-2">{t('relax')}</button>
            </div>
        </>
    );

    const NavPanelContent = () => (
        <>
            <div className="flex flex-col gap-2">
                <LanguageSwitcher language={language} setLanguage={setLanguage} />
                <IconButton onClick={() => setActiveModal('settings')}><IconSettings /></IconButton>
                <IconButton onClick={() => setActiveModal('destiny')}><IconLightning /></IconButton>
                <IconButton onClick={() => setActiveModal('journal')}><IconJournal /></IconButton>
                <IconButton onClick={() => setActiveModal('schedule')}><IconCalendar /></IconButton>
                <IconButton onClick={() => setActiveModal('player')}><IconCharacter /></IconButton>
                <IconButton onClick={() => setActiveModal('contacts')}><IconPhone /></IconButton>
                <IconButton onClick={() => setActiveModal('possessions')}><IconBackpack /></IconButton>
            </div>
            <div className="flex-grow" />
            <div className="flex flex-col gap-2 mb-2">
                <IconButton onClick={() => setIsActionPanelOpen(v => !v)} className={isActionPanelOpen ? 'bg-pink-500/40 text-white border-pink-400' : ''}><IconPanels /></IconButton>
                <IconButton onClick={() => setActiveModal('history')}><IconHistory /></IconButton>
                <IconButton onClick={() => setActiveModal('communityBoard')}><IconScroll /></IconButton>
            </div>
        </>
    );

    return (
        <>
            <audio ref={ttsAudioRef} onEnded={() => setCurrentAudioUrl(null)} />
            <audio ref={audioRef} crossOrigin="anonymous" />
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Gasoek+One&family=Noto+Sans+TC:wght@400;700&display=swap'); body { font-family: 'Noto Sans TC', sans-serif; background-color: #0f172a; } .font-title { font-family: 'Gasoek One', sans-serif; } .action-button { background: rgba(17, 24, 39, 0.7); border: 1px solid rgba(236, 72, 153, 0.5); backdrop-filter: blur(2px); } .action-button:hover { background: rgba(31, 41, 55, 0.8); border-color: rgba(244, 114, 182, 0.9); } .main-content-scroll::-webkit-scrollbar { width: 6px; } .main-content-scroll::-webkit-scrollbar-track { background: transparent; } .main-content-scroll::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 3px; } .text-shadow-pink { text-shadow: 0 0 6px rgba(244, 114, 182, 0.6); }`}</style>
            
            <div className="bg-slate-900 text-gray-200 h-screen flex flex-col md:flex-row overflow-hidden font-sans">
                {/* --- 主畫面 --- */}
                <main className="flex-grow relative bg-slate-900 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="relative w-full h-full overflow-hidden">
                            <AnimatePresence>{(loadingState.llm || loadingState.image) && <LoadingOverlay key="loading-main" message={loadingState.message} />}</AnimatePresence>
                            {apiError && <div className="absolute top-0 w-full bg-red-800/80 p-4 text-center z-30">{apiError}</div>}
                            <div className="absolute inset-0 bg-black shadow-2xl overflow-hidden md:border-2 border-pink-500/50">
                                {currentScene.imageUrl ? (
                                    <motion.img
                                        key={currentScene.imageUrl}
                                        src={currentScene.imageUrl}
                                        alt="Scene"
                                        className={`w-full h-full transition-transform duration-300 ${zoom === 1 ? 'object-cover' : 'object-contain'}`}
                                        style={{ transform: `scale(${zoom})` }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">{t('loadingImage')}</div>
                                )}
                            </div>
                            <div className="absolute top-4 right-4 z-40 flex items-center gap-1 bg-black/40 p-1 rounded-lg backdrop-blur-sm border border-white/10">
                                <IconButton onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}><IconMinus /></IconButton>
                                <button onClick={() => setZoom(1)} className="px-2 text-sm text-white hover:bg-white/10 rounded">100%</button>
                                <IconButton onClick={() => setZoom(z => Math.min(3, z + 0.1))}><IconPlus /></IconButton>
                                <IconButton onClick={handleDownloadImage}><IconDownload /></IconButton>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 z-30 px-4 md:px-8 pb-6 pointer-events-none">
                        <div className="relative w-full max-w-[95vw] md:max-w-6xl mx-auto">
                            {activeSaveState.currentScene.sceneMood === 'intimate' && (
                                <button
                                    onClick={handlePlayTts}
                                    disabled={isTtsLoading}
                                    className="absolute top-2 right-2 z-10 p-2 rounded-full bg-pink-500/80 hover:bg-pink-400 text-black transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed pointer-events-auto"
                                    title={t('listen_tts')}
                                >
                                    {isTtsLoading ? (
                                        <div className="w-5 h-5 animate-spin rounded-full border-2 border-t-transparent border-white"></div>
                                    ) : (
                                        <span className="text-xl">🔊</span>
                                    )}
                                </button>
                            )}
                            <div
                                className="pointer-events-auto relative w-full bg-slate-900/70 p-4 md:rounded-lg md:border border-pink-500/50 text-base leading-relaxed shadow-lg break-words backdrop-blur-md max-h-[40vh] md:max-h-[35vh] overflow-y-auto main-content-scroll"
                                style={{ backgroundColor: `rgba(15, 23, 42, ${descriptionPanelAlpha})` }}
                            >
                                {currentScene.description}
                                {ttsError && (
                                    <div className="absolute top-2 right-2 z-10 bg-red-800/90 p-2 rounded text-xs cursor-pointer" onClick={() => setTtsError(null)}>
                                        {ttsError}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
                
                {/* --- 右側邊欄 (僅桌面) --- */}
                <aside className={`w-full md:w-[420px] flex-shrink-0 hidden ${isActionPanelOpen ? 'md:flex' : 'md:hidden'} flex-col p-6 bg-slate-800/30 border-t md:border-t-0 md:border-l border-pink-500/50 transition-all duration-200`}>
                    <StatusPanelContent />
                    <div className="flex-grow mt-4 pr-2 -mr-2 overflow-y-auto main-content-scroll">
                        <div className="w-full grid grid-cols-1 gap-3">
                            {(actions || []).map((action, i) => (<button key={i} onClick={() => handleAction(action)} disabled={isActionDisabled} className="action-button text-pink-200 font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed">{action}</button>))}
                        </div>
                    </div>
                    <footer className="flex-shrink-0 mt-4">
                         <form onSubmit={handleCustomActionSubmit} className="flex gap-2"><input type="text" value={customAction} onChange={(e) => setCustomAction(e.target.value)} placeholder={t('customActionPlaceholder')} className="flex-grow bg-gray-900 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-400 text-white disabled:opacity-50" disabled={isActionDisabled} /><button type="submit" className="bg-pink-400 hover:bg-pink-300 text-black font-bold p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isActionDisabled || !customAction.trim()}><IconSend /></button></form>
                    </footer>
                </aside>
                
                {/* --- 選項區 (僅手機) --- */}
                <div className="h-[25vh] bg-slate-900 p-4 flex flex-col md:hidden">
                    <div className="h-full overflow-y-auto main-content-scroll">
                        <div className="w-full grid grid-cols-1 gap-3">
                            {(actions || []).map((action, i) => (<button key={i} onClick={() => handleAction(action)} disabled={isActionDisabled} className="action-button text-pink-200 font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed">{action}</button>))}
                        </div>
                    </div>
                </div>

                {/* --- 最右側導航 (僅桌面) --- */}
                <nav className="w-20 flex-shrink-0 bg-slate-900/50 border-l border-pink-500/50 hidden md:flex flex-col items-center p-2">
                    <NavPanelContent />
                </nav>

                {/* --- 浮動按鈕與面板 (僅手機) --- */}
                <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:hidden">
                    <IconButton onClick={() => setIsCustomActionVisible(v => !v)}><IconTalk /></IconButton>
                    <IconButton onClick={() => setIsNavPanelVisible(true)}><IconSettings /></IconButton>
                    <IconButton onClick={() => setIsStatusPanelVisible(true)}><IconCharacter /></IconButton>
                </div>
                
                <AnimatePresence>
                    {isStatusPanelVisible && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 md:hidden" onClick={() => setIsStatusPanelVisible(false)}>
                            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="relative w-4/5 max-w-sm h-full bg-slate-800/95 backdrop-blur-sm p-6 flex flex-col border-r border-pink-500/50" onClick={e => e.stopPropagation()}>
                                <StatusPanelContent />
                            </motion.div>
                        </motion.div>
                    )}
                    {isNavPanelVisible && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 md:hidden" onClick={() => setIsNavPanelVisible(false)}>
                            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="absolute right-0 w-20 h-full bg-slate-900/80 backdrop-blur-sm p-2 flex flex-col items-center border-l border-pink-500/50" onClick={e => e.stopPropagation()}>
                                <NavPanelContent />
                            </motion.div>
                        </motion.div>
                    )}
                    {isCustomActionVisible && (
                        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed bottom-0 left-0 right-0 p-4 z-50 bg-slate-900/90 backdrop-blur-sm border-t border-pink-500/50 md:hidden">
                            <form onSubmit={handleCustomActionSubmit} className="flex gap-2">
                                <input type="text" value={customAction} onChange={(e) => setCustomAction(e.target.value)} placeholder={t('customActionPlaceholder')} className="flex-grow bg-gray-800 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-400 text-white disabled:opacity-50" disabled={isActionDisabled} autoFocus />
                                <button type="submit" className="bg-pink-400 hover:bg-pink-300 text-black font-bold p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isActionDisabled || !customAction.trim()}><IconSend /></button>
                            </form>
                            <button onClick={() => setIsCustomActionVisible(false)} className="absolute -top-8 right-2 text-white bg-slate-800/50 p-1 rounded-full"><IconClose /></button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- 通用彈窗 --- */}
                <AnimatePresence>
                    {isGameOver && <GameOverModal key="game-over" t={t} onReturn={handleReturnToLobby} title={gameOverInfo.reason} message={gameOverInfo.message}/>}
            {activeModal === 'settings' && <SettingsModal key="modal-settings" t={t} onClose={() => setActiveModal(null)} settings={activeSaveState.settings} setSettings={(newSettings) => setActiveSaveState(s => ({...s, settings: newSettings(s.settings)}))} volume={volume} setVolume={setVolume} gameState={activeSaveState} loadGameState={loadGameState} />}
            {endingState.isOpen && <EndingModal key="ending-modal" t={t} onReturn={handleReturnToLobby} ending={endingState} onClose={() => setEndingState(s => ({...s, isOpen: false}))} messageLog={activeSaveState?.messageLog} onExport={handleExportStory} player={activeSaveState?.player} />}
                    {activeModal === 'possessions' && <BackpackModal key="modal-possessions" t={t} onClose={() => setActiveModal(null)} inventory={activeSaveState.inventory} player={activeSaveState.player} />}
                    {activeModal === 'player' && <CharacterModal key="modal-player" t={t} onClose={() => setActiveModal(null)} player={activeSaveState.player} />}
                    {activeModal === 'schedule' && <QuestsModal key="modal-schedule" t={t} onClose={() => setActiveModal(null)} schedule={activeSaveState.schedule} gameDate={activeSaveState.gameDate} />}
                    {activeModal === 'journal' && <JournalModal key="modal-journal" t={t} onClose={() => setActiveModal(null)} locations={LOCATIONS} handleAction={handleAction} setActiveModal={setActiveModal} />}
                    {activeModal === 'history' && <HistoryModal key="modal-history" t={t} onClose={() => setActiveModal(null)} log={activeSaveState.messageLog} onSummarize={handleGetSummary} onExport={handleExportStory} player={activeSaveState.player} />}
                    {activeModal === 'communityBoard' && <CommunityBoardModal key="modal-community" t={t} onClose={() => setActiveModal(null)} communityLinks={communityLinks} />}
                    {activeModal === 'destiny' && <DestinySystemModal key="modal-destiny" t={t} onClose={() => setActiveModal(null)} player={player} handleAction={handleAction} setActiveModal={setActiveModal} />}
                    {activeModal === 'contacts' && <ContactsModal key="modal-contacts" t={t} onClose={() => setActiveModal(null)} contacts={activeSaveState.characters} characterAvatars={activeSaveState.characterAvatars} handleAction={handleAction} setActiveModal={setActiveModal} setEnlargedAvatar={setEnlargedAvatar} onGetFeed={handleGetFeed} onGetAdvice={handleGetAdvice} onGetOutfit={handleGetOutfit} />}
                    {enlargedAvatar && <AvatarModal key="avatar-modal" onClose={() => setEnlargedAvatar(null)} avatarSrc={enlargedAvatar} />}
                    {aiModalState.isOpen && <AiContentModal key="ai-modal" t={t} onClose={() => setAiModalState({ isOpen: false, title: '', content: '', isLoading: false })} title={aiModalState.title} content={aiModalState.content} isLoading={aiModalState.isLoading} />}
                    {versionInfo.showModal && <VersionCheckModal 
                        key="version-check"
                        t={t} 
                        onClose={() => setVersionInfo(v => ({ ...v, showModal: false }))} 
                        onUpdate={() => { 
                            window.open(versionInfo.updateUrl, '_blank'); 
                            setVersionInfo(v => ({ ...v, showModal: false })); 
                        }} 
                        newVersion={versionInfo.newVersion}
                        currentVersion={CURRENT_GAME_VERSION}
                    />}
                </AnimatePresence>
            </div>
        </>
    );
};
// --- 輔助 & 彈窗組件 ---
const LanguageSwitcher = ({ language, setLanguage, isUp = false }) => {
    // 只有繁體中文，所以這個組件只需顯示當前語言，或者可以移除，這裡保留但只顯示一個選項
    const [isOpen, setIsOpen] = useState(false);
    const languages = { 'zh-TW': '繁體中文' };
    const dropdownRef = useRef(null);

    return (
        <div className="relative" ref={dropdownRef}>
            <IconButton onClick={() => {}} className="cursor-default"><IconLanguage /></IconButton>
        </div>
    );
};
const DestinySystemModal = ({ t, onClose, player, handleAction, setActiveModal }) => {
    const [interferenceText, setInterferenceText] = useState(''); 
    const interferenceCost = 20; 
    const handleInterferenceSubmit = () => { if (player.destinyPoints >= interferenceCost && interferenceText.trim()) { setActiveModal(null); handleAction(`[${t('worldInterference')}] ${interferenceText.trim()}`); setInterferenceText(''); } }; 
    const handleDestinyActionClick = (action) => { if (player.destinyPoints >= action.cost) { setActiveModal(null); const payload = JSON.stringify({ name: action.name, cost: action.cost }); handleAction(`[${t('destinyActions')}] ${payload}`); } }; 
    return (<Modal onClose={onClose} title={t('destiny')}><div className="space-y-6"><div className="text-center bg-slate-900/50 p-4 rounded-lg border border-cyan-500/50"><p className="text-gray-300 text-lg">{t('destinyPoints')}</p><p className="text-5xl font-bold text-cyan-300 font-mono">{player.destinyPoints}</p></div><div className="bg-gray-800/50 p-4 rounded-lg"><h4 className="font-bold text-lg mb-2 text-cyan-300">{t('destinyAcquisition')}</h4><p className="text-gray-300">{t('destiny_acquisition_desc')}</p></div><div className="border-t border-gray-600 pt-4"><h4 className="font-bold text-lg mb-2 text-red-400">{t('worldInterference')}</h4><textarea value={interferenceText} onChange={(e) => setInterferenceText(e.target.value)} placeholder={t('interferencePlaceholder')} className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-500" /><div className="flex justify-between items-center mt-2"><span className="text-sm text-gray-400">{t('interferenceCost')}: <span className="font-bold text-red-400">{interferenceCost} {t('destinyPoints')}</span></span><button onClick={handleInterferenceSubmit} disabled={player.destinyPoints < interferenceCost || !interferenceText.trim()} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors">{t('submit')}</button></div></div></div></Modal>);};
const IconButton = ({ children, onClick, className = '' }) => (<button onClick={onClick} className={`p-2 text-pink-200 rounded-full bg-slate-800/60 backdrop-blur-sm hover:bg-white/10 transition-colors shadow-lg border border-white/10 ${className}`}>{children}</button>);
const Modal = ({ children, onClose, title }) => (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}><motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} className="bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl border-2 border-pink-500/60 max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}><header className="flex items-center justify-between p-4 border-b border-pink-500/60 flex-shrink-0"><h2 className="text-xl font-bold text-pink-300 font-title text-shadow-pink">{title}</h2><IconButton onClick={onClose}><IconClose /></IconButton></header><div className="p-6 overflow-y-auto">{children}</div></motion.div></motion.div>);
const CharacterCreationModal = ({ t, onSubmit, onBack, hasSaves }) => {
    const [playerData, setPlayerData] = useState({ name: '', faceImage: null });
    const fileInputRef = useRef(null);
    const handleImageUpload = async (e) => { const file = e.target.files[0]; if (file) { const processedImage = await processAndResizeImage(file); setPlayerData(c => ({ ...c, faceImage: processedImage })); } };
    const handleSubmit = (e) => { e.preventDefault(); if (playerData.name && playerData.faceImage) onSubmit(playerData); else alert(t('uploadPrompt')); };
    return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 font-sans">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 rounded-2xl shadow-xl w-full max-w-xl border-2 border-pink-500/60 max-h-[95vh] flex flex-col">
            <header className="p-6 text-center flex-shrink-0 relative">
                {hasSaves && <button onClick={onBack} className="absolute top-4 left-4 text-pink-300 hover:text-white">&larr; <span className="hidden md:inline ml-1">{t('saveLobby')}</span></button>}
                <h2 className="text-2xl font-bold mb-2 text-pink-300 font-title">{t('welcome')}</h2>
            </header>
            <form onSubmit={handleSubmit} className="p-6 flex-grow overflow-y-auto">
                <div className="space-y-6">
                    <div><label className="block text-gray-400 mb-2">{t('playerName')}</label><input type="text" value={playerData.name} onChange={e => setPlayerData(c => ({ ...c, name: e.target.value }))} className="w-full bg-slate-800 rounded p-2 text-white border border-gray-600" required /></div>
                    <div><label className="block text-gray-400 mb-2">{t('uploadFace')}</label><div onClick={() => fileInputRef.current.click()} className="cursor-pointer w-full aspect-square bg-slate-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600 hover:border-pink-400 transition-colors">{playerData.faceImage ? <img src={`data:image/jpeg;base64,${playerData.faceImage}`} alt="Preview" className="w-full h-full object-cover rounded-lg" /> : <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full w-full"><IconUpload /><p className="mt-2 text-sm">{t('uploadPrompt')}</p></div>}</div><input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" /></div>
                </div>
                <button type="submit" className="w-full bg-pink-500 hover:bg-pink-400 text-black font-bold py-3 rounded-lg mt-8 transition-colors flex-shrink-0">{t('startGame')}</button>
            </form>
        </motion.div>
    </motion.div>);
};
const CharacterModal = ({ t, onClose, player }) => {
    return (<Modal onClose={onClose} title={t('playerSheet')}><div className="space-y-4">
        <div className="text-center">
            {player.faceImage && (
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-pink-400 mb-4 shadow-lg">
                    <img src={`data:image/jpeg;base64,${player.faceImage}`} alt={player.name} className="w-full h-full object-cover" />
                </div>
            )}
            <h3 className="text-3xl font-bold font-title">{player.name}</h3>
            <p className="text-pink-300">{`${t('age')} ${player.age}`}</p>
        </div>
        <div className="bg-slate-900 p-4 rounded-lg"><h4 className="font-bold text-lg text-pink-300 mb-2">{t('coreAttributes')}</h4><div className="grid grid-cols-2 gap-4">
            {Object.entries(player.stats).filter(([key]) => !key.startsWith('max')).map(([key, value]) => (
                <div key={key} className="bg-slate-800/50 p-3 rounded text-center">
                    <p className="text-sm text-gray-400">{t(key)}</p>
                    <p className="font-bold text-xl md:text-2xl break-words">{key === 'money' ? `NT$${value.toLocaleString()}`: value}</p>
                </div>
            ))}
        </div></div>
    </div></Modal>)};
const StartScreenModal = ({ t, onGoToLobby, onImportClick, setActiveModal }) => {
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const [footerIcons, setFooterIcons] = useState([]);
    
    useEffect(() => {
        setBackgroundUrl(START_SCREEN_BACKGROUNDS[Math.floor(Math.random() * START_SCREEN_BACKGROUNDS.length)]);
        
        const fetchFooterIcons = async () => {
            try {
                const response = await fetch('https://callmygod.com/api/footerIcon_links.php');
                const data = await response.json();
                if (data.footerIcon && Array.isArray(data.footerIcon)) {
                    const shuffled = [...data.footerIcon].sort(() => Math.random() - 0.5);
                    setFooterIcons(shuffled.slice(0, 4));
                }
            } catch (error) {
                console.error('Failed to fetch footer icons:', error);
            }
        };
        
        fetchFooterIcons();
    }, []);
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950 z-50 flex flex-col p-4 text-center bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${backgroundUrl})` }}>
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <LanguageSwitcher />
                <IconButton onClick={() => setActiveModal('settings')}><IconSettings /></IconButton>
            </div>
            <div className="absolute inset-0 bg-black/50"></div>
            
            <div className="flex-grow-[5] w-full relative z-10"></div> 

            <div className="relative z-10 flex flex-col items-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}>
                    <h1 className="text-6xl md:text-8xl font-bold text-pink-300 font-title text-shadow-pink">{t('gameTitle')}</h1>
                    <p className="text-2xl md:text-3xl text-pink-200 font-title mt-4">{t('gameSubtitle')}</p>
                </motion.div>
            </div>

            <div className="flex-grow-[2] w-full relative z-10"></div> 

            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.5 } }} className="relative z-10 flex flex-col gap-3 w-full max-w-xs mx-auto flex-shrink-0">
                <button onClick={onGoToLobby} className="w-full bg-pink-500 hover:bg-pink-400 text-black font-bold text-lg py-3 rounded-lg transition-colors shadow-lg hover:shadow-pink-500/50">{t('saveLobby')}</button>
                <button onClick={onImportClick} className="w-full bg-gray-700/80 hover:bg-gray-600/80 backdrop-blur text-white font-bold text-lg py-3 rounded-lg transition-colors shadow-lg">{t('importSaveFile')}</button>
                <button onClick={() => window.open('https://callmygod.com/teleport.php?app=80', '_blank')} className="w-full bg-blue-600/80 hover:bg-blue-500/80 backdrop-blur text-white font-bold text-lg py-3 rounded-lg transition-colors shadow-lg">💬️無限聊天群</button>
                
                {/* Footer Icons */}
                {footerIcons.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-2">
                        {footerIcons.map((icon) => (
                            <a
                                key={icon.id}
                                href={icon.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="aspect-square rounded-lg overflow-hidden bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur transition-all duration-200 hover:scale-105 shadow-lg group relative"
                                title={icon.description}
                            >
                                <img
                                    src={icon.image}
                                    alt={icon.description}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    {icon.title}
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};
const SettingsModal = ({ t, onClose, settings, setSettings, volume, setVolume, gameState, loadGameState }) => { 
    const importInputRef = useRef(null); 
    const [importStatus, setImportStatus] = useState({ message: '', error: false }); 
    const memoryValue = Math.max(2, Math.min(40, settings.memorySize ?? 20)); // 更新滑桿範圍 (2-40)
    const transparencyValue = Math.min(0.8, Math.max(0, settings.descriptionTransparency ?? 0.5));
    const handleExport = async () => { 
        try {
            const allMetadata = await db.getAllMetadataBySaveId(gameState.id);
            const exportData = {
                saveState: { ...gameState, settings: settings },
                metadata: allMetadata
            };
            const stateString = JSON.stringify(exportData, null, 2); 
            const blob = new Blob([stateString], { type: 'application/json' }); 
            const url = URL.createObjectURL(blob); 
            const a = document.createElement('a'); 
            a.href = url; 
            a.download = `lin_house_save_${Date.now()}.json`; 
            a.click(); 
            URL.revokeObjectURL(url); 
        } catch (err) {
            console.error("匯出存檔資料失敗:", err);
            alert("匯出失敗！");
        }
    }; 
    const handleImportClick = () => importInputRef.current.click(); 
    const handleFileImport = (event) => { 
        const file = event.target.files[0]; 
        if (!file) return; 
        const reader = new FileReader(); 
        reader.onload = async (e) => { 
            try { 
                const data = JSON.parse(e.target.result); 
                let success = false;
                if (data.saveState && data.saveState.player && Array.isArray(data.metadata)) {
                    success = await loadGameState(data.saveState, data.metadata);
                } else if (data.player && data.characters) { 
                    success = await loadGameState(data, []); 
                }
                
                if (success) {
                    setImportStatus({ message: t('importSuccess'), error: false }); 
                    setTimeout(() => onClose(), 1500);
                } else {
                    setImportStatus({ message: t('importError'), error: true }); 
                }
            } catch (error) { 
                setImportStatus({ message: t('importError'), error: true }); 
            } 
        }; 
        reader.readAsText(file); 
        event.target.value = ''; 
    }; 
    return (<Modal onClose={onClose} title={t('settings')}><div className="space-y-6"><div><label className="block text-gray-400 mb-2">{t('artStyle')}</label><div className="flex gap-2 rounded-lg bg-slate-950 p-1"><button onClick={() => setSettings(s => ({...s, artStyle: 'anime' }))} className={`w-full text-center rounded-md p-2 transition-colors ${settings.artStyle === 'anime' ? 'bg-pink-500 text-black font-semibold' : 'hover:bg-gray-700'}`}>{t('anime')}</button><button onClick={() => setSettings(s => ({...s, artStyle: 'realistic' }))} className={`w-full text-center rounded-md p-2 transition-colors ${settings.artStyle === 'realistic' ? 'bg-pink-500 text-black font-semibold' : 'hover:bg-gray-700'}`}>{t('realistic')}</button></div></div><div><label className="block text-gray-400 mb-2">{t('sound')}</label><button onClick={() => setSettings(s => ({...s, sound: !s.sound }))} className={`w-full text-left rounded p-2 transition-colors ${settings.sound ? 'bg-green-600' : 'bg-red-600'}`}>{settings.sound ? t('on') : t('off')}</button></div><div><label className="block text-gray-400 mb-2">{t('music')}</label><select value={settings.musicUrl || ''} onChange={(e) => setSettings(s => ({...s, musicUrl: e.target.value }))} className="w-full bg-slate-950 p-2 rounded border border-gray-600 text-white">{MUSIC_LIST.map(track => (<option key={track.name} value={track.url}>{track.name}</option>))}</select></div><div><label className="block text-gray-400 mb-2">{t('musicVolume')} ({(volume * 100).toFixed(0)}%)</label><input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/></div><div><label className="block text-gray-400 mb-2">{t('shortMemorySize')} ({memoryValue})</label><input type="range" min="2" max="40" step="1" value={memoryValue} onChange={(e) => setSettings(s => ({...s, memorySize: parseInt(e.target.value, 10) }))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/></div><div><label className="block text-gray-400 mb-2">{t('textPanelTransparency')} ({Math.round(transparencyValue * 100)}%)</label><input type="range" min="0" max="0.8" step="0.05" value={transparencyValue} onChange={(e) => setSettings(s => ({...s, descriptionTransparency: parseFloat(e.target.value) }))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/></div>{gameState && ( <div className="border-t border-gray-700 pt-6"><h3 className="text-lg font-semibold text-white mb-4">{t('saveDataManagement')}</h3><div className="flex flex-col sm:flex-row gap-4"><button onClick={handleExport} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors">{t('exportSave')}</button><button onClick={handleImportClick} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition-colors">{t('importSave')}</button><input type="file" ref={importInputRef} onChange={handleFileImport} accept=".json" className="hidden" /></div><p className={`mt-2 text-sm ${importStatus.error ? 'text-red-400' : 'text-green-400'}`}>{importStatus.message || t('importWarning')}</p></div> )}<p className="text-center text-sm text-gray-500 mt-6">{t('version')}: {CURRENT_GAME_VERSION}</p></div></Modal>)}; 
const BackpackModal = ({ t, onClose, inventory, player }) => { return (<Modal onClose={onClose} title={t('inventory')}><div className="mb-6 p-4 bg-slate-950/50 rounded-lg border border-pink-500/50 flex justify-between items-center"><h3 className="text-lg font-bold text-pink-300 flex items-center gap-2"><span className="text-2xl">NT$</span><span>{t('wallet')}</span></h3><p className="text-3xl font-bold text-pink-200 font-mono">{player.stats.money?.toLocaleString() || 0}</p></div><p className="text-gray-400 text-center py-8">{t('emptyInventory')}</p></Modal>);};
const QuestsModal = ({ t, onClose, schedule, gameDate }) => {
    const [displayDate, setDisplayDate] = useState(new Date(gameDate.year, gameDate.month - 1, 1));
    const [selectedDay, setSelectedDay] = useState(gameDate.day);

    const changeMonth = (offset) => {
        setDisplayDate(current => {
            const newDate = new Date(current);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const eventsForMonth = schedule.filter(e => e.date && e.date.year === year && e.date.month === month + 1).reduce((acc, e) => { acc[e.date.day] = (acc[e.date.day] || []).concat(e); return acc; }, {});
    const selectedEvents = selectedDay && eventsForMonth[selectedDay] ? eventsForMonth[selectedDay] : [];

    const calendarDays = [];
    const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayNames = dayKeys.map(d => t(`day_${d}_short`));
    for (let i = 0; i < firstDayOfMonth; i++) { calendarDays.push(<div key={`empty-${i}`} className="p-2 text-center"></div>); }
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === gameDate.day && month + 1 === gameDate.month && year === gameDate.year;
        const hasEvent = !!eventsForMonth[day];
        calendarDays.push(
            <div key={day} onClick={() => setSelectedDay(day)} className={`p-2 text-center border transition-colors cursor-pointer rounded-md ${isToday ? 'border-pink-400' : 'border-transparent'} ${selectedDay === day ? 'bg-pink-500/30' : 'hover:bg-slate-700'}`}>
                <span className={`${hasEvent ? 'relative text-pink-300 font-bold' : ''}`}>
                    {day}
                    {hasEvent && <span className="absolute -top-1 -right-1.5 h-2 w-2 rounded-full bg-pink-400"></span>}
                </span>
            </div>
        );
    }
    
    return (
        <Modal onClose={onClose} title={t('calendar')}>
            <div className="bg-slate-900 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-700">&lt;</button>
                    <h3 className="text-xl font-bold text-white">{`${year}${t('year')} ${month + 1}${t('month')}`}</h3>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-700">&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-sm text-center text-gray-400 mb-2">
                    {dayNames.map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">{calendarDays}</div>
            </div>
            <div className="mt-4">
                <h4 className="font-bold text-lg text-pink-300 mb-2">{selectedDay ? `${month + 1}${t('month')}${selectedDay}${t('day')} ${t('upcomingEvents')}` : t('upcomingEvents')}</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedEvents.length > 0 ? selectedEvents.map((event, index) => (
                        <div key={`${event.id}-${index}`} className="bg-slate-800 p-3 rounded-lg">
                            <h5 className="font-bold text-white">{event.title}</h5>
                            <p className="text-sm text-gray-300">{event.description}</p>
                        </div>
                    )) : <p className="text-gray-400">{selectedDay ? t('no_events_today') : t('select_date_prompt')}</p>}
                </div>
            </div>
        </Modal>
    );
};
const JournalModal = ({ t, onClose, locations, handleAction, setActiveModal }) => {
    const handleMove = (locationId) => { const location = locations.find(l => l.id === locationId); if (location) { setActiveModal(null); handleAction(`[${t('moveTo')}] ${t(location.nameKey)}`); } }; 

    return (<Modal onClose={onClose} title={t('locations')}>
        <div>
            <ul className="space-y-2 max-h-96 overflow-y-auto">
                {locations.map((loc) => (
                    <li key={loc.id} className="bg-slate-800 p-3 rounded-lg flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-lg text-pink-300">{t(loc.nameKey)}</h4>
                            <p className="text-gray-300 text-sm mt-1">{t(loc.descriptionKey)}</p>
                        </div>
                        <button onClick={() => handleMove(loc.id)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 text-sm font-bold">{t('moveTo')}</button>
                    </li>
                ))}
            </ul>
        </div>
    </Modal>);
};
const HistoryModal = ({ t, onClose, log, onSummarize, onExport, player }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [log]);

    return (
        <Modal onClose={onClose} title={t('history')}>
            <div className="mb-4 flex gap-2">
                 <button onClick={onSummarize} className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2">
                    <IconQuill /> {t('summarize_story')}
                </button>
                <button onClick={() => onExport(log, player?.name)} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2">
                    <IconDownload /> {t('export_story') || '輸出故事'}
                </button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {(log || []).map((entry, index) => (
                    <div key={index} className="bg-slate-900/50 p-3 rounded-lg border-l-4 border-pink-500">
                        <p className="text-xs text-pink-300 mb-2 font-semibold">
                            {`${entry.date.year}${t('year')} ${entry.date.month}${t('month')} ${entry.date.day}${t('day')} - ${t(entry.date.time)}`}
                        </p>
                        <p className="text-gray-200 whitespace-pre-wrap">{entry.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </Modal>
    );
};
const CommunityBoardModal = ({ t, onClose, communityLinks }) => { 
    return (
        <Modal onClose={onClose} title={t('communityBoard')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {communityLinks.map(link => (
                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg hover:from-pink-500 hover:to-purple-500 hover:text-white text-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg group">
                        <div className="flex items-center gap-4">
                            <span className="text-3xl">{link.emoji}</span>
                            <span className="font-bold text-lg">{link.name}</span>
                        </div>
                    </a>
                ))}
            </div>
        </Modal>
    ); 
};
const LoadingOverlay = ({ message }) => (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 z-40 flex flex-col items-center justify-center rounded-lg"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-400 mb-4"></div><p className="text-white text-xl font-semibold">{message}</p></motion.div>);
const SaveSelectModal = ({ t, saves, onSelect, onCreateNew, onDelete, onBack }) => { const confirmDelete = (id) => { if (window.confirm(t('confirmDelete'))) onDelete(id); }; return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"><motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl border-2 border-pink-500/60 max-h-[95vh] flex flex-col"><header className="p-6 text-center flex-shrink-0 relative"><button onClick={onBack} className="absolute top-4 left-4 text-pink-300 hover:text-white">&larr; <span className="hidden md:inline ml-1">{t('backToStart')}</span></button><h2 className="text-3xl font-bold mb-2 text-pink-300 font-title">{t('saveLobby')}</h2><p className="text-gray-400">{t('selectSave')}</p></header><div className="p-6 space-y-4 overflow-y-auto">{saves.map(save => (<div key={save.id} className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between gap-4"><div><h3 className="text-xl font-bold text-pink-300">{save.player.name}</h3><p className="text-gray-300">{`${save.gameDate.year}/${save.gameDate.month}/${save.gameDate.day}`}</p></div><div className="flex items-center gap-2"><button onClick={() => confirmDelete(save.id)} className="p-2 text-red-400 hover:bg-red-500 hover:text-white rounded-full transition-colors"><IconTrash /></button><button onClick={() => onSelect(save)} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition-colors">{t('play')}</button></div></div>))}</div><footer className="p-6 flex-shrink-0"><button onClick={onCreateNew} className="w-full bg-pink-500 hover:bg-pink-400 text-black font-bold py-3 rounded-lg transition-colors">{t('createNewSave')}</button></footer></motion.div></motion.div>);};
const GameOverModal = ({ t, onReturn, title, message }) => (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"><motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 rounded-2xl shadow-xl w-full max-w-md border-2 border-red-500 text-center p-8"><h2 className="text-5xl font-bold mb-4 text-red-500 font-title">{title || t('badEnd')}</h2><p className="text-gray-300 text-lg mb-8">{message || t('badEndMessage')}</p><button onClick={onReturn} className="w-full bg-pink-500 hover:bg-pink-400 text-black font-bold py-3 rounded-lg transition-colors">{t('backToLobby')}</button></motion.div></motion.div>);
const EndingModal = ({ t, onReturn, ending, onClose, messageLog, onExport, player }) => {
    const [index, setIndex] = useState(0);
    const images = ending.images || [];
    const hasImages = images.length > 0;
    const next = () => setIndex((i) => (i + 1) % images.length);
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 rounded-2xl shadow-xl w-full max-w-4xl border-2 border-pink-500/60 max-h-[95vh] flex flex-col overflow-hidden">
                <header className="p-4 border-b border-pink-500/40 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-pink-300 font-title">{ending.title || t('ending')}</h2>
                    <button onClick={onClose} className="text-gray-300 hover:text-white"><IconClose /></button>
                </header>
                <div className="flex flex-col md:flex-row gap-4 p-4 overflow-y-auto">
                    <div className="flex-1 min-h-[240px] bg-black/30 rounded-lg border border-pink-500/40 relative flex items-center justify-center">
                        {hasImages ? (
                            <>
                                <img src={images[index]} alt="Ending" className="max-h-[50vh] md:max-h-[70vh] object-contain rounded-lg" />
                                {images.length > 1 && (
                                    <>
                                        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full">&lt;</button>
                                        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full">&gt;</button>
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                            {images.map((_, i) => (<span key={i} className={`h-1.5 w-4 rounded-full ${i === index ? 'bg-pink-400' : 'bg-gray-600'}`} />))}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="text-gray-400 p-4">{t('viewMemories')}</div>
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{ending.title || t('ending')}</h3>
                        <p className="text-gray-300 whitespace-pre-wrap">{ending.summary}</p>
                    </div>
                </div>
                <footer className="p-4 border-t border-pink-500/40 flex flex-col md:flex-row gap-3">
                    <button onClick={() => onExport(messageLog, player?.name)} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <IconDownload /> {t('export_story') || '輸出故事'}
                    </button>
                    <button onClick={onReturn} className="flex-1 bg-pink-500 hover:bg-pink-400 text-black font-bold py-3 rounded-lg transition-colors">{t('returnToAlbum')}</button>
                    <button onClick={onClose} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors">{t('backToLobby')}</button>
                </footer>
            </motion.div>
        </motion.div>
    );
};
const AvatarModal = ({ onClose, avatarSrc }) => {
    // Determine if avatarSrc is a URL or Base64 (simple check)
    const isUrl = typeof avatarSrc === 'string' && (avatarSrc.startsWith('http') || avatarSrc.startsWith('https'));
    const src = isUrl ? avatarSrc : `data:image/jpeg;base64,${avatarSrc}`;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative" onClick={e => e.stopPropagation()}>
                <img src={src} alt="Enlarged Avatar" className="max-w-[80vw] max-h-[80vh] rounded-lg shadow-2xl" />
                <button onClick={onClose} className="absolute -top-3 -right-3 bg-white rounded-full p-1 text-black"><IconClose /></button>
            </motion.div>
        </motion.div>
    );
};

const VersionCheckModal = ({ t, onClose, onUpdate, newVersion, currentVersion }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 rounded-2xl shadow-xl w-full max-w-md border-2 border-yellow-500 text-center p-8">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300 font-title">{t('versionUpdateTitle')}</h2>
            <p className="text-gray-300 text-lg mb-8">
                {t('versionUpdateMessage', { newVersion: newVersion, currentVersion: currentVersion })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={onUpdate} className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg transition-colors">
                    {t('versionUpdateGoToNew')}
                </button>
                <button onClick={onClose} className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition-colors">
                    {t('versionUpdateUseOld')}
                </button>
            </div>
        </motion.div>
    </motion.div>
);

const ContactsModal = ({ t, onClose, contacts, characterAvatars, handleAction, setActiveModal, setEnlargedAvatar, onGetFeed, onGetAdvice, onGetOutfit }) => {
    const getFriendlinessColor = (score) => { if (score > 500) return 'text-pink-400'; if (score > 100) return 'text-pink-300'; if (score < -500) return 'text-blue-400'; if (score < -100) return 'text-blue-300'; return 'text-gray-300'; };
    const handleContact = (contactName) => { setActiveModal(null); handleAction(`[${t('contact')}] ${contactName}`); };

    return (<Modal onClose={onClose} title={t('contacts')}>
        <div>
            <ul className="space-y-3 max-h-96 overflow-y-auto">
                {contacts
                    .filter(contact => contact.relationship.stage !== 'stranger')
                    .map((contact) => (<li key={contact.id} className="bg-slate-800 p-3 rounded-lg flex flex-col sm:flex-row gap-4">
                    {/* 更新：使用 CHARACTER_IMAGE_URLS 直接顯示網址圖片 */}
                    <div onClick={() => setEnlargedAvatar(CHARACTER_IMAGE_URLS[contact.id])} className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-pink-400/50 cursor-pointer transition-transform hover:scale-110 mx-auto sm:mx-0">
                        {CHARACTER_IMAGE_URLS[contact.id] ? <img src={CHARACTER_IMAGE_URLS[contact.id]} alt={contact.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-700"></div>}
                    </div>
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-lg text-pink-300">{contact.name}</h4>
                                <p className="text-sm text-cyan-400">{t(`relationship_stages.${contact.relationship.stage}`)}</p>
                            </div>
                            <div className="text-right flex items-center gap-1">
                                <IconHeart className={`w-5 h-5 ${getFriendlinessColor(contact.relationship.affection)}`}/>
                                <span className={`font-bold text-lg ${getFriendlinessColor(contact.relationship.affection)}`}>{contact.relationship.affection}</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{t(contact.profile?.identityKey || '')}</p>
                        <div className="flex gap-2 mt-2">
                             <button onClick={() => onGetFeed(contact)} className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-3 rounded text-sm transition-colors">
                                <IconRss />
                            </button>
                            <button onClick={() => handleContact(contact.name)} className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-1 px-3 rounded text-sm transition-colors">{t('contact')}</button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                             <button onClick={() => onGetAdvice(contact)} className="flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-3 rounded text-sm transition-colors">
                                <IconLightBulb /> {t('get_advice')}
                            </button>
                             <button onClick={() => onGetOutfit(contact)} className="flex items-center justify-center gap-1.5 bg-pink-600 hover:bg-pink-500 text-white font-bold py-1 px-3 rounded text-sm transition-colors">
                                <IconTshirt /> {t('prepare_outfit')}
                            </button>
                        </div>
                    </div>
                </li>))}
            </ul>
        </div>
    </Modal>);
};

const AiContentModal = ({ t, onClose, title, content, isLoading }) => (
    <Modal onClose={onClose} title={title}>
        {isLoading ? (
            <div className="flex flex-col items-center justify-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-400 mb-4"></div>
                <p className="text-white">{t('generating_content')}</p>
            </div>
        ) : (
            <div className="text-gray-200 whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
                {content}
            </div>
        )}
    </Modal>
);

const StatusBar = ({ label, value, maxValue, colorClass, showValue = false }) => (<div className="w-full mb-1"><div className="flex justify-between text-xs font-semibold mb-0.5"><span className="text-gray-300">{label}</span>{showValue && <span className="text-white">{Math.floor(value)} / {Math.floor(maxValue)}</span>}</div><div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden"><motion.div className={`${colorClass} h-3 rounded-full`} initial={{ width: 0 }} animate={{ width: `${(value / maxValue) * 100}%` }} transition={{ duration: 0.5 }} /></div></div>);

export default App;
