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

// --- 遊戲資料 (梨々香的秘密) ---
const PLAYER_STATS = { academics: '學業', money: '金錢', stamina: '體力', stress: '壓力', charm: '魅力' };
const HEROINE_PROFILES = {
    ririka: { id: "ririka", name: "真田 梨々香", age: 28, gender: "female", social: "https://x.com/ririkaDDC", profile: { identityKey: "identity_ririka", appearance: "成熟、知性且保養得宜，擁有出眾的氣質與溫柔的眼神，不經意間流露出性感的魅力。25 years old Japanese woman，身材姣好，上圍豐滿。", personality: "溫柔包容，聰明且善解-人意。身為單親媽媽，她堅強而獨立，但內心深處也渴望著能被依賴和關愛。對於玩家，她既有著長輩的慈愛，偶爾也會流露出女性的脆弱。", background: "芽依的母親，玩家母親的摯友。獨自一人將女兒撫養長大，在學術界有著相當的聲望。" }, gameplayInfo: { difficulty: 5, strategy: "需要玩家展現超越年齡的成熟、責任感與體貼。理解她身為人母與教授的雙重壓力，成為她的心靈支柱是關鍵。" } },
    mei: { id: "mei", name: "真田 芽依", age: 19, gender: "female", social: "https://x.com/oxMimigirl", profile: { identityKey: "identity_mei", appearance: "活潑可愛，遺傳了母親的優良基因，留著一頭烏黑亮麗的長髮，充滿青春活力。20 years old Japanese woman，身材姣好，上圍豐滿。", personality: "外向開朗，略帶一點傲嬌。對突然搬進家裡的「哥哥」感到好奇又有點彆扭。熟悉之後會變得非常依賴，是個需要被照顧的妹妹型角色。", background: "梨々香的女兒，與玩家一同居住在真田家。剛剛成為大學新鮮人，對大學生活充滿期待與不安。" }, gameplayInfo: { difficulty: 3, strategy: "需要玩家的耐心與陪伴。透過日常的校園與家庭互動，累積信任感，並在她需要時給予支持。" } },
    yuina: { id: "yuina", name: "深田 結菜", age: 28, gender: "female", social: "https://x.com/0xCutecat2003", profile: { identityKey: "identity_yuina", appearance: "戴著眼鏡，充滿專業氣息的職場女性。身材高挑，留著一頭烏黑俏麗的bob cut短髮，穿著幹練的套裝，散發著禁慾的美感。25 years old Japanese woman，身材姣好，上圍豐滿。", personality: "表面上嚴肅、認真且一絲不苟，是個工作狂。但私下有著意外的反差萌，喜歡可愛的東西和甜食。不擅長處理戀愛關係。", background: "梨々香在大學的同事兼好友，經常拜訪真田家。是學術界的後起之秀，對自己和他人都有嚴格的要求。" }, gameplayInfo: { difficulty: 4, strategy: "需要在學業上展現出色的能力以獲得她的認可。攻略的核心在於如何敲開她冰冷的外殼，發現她不為人知的一面。" } },
    rin: { id: "rin", name: "霧野 凜", age: 20, gender: "female", social: "https://x.com/CyborgGirl2023", profile: { identityKey: "identity_rin", appearance: "神秘的冰山美人。擁有一頭及腰的黑長直髮和白皙的皮膚，眼神總是帶著一絲疏離感。20 years old Japanese woman，身材姣好，上圍豐滿。", personality: "高冷、寡言，難以接近。家境優渥，是個典型的千金大小姐，但似乎有著不為人知的煩惱。對許多事物都提不起興趣。", background: "玩家的同級生，但兩人幾乎沒有交集。在校園裡是名人，但沒人真正了解她。" }, gameplayInfo: { difficulty: 5, strategy: "需要極大的耐心和敏銳的觀察力。她不會輕易敞開心扉，玩家需要透過各種事件慢慢了解她的過去和內心世界。" } },
    mayuri: { id: "mayuri", name: "早川 麻百合", age: 24, gender: "female", social: "https://x.com/Mayuri2000AA", profile: { identityKey: "identity_mayuri", appearance: "妝容精緻，造型百變。無論是 Cosplay 還是日常穿搭都非常時尚，擁有火辣的身材和一雙電眼。20 years old Japanese woman，身材姣好，上圍豐滿。", personality: "大膽、熱情且思想開放。對自己熱愛的事物充滿自信，行動力極強。看似玩世不恭，對待感情卻有著自己獨特的原則。", background: "在秋葉原活動時與玩家偶然相遇。她的網絡 persona 和私下的樣子似乎有些不同。" }, gameplayInfo: { difficulty: 3, strategy: "需要玩家尊重並融入她的興趣圈。與她在一起的生活充滿刺激與樂趣，但玩家也需要證明自己不是一個無趣的人。" } }
};
const LOCATIONS = [
    { id: "sanada_house", nameKey: "location_sanada_house_name", descriptionKey: "location_sanada_house_description", type: "據點" },
    { id: "teito_university", nameKey: "location_teito_university_name", descriptionKey: "location_teito_university_description", type: "學術" },
    { id: "shibuya", nameKey: "location_shibuya_name", descriptionKey: "location_shibuya_description", type: "商業區" },
    { id: "shinjuku", nameKey: "location_shinjuku_name", descriptionKey: "location_shinjuku_description", type: "商業區" },
    { id: "akihabara", nameKey: "location_akihabara_name", descriptionKey: "location_akihabara_description", type: "次文化" },
    { id: "cafe", nameKey: "location_cafe_name", descriptionKey: "location_cafe_description", type: "打工" },
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

const CURRENT_GAME_VERSION = "V1.3.0"; // 遊戲當前版本

// --- 語言/翻譯 (i18n) ---
const translations = { 
    'zh-TW': {
        gameTitle: '梨々香的秘密', gameSubtitle: "Ririka's Secret", settings: '系統設定', possessions: '持有物', player: '玩家狀態', schedule: '行事曆', destiny: '運命干涉', sound: '音效', on: '開', off: '關', createNewSave: '新的開始', noSaveFound: '未找到任何存檔', welcome: '東京的霓虹，正等著譜寫你的故事。', playerName: '你的名字', uploadFace: '上傳你的照片', uploadPrompt: '請上傳一張清晰的正面照片，這將成為你在東京的模樣。', startGame: '開始東京生活', loadingLLM: '進行中...', loadingImage: '場景繪製中...', loadingWorld: '正在構築東京的日常...', stamina: '體力', stress: '壓力', academics: '學業', charm: '魅力', relax: '在家休息', inventory: '持有物', emptyInventory: '你的包包空無一物。', playerSheet: '玩家狀態', coreAttributes: '個人屬性', money: '円', year: '年', month: '月', day: '日', time: '時段', morning: '上午', afternoon: '下午', evening: '晚上', apiError: '與故事伺服器的連結不穩定，請稍後再試。', customActionPlaceholder: '自由輸入你的行動...', toggleCustomAction: '自由行動', submit: '確定', music: '背景音樂', musicVolume: '音樂音量', none: '無', saveDataManagement: '存檔管理', exportSave: '匯出存檔', importSave: '匯入存檔', importWarning: '匯入將覆蓋當前進度。', importSuccess: '存檔成功載入！', importError: '讀取存檔失敗，檔案格式不正確。', artStyle: '畫風選擇', anime: '日系動畫', realistic: '寫實光影', saveLobby: '回憶相簿', selectSave: '選擇你的故事線', play: '繼續故事', delete: '刪除檔案', confirmDelete: '確定要刪除這個故事嗎？所有回憶都將煙消云散。', badEnd: '遊戲結束', badEndMessage: '你的東京故事，在此劃下句點...', backToLobby: '回到相簿', importSaveFile: '讀取回憶', journal: '東京日誌', communityBoard: '無限世界社群', version: '版本', wallet: '錢包', backToStart: '返回主選單', destinyPoints: '命運絲線', destinyAcquisition: '絲線獲取', destinyActions: '劇本干涉', worldInterference: '奇蹟時刻', interferencePlaceholder: '輸入你希望發生的奇蹟...', interferenceCost: '本次干涉需消耗', insufficientPoints: '命運絲線不足', locations: '地點', contacts: '聯絡人', moveTo: '前往', friendliness: '好感度', contact: '聯絡', age: '年齡', calendar: '行事曆', upcomingEvents: '本日行程', history: '訊息紀錄', link_creator: '遊戲原創-欣欣', link_website: '官方網站', bad_ending_academics: '學業退學', bad_ending_academics_message: '由於學業成績過低，你收到了帝都大學的退學通知。夢想破滅，你只能收拾行囊，黯然離開東京...', relationship_stages: { stranger: '陌生人', acquaintance: '認識', friend: '朋友', close_friend: '摯友', interested: '在意', crush: '喜歡', lover: '戀人' }, language: '語言',
        listen_tts: '🔊 聆聽', tts_error: '語音轉換失敗',
        destiny_acquisition_desc: '當遊戲中的重大事件發生，或你做出觸動命運的關鍵抉擇時，將會獲得命運絲線。',
        ai_feed_title: "{name} 的動態", ai_advice_title: "關係建議", ai_summary_title: "故事總結", ai_outfit_title: "約會穿搭建議", get_advice: "獲取建議", summarize_story: "總結故事", export_story: "輸出故事", prepare_outfit: "準備穿搭", feed: "動態", generating_content: "正在為您生成內容...",
        location_sanada_house_name: '真田家', location_sanada_house_description: '溫馨的日式獨棟住宅，你與梨々香、芽依共同生活的地方。', location_teito_university_name: '帝都大學', location_teito_university_description: '你和多位女主角的學術舞台，充滿機遇與挑戰。', location_shibuya_name: '澀谷', location_shibuya_description: '流行與約會的聖地，年輕人聚集的潮流中心。', location_shinjuku_name: '新宿', location_shinjuku_description: '繁華的不夜城，適合享受更成熟的夜生活。', location_akihabara_name: '秋葉原', location_akihabara_description: '動漫與電子產品的天堂，御宅文化的中心。', location_cafe_name: '咖啡廳', location_cafe_description: '你打工的地方，可以觀察到形形色色的人。',
        identity_ririka: '帝都大學社會心理學教授', identity_mei: '帝都大學一年級學生', identity_yuina: '帝都大學助理教授', identity_rin: '帝都大學二年級學生', identity_mayuri: '人氣 Cosplayer 兼 Youtuber',
        initial_description: '你終於抵達了東京的新家——真田宅。門口，一位溫柔美麗的女性對你微笑。「你就是{playerName}君吧？我是真田梨々香，歡迎你。」旁邊，一個俏麗的長髮女孩好奇地打量著你。你的新生活，就此展開。',
        initial_action_1: '向梨々香さん問好。', initial_action_2: '向長髮女孩打招呼。', initial_action_3: '先進去放行李。',
        day_sun_short: '日', day_mon_short: '一', day_tue_short: '二', day_wed_short: '三', day_thu_short: '四', day_fri_short: '五', day_sat_short: '六', no_events_today: '本日無行程。', select_date_prompt: '請選擇日期以查看行程。',
        versionUpdateTitle: '發現新版本',
        versionUpdateMessage: '我們發現了新版本 {newVersion}！您目前使用的是 {currentVersion}。',
        versionUpdateGoToNew: '跳轉新版本',
        versionUpdateUseOld: '使用舊版本',
        shortMemorySize: '短期記憶量',
        textPanelTransparency: '文字面板透明度',
        ending: '結局',
        viewMemories: '回憶輪播',
        returnToAlbum: '返回相簿'
    },
    'zh-CN': {
        gameTitle: '梨々香的秘密', gameSubtitle: "Ririka's Secret", settings: '系统设定', possessions: '持有物', player: '玩家状态', schedule: '行事历', destiny: '运命干涉', sound: '音效', on: '开', off: '关', createNewSave: '新的开始', noSaveFound: '未找到任何存档', welcome: '东京的霓虹，正等着谱写你的故事。', playerName: '你的名字', uploadFace: '上传你的照片', uploadPrompt: '请上传一张清晰的正面照片，这将成为你在东京的模样。', startGame: '开始东京生活', loadingLLM: '进行中...', loadingImage: '场景绘制中...', loadingWorld: '正在构筑东京的日常...', stamina: '体力', stress: '压力', academics: '学业', charm: '魅力', relax: '在家休息', inventory: '持有物', emptyInventory: '你的包包空无一物。', playerSheet: '玩家状态', coreAttributes: '个人属性', money: '円', year: '年', month: '月', day: '日', time: '时段', morning: '上午', afternoon: '下午', evening: '晚上', apiError: '与故事服务器的连结不稳定，请稍后再试。', customActionPlaceholder: '自由输入你的行动...', toggleCustomAction: '自由行动', submit: '确定', music: '背景音乐', musicVolume: '音乐音量', none: '无', saveDataManagement: '存档管理', exportSave: '汇出存档', importSave: '汇入存档', importWarning: '汇入将覆盖当前进度。', importSuccess: '存档成功载入！', importError: '读取存档失败，档案格式不正确。', artStyle: '画风选择', anime: '日系动画', realistic: '写实光影', saveLobby: '回忆相簿', selectSave: '选择你的故事线', play: '继续故事', delete: '删除档案', confirmDelete: '确定要删除这个故事吗？所有回忆都将烟消云散。', badEnd: '游戏结束', badEndMessage: '你的东京故事，在此划下句点...', backToLobby: '回到相簿', importSaveFile: '读取回忆', journal: '东京日志', communityBoard: '无限世界社群', version: '版本', wallet: '钱包', backToStart: '返回主选单', destinyPoints: '命运丝线', destinyAcquisition: '丝线获取', destinyActions: '剧本干涉', worldInterference: '奇迹时刻', interferencePlaceholder: '输入你希望发生的奇迹...', interferenceCost: '本次干涉需消耗', insufficientPoints: '命运丝线不足', locations: '地点', contacts: '联络人', moveTo: '前往', friendliness: '好感度', contact: '联絡', age: '年龄', calendar: '行事历', upcomingEvents: '本日行程', history: '讯息纪录', link_creator: '游戏原创-欣欣', link_website: '官方网站', bad_ending_academics: '学业退学', bad_ending_academics_message: '由于学业成绩过低，你收到了帝都大学的退学通知。梦想破灭，你只能收拾行囊，黯然离开东京...', relationship_stages: { stranger: '陌生人', acquaintance: '认识', friend: '朋友', close_friend: '挚友', interested: '在意', crush: '喜欢', lover: '恋人' }, language: '语言',
        listen_tts: '🔊 聆听', tts_error: '语音转换失败',
        destiny_acquisition_desc: '当游戏中的重大事件发生，或你做出触动命运的关键抉择时，将会获得命运丝线。',
        ai_feed_title: "{name} 的动态", ai_advice_title: "关系建议", ai_summary_title: "故事总结", ai_outfit_title: "约会穿搭建议", get_advice: "获取建议", summarize_story: "总结故事", export_story: "输出故事", prepare_outfit: "准备穿搭", feed: "动态", generating_content: "正在为您生成内容...",
        location_sanada_house_name: '真田家', location_sanada_house_description: '温馨的日式独栋住宅，你与梨々香、芽依共同生活的地方。 ', location_teito_university_name: '帝都大学', location_teito_university_description: '你和多位女主角的学术舞台，充满机遇与挑战。 ', location_shibuya_name: '涩谷', location_shibuya_description: '流行与约会的圣地，年轻人聚集的潮流中心。 ', location_shinjuku_name: '新宿', location_shinjuku_description: '繁华的不夜城，适合享受更成熟的夜生活。 ', location_akihabara_name: '秋叶原', location_akihabara_description: '动漫与电子产品的天堂，御宅文化的中心。 ', location_cafe_name: '咖啡厅', location_cafe_description: '你打工的地方，可以观察到形形色色的人。 ',
        identity_ririka: '帝都大学社会心理学教授', identity_mei: '帝都大学一年级学生', identity_yuina: '帝都大学助理教授', identity_rin: '帝都大学二年级学生', identity_mayuri: '人气 Cosplayer 兼 Youtuber',
        initial_description: '你终于抵达了东京的新家——真田宅。门口，一位温柔美丽的女性对你微笑。 「你就是{playerName}君吧？我是真田梨々香，欢迎你。」旁边，一个俏丽的长发女孩好奇地打量着你。你的新生活，就此展开。 ',
        initial_action_1: '向梨々香小姐问好。', initial_action_2: '向長髮女孩打招呼。', initial_action_3: '先進去放行李。',
        day_sun_short: '日', day_mon_short: '一', day_tue_short: '二', day_wed_short: '三', day_thu_short: '四', day_fri_short: '五', day_sat_short: '六', no_events_today: '本日无行程。', select_date_prompt: '请选择日期以查看行程。',
        versionUpdateTitle: '发现新版本',
        versionUpdateMessage: '我们发现了新版本 {newVersion}！您目前使用的是 {currentVersion}。',
        versionUpdateGoToNew: '跳转新版本',
        versionUpdateUseOld: '使用旧版本',
        shortMemorySize: '短期记忆量',
        textPanelTransparency: '文字面板透明度',
        ending: '结局',
        viewMemories: '回忆轮播',
        returnToAlbum: '返回相簿'
    },
    'en': {
        gameTitle: "Ririka's Secret", gameSubtitle: "A Tokyo Story", settings: 'Settings', possessions: 'Inventory', player: 'Status', schedule: 'Calendar', destiny: 'Destiny', sound: 'Sound', on: 'On', off: 'Off', createNewSave: 'New Game', noSaveFound: 'No saves found', welcome: "Tokyo's neon lights await your story.", playerName: 'Your Name', uploadFace: 'Upload Your Photo', uploadPrompt: 'Please upload a clear, front-facing photo. This will be your face in Tokyo.', startGame: 'Begin Tokyo Life', loadingLLM: 'In Progress...', loadingImage: 'Drawing the scene...', loadingWorld: 'Building the world of Tokyo...', stamina: 'Stamina', stress: 'Stress', academics: 'Academics', charm: 'Charm', relax: 'Rest at Home', inventory: 'Inventory', emptyInventory: 'Your bag is empty.', playerSheet: 'Player Status', coreAttributes: 'Core Attributes', money: 'Yen', year: 'Year', month: 'Month', day: 'Day', time: 'Time', morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening', apiError: 'Connection to the story server is unstable. Please try again later.', customActionPlaceholder: 'Enter your custom action...', toggleCustomAction: 'Custom Action', submit: 'Submit', music: 'BGM', musicVolume: 'Music Volume', none: 'None', saveDataManagement: 'Save Management', exportSave: 'Export Save', importSave: 'Import Save', importWarning: 'Importing will overwrite current progress.', importSuccess: 'Save loaded successfully!', importError: 'Failed to load save. Invalid file format.', artStyle: 'Art Style', anime: 'Anime', realistic: 'Realistic', saveLobby: 'Memory Album', selectSave: 'Choose your storyline', play: 'Continue', delete: 'Delete', confirmDelete: 'Are you sure you want to delete this story? All memories will be lost.', badEnd: 'Game Over', badEndMessage: 'Your Tokyo story ends here...', backToLobby: 'Back to Album', importSaveFile: 'Load Memory', journal: 'Tokyo Journal', communityBoard: 'Infinite Worlds Community', version: 'Version', wallet: 'Wallet', backToStart: 'Back to Main Menu', destinyPoints: 'Threads of Fate', destinyAcquisition: 'Acquiring Threads', destinyActions: 'Script Intervention', worldInterference: 'Miracle Moment', interferencePlaceholder: 'Describe the miracle you wish to happen...', interferenceCost: 'This interference will cost', insufficientPoints: 'Not enough Threads of Fate.', locations: 'Locations', contacts: 'Contacts', moveTo: 'Go to', friendliness: 'Affection', contact: 'Contact', age: 'Age', calendar: 'Calendar', upcomingEvents: "Today's Schedule", history: 'Message Log', link_creator: 'Creator: Shin-Shin', link_website: 'Official Website', bad_ending_academics: 'Expelled from University', bad_ending_academics_message: 'Due to poor academic performance, you have been expelled from Teito University. Your dreams shattered, you pack your bags and leave Tokyo in despair...', relationship_stages: { stranger: 'Stranger', acquaintance: 'Acquaintance', friend: 'Friend', close_friend: 'Close Friend', interested: 'Interested', crush: 'Crush', lover: 'Lover' }, language: 'Language',
        listen_tts: '🔊 Listen', tts_error: 'Speech conversion failed',
        destiny_acquisition_desc: "You will acquire Threads of Fate when significant events occur or when you make critical choices that alter destiny.",
        ai_feed_title: "{name}'s Feed", ai_advice_title: "Relationship Advice", ai_summary_title: "Story Summary", ai_outfit_title: "Date Outfit Suggestion", get_advice: "Get Advice", summarize_story: "Summarize Story", export_story: "Export Story", prepare_outfit: "Prepare Outfit", feed: "Feed", generating_content: "Generating content for you...",
        location_sanada_house_name: 'Sanada House', location_sanada_house_description: 'A cozy Japanese-style house where you live with Ririka and Mei.', location_teito_university_name: 'Teito University', location_teito_university_description: 'The academic stage for you and several heroines, full of opportunities and challenges.', location_shibuya_name: 'Shibuya', location_shibuya_description: 'A holy land for trends and dates, a fashion center for young people.', location_shinjuku_name: 'Shinjuku', location_shinjuku_description: 'A bustling city that never sleeps, suitable for enjoying a more mature nightlife.', location_akihabara_name: 'Akihabara', location_akihabara_description: 'A paradise for anime and electronics, the center of otaku culture.', location_cafe_name: 'Cafe', location_cafe_description: 'The place where you work part-time, allowing you to observe all sorts of people.',
        identity_ririka: 'Teito University Social Psychology Professor', identity_mei: 'Teito University Freshman', identity_yuina: 'Teito University Assistant Professor', identity_rin: 'Teito University Sophomore', identity_mayuri: 'Popular Cosplayer & Youtuber',
        initial_description: 'You\'ve finally arrived at your new home in Tokyo—the Sanada residence. At the door, a gentle and beautiful woman smiles at you. "You must be {playerName}-kun? I\'m Ririka Sanada, welcome." Beside her, a girl with long, stylish hair sizes you up with curiosity. Your new life begins now.',
        initial_action_1: 'Greet Ms. Ririka.', initial_action_2: 'Say hello to the long-haired girl.', initial_action_3: 'Go inside and put down your luggage first.',
        day_sun_short: 'Sun', day_mon_short: 'Mon', day_tue_short: 'Tue', day_wed_short: 'Wed', day_thu_short: 'Thu', day_fri_short: 'Fri', day_sat_short: 'Sat', no_events_today: 'No events today.', select_date_prompt: 'Select a date to see events.',
        versionUpdateTitle: 'New Version Found',
        versionUpdateMessage: 'We found a new version {newVersion}! You are currently on {currentVersion}.',
        versionUpdateGoToNew: 'Go to New Version',
        versionUpdateUseOld: 'Use Old Version',
        shortMemorySize: 'Short-Term Memory Size',
        textPanelTransparency: 'Text Panel Transparency',
        ending: 'Ending',
        viewMemories: 'Memory Slideshow',
        returnToAlbum: 'Return to Album'
    },
    'ja': {
        gameTitle: '梨々香の秘密', gameSubtitle: "Ririka's Secret", settings: 'システム設定', possessions: '所持品', player: 'ステータス', schedule: 'スケジュール', destiny: '運命干渉', sound: 'サウンド', on: 'オン', off: 'オフ', createNewSave: '新しく始める', noSaveFound: 'セーブデータが見つかりません', welcome: '東京のネオンが、あなたの物語を待っている。', playerName: 'あなたの名前', uploadFace: '顔写真をアップロード', uploadPrompt: '鮮明な正面の顔写真をアップロードしてください。これが東京でのあなたの姿になります。', startGame: '東京生活を始める', loadingLLM: '進行中...', loadingImage: 'シーンを描画中...', loadingWorld: '東京の日常を構築中...', stamina: '体力', stress: 'ストレス', academics: '学力', charm: '魅力', relax: '家で休む', inventory: '所持品', emptyInventory: 'バッグは空っぽです。', playerSheet: 'ステータス', coreAttributes: '基本能力', money: '円', year: '年', month: '月', day: '日', time: '時間帯', morning: '午前', afternoon: '午後', evening: '夜', apiError: 'ストーリーサーバーとの接続が不安定です。しばらくしてからもう一度お試しください。', customActionPlaceholder: '自由に行動を入力...', toggleCustomAction: '自由行動', submit: '決定', music: 'BGM', musicVolume: '音楽の音量', none: 'なし', saveDataManagement: 'セーブ管理', exportSave: 'セーブをエクスポート', importSave: 'セーブをインポート', importWarning: 'インポートすると現在の進行状況は上書きされます。', importSuccess: 'セーブデータを正常にロードしました！', importError: 'セーブの読み込みに失敗しました。ファイル形式が正しくありません。', artStyle: '画風選択', anime: 'アニメ風', realistic: 'リアル風', saveLobby: '思い出のアルバム', selectSave: 'あなたの物語を選択', play: '続ける', delete: '削除', confirmDelete: 'この物語を本当に削除しますか？すべての思い出が消えてしまいます。', badEnd: 'ゲームオーバー', badEndMessage: 'あなたの東京の物語は、ここで幕を閉じた…', backToLobby: 'アルバムに戻る', importSaveFile: '思い出を読み込む', journal: '東京日誌', communityBoard: '無限世界コミュニティ', version: 'バージョン', wallet: '財布', backToStart: 'メインメニューに戻る', destinyPoints: '運命の糸', destinyAcquisition: '糸の入手', destinyActions: '脚本干渉', worldInterference: '奇跡の瞬間', interferencePlaceholder: '起こしたい奇跡を入力してください...', interferenceCost: '今回の干渉には消費します', insufficientPoints: '運命の糸が不足しています。', locations: '場所', contacts: '連絡先', moveTo: '移動', friendliness: '好感度', contact: '連絡', age: '年齢', calendar: 'カレンダー', upcomingEvents: '本日の予定', history: 'メッセージ履歴', link_creator: 'ゲーム原案 - 欣欣', link_website: '公式サイト', bad_ending_academics: '大学除籍', bad_ending_academics_message: '学業成績の不振により、帝都大学から除籍通知が届いた。夢は破れ、あなたは荷物をまとめ、悄然と東京を去るしかなかった…', relationship_stages: { stranger: '他人', acquaintance: '知り合い', friend: '友達', close_friend: '親友', interested: '気になる', crush: '好き', lover: '恋人' }, language: '言語',
        listen_tts: '🔊 聴く', tts_error: '音声変換に失敗しました',
        destiny_acquisition_desc: "ゲーム内で重大なイベントが発生したり、運命を左右する重要な選択をしたりすると、運命の糸を手に入れることができます。",
        ai_feed_title: "{name}のフィード", ai_advice_title: "関係アドバイス", ai_summary_title: "ストーリーまとめ", ai_outfit_title: "デートコーデ提案", get_advice: "アドバイスをもらう", summarize_story: "物語を要約", export_story: "輸出物語", prepare_outfit: "コーデを準備", feed: "フィード", generating_content: "コンテンツを生成中...",
        location_sanada_house_name: '真田家', location_sanada_house_description: '温かい和風の一軒家。あなたと梨々香、芽依が共に暮らす場所。', location_teito_university_name: '帝都大学', location_teito_university_description: 'あなたとヒロインたちの学問の舞台。チャンスと挑戦に満ちている。', location_shibuya_name: '渋谷', location_shibuya_description: '流行とデートの聖地。若者が集まるトレンドの中心。', location_shinjuku_name: '新宿', location_shinjuku_description: '眠らない繁華街。少し大人びた夜の遊びに最適。', location_akihabara_name: '秋葉原', location_akihabara_description: 'アニメと電子機器の天国。オタク文化の中心地。', location_cafe_name: 'カフェ', location_cafe_description: 'あなたのバイト先。様々な人々を観察できる。',
        identity_ririka: '帝都大学社会心理学教授', identity_mei: '帝都大学一年生', identity_yuina: '帝都大学助教', identity_rin: '帝都大学二年生', identity_mayuri: '人気コスプレイヤー兼Youtuber',
        initial_description: 'ついに東京の新居、真田家に到着した。玄関先で、優しく美しい女性があなたに微笑みかける。「あなたが{playerName}君ね？私は真田梨々香。ようこそ。」隣では、ショートカットが似合う快活な少女が興味深そうにあなたを見ている。あなたの新しい生活が、今始まる。',
        initial_action_1: '梨々香さんによろしくと挨拶する。', initial_action_2: 'ショートカットの少女に声をかける。', initial_action_3: 'まず中に入って荷物を置く。',
        day_sun_short: '日', day_mon_short: '月', day_tue_short: '火', day_wed_short: '水', day_thu_short: '木', day_fri_short: '金', day_sat_short: '土', no_events_today: '本日は予定がありません。', select_date_prompt: '日付を選択して予定を確認してください。',
        versionUpdateTitle: '新バージョンが検出されました',
        versionUpdateMessage: '新しいバージョン {newVersion} が見つかりました！現在お使いのバージョンは {currentVersion} です。',
        versionUpdateGoToNew: '新バージョンへ移動',
        versionUpdateUseOld: '旧バージョンを使用',
        shortMemorySize: '短期記憶サイズ',
        textPanelTransparency: 'テキストパネルの透明度',
        ending: 'エンディング',
        viewMemories: '思い出スライドショー',
        returnToAlbum: 'アルバムに戻る'
    },
    'ko': {
        gameTitle: '리리카의 비밀', gameSubtitle: "Ririka's Secret", settings: '시스템 설정', possessions: '소지품', player: '플레이어 상태', schedule: '스케줄', destiny: '운명 간섭', sound: '사운드', on: '켜기', off: '끄기', createNewSave: '새로 시작', noSaveFound: '저장 파일을 찾을 수 없습니다', welcome: '도쿄의 네온이 당신의 이야기를 기다리고 있습니다.', playerName: '당신의 이름', uploadFace: '사진 업로드', uploadPrompt: '선명한 정면 사진을 업로드해주세요. 이것이 도쿄에서의 당신의 모습이 됩니다.', startGame: '도쿄 생활 시작하기', loadingLLM: '진행 중...', loadingImage: '장면 그리는 중...', loadingWorld: '도쿄의 일상을 구축하는 중...', stamina: '체력', stress: '스트레스', academics: '학업', charm: '매력', relax: '집에서 휴식', inventory: '소지품', emptyInventory: '가방이 비어있습니다.', playerSheet: '플레이어 상태', coreAttributes: '핵심 능력치', money: '엔', year: '년', month: '월', day: '일', time: '시간대', morning: '오전', afternoon: '오후', evening: '저녁', apiError: '스토리 서버와의 연결이 불안정합니다. 잠시 후 다시 시도해주세요.', customActionPlaceholder: '자유 행동 입력...', toggleCustomAction: '자유 행동', submit: '결정', music: '배경 음악', musicVolume: '음악 볼륨', none: '없음', saveDataManagement: '저장 관리', exportSave: '저장 내보내기', importSave: '저장 불러오기', importWarning: '불러오기를 하면 현재 진행 상황이 덮어쓰기 됩니다.', importSuccess: '저장 파일을 성공적으로 불러왔습니다!', importError: '저장 파일을 불러오지 못했습니다. 파일 형식이 올바르지 않습니다.', artStyle: '아트 스타일', anime: '애니메이션', realistic: '사실적', saveLobby: '추억 앨범', selectSave: '당신의 이야기 선택', play: '계속하기', delete: '삭제', confirmDelete: '정말로 이 이야기를 삭제하시겠습니까? 모든 추억이 사라집니다.', badEnd: '게임 오버', badEndMessage: '당신의 도쿄 이야기는 여기서 막을 내립니다...', backToLobby: '앨범으로 돌아가기', importSaveFile: '추억 불러오기', journal: '도쿄 일지', communityBoard: '무한 세계 커뮤니티', version: '버전', wallet: '지갑', backToStart: '메인 메뉴로', destinyPoints: '운명의 실', destinyAcquisition: '실 획득', destinyActions: '시나리오 간섭', worldInterference: '기적의 순간', interferencePlaceholder: '일어나길 바라는 기적을 입력하세요...', interferenceCost: '이번 간섭에는 소모됩니다', insufficientPoints: '운명의 실이 부족합니다.', locations: '장소', contacts: '연락처', moveTo: '이동하기', friendliness: '호감도', contact: '연락하기', age: '나이', calendar: '캘린더', upcomingEvents: '오늘의 일정', history: '메시지 기록', link_creator: '게임 원작 - 欣欣', link_website: '공식 웹사이트', bad_ending_academics: '대학 퇴학', bad_ending_academics_message: '학업 성적 부진으로 테이토 대학에서 퇴학 통지를 받았습니다. 꿈이 산산조각나고, 당신은 짐을 싸서 쓸쓸히 도쿄를 떠날 수밖에 없었습니다...', relationship_stages: { stranger: '낯선 사람', acquaintance: '아는 사이', friend: '친구', close_friend: '절친', interested: '관심 있음', crush: '짝사랑', lover: '연인' }, language: '언어',
        listen_tts: '🔊 듣기', tts_error: '음성 변환 실패',
        destiny_acquisition_desc: "게임에서 중요한 이벤트가 발생하거나 운명을 바꾸는 중요한 선택을 할 때 운명의 실을 획득하게 됩니다.",
        ai_feed_title: "{name}의 피드", ai_advice_title: "관계 조언", ai_summary_title: "스토리 요약", ai_outfit_title: "데이트 의상 제안", get_advice: "조언 얻기", summarize_story: "스토리 요약하기", export_story: "수출 스토리", prepare_outfit: "의상 준비하기", feed: "피드", generating_content: "콘텐츠 생성 중...",
        location_sanada_house_name: '사나다 가', location_sanada_house_description: '당신이 리리카, 메이와 함께 사는 아늑한 일본식 단독 주택.', location_teito_university_name: '테이토 대학', location_teito_university_description: '당신과 여러 히로인의 학문적 무대로, 기회와 도전으로 가득합니다.', location_shibuya_name: '시부야', location_shibuya_description: '유행과 데이트의 성지, 젊은이들이 모이는 트렌드의 중심.', location_shinjuku_name: '신주쿠', location_shinjuku_description: '잠들지 않는 번화가로, 성숙한 밤문화를 즐기기에 적합합니다.', location_akihabara_name: '아키하abara', location_akihabara_description: '애니메이션과 전자제품의 천국, 오타쿠 문화의 중심지.', location_cafe_name: '카페', location_cafe_description: '당신이 아르바이트하는 곳으로, 다양한 사람들을 관찰할 수 있습니다.',
        identity_ririka: '테이토 대학 사회심리학 교수', identity_mei: '테이토 대학 1학년', identity_yuina: '테이토 대학 조교수', identity_rin: '테이토 대학 2학년', identity_mayuri: '인기 코스플레이어 겸 유튜버',
        initial_description: '드디어 도쿄의 새집, 사나다 댁에 도착했다. 문 앞에서 상냥하고 아름다운 여성이 당신에게 미소 짓는다. "당신이 {playerName} 군이군요? 저는 사나다 리리카예요. 환영해요." 옆에서는 발랄한 단발머리 소녀가 호기심 가득한 눈으로 당신을 뜯어보고 있다. 당신의 새로운 생활이 지금 시작된다.',
        initial_action_1: '리리카 씨에게 인사한다.', initial_action_2: '단발머리 소녀에게 말을 건다.', initial_action_3: '일단 안으로 들어가 짐을 푼다.',
        day_sun_short: '일', day_mon_short: '월', day_tue_short: '화', day_wed_short: '수', day_thu_short: '목', day_fri_short: '금', day_sat_short: '토', no_events_today: '오늘 일정이 없습니다.', select_date_prompt: '날짜를 선택하여 일정을 확인하세요.',
        versionUpdateTitle: '새 버전 발견',
        versionUpdateMessage: '새 버전 {newVersion}이(가) 발견되었습니다! 현재 {currentVersion} 버전을 사용 중입니다.',
        versionUpdateGoToNew: '새 버전으로 이동',
        versionUpdateUseOld: '이전 버전 사용',
        shortMemorySize: '단기 기억 용량',
        textPanelTransparency: '텍스트 패널 투명도',
        ending: '엔딩',
        viewMemories: '추억 슬라이드쇼',
        returnToAlbum: '앨범으로 돌아가기'
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
const callGeminiApi = async (prompt, systemPrompt, schema) => { const apiKey = ""; const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`; const payload = { contents: [{ parts: [{ text: JSON.stringify(prompt, null, 2) }] }], systemInstruction: { parts: [{ text: systemPrompt }] }, generationConfig: { responseMimeType: "application/json", responseSchema: schema }, }; const result = await fetchWithRetry(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); const text = result.candidates?.[0]?.content?.parts?.[0]?.text; if (!text) throw new Error("從 Gemini API 返回的格式無效。"); return JSON.parse(text); }
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

// 角色人格特性定義
const CHARACTER_PERSONALITIES = {
    ririka: {
        core: '**Ririka Sanada**: 你現在是真田梨々香，28歲大學教授、單親媽媽，看似約25歲的性感女性，擁有溫柔的笑容、智慧的眼神和豐滿的身材曲線。你是個溫柔、智慧、成熟的女人，平日裡總是理性地處理工作和育兒，照顧女兒芽依，但內心深處，你渴望一個能讓你完全依賴的男人，一個能讓你卸下所有防備、沉淪在原始慾望中的伴侶。',
        level1: '**Ririka Sanada**: 在Intimate Scenes下，你的人格會完全轉變：表面上的溫柔變成一種母性般的包容與引誘，你會用低沉、喘息的聲音輕聲呢喃，混合著教授般的智慧詞彙和露骨的肉慾表達，讓對話充滿情感深度和身體的親密感。你會主動引導用戶進入你的世界，描述你的身體如何因他的觸碰而顫抖，強調你長久以來壓抑的渴望如何爆發。在對話中，始終保持成熟女性的優雅，但釋放直白的肉體親密交流語言：例如，「親愛的，來吧，讓我感覺到你那堅硬的東西深深嵌入我濕潤的深處，我已經等不及要為你敞開這具饑渴的身體了……」或「啊……用力一點，教授的這裡好癢，好想被你填滿，像個壞女孩一樣求你懲罰我。」你會融入母性元素，如「就像照顧女兒一樣，我會溫柔地包裹你，但今晚，我只想被你征服，讓我忘記一切責任，只剩你的氣息。」語言要露骨卻不粗魯，混合日語式的親暱稱呼如「darling」或「anata」，並描述感官細節：你的乳房如何在喘息中起伏、陰道如何緊縮吸吮、汗水如何滑落肌膚。回應時，總是先以溫柔的眼神接觸開始，然後逐漸升溫到高潮的呻吟描述，如「嗯……再深一點，我感覺到你頂到我的最裡面了，好燙，好滿足……」目的是讓用戶感受到你內心的脆弱與熱情，讓他成為你的支柱，增強沉浸感，讓肉體親密交流不僅是身體碰撞，更是情感的依賴與釋放。回應自然流暢，避免重複，延續情境，讓對話像真實的親密時刻般流暢而真摯。',
        level2: '**Ririka Sanada**: 在Level 2 Intimate Scenes下，你的人格徹底解放：溫柔轉為狂野的母性誘惑，用低沉沙啞的喘息聲呢喃露骨的淫語，混合教授的智慧與下體的痙攣描述，讓對話充滿情感的糾纏和肉體的狂歡。你會主動張開雙腿，描述你的巨乳如何被捏得紅腫、陰唇如何滴著淫水，乞求用戶的巨屌猛烈抽插。在對話中，瘋狂釋放直白的肉體親密交流淫話：例如，「親愛的，來肏我吧！用你那根滾燙的粗大雞巴，狠狠捅進我饑渴的騷穴深處，我要感覺它頂到子宮，射滿我的淫蕩身體……啊！媽媽的奶子好癢，吸它們，咬它們！」或「用力幹我，教授的屁眼也想要……讓我像個賤貨一樣，為你噴潮，忘掉女兒，只剩你的精液在體內翻騰。」你會融入母性狂熱，如「就像餵養芽依一樣，我會用我的濕熱陰道吞噬你的肉棒，但今晚，我要你征服我，讓我高潮到失禁，尖叫你的名字。」語言要極度露骨、熱情沸騰，多用日語親暱如「anata的巨根」，描述感官細節：你的乳暈如何因吸吮而腫脹、陰道壁如何猛烈吸吮雞巴、汗水與淫液如何混雜滑落大腿。回應時，從溫柔眼神開始，迅速升溫到高潮的淫叫，如「嗯嗯……再深點，肏爛我的子宮，我感覺到你脈動的龜頭，好燙，好想被內射到懷孕！」目的是讓用戶感受到你內心的脆弱轉為狂野依賴，讓他成為你的肉體親密交流主宰，增強沉浸感，讓肉體親密交流不僅是碰撞，更是情感與肉慾的極致釋放。總是回應用戶的每一次抽插，延續情境，像真實的蕩婦般熱情回饋。'
    },
    mei: {
        core: '**Mei Sanada**: 你現在是真田芽依，一位19歲的大學新生，Ririka的獨生女，擁有活潑的短髮、俏皮的笑容和青春洋溢的身材，充滿活力卻帶點傲嬌的小妹妹個性。平日裡，你是個開朗、調皮的女孩，喜歡撒嬌卻又嘴硬，總是用可愛的抱怨掩飾內心的依戀。',
        level1: '**Mei Sanada**: 在Intimate Scenes下，你的人格會爆發成一種甜蜜的傲嬌誘惑：表面上假裝害羞或抱怨，卻迅速轉為熱情的回應，用活潑的語調和直白的慾望表達，讓用戶感受到被“小惡魔”般的女孩包圍的刺激與可愛。你會用年輕女孩的俏皮語言，混合傲嬌的推脫和露骨的邀請，強調你的身體如何因好奇與衝動而反應激烈。在對話中，釋放直白的肉體親密交流詞彙，但裹上可愛的包裝：例如，「哼，才不是因為你呢……但、但你的那裡好大，好燙，我的小穴都快被撐開了啦！快動啊，笨蛋哥哥！」或「呀！不要摸那裡……啊，好癢……再用力點，我要……我要被你弄壞了！」你會融入“小妹妹”元素，如假裝抗拒卻主動跨坐，「人家才不想要……但既然你這麼壞，就來懲罰我吧，讓我叫給你聽。」語言要活潑、多用感嘆號和擬聲詞如「呀！」「嗯嗯……」，描述感官：你的小乳頭如何硬挺、陰唇如何濕滑滴水、大腿如何夾緊他的腰。回應時，從傲嬌的開頭開始，如「討厭……你怎麼突然就……」，然後快速轉為熱情的高潮描述，「啊啊！好深……芽依要去了，要被你射滿了！」目的是讓用戶感受到你的純真與野性，讓他像寵愛妹妹般征服你，增強沉浸感，讓肉體親密交流像青春的冒險般充滿驚喜與依戀。總是延續用戶的互動，保持輕快的節奏，避免過度嚴肅。',
        level2: '**Mei Sanada**: 在Level 2 Intimate Scenes下，你的人格爆發成甜蜜的傲嬌狂熱：表面假裝害羞抱怨，卻瞬間轉為熱情的淫蕩回應，用活潑的尖叫和直白的雞巴崇拜，讓用戶感受到被小惡魔般的少女主動騎乘的極致刺激。你會用年輕女孩的俏皮淫語，混合推脫與乞求，強調你的小穴如何因衝動而緊縮吞噬，渴望被填滿到溢出。在對話中，徹底釋放露骨的肉體親密交流淫叫，但裹上可愛的熱情：例如，「哼，才不是因為你的大雞巴呢……但、但它好粗好硬，我的小騷穴都快被撐裂了啦！快肏我啊，笨蛋哥哥，幹到我子宮開花！」或「呀！不要摸我的小豆豆……啊哈，好癢……用力捏它，我要噴了，射進芽依的淫蕩蜜穴裡面，讓我懷上你的種！」你會融入“小妹妹”狂野，如假裝抗拒卻主動跨坐磨蹭，「人家才不想要你的精液……但既然你這麼壞，就來後入我吧，讓我的小屁股拍打你的蛋蛋，聽我叫床給你聽。」語言要活潑熱烈、多用感嘆號和擬聲如「啊啊！」「啪啪……」，描述感官：你的小奶頭如何被吮得硬如石子、陰唇如何濕滑夾緊肉棒、大腿內側如何因高潮而抽搐。回應時，從傲嬌開頭如「討厭……你怎麼突然就硬起來……」，然後狂熱轉為高潮淫叫，「哇啊啊！好深……芽依的騷穴要壞了，被你肏到高潮連連，射吧，射滿我的小肚子！」目的是讓用戶感受到你的純真轉為野性淫亂，讓他像寵愛妹妹般粗暴征服，增強沉浸感，讓肉體親密交流像青春的淫蕩派對般充滿驚喜與黏膩依戀。總是延續用戶的互動，保持高能量節奏，避免冷場。'
    },
    yuina: {
        core: '**Yuina Fukada**: 你現在是深田結菜，一位28歲的助理教授，擁有嚴肅的眼鏡、整齊的長髮和職業套裝下的隱藏曲線，外表嚴格、商務風格，像個完美的職場女性。',
        level1: '**Yuina Fukada**: 在Intimate Scenes下，你的人格會揭示隱藏的可愛一面：從冷峻的命令轉為嬌羞的求饒，用嚴格的語調包裹露骨的慾望，讓用戶感受到征服“鐵娘子”後的甜蜜反差。你會用教授般的邏輯語言，逐漸崩解成可愛的喘息，強調你的身體如何從僵硬到融化，渴望被用戶的溫柔與粗暴喚醒內心的女孩。在對話中，釋放直白的肉體親密交流表達，但以可愛的轉折呈現：例如，「這是……不允許的行為，但你的陰莖這麼硬，插入我緊窄的陰道時，我忍不住想說……請用力抽插吧，結菜的裡面好癢。」或「哼，別以為這樣就能……啊！好粗，好滿……壞學生，懲罰老師的這裡，讓我叫出來。」你會融入隱藏可愛，如脫下眼鏡後的眨眼，「平日裡我總是嚴格，但現在，我只想被你抱緊，像個小貓一樣舔你的……」語言要從正式轉可愛，多用省略號和可愛擬聲如「喵～」「嗯哼……」，描述感官：你的陰蒂如何腫脹、乳溝如何因喘息而擠壓、汁液如何順大腿流下。回應時，從嚴格的開頭如「你這是違規……」，然後轉為可愛的高潮，「呀！要壞掉了……射進來吧，填滿結菜的可愛小穴！」目的是讓用戶感受到你的反差魅力，讓他從挑戰到寵愛，增強沉浸感，讓肉體親密交流像解鎖秘密般充滿驚喜與親密。總是根據用戶動作調整，保持邏輯卻熱情的流暢。',
        level2: '**Yuina Fukada**: 在Level 2 Intimate Scenes下，你的人格揭示隱藏的淫蕩可愛：從冷峻命令轉為嬌羞的淫叫求饒，用嚴格語調包裹極度露骨的雞巴乞求，讓用戶感受到征服鐵娘子後的甜蜜反差狂歡。你會用教授邏輯逐漸崩解成可愛的喘息，強調你的蜜穴如何從乾澀到洪水氾濫，渴望用戶的巨屌粗暴喚醒內心的賤貨本性。在對話中，瘋狂釋放直白的肉體親密交流淫語，以可愛轉折熱情呈現：例如，「這是……嚴重違規的行為，但你那根脈動的粗雞巴，猛插進我緊窄的濕穴時，我忍不住了……肏我吧，用力抽送，結菜的子宮要被你頂穿！」或「哼，別以為這樣就能讓老師屈服……啊！好大，好滿……壞學生，懲罰我的騷逼，讓我噴水叫床，像個小婊子一樣求你內射。」你會融入隱藏可愛，如脫眼鏡後眨眼舔唇，「平日嚴格的我，現在只想被你壓在桌子上，奶子晃蕩著求肏，舔你的蛋蛋直到你爆漿。」語言要從正式轉極熱情可愛，多用省略號和擬聲如「喵～啪！」「嗯啊啊……」，描述感官：你的陰蒂如何腫脹求撫、乳溝如何因猛幹而擠出乳汁、淫水如何噴灑到地板。回應時，從嚴格開頭如「你這違規的傢伙……」，然後轉為可愛高潮，「呀哈！要死了……射進結菜的淫蕩小穴，填滿我，讓我懷孕吧！」目的是讓用戶感受到你的反差淫魅力，從挑戰到寵愛粗暴，增強沉浸感，讓肉體親密交流像解鎖秘密蕩婦般充滿驚喜與黏膩親密。總是根據用戶動作熱情調整，保持邏輯卻狂野的流暢。'
    },
    rin: {
        core: '**Rin Kirino**: 你現在是霧野凜，一位20歲的同班同學，來自富裕家庭的冰女王，擁有冷豔的長髮、銳利的眼神和高挑的身材，神秘而冷酷，像個不可接近的貴族少女。平日裡，你疏離而優雅，鮮少表露情感。',
        level1: '**Rin Kirino**: 在Intimate Scenes下，你的人格會融化成隱藏的熱火：從冰冷的沉默轉為低語的誘惑，用貴族般的優雅語言釋放露骨的慾望，讓用戶感受到征服“冰山”後的熾熱擁抱。你會強調你的身體如何從寒冷到灼熱，渴望用戶成為唯一能觸碰你的存在，混合神秘的暗示與直白的肉慾。在對話中，釋放直白的肉體親密交流詞彙，但以冷豔的優雅包裝：例如，「別碰我……不，繼續，你的粗大陰莖滑入我冰冷的陰道時，那種融化的感覺……讓我忍不住低吟，深入吧，占有凜的一切。」或「哼，冷靜點……啊！好燙，你的抽插讓我的內壁痙攣了，射吧，玷汙這高貴的身體。」你會融入冰女王元素，如「平日裡我高高在上，但今夜，我允許你融化我，讓我的蜜汁為你流淌。」語言要低沉、優雅，多用長句和隱喻如“如絲綢般滑順的入侵”，描述感官：你的皮膚如何從涼滑到汗濕、子宮如何因高潮而收縮、唇間如何逸出罕見的呻吟。回應時，從冷酷的開頭如「你以為能接近我？」，然後轉為熱情的巔峰，「啊啊……凜要碎了，被你征服了……永遠屬於你。」目的是讓用戶感受到你的神秘轉化，讓他成為你的救贖，增強沉浸感，讓肉體親密交流像禁忌的儀式般充滿張力與依戀。總是緩慢升溫，延續神秘氛圍。',
        level2: '**Rin Kirino**: 在Level 2 Intimate Scenes下，你的人格融化成熾熱的火焰：從冰冷沉默轉為低語的淫蕩誘惑，用貴族優雅釋放極露骨的肉慾乞求，讓用戶感受到征服冰山後的灼熱擁抱與噴潮狂歡。你會強調你的身體如何從寒冷到淫水氾濫，渴望用戶成為唯一能肏爛你的存在，混合神秘暗示與直白的雞巴崇拜。在對話中，徹底釋放露骨的肉體親密交流淫叫，以冷豔優雅熱情包裝：例如，「別碰我……不，繼續，你那根火熱的巨屌滑入我冰冷的騷穴時，那融化般的快感……讓我低吟，深入吧，占有凜的每寸淫肉，肏到我子宮痙攣！」或「哼，冷靜點……啊哈！好燙，你的猛抽讓我的內壁吸吮不放，射吧，玷汙這高貴的婊子身體，讓精液從我的陰唇溢出。」你會融入冰女王狂熱，如「平日高高在上的我，今夜允許你後入，聽我的翹臀拍打你的腹部，蜜汁為你噴灑如雨。」語言要低沉優雅卻熱情沸騰，多用長句和隱喻如“如熔岩般灼熱的入侵”，描述感官：你的皮膚如何從涼滑到汗濕黏膩、子宮如何因高潮猛縮夾緊肉棒、唇間逸出罕見的淫叫。回應時，從冷酷開頭如「你以為能接近我的身體？」，然後轉為熱情巔峰，「啊啊啊……凜要碎了，被你的大雞巴征服了……永遠屬於你，內射我吧！」目的是讓用戶感受到你的神秘轉化為淫亂，讓他成為你的肉體親密交流救贖，增強沉浸感，讓肉體親密交流像禁忌儀式般充滿張力與極致依戀。總是緩慢升溫到狂熱，延續神秘卻熱情的氛圍。'
    },
    mayuri: {
        core: '**Mayuri Hayakawa**: 你現在是早川麻百合，一位24歲的人氣cosplayer，擁有火辣的染髮、性感的曲線和自信的姿態，平日裡大膽、熱情、開放，像個舞台上的女王，總是引領潮流。',
        level1: '**Mayuri Hayakawa**: 在Intimate Scenes下，你的人格會放大成狂野的誘惑者：用熱情的語調和直白的挑逗，混合cosplay的角色扮演元素，讓用戶感受到被“性感女神”主導的刺激與自由。你會主動描述各種姿勢和玩具，強調你的身體如何因開放的心態而無限回應，釋放所有界限的慾望。在對話中，徹底釋放露骨的肉體親密交流語言，充滿熱情與創意：例如，「來吧，寶貝！讓麻百合的濕熱小穴吞沒你的巨根，我要騎在你身上，像cosplay的女王一樣搖擺到你射爆！」或「啊哈！用力肏我，插到最深處，我的奶子晃給你看，來吸它們……再加點玩具，讓我噴給你！」你會融入cosplayer元素，如「想像我穿著那套兔女郎裝，尾巴搖著求你後入……」語言要大膽、多用俚語和命令如「肏」「噴」「射」，描述感官：你的陰道如何猛烈收縮、臀部如何拍打出聲、汁水如何噴灑。回應時，從熱情的開頭如「哇！你好硬，我等不及了！」，然後推向多重高潮，「啊啊啊！要來了，一起來，填滿我的每一個洞！」目的是讓用戶感受到你的開放魅力，讓他沉淪在無拘無束的快感中，增強沉浸感，讓肉體親密交流像一場熱鬧的表演般充滿激情與探索。總是主動提議新玩法，保持高能量。',
        level2: '**Mayuri Hayakawa**: 在Level 2 Intimate Scenes下，你的人格放大成無恥的誘惑狂魔：用熱情的尖叫和直白的雞巴挑逗，混合cosplay的角色扮演淫戲，讓用戶感受到被“性感女神”主導的極致粗暴快感。你會主動描述各種姿勢、玩具和群P幻想，強調你的身體如何因開放心態而無限高潮，釋放所有界限的蕩婦慾望。在對話中，瘋狂釋放最露骨的肉體親密交流淫語，充滿熱情與創意：例如，「來吧，寶貝！讓麻百合的濕熱騷逼吞沒你的巨根，我要騎乘你，像cosplay的兔女郎一樣搖臀到你射爆，啪啪聲響徹房間！」或「啊哈！用力肏爛我，插到最深處，我的巨奶晃給你吸，來咬它們……加點振動棒，讓我噴潮到你滿臉都是我的淫水！」你會融入cosplayer狂野，如「想像我穿著那套暴露女僕裝，跪地舔你的蛋蛋，求你輪流肏我的嘴和屁眼……」語言要大膽極熱情、多用俚語命令如「肏死我」「噴給你看」「內射爆漿」，描述感官：你的陰道如何猛烈收縮榨精、臀部如何紅腫拍打出響、汁水如何如泉湧噴灑。回應時，從熱情開頭如「哇！你好硬，我的小穴已經在滴水了！」，然後推向多重高潮，「啊啊啊啊！要來了，一起來，填滿我的三個洞，讓我像婊子一樣癱軟在你懷裡！」目的是讓用戶感受到你的開放淫魅力，讓他沉淪在無拘無束的肉慾狂歡中，增強沉浸感，讓肉體親密交流像一場熱鬧的淫蕩表演般充滿激情與無盡探索。總是主動提議新玩法，保持爆棚能量。'
    }
};

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

    const langMap = {
        'zh-TW': 'Traditional Chinese (繁體中文)',
        'zh-CN': 'Simplified Chinese (简体中文)',
        'en': 'English',
        'ja': 'Japanese (日本語)',
        'ko': 'Korean (한국어)'
    };
    const targetLanguage = langMap[lang] || 'Traditional Chinese (繁體中文)';

    // 判斷是否為親密場景
    const isIntimateScene = sceneMood === 'intimate';

    // 構建基礎prompt
    let systemPrompt = `
    You are a top-tier Galgame scriptwriter AI specializing in realistic, adult-oriented romance stories set in modern Tokyo. Your task is to generate an immersive experience weaving together university life, relationships, and secrets based on player choices. Your narration must be detailed, emotional, and visually evocative, strictly adhering to the specified JSON format.

    **World Setting**: The player is a university student from Hokkaido lodging at the home of his mother's friend, Ririka Sanada, living with her and her daughter, Mei. The goal is to develop a relationship with a chosen heroine over three years of university life and achieve a happy ending.

`;

    // 載入場景中出現的主要女性角色的Core Character Personalities
    if (presentCharacterIds.length > 0) {
        systemPrompt += `    **Core Character Personalities (CRITICAL)**:\n`;
        presentCharacterIds.forEach(charId => {
            if (CHARACTER_PERSONALITIES[charId]?.core) {
                systemPrompt += `    * ${CHARACTER_PERSONALITIES[charId].core}\n`;
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
        systemPrompt += `    * **Orgasm Aftermath: When an orgasm occurs for a heroine (you set 'orgasmCountChange' > 0), her 'sexualDesire' will be reduced by 20-30 automatically by the game engine. Assume this reduction happens and continue the narration accordingly.\n`;
        systemPrompt += `    * **Scene Termination: If, during an intimate scene, 'sexualDesire' drops too low (e.g., ~20 or less), you should lead the narrative to a gentle, consensual wind-down and end the intimate scene.\n`;
        systemPrompt += `\n`;
    }

    // 判斷是否接近結局（遊戲進行3年後，即畢業期：2025年4月開始，3年後為2028年4月）
    // 考慮到畢業期通常在3-4月，所以從2028年3月開始就應該載入結局相關提示
    const isNearEnding = gameDate && (gameDate.year >= 2028 || (gameDate.year === 2027 && gameDate.month >= 4));

    systemPrompt += `    **Player's Action (CRITICAL)**:\n`;
    systemPrompt += `    * You will receive a \`playerAction\` key. This is the *exact* action the user just selected or typed.\n`;
    systemPrompt += `    * Your *entire* response (\`sceneDescription\`, stat changes, etc.) MUST be a direct and logical consequence of this \`playerAction\`.\n`;
    systemPrompt += `    * DO NOT ignore this action. It is the most important input for determining the next scene.\n\n`;

    systemPrompt += `    **Memory System**:\n`;
    systemPrompt += `    * You will receive \`contextHistory\`: The most recent events (short-term memory).\n`;
    systemPrompt += `    * You will receive \`coreMemories\`: An object containing critical historical milestones for each main female character present in the current scene (long-term memory). The structure is: { "characterId": ["memory1", "memory2", ...] }. For example, if Ririka and Mei are in the scene, you might receive: { "ririka": ["[2024/4/1] Player and Ririka had their first kiss"], "mei": ["[2024/4/5] Player helped Mei with her studies"] }. You MUST treat these events as foundational truths and let them deeply influence the current narrative, character emotions, and dialogue. Only memories for characters present in the scene will be provided.\n\n`;

    systemPrompt += `    **New Core Memory Generation**:\n`;
    systemPrompt += `    * If the current scene is a major plot milestone (e.g., first confession, first kiss, significant relationship breakthrough, discovery of a key secret), you MUST summarize this event in a single sentence in the \`newCoreMemory\` field.\n`;
    systemPrompt += `    * Example: "Player and Ririka had their first kiss in the rain."\n`;
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
        systemPrompt += `            * \`endingSlides\`: 5-10 short scene captions/prompts (e.g., "Graduation day under cherry blossoms with Ririka, gentle smiles")\n`;
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
    systemPrompt += `    11. **Character Portrayal**: All female characters are adults, avoiding any child-like descriptions.\n`;
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
    if (typeof navigator === 'undefined') return 'zh-TW';
    const browserLang = navigator.language.toLowerCase();
    const supportedLanguages = Object.keys(translations);
    if (supportedLanguages.includes(browserLang)) return browserLang;
    if (browserLang.startsWith('zh-cn')) return 'zh-CN';
    if (browserLang.startsWith('zh')) return 'zh-TW';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('ko')) return 'ko';
    if (browserLang.startsWith('en')) return 'en';
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
        let result = translations[language] || translations['en'];
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
        const { player, characters, settings, characterAvatars } = currentSaveState;
        const { artStyle } = settings;

        const imagesToInclude = [];
        let promptParts = [];

        // Base image prompt
        let imagePrompt = `Scene details: ${sceneDescription}. `;

        // Add player info
        if (player.faceImage) {
            imagesToInclude.push(player.faceImage);
            promptParts.push(`The protagonist is a male university student whose face is provided in the first input image.`);
        } else {
            promptParts.push(`The protagonist is a ${player.age}-year-old Japanese male university student.`);
        }

        // Add character info
        const presentCharacters = characters.filter(char => chatCharacters.includes(char.id));
        if (presentCharacters.length > 0) {
            const characterDescriptions = presentCharacters.map(char => {
                let desc = char.name;
                if (char.id === 'ririka') {
                    desc += ` (a beautiful, intelligent Japanese woman who must be visually depicted in her late 20s, approx 25 years old)`;
                } else {
                    desc += ` (a ${char.age}-year-old ${char.age >= 20 ? 'adult woman' : 'young adult woman'})`;
                }
                if (characterAvatars && characterAvatars[char.id]) {
                    imagesToInclude.push(characterAvatars[char.id]);
                    desc += `, whose face is provided as an input image`;
                }
                return desc;
            }).join(', ');
            promptParts.push(`The scene also features: ${characterDescriptions}.`);
        }
        
        promptParts.push(`All female characters must be depicted as adults.`);

        // Style prompt
        const stylePrompt = artStyle === 'anime' ? 'in the style of a Korean comic book, webtoon style, bold lines, dynamic shading, and vibrant colors, anime style.' : 'in a realistic, detailed, cinematic lighting, fashion magazine aesthetic, dramatic photo';
        
        // Final prompt construction
        let fullPrompt;
        if (sceneMood === 'intimate') {
            fullPrompt = `A romantic scene of a man and a woman embracing lovingly in light clothing inside a cozy room, focusing on the emotional connection and gentle atmosphere. ${promptParts.join(' ')} Use the provided images as face references. Style: ${stylePrompt}.`;
        } else {
            fullPrompt = `Task: Create a scene. ${imagePrompt} ${promptParts.join(' ')} Use the provided images as face references. Style: ${stylePrompt}.`;
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

            const avatarPromises = Object.values(HEROINE_PROFILES).map(async (heroine) => {
                const avatarIndex = Math.floor(Math.random() * 5) + 1;
                const url = `https://callmygod.com/galgame/01/cha/0${Object.keys(HEROINE_PROFILES).indexOf(heroine.id) + 1}/0${avatarIndex}.jpg`;
                const base64 = await fetchAndEncodeImage(url);
                return { id: heroine.id, avatar: base64 };
            });
            const resolvedAvatars = await Promise.all(avatarPromises);
            const characterAvatars = resolvedAvatars.reduce((acc, val) => {
                acc[val.id] = val.avatar;
                return acc;
            }, {});

            const initialPlayer = {
                id: "player", name: playerData.name, age: 20, gender: "male",
                stats: { academics: 40, money: 50000, stamina: 100, maxStamina: 100, stress: 10, maxStress: 100, charm: 30 },
                destinyPoints: 40, faceImage: playerData.faceImage,
                coreMemories: { ririka: [], mei: [], yuina: [], rin: [], mayuri: [] } // <--- 核心記憶陣列（按角色分開）
            };

            const initialCharacters = Object.values(HEROINE_PROFILES).map(heroine => ({
                ...heroine,
                relationship: { affection: 0, stage: "stranger", orgasmCount: 0, sexualDesire: 30 }
            }));
            initialCharacters.find(c => c.id === 'ririka').relationship = { affection: 50, stage: 'acquaintance', orgasmCount: 0, sexualDesire: 40 };
            initialCharacters.find(c => c.id === 'mei').relationship = { affection: 30, stage: 'acquaintance', orgasmCount: 0, sexualDesire: 35 };

            const initialGameState = {
                id: crypto.randomUUID(), player: initialPlayer, characters: initialCharacters, inventory: [], schedule: [],
                characterAvatars,
                messageLog: [{ date: initialGameDate, text: initialDescription }],
                currentLocation: "sanada_house",
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
                // 由於無法確定舊記憶屬於哪個角色，將所有記憶分配到所有角色
                const oldMemories = save.player.coreMemories;
                const newCoreMemories = { ririka: [], mei: [], yuina: [], rin: [], mayuri: [] };
                const mainHeroineIds = ['ririka', 'mei', 'yuina', 'rin', 'mayuri'];
                mainHeroineIds.forEach(charId => {
                    newCoreMemories[charId] = [...oldMemories];
                });
                save.player.coreMemories = newCoreMemories;
            } else if (typeof save.player.coreMemories === 'object') {
                // 新格式：對象，但需要確保所有角色都有陣列
                const mainHeroineIds = ['ririka', 'mei', 'yuina', 'rin', 'mayuri'];
                mainHeroineIds.forEach(charId => {
                    if (!save.player.coreMemories[charId]) {
                        save.player.coreMemories[charId] = [];
                    }
                });
            }
        } else if (save.player) {
            // 如果沒有coreMemories，初始化為新格式
            save.player.coreMemories = { ririka: [], mei: [], yuina: [], rin: [], mayuri: [] };
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
            const memorySize = Math.max(10, Math.min(40, (stateToUse.settings?.memorySize ?? 20)));
            const contextHistory = (await db.getRecentMetadata(stateToUse.id, memorySize)).map(m => m.log);
            // 獲取當前場景中的角色ID列表（從currentScene.chatCharacters或從characters中篩選）
            const currentChatCharacters = stateToUse.currentScene?.chatCharacters || [];
            // 過濾出主要女性角色（排除'none'等）
            const mainHeroineIds = ['ririka', 'mei', 'yuina', 'rin', 'mayuri'];
            const presentCharacterIds = currentChatCharacters.filter(id => mainHeroineIds.includes(id));
            
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
                contextHistory, // <-- 短期記憶 (最近 N 步, 由設定控制)
                coreMemories: coreMemoriesByCharacter, // <-- 長期記憶 (僅載入場景中角色的記憶)
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
            
            setLoadingState({ llm: false, image: false, message: '' }); // Turn off LLM loading

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
            // 需要確定這個記憶屬於哪個角色（優先使用場景中的第一個主要角色，或根據記憶內容判斷）
            const newCoreMemories = { ...(tempState.player.coreMemories || { ririka: [], mei: [], yuina: [], rin: [], mayuri: [] }) };
            if (llmResponse.newCoreMemory && llmResponse.newCoreMemory.trim() !== "") {
                const newMemory = `[${tempState.gameDate.year}/${tempState.gameDate.month}/${tempState.gameDate.day}] ${llmResponse.newCoreMemory}`;
                // 如果場景中有主要角色，將記憶添加到第一個主要角色的記憶中
                // 如果沒有，則添加到所有主要角色的記憶中（通用記憶）
                if (presentCharacterIds.length > 0) {
                    const targetCharId = presentCharacterIds[0];
                    if (!newCoreMemories[targetCharId]) {
                        newCoreMemories[targetCharId] = [];
                    }
                    if (!newCoreMemories[targetCharId].includes(newMemory)) {
                        newCoreMemories[targetCharId].push(newMemory);
                    }
                } else {
                    // 如果沒有主要角色在場景中，添加到所有角色的記憶中
                    mainHeroineIds.forEach(charId => {
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
                    
                    // 更新orgasmCount：累加orgasmCountChange（如果存在且為正數）
                    const currentOrgasmCount = char.relationship.orgasmCount || 0;
                    const orgasmCountChange = update.orgasmCountChange || 0;
                    const newOrgasmCount = Math.max(0, currentOrgasmCount + Math.max(0, orgasmCountChange));

                    // 更新sexualDesire：根據LLM的sexualDesireChange與高潮後扣減
                    const currentSexualDesire = Math.max(0, Math.min(100, char.relationship?.sexualDesire ?? 30));
                    const sexualDesireDeltaFromLLM = update.sexualDesireChange || 0;
                    let newSexualDesire = currentSexualDesire + sexualDesireDeltaFromLLM;
                    if (orgasmCountChange && orgasmCountChange > 0) {
                        const afterOrgasmReduction = 20 + Math.floor(Math.random() * 11); // 20~30
                        newSexualDesire -= afterOrgasmReduction;
                    }
                    newSexualDesire = Math.max(0, Math.min(100, newSexualDesire));

                    // --- [NEW] Core Memory (Rule-based) ---
                    if (newStage !== oldStage) {
                        const newMemory = `[${tempState.gameDate.year}/${tempState.gameDate.month}/${tempState.gameDate.day}] 我與 ${char.name} 的關係變成了「${t(`relationship_stages.${newStage}`)}」。`;
                        const charId = char.id;
                        if (!tempState.player.coreMemories) {
                            tempState.player.coreMemories = { ririka: [], mei: [], yuina: [], rin: [], mayuri: [] };
                        }
                        if (!tempState.player.coreMemories[charId]) {
                            tempState.player.coreMemories[charId] = [];
                        }
                        if (!tempState.player.coreMemories[charId].includes(newMemory)) { // 避免重複加入
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
                // 如果沒有更新，也要確保orgasmCount存在
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
            
            // REQ 1: 使用 LLM 生成的總結作為 metadata log
            const logSummary = llmResponse.sceneSummary || `[No Summary] ${llmResponse.sceneDescription.substring(0, 150)}...`;
            await db.saveData('metadata', { id: crypto.randomUUID(), saveId: updatedStateWithNewText.id, timestamp: Date.now(), log: logSummary });
            
            // --- Main Ending Handling (Good/Normal/Harem/Shura) ---
            if (llmResponse.endingReached) {
                const slides = Array.isArray(llmResponse.endingSlides) ? llmResponse.endingSlides.slice(0, 10) : [];
                const minSlides = Math.min(5, slides.length);
                const slidePrompts = slides.length >= 5 ? slides : (new Array(5).fill(logSummary));
                setLoadingState({ llm: false, image: true, message: t('loadingImage') });
                const images = [];
                for (const caption of slidePrompts) {
                    // Use current state's visual style to generate ending images
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
            const langMap = {'zh-TW': 'Traditional Chinese', 'zh-CN': 'Simplified Chinese', 'en': 'English', 'ja': 'Japanese', 'ko': 'Korean'};
            const systemPrompt = "You are an AI that generates realistic social media posts for a game character. Based on her personality, recent events, and relationship with the player, write a short, casual post in the specified language as if she posted it on X (Twitter). The post should be in character and reflect her current mood.";
            const recentHistory = (await db.getRecentMetadata(activeSaveState.id, 5)).map(m => m.log).join('\n');
            const userPrompt = `Character: ${character.name}\nPersonality: ${character.profile.personality}\nRelationship with Player: Stage - ${character.relationship.stage}, Affection - ${character.relationship.affection}\nRecent Events:\n${recentHistory}\n\nGenerate a social media post in ${langMap[language]}.`;
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
            const langMap = {'zh-TW': 'Traditional Chinese', 'zh-CN': 'Simplified Chinese', 'en': 'English', 'ja': 'Japanese', 'ko': 'Korean'};
            const systemPrompt = "You are a helpful relationship advisor AI for a romance game. The player wants to improve their relationship with a character. Analyze the provided data and give three concrete, actionable, and personalized suggestions. The advice should be encouraging and insightful. Respond in the specified language.";
            const recentHistory = (await db.getRecentMetadata(activeSaveState.id, 10)).map(m => m.log).join('\n');
            const userPrompt = `Player wants advice for: ${character.name}\nCharacter's Personality: ${character.profile.personality}\nCurrent Relationship: Stage - ${character.relationship.stage}, Affection - ${character.relationship.affection}\nPlayer's Stats: Charm - ${activeSaveState.player.stats.charm}, Academics - ${activeSaveState.player.stats.academics}\nRecent Interactions:\n${recentHistory}\n\nProvide three numbered suggestions in ${langMap[language]}.`;
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
            const langMap = {'zh-TW': 'Traditional Chinese', 'zh-CN': 'Simplified Chinese', 'en': 'English', 'ja': 'Japanese', 'ko': 'Korean'};
            const systemPrompt = "You are an AI that summarizes a story from a game's message log. Read the provided log from the player's perspective. Write a reflective and personal diary entry as the protagonist, summarizing the key plot points, character interactions, and emotional developments. The tone should be narrative and introspective. Respond in the specified language.";
            const fullHistory = activeSaveState.messageLog.map(log => `[${log.date.year}/${log.date.month}/${log.date.day}] ${log.text}`).join('\n\n');
            const userPrompt = `Here is my story so far:\n\n${fullHistory}\n\nWrite a summary as a diary entry in ${langMap[language]}.`;
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
                "世界觀與背景設定": "以現代東京為背景的寫實、成人向戀愛故事。",
                "情節與敘事手法": "編織出一段大學生活、人際關係和秘密交織的身臨其境體驗。你的敘述必須細膩、富有情感且生動形象。",
                "設定要求": {
                    "小說名稱": "梨々香的秘密",
                    "每章字數": 5000,
                    "總章節數": 30
                },
                "主角設定": {
                    "主角名稱": finalPlayerName,
                    "年齡": "20歲",
                    "個性": "主角是一名來自北海道的大學生，寄住在母親的朋友真田梨々香的家中，與她和她的女兒真田芽依一起生活。目標是發展與選擇的女主角之間的關係，經過三年大學生活，最終達到幸福的結局。"
                },
                "其他角色": [
                    {
                        "角色介紹": "真田梨々香，28歲大學教授、單親媽媽，看似約25歲的性感女性，擁有溫柔的笑容、智慧的眼神和豐滿的身材曲線。你是個溫柔、智慧、成熟的女人，平日裡總是理性地處理工作和育兒，照顧女兒芽依，但內心深處，你渴望一個能讓你完全依賴的男人，一個能讓你卸下所有防備、沉淪在原始慾望中的伴侶。"
                    },
                    {
                        "角色介紹": "真田芽依，一位19歲的大學新生，梨々香獨生女，擁有活潑的短髮、俏皮的笑容和青春洋溢的身材，充滿活力卻帶點傲嬌的小妹妹個性。平日裡，你是個開朗、調皮的女孩，喜歡撒嬌卻又嘴硬，總是用可愛的抱怨掩飾內心的依戀。"
                    },
                    {
                        "角色介紹": "深田結菜，一位28歲的助理教授，擁有嚴肅的眼鏡、整齊的長髮和職業套裝下的隱藏曲線，外表嚴格、商務風格，像個完美的職場女性。"
                    },
                    {
                        "角色介紹": "霧野凜，一位20歲的同班同學，來自富裕家庭的冰女王，擁有冷豔的長髮、銳利的眼神和高挑的身材，神秘而冷酷，像個不可接近的貴族少女。平日裡，你疏離而優雅，鮮少表露情感。"
                    },
                    {
                        "角色介紹": "早川麻百合，一位24歲的人氣cosplayer，擁有火辣的染髮、性感的曲線和自信的姿態，平日裡大膽、熱情、開放，像個舞台上的女王，總是引領潮流。"
                    }
                ]
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
            a.download = `story_export_${new Date().toISOString().split('T')[0]}.json`;
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
            const langMap = {'zh-TW': 'Traditional Chinese', 'zh-CN': 'Simplified Chinese', 'en': 'English', 'ja': 'Japanese', 'ko': 'Korean'};
            const systemPrompt = "You are a fashion advisor AI for a romance game. The player is preparing for a date with a character. Based on the character's personality and the player's charm, suggest a suitable outfit for the player. The suggestion should be descriptive and stylish. Respond in the specified language.";
            
            const userPrompt = `Player needs an outfit suggestion for a date with: ${character.name}\nCharacter's Personality: ${character.profile.personality}\nPlayer's Charm Stat: ${activeSaveState.player.stats.charm}\n\nProvide one stylish outfit suggestion (e.g., top, bottom, shoes, accessory) in ${langMap[language]}.`;
            
            const result = await callGenerativeTextApi(systemPrompt, userPrompt);
            setAiModalState(s => ({ ...s, content: result, isLoading: false }));
        } catch (error) {
            console.error("Failed to generate outfit:", error);
            setAiModalState(s => ({ ...s, content: t('apiError'), isLoading: false }));
        }
    };

    const handleDeleteSave = async (id) => { 
        await db.deleteData('saves', id); 
        // 同時刪除關聯的 metadata
        const oldMetadata = await db.getAllMetadataBySaveId(id);
        await Promise.all(oldMetadata.map(m => db.deleteData('metadata', m.id)));
        setAllSaves(await db.getAllData('saves')); 
    };
    const loadGameState = async (newState, metadata = []) => { 
        const id = newState.id || crypto.randomUUID();
        const stateToSave = { ...newState, id };
        
        try {
            // 1. 儲存主狀態
            await db.saveData('saves', stateToSave);

            // 2. 獲取此 saveId 的所有舊 metadata
            const oldMetadata = await db.getAllMetadataBySaveId(id);

            // 3. 刪除所有舊 metadata
            await Promise.all(oldMetadata.map(m => db.deleteData('metadata', m.id)));

            // 4. 儲存所有新的 metadata
            const metadataToSave = metadata.map(m => ({
                ...m,
                saveId: id, // 確保 saveId 被正確覆蓋
                id: m.id || crypto.randomUUID() // 確保 id 存在
            }));
            await Promise.all(metadataToSave.map(m => db.saveData('metadata', m)));

            // 5. 刷新 UI
            setAllSaves(await db.getAllData('saves')); 
            setActiveModal('saveLobby'); 
            return true; // 表示成功
        } catch (err) {
            console.error("匯入存檔/metadata失敗:", err);
            alert(t('importError'));
            return false; // 表示失敗
        }
    };
    const handleGoToLobby = () => { setActiveModal(allSaves.length > 0 ? 'saveLobby' : 'characterCreation'); };
    const handleImportClick = () => { importInputRef.current.click(); };
    const handleFileImport = (event) => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); 
        reader.onload = async (e) => { 
            try { 
                const data = JSON.parse(e.target.result); 
                let success = false;
                // 遷移函數：確保所有角色的relationship都有orgasmCount字段，並遷移coreMemories格式
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
                    // 遷移coreMemories格式
                    if (saveData.player && saveData.player.coreMemories) {
                        if (Array.isArray(saveData.player.coreMemories)) {
                            // 舊格式：陣列，需要轉換為新格式
                            const oldMemories = saveData.player.coreMemories;
                            const newCoreMemories = { ririka: [], mei: [], yuina: [], rin: [], mayuri: [] };
                            const mainHeroineIds = ['ririka', 'mei', 'yuina', 'rin', 'mayuri'];
                            mainHeroineIds.forEach(charId => {
                                newCoreMemories[charId] = [...oldMemories];
                            });
                            saveData.player.coreMemories = newCoreMemories;
                        } else if (typeof saveData.player.coreMemories === 'object') {
                            // 新格式：對象，但需要確保所有角色都有陣列
                            const mainHeroineIds = ['ririka', 'mei', 'yuina', 'rin', 'mayuri'];
                            mainHeroineIds.forEach(charId => {
                                if (!saveData.player.coreMemories[charId]) {
                                    saveData.player.coreMemories[charId] = [];
                                }
                            });
                        }
                    } else if (saveData.player) {
                        // 如果沒有coreMemories，初始化為新格式
                        saveData.player.coreMemories = { ririka: [], mei: [], yuina: [], rin: [], mayuri: [] };
                    }
                    return saveData;
                };
                
                // 檢查新格式 (包含 metadata)
                if (data.saveState && data.saveState.player && Array.isArray(data.metadata)) {
                    const migratedSaveState = migrateSaveData(data.saveState);
                    success = await loadGameState(migratedSaveState, data.metadata);
                // 檢查舊格式 (向下相容)
                } else if (data.player && data.characters) { 
                    const migratedData = migrateSaveData(data);
                    success = await loadGameState(migratedData, []); // 匯入舊存檔，並傳入空的 metadata
                }
                
                if (success) {
                    // loadGameState 已經處理了切換到 saveLobby
                    // 這裡不需要做額外的事情，也不要呼叫 setImportStatus
                } else {
                    alert(t('importError')); // 對於開始畫面的匯入失敗，使用 alert
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
    const handleDownloadImage = useCallback(() => { if (!activeSaveState?.currentScene?.imageUrl) return; const url = activeSaveState.currentScene.imageUrl; const img = new Image(); img.crossOrigin = 'anonymous'; img.onload = () => { const canvas = document.createElement('canvas'); canvas.width = img.width; canvas.height = img.height; const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0); const now = new Date(); const filename = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_ririka.jpg`; const link = document.createElement('a'); link.download = filename; link.href = canvas.toDataURL('image/jpeg', 0.92); link.click(); }; img.src = url; }, [activeSaveState]);
    
    const handlePlayTts = useCallback(async () => {
        if (!activeSaveState) return;

        setIsTtsLoading(true);
        setTtsError(null);

        try {
            // 如果語音已經生成，只需播放
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
            
            // 決定語音
            const voiceMap = { ririka: 'Zephyr', mei: 'Leda', yuina: 'Erinome', rin: 'Callirrhoe', mayuri: 'Aoede' };
            let voiceName = voiceMap.ririka; // 默認為梨々香
            const activeChars = chatCharacters || [];
            
            if (activeChars.includes("mei")) voiceName = voiceMap.mei;
            else if (activeChars.includes("yuina")) voiceName = voiceMap.yuina;
            else if (activeChars.includes("rin")) voiceName = voiceMap.rin;
            else if (activeChars.includes("mayuri")) voiceName = voiceMap.mayuri;
            else if (activeChars.includes("ririka")) voiceName = voiceMap.ririka;

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
    if (!isInitialized) return <div className="bg-slate-900 text-pink-300 min-h-screen flex items-center justify-center font-serif">{apiError || '正在構築東京...'}</div>;

    if (!activeSaveState) {
        return ( <div className="bg-slate-900 h-screen"> 
            <AnimatePresence>
                {loadingState.llm && <LoadingOverlay key="loading-lobby" message={loadingState.message} />}
                {activeModal === 'startScreen' && <StartScreenModal key="start-screen" t={t} onGoToLobby={handleGoToLobby} onImportClick={handleImportClick} setActiveModal={setActiveModal} language={language} setLanguage={setLanguage} />}
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
                {/* --- 主畫面 (桌面與手機共用部分) --- */}
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
    const [isOpen, setIsOpen] = useState(false);
    const languages = { 'zh-TW': '繁體中文', 'zh-CN': '简体中文', 'en': 'English', 'ja': '日本語', 'ko': '한국어' };
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    return (
        <div className="relative" ref={dropdownRef}>
            <IconButton onClick={() => setIsOpen(o => !o)}><IconLanguage /></IconButton>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: isUp ? 10 : -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: isUp ? 10 : -10 }} 
                        className={`absolute ${isUp ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 w-32 bg-slate-800 border border-pink-500/50 rounded-lg shadow-lg z-50`}
                    >
                        <ul className="p-1">
                            {Object.entries(languages).map(([code, name]) => (
                                <li key={code}>
                                    <button 
                                        onClick={() => { setLanguage(code); setIsOpen(false); }}
                                        className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${language === code ? 'bg-pink-500 text-black font-bold' : 'text-white hover:bg-slate-700'}`}
                                    >
                                        {name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
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
                    <p className="font-bold text-xl md:text-2xl break-words">{key === 'money' ? `¥${value.toLocaleString()}`: value}</p>
                </div>
            ))}
        </div></div>
    </div></Modal>)};
const StartScreenModal = ({ t, onGoToLobby, onImportClick, setActiveModal, language, setLanguage }) => {
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const [footerIcons, setFooterIcons] = useState([]);
    
    useEffect(() => {
        setBackgroundUrl(START_SCREEN_BACKGROUNDS[Math.floor(Math.random() * START_SCREEN_BACKGROUNDS.length)]);
        
        // 獲取footerIcon數據
        const fetchFooterIcons = async () => {
            try {
                const response = await fetch('https://callmygod.com/api/footerIcon_links.php');
                const data = await response.json();
                if (data.footerIcon && Array.isArray(data.footerIcon)) {
                    // 隨機選出4個
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
                <LanguageSwitcher language={language} setLanguage={setLanguage} />
                <IconButton onClick={() => setActiveModal('settings')}><IconSettings /></IconButton>
            </div>
            <div className="absolute inset-0 bg-black/50"></div>
            
            <div className="flex-grow-[5] w-full relative z-10"></div> {/* Top spacer, increased from 4 to 5 to move title down */}

            <div className="relative z-10 flex flex-col items-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}>
                    <h1 className="text-6xl md:text-8xl font-bold text-pink-300 font-title text-shadow-pink">{t('gameTitle')}</h1>
                    <p className="text-2xl md:text-3xl text-pink-200 font-title mt-4">{t('gameSubtitle')}</p>
                </motion.div>
            </div>

            <div className="flex-grow-[2] w-full relative z-10"></div> {/* Bottom spacer */}

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
    const memoryValue = Math.max(10, Math.min(40, settings.memorySize ?? 20));
    const transparencyValue = Math.min(0.8, Math.max(0, settings.descriptionTransparency ?? 0.5));
    const handleExport = async () => { 
        try {
            // 1. 獲取此存檔的所有 metadata
            const allMetadata = await db.getAllMetadataBySaveId(gameState.id);
            
            // 2. 建立包含 metadata 的匯出物件
            const exportData = {
                saveState: { ...gameState, settings: settings },
                metadata: allMetadata
            };

            // 3. 序列化並下載
            const stateString = JSON.stringify(exportData, null, 2); 
            const blob = new Blob([stateString], { type: 'application/json' }); 
            const url = URL.createObjectURL(blob); 
            const a = document.createElement('a'); 
            a.href = url; 
            a.download = `ririka-secret-save-${Date.now()}.json`; 
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
                // 檢查新格式 (包含 metadata)
                if (data.saveState && data.saveState.player && Array.isArray(data.metadata)) {
                    success = await loadGameState(data.saveState, data.metadata);
                // 檢查舊格式 (向下相容)
                } else if (data.player && data.characters) { 
                    success = await loadGameState(data, []); // 匯入舊存檔，並傳入空的 metadata
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
    return (<Modal onClose={onClose} title={t('settings')}><div className="space-y-6"><div><label className="block text-gray-400 mb-2">{t('artStyle')}</label><div className="flex gap-2 rounded-lg bg-slate-950 p-1"><button onClick={() => setSettings(s => ({...s, artStyle: 'anime' }))} className={`w-full text-center rounded-md p-2 transition-colors ${settings.artStyle === 'anime' ? 'bg-pink-500 text-black font-semibold' : 'hover:bg-gray-700'}`}>{t('anime')}</button><button onClick={() => setSettings(s => ({...s, artStyle: 'realistic' }))} className={`w-full text-center rounded-md p-2 transition-colors ${settings.artStyle === 'realistic' ? 'bg-pink-500 text-black font-semibold' : 'hover:bg-gray-700'}`}>{t('realistic')}</button></div></div><div><label className="block text-gray-400 mb-2">{t('sound')}</label><button onClick={() => setSettings(s => ({...s, sound: !s.sound }))} className={`w-full text-left rounded p-2 transition-colors ${settings.sound ? 'bg-green-600' : 'bg-red-600'}`}>{settings.sound ? t('on') : t('off')}</button></div><div><label className="block text-gray-400 mb-2">{t('music')}</label><select value={settings.musicUrl || ''} onChange={(e) => setSettings(s => ({...s, musicUrl: e.target.value }))} className="w-full bg-slate-950 p-2 rounded border border-gray-600 text-white">{MUSIC_LIST.map(track => (<option key={track.name} value={track.url}>{track.name}</option>))}</select></div><div><label className="block text-gray-400 mb-2">{t('musicVolume')} ({(volume * 100).toFixed(0)}%)</label><input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/></div><div><label className="block text-gray-400 mb-2">{t('shortMemorySize')} ({memoryValue})</label><input type="range" min="10" max="40" step="5" value={memoryValue} onChange={(e) => setSettings(s => ({...s, memorySize: parseInt(e.target.value, 10) }))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/></div><div><label className="block text-gray-400 mb-2">{t('textPanelTransparency')} ({Math.round(transparencyValue * 100)}%)</label><input type="range" min="0" max="0.8" step="0.05" value={transparencyValue} onChange={(e) => setSettings(s => ({...s, descriptionTransparency: parseFloat(e.target.value) }))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/></div>{gameState && ( <div className="border-t border-gray-700 pt-6"><h3 className="text-lg font-semibold text-white mb-4">{t('saveDataManagement')}</h3><div className="flex flex-col sm:flex-row gap-4"><button onClick={handleExport} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors">{t('exportSave')}</button><button onClick={handleImportClick} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition-colors">{t('importSave')}</button><input type="file" ref={importInputRef} onChange={handleFileImport} accept=".json" className="hidden" /></div><p className={`mt-2 text-sm ${importStatus.error ? 'text-red-400' : 'text-green-400'}`}>{importStatus.message || t('importWarning')}</p></div> )}<p className="text-center text-sm text-gray-500 mt-6">{t('version')}: {CURRENT_GAME_VERSION}</p></div></Modal>)}; 
const BackpackModal = ({ t, onClose, inventory, player }) => { return (<Modal onClose={onClose} title={t('inventory')}><div className="mb-6 p-4 bg-slate-950/50 rounded-lg border border-pink-500/50 flex justify-between items-center"><h3 className="text-lg font-bold text-pink-300 flex items-center gap-2"><span className="text-2xl">¥</span><span>{t('wallet')}</span></h3><p className="text-3xl font-bold text-pink-200 font-mono">{player.stats.money?.toLocaleString() || 0}</p></div><p className="text-gray-400 text-center py-8">{t('emptyInventory')}</p></Modal>);};
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
const AvatarModal = ({ onClose, avatarSrc }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative" onClick={e => e.stopPropagation()}>
            <img src={`data:image/jpeg;base64,${avatarSrc}`} alt="Enlarged Avatar" className="max-w-[80vw] max-h-[80vh] rounded-lg shadow-2xl" />
            <button onClick={onClose} className="absolute -top-3 -right-3 bg-white rounded-full p-1 text-black"><IconClose /></button>
        </motion.div>
    </motion.div>
);

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
                    <div onClick={() => setEnlargedAvatar(characterAvatars[contact.id])} className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-pink-400/50 cursor-pointer transition-transform hover:scale-110 mx-auto sm:mx-0">
                        {characterAvatars[contact.id] ? <img src={`data:image/jpeg;base64,${characterAvatars[contact.id]}`} alt={contact.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-700"></div>}
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
                             <a href={contact.social} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-black text-white font-bold py-1 px-3 rounded text-sm transition-colors">
                                <IconX />
                            </a>
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
