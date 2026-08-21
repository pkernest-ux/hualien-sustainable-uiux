import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BuildingOffice,
  Bus,
  CalendarBlank,
  CaretDown,
  Check,
  Circle,
  Clock,
  Compass,
  FilmSlate,
  FirstAidKit,
  Flower,
  Gift,
  Globe,
  List,
  MapPin,
  NavigationArrow,
  Newspaper,
  Pause,
  Path,
  Play,
  PresentationChart,
  QrCode,
  Repeat,
  ShieldCheck,
  Stamp,
  Ticket,
  Tree,
  Wheelchair,
  X,
} from "@phosphor-icons/react";
import { DashboardPage } from "./DashboardPage.jsx";

const HERO_VIDEO_ID = "U2fPBxi1W_M";
const YOUTUBE_EMBED_ORIGIN = encodeURIComponent(window.location.origin);
const HERO_VIDEO_BACKGROUND = `https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO_ID}&controls=0&playsinline=1&rel=0&modestbranding=1&origin=${YOUTUBE_EMBED_ORIGIN}`;
const QA_STATIC_CAPTURE = new URLSearchParams(window.location.search).get("capture") === "1";

const navItems = [
  { id: "home", zh: "首頁", en: "Home" },
  { id: "news", zh: "最新消息", en: "News" },
  { id: "guide", zh: "場域導覽", en: "Guide" },
  { id: "missions", zh: "集章任務", en: "Missions" },
  { id: "media", zh: "影音花蓮", en: "Media" },
  { id: "program", zh: "活動節目", en: "Program" },
  { id: "stories", zh: "花蓮進行式", en: "Stories" },
];

const pageMeta = {
  dashboard: {
    kicker: "ACTIVITY OPERATIONS CENTER",
    title: "活動營運儀表板",
    lead: "整合網站觸及、場域互動、集章任務與兌換成果的提案模擬後台。",
    image: "./assets/venue-map-illustrated-v2.png",
    imageAlt: "活動營運儀表板",
    theme: "green",
    icon: PresentationChart,
    feature: "KPI・GA4・現場營運",
  },
  news: {
    kicker: "LATEST BLOOMS",
    title: "最新消息",
    lead: "把展覽公告、交通異動與永續行動整理在同一頁，快速掌握出發前需要知道的事。",
    image: "./assets/brand-main-visual.jpg",
    imageAlt: "大山大海，花現未來主視覺",
    theme: "blue",
    icon: Newspaper,
    feature: "公告・交通・策展花絮",
  },
  guide: {
    kicker: "SMART VENUE GUIDE",
    title: "場域導覽",
    lead: "從園區全圖開始，切換地圖與列表，接續 GPS、室內辨識點與每一座場館的完整介紹。",
    image: "./assets/venue-map-illustrated-v2.png",
    imageAlt: "花蓮主視覺風格園區導覽插畫",
    theme: "green",
    icon: Compass,
    feature: "GPS・室內導引・場館詳情",
  },
  missions: {
    kicker: "COLLECT & BLOOM",
    title: "集章任務",
    lead: "查看任務狀態、下一個挑戰與兌換條件，讓小石花跟著你的場域旅程逐一盛開。",
    image: "./assets/little-stone-flower-lineup.jpg",
    imageAlt: "小石花角色與集章視覺",
    theme: "yellow",
    icon: Stamp,
    feature: "任務狀態・下一站・好禮兌換",
  },
  media: {
    kicker: "HUALIEN IN MOTION",
    title: "影音花蓮",
    lead: "用官方 4K 來源、地方影像與策展故事，從山海尺度感受花蓮持續向前的力量。",
    image: "./assets/media-masthead-v2.webp",
    imageAlt: "花蓮中央山脈、城市與太平洋交會的繁花盛開風格插畫",
    theme: "blue",
    icon: FilmSlate,
    feature: "4K 來源・地方影像・故事延伸",
  },
  program: {
    kicker: "TODAY'S PROGRAM",
    title: "活動節目",
    lead: "依時間與類型找到舞台、導覽、工作坊和親子活動，再把想參加的節目加入自己的行程。",
    image: "./assets/we-bloom-posters.jpg",
    imageAlt: "花現未來活動主視覺提案",
    theme: "red",
    icon: CalendarBlank,
    feature: "日期・類型・集合地點",
  },
  stories: {
    kicker: "STORIES OF RESILIENCE",
    title: "花蓮進行式",
    lead: "從石縫裡的一朵花出發，以故事閱讀花蓮 107 至 115 年的施政軌跡，也看見返鄉青年、在地職人與家庭如何讓日常再次盛開。",
    image: "./assets/stories-masthead-v2.webp",
    imageAlt: "中央山脈與太平洋之間，花蓮居民修復木屋、共同種花並分享地方物產的插畫",
    theme: "red",
    icon: Tree,
    feature: "故事敘事・施政成果・未來藍圖",
  },
};

const pageFromHash = () => {
  if (!window.location.hash) return "home";
  const match = window.location.hash.match(/^#page\/([^/]+)/);
  return match && pageMeta[match[1]] ? match[1] : null;
};

const zones = {
  A棟: {
    code: "A",
    title: "韌性重生・硬底子",
    description: "從災後重生、城市治理到未來建設，透過大型影像與互動桌看見花蓮的韌性。",
    minutes: 3,
    distance: "180 公尺",
    access: "全程平面無階梯",
    steps: ["由園區入口沿主走道直行", "經舞台區右轉進入 A 棟", "抵達 01 韌性序章入口"],
  },
  H棟: {
    code: "H",
    title: "山海共生・軟實力",
    description: "以地方創生、文化記憶與永續生活為軸，認識山海之間持續生長的人與品牌。",
    minutes: 6,
    distance: "420 公尺",
    access: "設有無障礙坡道",
    steps: ["由入口往 A 棟方向前進", "沿戶外主軸通過服務中心", "依室內辨識點進入 H 棟"],
  },
  B棟: {
    code: "B",
    title: "旅程支援・服務樞紐",
    description: "整合入園諮詢、無障礙協助、設備借用、失物招領與集章兌換的旅客服務中心。",
    minutes: 4,
    distance: "250 公尺",
    access: "提供無障礙與親子支援",
    steps: ["由園區入口沿主走道前進", "通過 A 棟外側服務動線", "抵達 B 棟服務中心入口"],
  },
  戶外: {
    code: "O",
    title: "舞台市集・山海共演",
    description: "以戶外舞台、永續市集、打卡節點與集章動線，串起 A、B、H 三座場館。",
    minutes: 2,
    distance: "120 公尺",
    access: "主走道平坦，戶外服務待現勘",
    steps: ["由入口進入山海迎賓主軸", "依 GPS 提示前往舞台與市集", "沿環形動線銜接各館與打卡點"],
  },
};

const VENUE_PLANNING_SOURCE = "https://pw.hl.gov.tw/Upload/202109101414176986121.pdf";

const venuePages = {
  A棟: {
    slug: "a-hall",
    code: "A",
    theme: "red",
    name: "A 棟主展館",
    label: "韌性重生・硬底子",
    eyebrow: "THE RESILIENT CITY",
    stage: "城市敘事第一幕",
    area: "提案約 442 坪",
    duration: "建議 45–60 分鐘",
    heroImage: "./assets/a-hall-mural.jpg",
    planImage: "./assets/a-hall-layout-plan-v2.jpg",
    planImageAlt: "A 棟互動展區空間配置概念圖",
    planNote: "空間配置拆解自 A 棟互動展構想；圖中展項編號沿用原構想稿，本頁參觀順序以右側六站為主。",
    technologies: ["沉浸式投影", "互動感測", "GIS 數據視覺化", "VR720", "AI 互動", "DOME 劇場"],
    panorama: {
      image: "./assets/panorama-a-hall.jpg",
      alt: "A 棟韌性城市沉浸展廳 360 度提案模擬",
      title: "走進韌性城市沉浸劇場",
      lead: "拖曳環視舊廠房、山海環幕與數位城市展項，先預覽 A 棟的空間敘事節奏。",
      views: [
        { label: "山海序場", position: 8, title: "山海環幕序場", body: "從中央山脈與太平洋的尺度進場，建立城市韌性故事的第一個視角。", hotspotX: 30, hotspotY: 50 },
        { label: "數位城市", position: 39, title: "GIS 數位城市桌", body: "以可操作的城市模型與資料圖層，理解建設、防災與生活環境之間的關係。", hotspotX: 50, hotspotY: 62 },
        { label: "韌性工程", position: 69, title: "韌性工程互動區", body: "把重大工程與災後重建轉化為可觀看、可比較的參與式展項。", hotspotX: 64, hotspotY: 47 },
        { label: "未來藍圖", position: 94, title: "AR 未來藍圖", body: "從八年施政成果延伸至下一階段城市想像；互動設備仍屬提案模擬。", hotspotX: 72, hotspotY: 43 },
      ],
    },
    title: "讓城市的硬底子，被看見、被理解。",
    summary: "以重大建設、防災治理、災後重建與智慧治理為主軸，運用影像、數據與互動展項，讀懂花蓮如何在挑戰之後再次站穩。",
    introTitle: "從山海序場出發，走進一段可參與的韌性城市敘事。",
    introBody: "A 棟把抽象的政策與建設轉化為可觀看、可操作、可留下回應的體驗；提案以六個展區串成一條由過去走向未來的參觀路徑。",
    highlights: [
      { title: "山海序場", body: "以大型影像與聲景開啟旅程，從山、海與土地記憶進入韌性重生的城市故事。", image: "./assets/a-hall-experience-01.jpg", imageAlt: "山海環景沉浸式序場概念" },
      { title: "數位城市劇場", body: "以 270° 沉浸影像結合 GIS 資料，呈現建設、防災與城市環境的變化。", image: "./assets/a-hall-experience-02.jpg", imageAlt: "多人操作城市 GIS 互動桌的展項概念" },
      { title: "韌性時間軸", body: "透過事件排序與互動問答，理解災後復原、治理與持續前進的歷程。", image: "./assets/a-hall-experience-03.jpg", imageAlt: "城市韌性事件時間軸互動牆概念" },
      { title: "防災工程互動", body: "用視覺化與操作式展示，說明重大工程如何回應日常安全與災害風險。", image: "./assets/a-hall-experience-04.jpg", imageAlt: "多人參與防災工程決策互動的展項概念" },
      { title: "數據牆 × AR 藍圖", body: "從當代治理成果延伸到未來想像；AR 為提案互動形式，設備規格待確認。", image: "./assets/a-hall-experience-05.jpg", imageAlt: "觀看未來城市數位藍圖的互動展項概念" },
      { title: "AI 共創願景", body: "留下對花蓮未來的一句期待，完成展程並銜接 A 棟數位集章任務。", image: "./assets/a-hall-experience-06.jpg", imageAlt: "參觀者在數位留言牆共創花蓮願景的概念" },
    ],
    route: ["山海序場", "數位城市劇場", "韌性時間軸", "工程互動", "AR 未來藍圖", "共創留言"],
    services: ["原型規劃全程平面無階梯", "團體導覽於 A 棟入口集合", "輪椅與陪同協助由 B 棟受理"],
    context: "園區既有規劃將舊菸廠納入文化展覽區，保留廠房結構並透過綠帶與活動導入活化。",
    followup: "挑戰 A 棟集章任務",
    followupTarget: "missions",
  },
  H棟: {
    slug: "h-hall",
    code: "H",
    theme: "blue",
    name: "H 棟副展館",
    label: "山海共生・軟實力",
    eyebrow: "PEOPLE, CULTURE & PLACE",
    stage: "地方故事第二幕",
    area: "提案約 171 坪",
    duration: "建議 30–40 分鐘",
    heroImage: "./assets/a-hall-gallery.jpg",
    detailImage: "./assets/we-bloom-palette.jpg",
    panorama: {
      image: "./assets/panorama-h-hall.jpg",
      alt: "H 棟山海共生地方故事展廳 360 度提案模擬",
      title: "走進山海共生故事廳",
      lead: "從自然聲景、地方物產到文化聆聽站，以人的日常感受花蓮持續生長的軟實力。",
      views: [
        { label: "風土物產", position: 7, title: "H2 風土物產味", body: "以農產、工藝與品牌故事認識地方產業，再把支持行動延伸到戶外市集。", hotspotX: 32, hotspotY: 58 },
        { label: "山海之息", position: 40, title: "H1 山海之息", body: "在沉浸聲景與影像中，感受山、河、海與地方生命共同呼吸的節奏。", hotspotX: 50, hotspotY: 42 },
        { label: "文化生活", position: 71, title: "H3 文化生活誌", body: "透過影像與聲音，走近傳統藝術、族群文化與花蓮日常。", hotspotX: 64, hotspotY: 48 },
        { label: "教育共好", position: 94, title: "H4 教育與共好", body: "以共學、社區協作與社會支持情境，呈現地方關係持續發生的可能。", hotspotX: 70, hotspotY: 58 },
      ],
    },
    title: "在人的日常裡，看見花蓮持續生長的力量。",
    summary: "從產業、文化、自然人文到教育社福，H 棟把城市敘事帶回人的生活，透過故事、聲音與參與遇見地方軟實力。",
    introTitle: "館內聽故事，館外找到讓故事持續發生的人。",
    introBody: "四大主題把山海環境、地方產業、多元文化與社會共好放在同一條路徑上，並與戶外永續市集形成前後呼應。",
    highlights: [
      { title: "H1 山海之息", body: "以自然聲景與沉浸影像，感受山、河、海與地方生命的節奏。" },
      { title: "H2 風土物產味", body: "認識在地產業、農產與品牌故事，延伸到戶外市集的實際支持行動。" },
      { title: "H3 文化生活誌", body: "透過影像與聲音，走進傳統藝術、族群文化與地方日常。" },
      { title: "H4 教育與共好", body: "以情境內容呈現教育創新、社區協作與社會支持的成果與可能。" },
      { title: "90 秒在地故事", body: "選一位職人聽完語音並留下永續行動，完成 H 棟數位章。" },
    ],
    route: ["山海之息", "風土物產味", "文化生活誌", "教育與共好", "在地故事任務"],
    services: ["原型規劃設置無障礙坡道", "低刺激導覽可於 B 棟登記", "坡度、休息點與影音輔具待專業檢核"],
    context: "園區整體方向同時納入文化、青年、綠意與在地活動，H 棟在提案中承接人的故事與地方實踐。",
    followup: "接著逛戶外園區",
    followupVenue: "戶外",
  },
  B棟: {
    slug: "b-service",
    code: "B",
    theme: "yellow",
    name: "B 棟服務館",
    label: "旅程支援・服務樞紐",
    eyebrow: "VISITOR SERVICE HUB",
    stage: "全程支援中心",
    area: "提案約 60 坪",
    duration: "建議 5–10 分鐘",
    heroImage: "./assets/venue-map-illustrated-v2.png",
    detailImage: "./assets/brand-main-visual.jpg",
    panorama: {
      image: "./assets/panorama-b-service.jpg",
      alt: "B 棟智慧旅客服務中心 360 度提案模擬",
      title: "走進智慧旅客服務中心",
      lead: "預覽資訊諮詢、無障礙親子支援、數位導覽與集章核銷如何集中在同一座服務館。",
      views: [
        { label: "綜合資訊台", position: 6, title: "綜合資訊台", body: "提供園區地圖、活動、場館動線與一般旅客服務；實際服務時段待核定。", hotspotX: 33, hotspotY: 56 },
        { label: "數位導覽", position: 39, title: "數位資訊與導覽站", body: "示範 AI 問答、園區路線與活動查詢，正式資料服務尚待串接。", hotspotX: 51, hotspotY: 56 },
        { label: "親子支援", position: 70, title: "無障礙與親子支援", body: "規劃低檯服務、需求登記與親子休息區，設備數量與辦法以公告為準。", hotspotX: 66, hotspotY: 52 },
        { label: "集章兌換", position: 94, title: "小花集章核銷站", body: "完成任務後回到 B 棟確認資格；目前僅展示靜態核銷流程。", hotspotX: 72, hotspotY: 50 },
      ],
    },
    title: "從入園諮詢到集章兌換，一站接住每段旅程。",
    summary: "B 棟集中資訊、無障礙與親子協助、失物招領、設備借用及集章兌換，讓旅客在需要時快速找到支援。",
    introTitle: "先把需要的服務準備好，再安心走進園區。",
    introBody: "服務館不是旅程的附屬空間，而是智慧導覽與現場營運的交會點；所有時段、設備與人力仍須由正式營運計畫核定。",
    highlights: [
      { title: "綜合資訊台", body: "提供園區地圖、當日節目、展館動線與活動諮詢。" },
      { title: "數位資訊站", body: "示範 AI 問答、路線建議與活動查詢；目前尚未連接正式資料服務。" },
      { title: "集章核銷", body: "完成四個任務後出示原型 QR Code，示範現場確認與好禮兌換流程。" },
      { title: "無障礙與親子支援", body: "提案包含輪椅借用、親子手環與陪同需求登記，實際數量與辦法待確認。" },
      { title: "旅客服務", body: "規劃失物招領與行動電源借用，正式辦法與責任規範待營運核定。" },
      { title: "緊急支援提案", body: "急救站、AED、人力資格與後送機制須依正式安全計畫核定。" },
    ],
    route: ["入園資訊", "需求登記", "開始參觀", "完成集章", "返回核銷兌換"],
    services: ["紙本地圖與工作人員諮詢", "輪椅借用與陪同需求登記", "服務時段與設備數量以最終公告為準"],
    context: "官方既有規劃將入口舊廠房整修為遊客服務中心，並以廣場與大片草地形成迎賓及戶外展演空間。",
    followup: "檢查集章兌換資格",
    followupTarget: "missions",
  },
  戶外: {
    slug: "outdoor",
    code: "O",
    theme: "green",
    name: "戶外園區",
    label: "山海共演・盛開日常",
    eyebrow: "STAGE · MARKET · BLOOMING ROUTE",
    stage: "第三幕｜共演共遊",
    area: "提案 40 攤＋戶外舞台",
    duration: "建議 40–90 分鐘",
    heroImage: "./assets/we-bloom-posters.jpg",
    detailImage: "./assets/venue-map-illustrated-v2.png",
    panorama: {
      image: "./assets/panorama-outdoor.jpg",
      alt: "戶外山海舞台與永續市集 360 度提案模擬",
      title: "走進花現未來山海廣場",
      lead: "在山海、舞台、市集與花海裝置之間環視園區，預先掌握戶外共演與休憩節點。",
      views: [
        { label: "永續市集", position: 7, title: "花蓮永續市集", body: "規劃地方農業、青年創業、文化創意與永續選物；攤商與規模仍待招商核定。", hotspotX: 32, hotspotY: 55 },
        { label: "戶外舞台", position: 38, title: "山海共演舞台", body: "以文化、音樂、親子與永續生活為每日主題，實際演出依正式節目表。", hotspotX: 49, hotspotY: 48 },
        { label: "光影花海", position: 68, title: "花現未來光影花海", body: "花朵、海浪與山形裝置形成園區打卡節點；造景內容屬提案情境。", hotspotX: 58, hotspotY: 46 },
        { label: "場館入口", position: 94, title: "環形動線與場館入口", body: "沿平坦主動線銜接 A、H、B 棟與休息區，細部路線仍待現勘確認。", hotspotX: 72, hotspotY: 56 },
      ],
    },
    title: "讓展覽走出室內，在舞台、市集與草地上盛開。",
    summary: "戶外舞台、永續市集、打卡裝置與集章動線串起 A、B、H 三棟場館，讓旅人以自己的節奏參與花蓮。",
    introTitle: "一條環形動線，串起表演、地方品牌與每一個參與者。",
    introBody: "戶外頁把節目、市集與智慧導引放在同一個行程視角；40 攤為附件中的提案規模，仍須經招商、消防、用電與場務配置確認。",
    highlights: [
      { title: "戶外主舞台", body: "依每日主題規劃文化、音樂、親子與永續生活活動，實際內容以正式節目表為準。" },
      { title: "花蓮永續市集", body: "提案涵蓋農業品牌、地方創生、青年創業與文化創意，讓看展延伸為支持行動。" },
      { title: "GPS 山海尋寶", body: "以模擬定位提醒下一站，銜接 A 棟、舞台、市集、H 棟與 B 棟。" },
      { title: "戶外集章任務", body: "拜訪一間永續攤位，並參與一場舞台節目或工作坊。" },
      { title: "花現未來打卡線", body: "以入口、光影花海與山海框景形成拍照節點；造景形式仍屬提案。" },
      { title: "室內外導引切換", body: "戶外顯示 GPS 路線，接近展館後切換平面圖與辨識點提示。" },
    ],
    route: ["園區入口", "A 棟", "戶外舞台與市集", "H 棟", "打卡節點", "B 棟服務與兌換"],
    services: ["原型設定主要戶外動線平坦", "遮雨、座椅、照明與疏散資訊待規劃", "輪椅、陪同與緊急支援請洽 B 棟"],
    context: "官方既有規劃包含入口服務、部落活動、綠帶休憩、文化展覽與交通服務五大分區，並以環狀跑道與步道串聯。",
    followup: "查看今日舞台節目",
    followupTarget: "program",
  },
};

const venueSlugToKey = Object.fromEntries(Object.entries(venuePages).map(([key, item]) => [item.slug, key]));
const venueFromHash = () => venueSlugToKey[window.location.hash.replace(/^#venue\//, "")] ?? null;

const missionSeed = [
  { id: 1, zone: "A 棟", title: "韌性花蓮｜城市重生", detail: "完成互動時間牆", instruction: "在時間牆找出 2018、2022 與 2024 三個關鍵事件，完成韌性排序挑戰。", color: "red", image: "./assets/a-hall-mural.jpg", done: true },
  { id: 2, zone: "H 棟", title: "山海共生｜地方軟實力", detail: "探索一則在地故事", instruction: "選擇一位花蓮職人的故事，聽完 90 秒語音並留下你的永續行動。", color: "blue", image: "./assets/a-hall-gallery.jpg", done: true },
  { id: 3, zone: "戶外市集", title: "豐盛日常｜永續選物", detail: "拜訪一間在地品牌", instruction: "找到貼有小石花標誌的永續攤位，掃描現場 QR Code 完成拜訪。", color: "yellow", image: "./assets/we-bloom-palette.jpg", done: false },
  { id: 4, zone: "舞台區", title: "一起盛開｜共創花蓮", detail: "參與今日限定活動", instruction: "參加一場舞台節目或工作坊，活動結束後由現場人員發送數位章。", color: "gray", image: "./assets/we-bloom-posters.jpg", done: false },
];

const programs = [
  { id: 1, type: "舞台", time: "10:30", title: "山海開場：一起盛開", place: "戶外舞台", note: "以原民樂舞與城市聲景揭開永續風格展。", status: "即將開始" },
  { id: 2, type: "導覽", time: "11:20", title: "A 棟策展人導覽", place: "A 棟入口", note: "從舊空間的紋理讀懂花蓮韌性與災後重生。", status: "尚有名額" },
  { id: 3, type: "工作坊", time: "13:30", title: "小石花再生紙卡", place: "H 棟教室", note: "使用回收纖維製作專屬小石花紀念卡。", status: "需報名" },
  { id: 4, type: "講座", time: "14:20", title: "地方品牌的永續日常", place: "共創講堂", note: "三位花蓮品牌主理人分享從產地到旅人的實踐。", status: "自由入場" },
  { id: 5, type: "親子", time: "15:40", title: "GPS 山海尋寶隊", place: "服務中心集合", note: "適合 6–12 歲親子共同完成的戶外定位任務。", status: "尚有名額" },
  { id: 6, type: "舞台", time: "18:00", title: "暮色花蓮音樂會", place: "戶外舞台", note: "在山海暮色裡，以音樂收束一天的探索。", status: "自由入場" },
];

const mediaItems = [
  {
    id: "U2fPBxi1W_M",
    title: "天成方舟 4K",
    subtitle: "峽谷、高山與萬物共生的花蓮地景",
    source: "太魯閣國家公園",
    duration: "04:38",
  },
  {
    id: "CmWtRp_GCFw",
    title: "方舟太魯閣・絕境新機 4K",
    subtitle: "在地震與風雨之後，看見土地再生的力量",
    source: "太魯閣國家公園",
    duration: "06:13",
  },
  {
    id: "as-Vwa1D2wY",
    title: "方舟太魯閣・以太魯閣為名 4K",
    subtitle: "從山海尺度重新認識花蓮與太魯閣",
    source: "太魯閣國家公園",
    duration: "04:44",
  },
];

const newsItems = [
  {
    id: 1,
    date: "2026.08.18",
    type: "展覽公告",
    title: "「大山大海，花現未來」活動資訊正式公開",
    summary: "以場域導覽、永續市集與數位集章串起災後花蓮的韌性故事，邀請每一位旅人一起參與盛開。",
    image: "./assets/brand-main-visual.jpg",
  },
  {
    id: 2,
    date: "2026.08.12",
    type: "交通服務",
    title: "花蓮車站接駁、停車與無障礙服務一次看",
    summary: "從花蓮車站到園區，整理接駁班次、步行入口、臨時停車場與無階梯路線資訊。",
    image: "./assets/venue-map-illustrated-v2.png",
  },
  {
    id: 3,
    date: "2026.08.05",
    type: "策展花絮",
    title: "舊空間如何再次盛開：A 棟策展現場",
    summary: "保留建物時間紋理，讓流動線條、影像與互動內容在舊場域裡長出新的觀看方式。",
    image: "./assets/a-hall-mural.jpg",
  },
  {
    id: 4,
    date: "2026.07.28",
    type: "永續行動",
    title: "把旅行留下的足跡，變成花蓮明天的養分",
    summary: "循環餐具、在地選物與低碳接駁，從四個簡單選擇開始實踐更輕盈的旅程。",
    image: "./assets/we-bloom-palette.jpg",
  },
];

const stories = [
  { kicker: "BLOOMING FROM THE GROUND", title: "從石縫開花，把日常種回土地裡。", body: "一朵從河石間長出的花，串起修復空間、重新耕作與社區相聚的日常。花蓮的重生，不只發生在工程完成的那一刻，也發生在每一雙願意留下、回來與彼此合作的手裡。", image: "./assets/stories-masthead-v2.webp", label: "土地韌性" },
  { kicker: "PEOPLE OF HUALIEN", title: "每一雙手，都讓地方繼續盛開。", body: "從返鄉青年到部落職人，花蓮的永續不是口號，而是每天在土地、店舖與社區裡做出的選擇。", image: "./assets/a-hall-gallery.jpg", label: "人物故事" },
  { kicker: "WE BLOOM TOGETHER", title: "一朵小石花，連起整座城市。", body: "「小石花」象徵在石縫中仍然綻放的生命力，也邀請每位旅人把一次參與，化為花蓮未來的一部分。", image: "./assets/little-stone-flower-lineup.jpg", label: "品牌精神" },
];

const serviceContent = {
  transport: { icon: Bus, kicker: "ARRIVAL", title: "交通資訊", body: "建議搭乘花蓮車站接駁專車，活動期間 08:30–19:30 每 30 分鐘一班。自行開車可停園區東側臨時停車場。", facts: ["接駁：花蓮車站東出口", "車程：約 15 分鐘", "末班車：19:30"] },
  service: { icon: Compass, kicker: "SERVICE CENTER", title: "服務中心", body: "服務中心設於 B 棟入口，提供紙本地圖、失物招領、親子手環、行動電源租借與集章兌換。", facts: ["開放：09:00–19:00", "位置：B 棟入口", "集章核銷：閉館前 30 分鐘"] },
  access: { icon: Wheelchair, kicker: "ACCESSIBILITY", title: "無障礙服務", body: "主要展區皆規劃無階梯路線。可於服務中心借用輪椅，並由工作人員協助安排優先入場與低刺激導覽。", facts: ["無障礙廁所：A／H 棟", "輪椅借用：服務中心", "陪同需求：現場登記"] },
};

function BrandMark() {
  return <span className="brand-mark" aria-label="大山大海 花現未來"><span className="brand-kicker">WE BLOOM! HUALIEN</span><strong><span>大山大海，</span><em>花現未來</em></strong></span>;
}

function Header({ active, locale, onLocale, onNavigate, onOpenService, onStatus }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [noticesOpen, setNoticesOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const drawerRef = useRef(null);
  const menuCloseRef = useRef(null);

  useEffect(() => {
    const closeOnEscape = event => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setNoticesOpen(false);
        setLanguageOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const focusFrame = window.requestAnimationFrame(() => menuCloseRef.current?.focus());
    const trapFocus = event => {
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = [...drawerRef.current.querySelectorAll("button, a[href], [tabindex]:not([tabindex='-1'])")].filter(item => !item.disabled);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", trapFocus);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", trapFocus);
    };
  }, [menuOpen]);

  const navigate = (id) => {
    setMenuOpen(false);
    setNoticesOpen(false);
    setLanguageOpen(false);
    onNavigate(id);
  };

  const selectLocale = (next) => {
    onLocale(next);
    setLanguageOpen(false);
    onStatus(next === "zh" ? "已切換為繁體中文介面" : "English navigation preview enabled");
  };

  return <header className="site-header"><div className="header-inner">
    <button className="brand-button" onClick={() => navigate("home")} aria-label="回到首頁"><BrandMark /></button>
    <nav className="desktop-nav" aria-label="主要導覽">{navItems.map(item => <button key={item.id} className={active === item.id ? "active" : ""} aria-current={active === item.id ? "page" : undefined} onClick={() => navigate(item.id)}>{locale === "zh" ? item.zh : item.en}</button>)}</nav>
    <div className="header-tools">
      <div className="tool-wrap"><button className={`icon-button ${noticesOpen ? "selected" : ""}`} aria-label="活動通知" aria-expanded={noticesOpen} aria-controls="notice-popover" onClick={() => { setNoticesOpen(!noticesOpen); setLanguageOpen(false); }}><Bell size={21} /><i>2</i></button>{noticesOpen && <div id="notice-popover" className="header-popover notice-popover" role="dialog" aria-label="活動通知"><div className="popover-title"><strong>今日提醒</strong><button onClick={() => setNoticesOpen(false)} aria-label="關閉通知"><X /></button></div><button onClick={() => navigate("program")}><span className="notice-dot red" /><span><strong>10:30 山海開場</strong><small>戶外舞台・即將開始</small></span><ArrowRight /></button><button onClick={() => { setNoticesOpen(false); onOpenService("service"); }}><span className="notice-dot blue" /><span><strong>集章兌換至 18:30</strong><small>B 棟服務中心</small></span><ArrowRight /></button></div>}</div>
      <div className="tool-wrap"><button className={`language-button ${languageOpen ? "selected" : ""}`} aria-expanded={languageOpen} aria-controls="language-popover" onClick={() => { setLanguageOpen(!languageOpen); setNoticesOpen(false); }}><Globe /> {locale === "zh" ? "繁中" : "EN 導覽"} <CaretDown size={14} /></button>{languageOpen && <div id="language-popover" className="header-popover language-popover" role="dialog" aria-label="語言選擇"><button className={locale === "zh" ? "active" : ""} aria-pressed={locale === "zh"} onClick={() => selectLocale("zh")}><span>繁體中文</span>{locale === "zh" && <Check />}</button><button className={locale === "en" ? "active" : ""} aria-pressed={locale === "en"} onClick={() => selectLocale("en")}><span>English 導覽預覽</span>{locale === "en" && <Check />}</button></div>}</div>
      <button className={`dashboard-tool-button ${active === "dashboard" ? "active" : ""}`} aria-current={active === "dashboard" ? "page" : undefined} onClick={() => navigate("dashboard")}><PresentationChart weight="duotone" /><span><strong>營運儀表板</strong><small>模擬後台</small></span></button>
      <button className="menu-button" aria-label="開啟選單" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(true)}><List size={25} />選單</button>
    </div>
  </div>{menuOpen && <div ref={drawerRef} id="mobile-navigation" className="mobile-drawer" role="dialog" aria-modal="true" aria-label="網站選單"><div className="drawer-top"><BrandMark /><button ref={menuCloseRef} className="icon-button" onClick={() => setMenuOpen(false)} aria-label="關閉選單"><X size={25} /></button></div><nav>{navItems.map(item => <button key={item.id} className={active === item.id ? "active" : ""} aria-current={active === item.id ? "page" : undefined} onClick={() => navigate(item.id)}><span>{locale === "zh" ? item.zh : item.en}</span><ArrowRight size={19} /></button>)}</nav><div className="drawer-admin"><small>工作人員工具</small><button className={active === "dashboard" ? "active" : ""} aria-current={active === "dashboard" ? "page" : undefined} onClick={() => navigate("dashboard")}><span><PresentationChart weight="duotone" /></span><span><strong>活動營運儀表板</strong><small>KPI・網站流量・集章兌換</small></span><ArrowRight /></button></div><div className="drawer-notices"><button onClick={() => navigate("program")}><Bell weight="fill" /><span><strong>10:30 山海開場</strong><small>查看今日活動提醒</small></span><ArrowRight /></button><button onClick={() => { setMenuOpen(false); onOpenService("service"); }}><Gift weight="fill" /><span><strong>集章兌換至 18:30</strong><small>B 棟服務中心</small></span><ArrowRight /></button></div><div className="drawer-language"><button className={locale === "zh" ? "active" : ""} aria-pressed={locale === "zh"} onClick={() => selectLocale("zh")}>繁中</button><button className={locale === "en" ? "active" : ""} aria-pressed={locale === "en"} onClick={() => selectLocale("en")}>EN 導覽</button></div><p>2026.11.14 — 11.21<br />花蓮縣運動休閒園區</p></div>}</header>;
}

function Hero() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setShowIntro(true);
    const timer = window.setTimeout(() => setShowIntro(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  return <section className="hero" id="home">
    <div className="hero-media" aria-hidden="true"><img className="hero-poster" src="./assets/a-hall-mural.jpg" alt="" />{!QA_STATIC_CAPTURE && <iframe src={HERO_VIDEO_BACKGROUND} title="太魯閣國家公園天成方舟 4K 背景影片" allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" tabIndex="-1" />}</div>
    <div className="hero-shade" />
    <div className={`hero-content ${showIntro ? "intro-active" : ""}`}><h1>花蓮正在盛開，<br /><span>大山大海一起向前。</span></h1><p className="hero-lead">從災後重生的力量出發，在山海、城市與人的故事裡，看見花蓮持續向前。</p></div>
    <div className={`hero-intro ${showIntro ? "show" : "hide"}`} aria-hidden={!showIntro}>
      <picture><source media="(max-width: 700px)" srcSet="./assets/brand-main-visual.jpg" /><img src="./assets/selected-hero-banner.png" alt="大山大海，花現未來主視覺：山、海、花與花蓮盛開意象" /></picture>
      <span className="intro-progress" />
    </div>
  </section>;
}

function AnnouncementBar({ onNavigate, onOpenService }) {
  return <section className="announcement" aria-label="重要公告"><div className="announcement-inner"><span className="announcement-label"><Bell weight="fill" />最新公告</span><button className="announcement-copy" onClick={() => onNavigate("news")}><strong>花蓮永續風格展活動資訊正式公開</strong><small>2026.08.18</small><ArrowRight /></button><button className="announcement-service" onClick={() => onOpenService("transport")}><Bus />接駁與交通</button></div></section>;
}

function LatestNews({ onNews }) {
  const [filter, setFilter] = useState("全部");
  const types = ["全部", "展覽公告", "交通服務", "策展花絮", "永續行動"];
  const visible = filter === "全部" ? newsItems : newsItems.filter(item => item.type === filter);

  return <section className="news-section" id="news"><div className="section-heading news-heading"><div><p>LATEST BLOOMS</p><h2>最新消息，<br />每一天都在發芽。</h2></div><div className="news-filters" aria-label="最新消息分類">{types.map(type => <button key={type} className={filter === type ? "active" : ""} aria-pressed={filter === type} onClick={() => setFilter(type)}>{type}</button>)}</div></div><div className="news-grid">{visible.map((item, index) => <button key={item.id} className={`news-card news-card-${index + 1}`} onClick={() => onNews(item)}><span className="news-image"><img src={item.image} alt="" loading="lazy" /><span>{item.type}</span></span><span className="news-body"><small><CalendarBlank weight="fill" />{item.date}</small><strong>{item.title}</strong><span className="news-summary">{item.summary}</span><span className="news-more">閱讀消息 <ArrowUpRight /></span></span></button>)}</div>{visible.length === 0 && <div className="news-empty"><Newspaper size={38} /><strong>這個分類目前沒有更多消息</strong><p>請切換其他分類查看提案示意內容。</p></div>}<p className="prototype-disclaimer">最新消息為提案原型示意內容，正式上線將串接經審核的內容管理資料。</p></section>;
}

function MediaSection({ onOpenVideo }) {
  const [selectedId, setSelectedId] = useState(mediaItems[0].id);
  const selected = mediaItems.find(item => item.id === selectedId) ?? mediaItems[0];
  const player = `https://www.youtube-nocookie.com/embed/${selected.id}?controls=1&playsinline=1&rel=0&origin=${YOUTUBE_EMBED_ORIGIN}`;

  return <section className="media-section" id="media"><div className="media-heading"><span className="media-symbol"><FilmSlate weight="duotone" /></span><div><p className="eyebrow">SEE HUALIEN IN MOTION</p><h2>讓山海說話，<br />看見花蓮持續前進。</h2><p>用真實地景與人的故事，為災後花蓮留下具有生命力的影像篇章。</p></div></div><div className="media-layout"><div className="media-player-wrap"><div className="media-player">{QA_STATIC_CAPTURE ? <img className="media-capture-poster" src={`https://i.ytimg.com/vi/${selected.id}/maxresdefault.jpg`} alt={`${selected.title}影片預覽`} loading="lazy" /> : <iframe key={selected.id} src={player} title={`${selected.title} 播放器`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy" />}</div><div className="media-caption"><div><small>4K 來源・{selected.source}</small><strong>{selected.title}</strong><p>{selected.subtitle}</p></div><button className="secondary-cta" onClick={() => onOpenVideo(selected)}><Play weight="fill" />開啟完整播放器</button></div></div><div className="media-playlist">{mediaItems.map((item, index) => <button key={item.id} className={selected.id === item.id ? "active" : ""} aria-pressed={selected.id === item.id} onClick={() => setSelectedId(item.id)}><span className="media-thumb"><img src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`} alt="" loading="lazy" /><i><Play weight="fill" /></i></span><span><small>0{index + 1} · {item.duration}</small><strong>{item.title}</strong><span className="media-summary">{item.subtitle}</span></span></button>)}</div></div><p className="media-rights">影片以官方 YouTube 嵌入作為提案展示；正式上線、下載、剪輯或重製仍須取得權利人書面授權。播放器使用自適應串流，畫質依裝置與網路決定。</p></section>;
}

function QuickJourney({ onNavigate }) {
  const items = [
    { icon: Newspaper, title: "最新消息", text: "公告・交通・策展花絮", action: () => onNavigate("news") },
    { icon: Compass, title: "場域導覽", text: "園區地圖＋四館介紹", action: () => onNavigate("guide") },
    { icon: Stamp, title: "集章任務", text: "任務狀態＋兌換資格", action: () => onNavigate("missions") },
    { icon: FilmSlate, title: "影音花蓮", text: "4K 山海影像與地方故事", action: () => onNavigate("media") },
    { icon: Ticket, title: "活動節目", text: "舞台・導覽・工作坊", action: () => onNavigate("program") },
    { icon: Tree, title: "花蓮進行式", text: "故事・施政成果・未來藍圖", action: () => onNavigate("stories") },
  ];
  return <section className="quick-section"><div className="section-heading compact"><p>EXPLORE YOUR JOURNEY</p><h2>今天，想從哪裡開始？</h2></div><div className="quick-grid">{items.map(({ icon: Icon, title, text, action }, index) => <button key={title} className={`quick-card tone-${index + 1}`} onClick={action}><span className="quick-icon"><Icon size={27} weight="duotone" /></span><span><strong>{title}</strong><small>{text}</small></span><ArrowRight size={20} /></button>)}</div></section>;
}

function HomeHighlights({ missions, onNavigate, onNews, onStory, onVenue }) {
  const doneCount = missions.filter(item => item.done).length;
  const nextMission = missions.find(item => !item.done) ?? missions[0];
  const featuredStory = stories[0];

  return <>
    <section className="home-feature-grid" aria-label="首頁精選服務">
      <article className="home-feature home-feature-guide">
        <div className="home-feature-media"><img src="./assets/venue-map-illustrated-v2.png" alt="花蓮主視覺風格園區導覽插畫" loading="lazy" /></div>
        <div className="home-feature-copy"><span className="home-feature-icon"><Compass weight="duotone" /></span><p className="eyebrow">SMART VENUE GUIDE</p><h2>從園區全圖，走進每一座場館。</h2><p>地圖與列表可自由切換，四個場域都有獨立介紹、步行時間與模擬路線。</p><div className="home-feature-actions"><button className="primary-cta" onClick={() => onNavigate("guide")}>開啟場域導覽 <ArrowRight /></button><button className="secondary-cta" onClick={() => onVenue("A棟")}>先看 A 棟</button></div></div>
      </article>
      <article className="home-feature home-feature-mission">
        <div className="home-feature-copy"><span className="home-feature-icon"><Stamp weight="duotone" /></span><p className="eyebrow">COLLECT & BLOOM</p><h2>下一朵小石花，正在等你。</h2><p>目前完成 {doneCount} / 4 個任務；下一站是「{nextMission.title}」。</p><div className="home-mini-progress" aria-label={`已完成 ${doneCount} 個任務，共 4 個`}><span style={{ width: `${doneCount * 25}%` }} /></div><button className="primary-cta" onClick={() => onNavigate("missions")}>查看任務與兌換 <ArrowRight /></button></div>
        <div className="home-feature-media"><img src="./assets/little-stone-flower-lineup.jpg" alt="小石花角色與集章視覺" loading="lazy" /></div>
      </article>
    </section>

    <section className="home-news-preview" aria-labelledby="home-news-title"><div className="home-preview-heading"><div><p className="eyebrow">LATEST BLOOMS</p><h2 id="home-news-title">出發前，先看最新消息。</h2></div><button className="text-link" onClick={() => onNavigate("news")}>查看全部消息 <ArrowRight /></button></div><div className="home-news-list">{newsItems.slice(0, 3).map(item => <button key={item.id} onClick={() => onNews(item)}><span><small>{item.type}</small><time>{item.date}</time></span><strong>{item.title}</strong><ArrowUpRight /></button>)}</div></section>

    <section className="home-story-preview"><div className="home-story-image"><img src={featuredStory.image} alt={featuredStory.title} loading="lazy" /></div><div className="home-story-copy"><span className="story-label">{featuredStory.label}</span><p className="eyebrow">{featuredStory.kicker}</p><h2>{featuredStory.title}</h2><p>{featuredStory.body}</p><div className="home-feature-actions"><button className="primary-cta" onClick={() => onStory(featuredStory)}>閱讀精選故事 <ArrowRight /></button><button className="secondary-cta" onClick={() => onNavigate("stories")}>前往花蓮進行式</button></div></div></section>
  </>;
}

function VenueHub({ onVenue, onRoute }) {
  return <section className="venue-hub" aria-labelledby="venue-hub-title"><div className="venue-hub-heading"><div><p className="eyebrow">VENUES TO EXPLORE</p><h2 id="venue-hub-title">每一座場館，<br />都有自己的花蓮故事。</h2></div><p>從城市韌性、地方生活到旅客服務與戶外共演，選擇一座場館，進入完整介紹頁。</p></div><div className="venue-card-grid">{Object.entries(venuePages).map(([key, item]) => <article key={key} className={`venue-card venue-card-${item.theme}`}><div className="venue-card-image"><img src={item.heroImage} alt={`${item.name}場域參考`} loading="lazy" /><span>{item.code}</span></div><div className="venue-card-body"><small>{item.stage}</small><h3>{item.name}</h3><strong>{item.label}</strong><p>{item.summary}</p><div className="venue-card-meta"><span>{item.area}</span><span>{item.duration}</span></div><div className="venue-card-actions"><button className="venue-open" onClick={() => onVenue(key)}>查看場館介紹 <ArrowRight /></button><button className="venue-route" onClick={() => onRoute(key)} aria-label={`預覽前往${key}路線`}><NavigationArrow weight="fill" />路線</button></div></div></article>)}</div><p className="venue-hub-note">場館面積、展項、服務與戶外規模為現階段提案內容；正式資訊以主辦單位核定與現場公告為準。</p></section>;
}

function MapExperience({ onRoute, onVenue }) {
  const [zone, setZone] = useState("A棟");
  const [view, setView] = useState("map");
  const current = zones[zone];
  return <><section className="map-section" id="guide"><div className="map-panel"><div className="map-toolbar" aria-label="導覽顯示模式"><button className={view === "map" ? "active" : ""} aria-pressed={view === "map"} onClick={() => setView("map")}><MapPin />地圖</button><button className={view === "list" ? "active" : ""} aria-pressed={view === "list"} onClick={() => setView("list")}><List />列表</button></div>{view === "map" ? <div className="map-canvas"><img src="./assets/venue-map-illustrated-v2.png" alt="花蓮主視覺風格園區導覽插畫" loading="lazy" /><button className={`map-marker marker-a ${zone === "A棟" ? "active" : ""}`} onClick={() => setZone("A棟")} aria-label="選擇 A 棟" aria-pressed={zone === "A棟"}><span>A</span></button><button className={`map-marker marker-h ${zone === "H棟" ? "active" : ""}`} onClick={() => setZone("H棟")} aria-label="選擇 H 棟" aria-pressed={zone === "H棟"}><span>H</span></button><button className={`map-marker marker-b ${zone === "B棟" ? "active" : ""}`} onClick={() => setZone("B棟")} aria-label="選擇 B 棟" aria-pressed={zone === "B棟"}><span>B</span></button><button className={`map-marker marker-outdoor ${zone === "戶外" ? "active" : ""}`} onClick={() => setZone("戶外")} aria-label="選擇戶外園區" aria-pressed={zone === "戶外"}><span><Tree size={18} /></span></button><div className={`route-line route-${current.code.toLowerCase()}`} /></div> : <div className="zone-list">{Object.entries(zones).map(([name, item]) => <button key={name} className={zone === name ? "active" : ""} aria-pressed={zone === name} onClick={() => setZone(name)}><span>{item.code}</span><span className="zone-row-copy"><small>{name}</small><strong>{item.title}</strong><span>{item.minutes} 分鐘・{item.distance}</span></span><ArrowRight /></button>)}</div>}</div><div className="map-copy"><p className="eyebrow">SMART VENUE GUIDE</p><h2>整座園區，<br />就是你的探索地圖。</h2><p>戶外以 GPS 提醒下一站；進入展館後，自動切換平面圖與辨識點導引。你永遠知道自己在哪裡、下一步要去哪裡。</p><div className="zone-tabs">{Object.keys(zones).map(item => <button key={item} className={zone === item ? "active" : ""} aria-pressed={zone === item} onClick={() => setZone(item)}>{item}</button>)}</div><div className="selected-zone"><span className="zone-icon"><Path size={26} /></span><div><small>目前選擇</small><strong>{current.title}</strong><p>步行約 {current.minutes} 分鐘 · {current.access}</p></div></div><div className="map-actions"><button className="secondary-cta wide" onClick={() => onVenue(zone)}><BuildingOffice weight="duotone" />深入了解 {zone}</button><button className="primary-cta wide" onClick={() => onRoute(zone)}><NavigationArrow weight="fill" />預覽前往 {zone} 路線</button></div><small className="prototype-note">展示模式：以模擬 GPS 與室內辨識點呈現完整服務流程</small></div></section><VenueHub onVenue={onVenue} onRoute={onRoute} /></>;
}

function VenueHighlightCard({ item, index }) {
  const number = String(index + 1).padStart(2, "0");
  return <article className={`venue-highlight-card ${item.image ? "visual" : ""}`}>
    {item.image ? <div className="venue-highlight-image"><img src={item.image} alt={item.imageAlt} loading="lazy" /><span className="venue-highlight-number">{number}</span></div> : <span className="venue-highlight-number">{number}</span>}
    <div className="venue-highlight-copy"><h3>{item.title}</h3><p>{item.body}</p></div>
  </article>;
}

function VenuePlanVisual({ venue }) {
  if (!venue.planImage) return <div className={`venue-detail-image ${venue.detailContain ? "contain" : ""}`}><img src={venue.detailImage} alt={`${venue.name}策展與場域參考`} loading="lazy" /><span>場域／策展參考</span></div>;
  return <div className="venue-layout-card">
    <div className="venue-layout-heading"><p>A 棟展區配置</p><h3>六站體驗，一眼掌握。</h3><span>從入口進入中央展區，再沿著環形主動線依序探索影像、數據、互動與共創內容。</span></div>
    <figure className="venue-layout-figure"><img src={venue.planImage} alt={venue.planImageAlt} loading="eager" /><figcaption>{venue.planNote}</figcaption></figure>
    <div className="venue-technology"><small>核心技術應用</small><div>{venue.technologies.map(item => <span key={item}>{item}</span>)}</div></div>
  </div>;
}

function VenuePanoramaSection({ venue, onOpen }) {
  const panorama = venue.panorama;
  return <section className="venue-panorama-section" aria-labelledby={`${venue.slug}-panorama-title`}>
    <div className="venue-panorama-copy">
      <p className="eyebrow">360° IMMERSIVE PREVIEW</p>
      <h2 id={`${venue.slug}-panorama-title`}>{panorama.title}</h2>
      <p>{panorama.lead}</p>
      <div className="venue-panorama-tags" aria-label="可預覽的場景方位">{panorama.views.map((view, index) => <span key={view.label}><small>{String(index + 1).padStart(2, "0")}</small>{view.label}</span>)}</div>
      <button className="primary-cta" onClick={onOpen}><Play weight="fill" />進入 360° 展示</button>
      <small className="panorama-prototype-note">提案情境模擬・非現場實景拍攝・可拖曳環視</small>
    </div>
    <button className="venue-panorama-preview" onClick={onOpen} aria-label={`進入${venue.name} 360 度展示`}>
      <img src={panorama.image} alt={panorama.alt} loading="lazy" />
      <span className="venue-panorama-orbit"><Repeat weight="bold" /><strong>360°</strong></span>
      <span className="venue-panorama-enter"><Play weight="fill" />點擊進入環景</span>
    </button>
  </section>;
}

const panoramaViewYaw = view => ((view.position / 100) * Math.PI * 2) - Math.PI;
const panoramaMarkerYaw = view => panoramaViewYaw(view) + (((view.hotspotX - 50) / 100) * Math.PI * .35);
const panoramaMarkerPitch = view => ((50 - view.hotspotY) / 100) * Math.PI * .6;
const panoramaAngleDistance = (left, right) => Math.abs(Math.atan2(Math.sin(left - right), Math.cos(left - right)));

function PanoramaModal({ venueKey, onClose }) {
  const venue = venuePages[venueKey];
  const panorama = venue.panorama;
  const views = panorama.views;
  const initialView = 1;
  const [viewIndex, setViewIndex] = useState(initialView);
  const [autoTour, setAutoTour] = useState(false);
  const [viewerReady, setViewerReady] = useState(false);
  const [viewerError, setViewerError] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const viewerContainerRef = useRef(null);
  const viewerRef = useRef(null);
  const markerElementsRef = useRef([]);
  const positionTimerRef = useRef(null);

  const moveViewerTo = (index, animate = true) => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const position = { yaw: panoramaViewYaw(views[index]), pitch: 0 };
    viewer.stopAnimation();
    if (!animate || reduceMotion) viewer.rotate(position);
    else viewer.animate({ ...position, zoom: 52, speed: 720 });
  };

  const showView = (nextIndex, manual = false) => {
    const normalized = (nextIndex + views.length) % views.length;
    if (manual) setAutoTour(false);
    setViewIndex(normalized);
    setActiveHotspot(null);
    moveViewerTo(normalized, true);
  };

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = event => {
      setReduceMotion(event.matches);
      viewerRef.current?.setOption("moveInertia", event.matches ? false : .72);
      if (event.matches) {
        setAutoTour(false);
        viewerRef.current?.stopAnimation();
      }
    };
    preference.addEventListener?.("change", syncPreference);
    return () => preference.removeEventListener?.("change", syncPreference);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let viewer;

    const initializeViewer = async () => {
      try {
        const [{ Viewer }, { MarkersPlugin }] = await Promise.all([
          import("@photo-sphere-viewer/core"),
          import("@photo-sphere-viewer/markers-plugin"),
        ]);
        if (cancelled || !viewerContainerRef.current) return;

        const markers = views.map((view, index) => {
          const element = document.createElement("button");
          element.type = "button";
          element.className = "panorama-sphere-hotspot";
          element.setAttribute("aria-label", `查看資訊熱點：${view.title}`);
          element.innerHTML = `<span aria-hidden="true">${index + 1}</span>`;
          markerElementsRef.current[index] = element;
          return {
            id: `${venue.slug}-hotspot-${index}`,
            element,
            position: { yaw: panoramaMarkerYaw(view), pitch: panoramaMarkerPitch(view) },
            size: { width: 54, height: 54 },
            anchor: "center center",
            tooltip: { content: view.title, position: "top center" },
            data: { index },
          };
        });

        viewer = new Viewer({
          container: viewerContainerRef.current,
          panorama: panorama.image,
          defaultYaw: panoramaViewYaw(views[initialView]),
          defaultPitch: 0,
          defaultZoomLvl: 52,
          minFov: 35,
          maxFov: 92,
          moveInertia: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? false : .72,
          mousewheel: true,
          mousewheelCtrlKey: false,
          touchmoveTwoFingers: false,
          keyboard: false,
          navbar: ["zoom", "move", "fullscreen"],
          canvasBackground: "#17333b",
          loadingTxt: "正在載入 360° 場景…",
          lang: {
            zoom: "縮放",
            zoomOut: "縮小",
            zoomIn: "放大",
            moveUp: "向上轉動",
            moveDown: "向下轉動",
            moveLeft: "向左轉動",
            moveRight: "向右轉動",
            fullscreen: "全螢幕",
            loading: "正在載入…",
            menu: "選單",
            close: "關閉",
            twoFingers: "請用兩指操作環景",
            ctrlZoom: "按住 Ctrl 並捲動以縮放",
            loadError: "環景載入失敗",
            webglError: "此裝置不支援 WebGL 360° 顯示",
          },
          plugins: [MarkersPlugin.withConfig({ markers, defaultHoverScale: { amount: 1.22, duration: 120, easing: "ease-out" } })],
        });
        viewerRef.current = viewer;

        const markersPlugin = viewer.getPlugin(MarkersPlugin);
        markersPlugin.addEventListener("select-marker", ({ marker }) => {
          const selected = Number(marker.data?.index);
          if (!Number.isInteger(selected)) return;
          setAutoTour(false);
          setViewIndex(selected);
          setActiveHotspot(views[selected]);
        });
        markersPlugin.addEventListener("unselect-marker", () => setActiveHotspot(null));

        viewer.addEventListener("ready", () => {
          if (!cancelled) {
            viewerContainerRef.current?.querySelectorAll(".psv-button").forEach(control => {
              const label = control.getAttribute("title");
              if (control.tabIndex >= 0 && label) {
                control.setAttribute("role", "button");
                control.setAttribute("aria-label", label);
                control.addEventListener("keydown", event => {
                  if (event.key === " ") {
                    event.preventDefault();
                    control.click();
                  }
                });
              }
            });
            setViewerReady(true);
            setViewerError(false);
          }
        }, { once: true });
        viewer.addEventListener("panorama-error", () => {
          if (!cancelled) setViewerError(true);
        });
        viewer.addEventListener("position-updated", ({ position }) => {
          window.clearTimeout(positionTimerRef.current);
          positionTimerRef.current = window.setTimeout(() => {
            const nearest = views.reduce((best, view, index) => panoramaAngleDistance(panoramaViewYaw(view), position.yaw) < panoramaAngleDistance(panoramaViewYaw(views[best]), position.yaw) ? index : best, 0);
            setViewIndex(current => current === nearest ? current : nearest);
          }, 240);
        });
      } catch {
        if (!cancelled) setViewerError(true);
      }
    };

    initializeViewer();
    return () => {
      cancelled = true;
      window.clearTimeout(positionTimerRef.current);
      viewerRef.current = null;
      markerElementsRef.current = [];
      viewer?.destroy();
    };
  }, [panorama.image, venue.slug, views]);

  useEffect(() => {
    if (!autoTour || reduceMotion || !viewerReady) return undefined;
    const timer = window.setInterval(() => {
      setViewIndex(current => {
        const next = (current + 1) % views.length;
        setActiveHotspot(null);
        const viewer = viewerRef.current;
        if (viewer) {
          viewer.stopAnimation();
          viewer.animate({ yaw: panoramaViewYaw(views[next]), pitch: 0, zoom: 52, speed: 900 });
        }
        return next;
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [autoTour, reduceMotion, viewerReady, views]);

  const stopForInteraction = () => {
    setAutoTour(false);
    setActiveHotspot(null);
  };

  const handleStageKeyDown = event => {
    if (event.target !== event.currentTarget) return;
    const viewer = viewerRef.current;
    if (!viewer) return;
    const position = viewer.getPosition();
    const pitchStep = Math.PI / 18;
    if (event.key === "ArrowLeft") { event.preventDefault(); showView(viewIndex - 1, true); }
    if (event.key === "ArrowRight") { event.preventDefault(); showView(viewIndex + 1, true); }
    if (event.key === "ArrowUp") { event.preventDefault(); stopForInteraction(); viewer.animate({ yaw: position.yaw, pitch: Math.min(Math.PI / 2, position.pitch + pitchStep), speed: 260 }); }
    if (event.key === "ArrowDown") { event.preventDefault(); stopForInteraction(); viewer.animate({ yaw: position.yaw, pitch: Math.max(-Math.PI / 2, position.pitch - pitchStep), speed: 260 }); }
    if (event.key === "+" || event.key === "=") { event.preventDefault(); stopForInteraction(); viewer.zoomIn(8); }
    if (event.key === "-") { event.preventDefault(); stopForInteraction(); viewer.zoomOut(8); }
    if (event.key === "Home") { event.preventDefault(); showView(initialView, true); }
  };

  const closeHotspot = () => {
    const index = views.indexOf(activeHotspot);
    setActiveHotspot(null);
    window.requestAnimationFrame(() => markerElementsRef.current[index]?.focus());
  };

  const current = views[viewIndex];
  return <ModalShell label={`${venue.name} 360 度展示`} onClose={onClose} wide modalClassName="panorama-shell">
    <div className="panorama-modal">
      <header className="panorama-modal-header"><div><small>SPHERICAL 360° VIEWER · 提案情境</small><h2>{venue.name}｜{panorama.title}</h2></div><span>{String(viewIndex + 1).padStart(2, "0")} / {String(views.length).padStart(2, "0")}</span></header>
      <div
        className={`panorama-stage ${viewerReady ? "viewer-ready" : ""} ${viewerError ? "viewer-error" : ""}`}
        tabIndex="0"
        role="region"
        aria-label={`${venue.name}球面 360 度模擬場景；目前方位：${current.label}。可上下左右拖曳、滾輪縮放或使用方向鍵。`}
        onKeyDown={handleStageKeyDown}
        onPointerDownCapture={event => {
          if (!event.target.closest("button, [role='button']")) event.currentTarget.focus({ preventScroll: true });
          stopForInteraction();
        }}
        onWheelCapture={() => setAutoTour(false)}
        onTouchStartCapture={() => setAutoTour(false)}
      >
        <img className="panorama-sphere-fallback" src={panorama.image} alt="" style={{ objectPosition: `${current.position}% center` }} />
        <div ref={viewerContainerRef} className="panorama-sphere-viewer" />
        <div className="panorama-drag-hint"><Repeat weight="bold" />上下左右拖曳・滾輪縮放</div>
        {viewerError && <div className="panorama-viewer-status" role="status"><strong>已切換靜態環景</strong><span>此裝置無法啟用 WebGL 球面檢視，仍可使用下方四個方位預覽。</span></div>}
        {activeHotspot && <aside className="panorama-hotspot-card" aria-live="polite"><small>INFO POINT {String(viewIndex + 1).padStart(2, "0")}</small><strong>{activeHotspot.title}</strong><p>{activeHotspot.body}</p><button onClick={closeHotspot} aria-label="關閉資訊熱點"><X /></button></aside>}
        <div className="panorama-arrow-controls"><button onClick={() => showView(viewIndex - 1, true)} aria-label="前一個場景方位"><ArrowLeft /></button><button onClick={() => showView(viewIndex + 1, true)} aria-label="下一個場景方位"><ArrowRight /></button></div>
      </div>
      <div className="panorama-controls">
        <div className="panorama-view-tabs" aria-label="選擇場景方位">{views.map((view, index) => <button key={view.label} className={viewIndex === index ? "active" : ""} aria-pressed={viewIndex === index} onClick={() => showView(index, true)}><span>{String(index + 1).padStart(2, "0")}</span>{view.label}</button>)}</div>
        <button className={`panorama-auto ${autoTour ? "active" : ""}`} aria-pressed={autoTour} disabled={reduceMotion || !viewerReady || viewerError} title={reduceMotion ? "已依系統減少動態效果設定停用" : viewerError ? "此裝置目前使用靜態環景" : !viewerReady ? "360° 場景載入中" : undefined} onClick={() => setAutoTour(value => !value)}>{autoTour ? <Pause weight="fill" /> : <Play weight="fill" />}{reduceMotion ? "減少動態模式" : viewerError ? "靜態環景模式" : !viewerReady ? "場景載入中" : autoTour ? "暫停巡覽" : "自動巡覽"}</button>
      </div>
      <div className="panorama-current" aria-live="polite"><span><MapPin weight="fill" /></span><div><small>目前方位</small><strong>{current.title}</strong><p>{current.body}</p></div></div>
      <p className="panorama-disclaimer">本區使用 WebGL 球面投影模擬 360° 觀看，可上下左右轉動與縮放；素材為提案情境生成圖，並非現場環景攝影，實際展項、設備、服務與動線以最終核定為準。</p>
    </div>
  </ModalShell>;
}

function VenueDetailPage({ venueKey, onBack, onRoute, onVenue, onNavigate, onService, onPanorama }) {
  const venue = venuePages[venueKey];
  const stats = [
    { icon: BuildingOffice, label: "場館角色", value: venue.stage },
    { icon: PresentationChart, label: "提案規模", value: venue.area },
    { icon: Clock, label: "參觀時間", value: venue.duration },
  ];
  const serviceIcons = [Wheelchair, ShieldCheck, Compass];
  const otherVenues = Object.entries(venuePages).filter(([key]) => key !== venueKey);
  const followup = () => venue.followupVenue ? onVenue(venue.followupVenue) : onNavigate(venue.followupTarget);

  useEffect(() => {
    const title = document.querySelector(".venue-detail h1");
    title?.setAttribute("tabindex", "-1");
    title?.focus({ preventScroll: true });
  }, [venueKey]);

  return <article className={`venue-detail venue-theme-${venue.theme}`}><section className="venue-detail-hero"><img src={venue.heroImage} alt={`${venue.name}提案視覺參考`} /><div className="venue-detail-shade" /><div className="venue-detail-hero-inner"><button className="venue-back" onClick={onBack}><ArrowLeft />回到場域導覽</button><span className="venue-proposal-chip">PROPOSAL PREVIEW · 提案原型</span><p>{venue.eyebrow}</p><div className="venue-code-lockup"><span>{venue.code}</span><div><small>{venue.stage}</small><strong>{venue.name}</strong></div></div><h1>{venue.title}</h1><p className="venue-hero-summary">{venue.summary}</p><div className="venue-hero-actions"><button className="primary-cta" onClick={() => onRoute(venueKey)}><NavigationArrow weight="fill" />開始導引</button><button className="panorama-hero-cta" onClick={() => onPanorama(venueKey)}><Repeat weight="bold" />進入 360° 展示</button><button className="video-cta" onClick={followup}>{venue.followup}<ArrowRight /></button></div></div></section><div className="venue-detail-main"><section className="venue-stats" aria-label={`${venue.name}基本資訊`}>{stats.map(({ icon: Icon, label, value }) => <div key={label}><span><Icon weight="duotone" /></span><small>{label}</small><strong>{value}</strong></div>)}</section><section className="venue-overview"><div><p className="eyebrow">ABOUT THE VENUE</p><h2>{venue.introTitle}</h2><p>{venue.introBody}</p></div><aside><span><BuildingOffice weight="duotone" /></span><div><small>既有場域背景</small><p>{venue.context}</p><a href={VENUE_PLANNING_SOURCE} target="_blank" rel="noreferrer">查看花蓮縣政府場域規劃資料 <ArrowUpRight /></a></div></aside></section><VenuePanoramaSection venue={venue} onOpen={() => onPanorama(venueKey)} /><section className="venue-highlights"><div className="venue-section-title"><div><p className="eyebrow">WHAT TO EXPERIENCE</p><h2>{venue.name}體驗亮點</h2></div><span>{String(venue.highlights.length).padStart(2, "0")} 個提案展項</span></div><div className="venue-highlight-grid">{venue.highlights.map((item, index) => <VenueHighlightCard key={item.title} item={item} index={index} />)}</div></section><section className={`venue-visit-plan ${venue.planImage ? "decomposed" : ""}`}><VenuePlanVisual venue={venue} /><div className="venue-plan-copy"><p className="eyebrow">PLAN YOUR VISIT</p><h2>建議參觀順序</h2><ol>{venue.route.map((step, index) => <li key={step}><span>{index + 1}</span><strong>{step}</strong></li>)}</ol><div className="venue-service-list">{venue.services.map((item, index) => { const Icon = serviceIcons[index % serviceIcons.length]; return <div key={item}><Icon weight="duotone" /><span>{item}</span></div>; })}</div><div className="venue-detail-actions"><button className="primary-cta" onClick={() => onRoute(venueKey)}><NavigationArrow weight="fill" />預覽前往 {venueKey} 路線</button>{venueKey === "B棟" && <button className="secondary-cta" onClick={() => onService("service")}><FirstAidKit weight="duotone" />查看服務項目</button>}<button className="secondary-cta" onClick={followup}>{venue.followup}<ArrowRight /></button></div></div></section><section className="venue-next"><div><p className="eyebrow">KEEP EXPLORING</p><h2>下一座場館</h2></div><div>{otherVenues.map(([key, item]) => <button key={key} onClick={() => onVenue(key)}><span>{item.code}</span><span><small>{item.stage}</small><strong>{item.name}</strong></span><ArrowRight /></button>)}</div></section><p className="venue-disclaimer">本頁依現階段策展構想、附件與網站原型整理；實際展項、面積、服務、動線及開放資訊以主辦單位最終公告為準。</p></div></article>;
}

function MissionSection({ missions, onMission, onRedeem }) {
  const doneCount = missions.filter(item => item.done).length;
  return <section className="mission-section" id="missions"><div className="section-heading"><div><p>COLLECT & BLOOM</p><h2>讓小石花，跟著旅程一起盛開。</h2></div><div className="progress-copy"><strong>{doneCount} <span>/ 4</span></strong><small>已完成任務</small></div></div><div className="progress-track"><span style={{ width: `${doneCount * 25}%` }} /></div><div className="mission-grid">{missions.map(mission => <article key={mission.id} className={`mission-card ${mission.color} ${mission.done ? "done" : ""}`}><div className="mission-image"><img src={mission.image} alt={`${mission.zone} 任務場景`} /><span>{mission.done ? <Check weight="bold" /> : mission.id}</span></div><div className="mission-content"><small>{mission.zone}</small><h3>{mission.title}</h3><p>{mission.detail}</p><button onClick={() => onMission(mission)}>{mission.done ? "查看完成紀錄" : "查看任務"}<ArrowRight /></button></div></article>)}</div><div className={`reward-banner ${doneCount === 4 ? "ready" : ""}`}><div className="reward-art"><img src="./assets/little-stone-flower-lineup.jpg" alt="小石花角色" /></div><div><small>{doneCount === 4 ? "你的四朵小石花已盛開" : "完成全部 4 個任務"}</small><h3>{doneCount === 4 ? "已取得限定紀念禮兌換資格" : "兌換限定「花蓮盛開紀念禮」"}</h3><p>於 B 棟服務中心出示兌換碼，每人限領一份。</p></div><button onClick={onRedeem}><QrCode />{doneCount === 4 ? "開啟兌換碼" : "查看兌換資格"}</button></div></section>;
}

function ProgramSection({ onProgram }) {
  const [filter, setFilter] = useState("全部");
  const types = ["全部", "舞台", "導覽", "工作坊", "講座", "親子"];
  const visible = filter === "全部" ? programs : programs.filter(item => item.type === filter);
  return <section className="program-section" id="program"><div className="program-intro"><p className="eyebrow">TODAY'S PROGRAM</p><h2>花生新鮮事，<br />今天正盛開。</h2><p>以時間、類型快速找到今天想參與的節目。點選卡片可查看集合地點、活動說明與報名狀態。</p><div className="program-filters">{types.map(type => <button key={type} className={filter === type ? "active" : ""} aria-pressed={filter === type} onClick={() => setFilter(type)}>{type}</button>)}</div></div><div className="program-list">{visible.map(item => <button key={item.id} className="program-card" onClick={() => onProgram(item)}><span className="program-time">{item.time}</span><span className="program-type">{item.type}</span><span className="program-main"><strong>{item.title}</strong><small><MapPin weight="fill" />{item.place}</small></span><span className="program-status">{item.status}</span><ArrowRight /></button>)}</div></section>;
}

function StorySection({ onStory }) {
  const [index, setIndex] = useState(0);
  const story = stories[index];
  const previous = () => setIndex((index + stories.length - 1) % stories.length);
  const next = () => setIndex((index + 1) % stories.length);
  return <section className="story-section" id="stories"><div className="story-image"><img src={story.image} alt={story.title} loading="lazy" /><span>0{index + 1} / 0{stories.length}</span><div className="story-arrows"><button onClick={previous} aria-label="上一則故事"><ArrowLeft /></button><button onClick={next} aria-label="下一則故事"><ArrowRight /></button></div></div><div className="story-copy"><span className="story-label">{story.label}</span><p className="eyebrow">{story.kicker}</p><h2>{story.title}</h2><p>{story.body}</p><button className="text-link" onClick={() => onStory(story)}>閱讀完整故事 <ArrowRight /></button><div className="story-dots">{stories.map((item, itemIndex) => <button key={item.title} className={index === itemIndex ? "active" : ""} aria-pressed={index === itemIndex} onClick={() => setIndex(itemIndex)} aria-label={`查看第 ${itemIndex + 1} 則故事`} />)}</div></div></section>;
}

function PageMasthead({ page, onNavigate }) {
  const meta = pageMeta[page];
  const Icon = meta.icon;
  return <section className={`page-masthead page-theme-${meta.theme}`} aria-labelledby={`${page}-page-title`}><div className="page-masthead-inner"><div className="page-masthead-copy"><nav className="breadcrumb" aria-label="麵包屑"><button onClick={() => onNavigate("home")}>首頁</button><ArrowRight /><span aria-current="page">{meta.title}</span></nav><span className="page-icon"><Icon weight="duotone" /></span><p className="eyebrow">{meta.kicker}</p><h1 id={`${page}-page-title`} tabIndex="-1">{meta.title}</h1><p>{meta.lead}</p><span className="page-feature">{meta.feature}</span></div><div className="page-masthead-image"><img src={meta.image} alt={meta.imageAlt} /></div></div></section>;
}

function StoryArchive({ onStory }) {
  return <section className="story-archive" aria-labelledby="story-archive-title"><div className="home-preview-heading"><div><p className="eyebrow">ALL STORIES</p><h2 id="story-archive-title">從不同視角，讀一座正在重生的城市。</h2></div></div><div className="story-archive-grid">{stories.map((story, index) => <article key={story.title}><div><img src={story.image} alt="" loading="lazy" /><span>0{index + 1}</span></div><small>{story.label}</small><h3>{story.title}</h3><p>{story.body}</p><button className="text-link" onClick={() => onStory(story)}>閱讀故事 <ArrowRight /></button></article>)}</div></section>;
}

function PageNextLinks({ current, onNavigate }) {
  const order = ["news", "guide", "missions", "media", "program", "stories"];
  const index = order.indexOf(current);
  const suggestions = [order[(index + 1) % order.length], order[(index + 2) % order.length], order[(index + 3) % order.length]];
  return <section className="page-next-links" aria-labelledby="page-next-title"><div><p className="eyebrow">CONTINUE EXPLORING</p><h2 id="page-next-title">接著想去哪裡？</h2></div><div>{suggestions.map(id => { const item = pageMeta[id]; const Icon = item.icon; return <button key={id} onClick={() => onNavigate(id)}><span><Icon weight="duotone" /></span><span><small>{item.kicker}</small><strong>{item.title}</strong></span><ArrowRight /></button>; })}</div></section>;
}

function StandalonePage({ page, missions, onNavigate, onNews, onRoute, onVenue, onMission, onRedeem, onVideo, onProgram, onStory }) {
  let content = null;
  if (page === "news") content = <LatestNews onNews={onNews} />;
  if (page === "guide") content = <MapExperience onRoute={onRoute} onVenue={onVenue} />;
  if (page === "missions") content = <MissionSection missions={missions} onMission={onMission} onRedeem={onRedeem} />;
  if (page === "media") content = <MediaSection onOpenVideo={onVideo} />;
  if (page === "program") content = <ProgramSection onProgram={onProgram} />;
  if (page === "stories") content = <><StorySection onStory={onStory} /><StoryArchive onStory={onStory} /></>;

  useEffect(() => {
    const title = document.querySelector(`#${page}-page-title`);
    title?.focus({ preventScroll: true });
  }, [page]);

  return <article className={`standalone-page standalone-${page}`}><PageMasthead page={page} onNavigate={onNavigate} />{content}<PageNextLinks current={page} onNavigate={onNavigate} /></article>;
}

function Footer({ onNavigate, onService }) {
  return <footer><button className="footer-brand" onClick={() => onNavigate("home")} aria-label="回到首頁"><BrandMark /></button><p>2026 大山大海・花現未來<br />花蓮永續風格展 UIUX 概念原型</p><nav className="footer-nav" aria-label="頁尾導覽">{navItems.slice(1).map(item => <button key={item.id} onClick={() => onNavigate(item.id)}>{item.zh}</button>)}</nav><div className="footer-services"><button onClick={() => onService("transport")}>交通資訊</button><button onClick={() => onService("service")}>服務中心</button><button onClick={() => onService("access")}>無障礙服務</button></div></footer>;
}

function ModalShell({ label, onClose, children, wide = false, modalClassName = "" }) {
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    previousFocus.current = document.activeElement;
    closeRef.current?.focus();
    const handleKey = event => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && modalRef.current) {
        const focusable = [...modalRef.current.querySelectorAll("button, a[href], iframe, [tabindex]:not([tabindex='-1'])")].filter(item => !item.disabled);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!modalRef.current.contains(document.activeElement)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      previousFocus.current?.focus?.();
    };
  }, [onClose]);
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><div ref={modalRef} className={`content-modal ${wide ? "wide-modal" : ""} ${modalClassName}`.trim()} role="dialog" aria-modal="true" aria-label={label} onMouseDown={event => event.stopPropagation()}><button ref={closeRef} className="modal-close" onClick={onClose} aria-label={`關閉${label}`}><X size={22} /></button>{children}</div></div>;
}

function VideoModal({ video = mediaItems[0], onClose }) {
  const player = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&mute=0&controls=1&playsinline=1&rel=0&origin=${YOUTUBE_EMBED_ORIGIN}`;
  return <ModalShell label="花蓮 4K 影片" onClose={onClose} wide><div className="video-modal-copy"><small>OFFICIAL 4K SOURCE</small><h2>{video.title}｜{video.source}</h2><p>{video.subtitle}。實際播放畫質由 YouTube 依裝置與網路自動調整。</p></div><div className="video-player"><iframe src={player} title={`${video.title} 完整影片`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div><a className="source-link" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">在 YouTube 開啟官方影片 <ArrowRight /></a></ModalShell>;
}

function RouteModal({ zone, onClose, onArrive }) {
  const item = zones[zone];
  return <ModalShell label={`前往 ${zone} 路線`} onClose={onClose}><div className="route-modal"><div className="modal-icon blue"><NavigationArrow size={34} weight="fill" /></div><small>GPS + INDOOR WAYFINDING</small><h2>前往 {zone}｜{item.title}</h2><p>{item.description}</p><div className="route-summary"><span><Clock />{item.minutes} 分鐘</span><span><Path />{item.distance}</span><span><Wheelchair />{item.access}</span></div><ol>{item.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p>{index === 1 && <small>進入建物後，自動切換室內辨識點</small>}</li>)}</ol><button className="primary-cta wide" onClick={() => onArrive(zone)}><NavigationArrow weight="fill" />模擬開始導引</button></div></ModalShell>;
}

function MissionModal({ mission, onClose, onComplete, onReset }) {
  return <ModalShell label={mission.title} onClose={onClose}><div className="mission-modal"><img src={mission.image} alt={`${mission.title}任務場景`} /><div className="mission-modal-body"><span className={`mission-number ${mission.done ? "done" : ""}`}>{mission.done ? <Check weight="bold" /> : mission.id}</span><small>{mission.zone}・數位集章任務</small><h2>{mission.title}</h2><p>{mission.instruction}</p><div className="mission-check"><QrCode size={25} /><span><strong>現場驗證方式</strong><small>GPS 範圍＋QR Code／工作人員核發</small></span></div><button className="primary-cta wide" onClick={() => mission.done ? onReset(mission.id) : onComplete(mission.id)}>{mission.done ? <><Repeat weight="bold" />重新體驗任務</> : <><Stamp weight="fill" />模擬完成並取得章</>}</button></div></div></ModalShell>;
}

function RedeemModal({ missions, onClose, onExplore }) {
  const doneCount = missions.filter(item => item.done).length;
  const ready = doneCount === 4;
  return <ModalShell label="兌換資格" onClose={onClose}><div className="redeem-modal"><div className={`modal-icon ${ready ? "ready" : ""}`}>{ready ? <QrCode size={38} weight="duotone" /> : <Gift size={34} weight="duotone" />}</div><small>COLLECT & BLOOM</small><h2>{ready ? <>兌換資格已取得，<br />請出示專屬核銷碼。</> : <>再完成 {4 - doneCount} 個任務，<br />小石花就會盛開！</>}</h2><div className="stamp-row">{missions.map(item => <span key={item.id} className={item.done ? "done" : ""}>{item.done ? <Check weight="bold" /> : item.id}</span>)}</div>{ready ? <div className="redeem-code"><QrCode size={88} weight="thin" /><div><small>一次性核銷碼</small><strong>HL-WB-2026-0418</strong><span>展示用途・尚未連接正式核銷系統</span></div></div> : <p>完成後將產生一次性 QR Code，請至 B 棟服務中心由工作人員核銷。</p>}<button className="primary-cta wide" onClick={onExplore}>{ready ? "查看兌換地點" : "繼續探索任務"}<ArrowRight /></button></div></ModalShell>;
}

function ProgramModal({ program, onClose, onJoin }) {
  return <ModalShell label={program.title} onClose={onClose}><div className="program-modal"><span className="program-modal-time">{program.time}</span><small>{program.type}・{program.place}</small><h2>{program.title}</h2><p>{program.note}</p><div className="program-facts"><span><Clock />約 40 分鐘</span><span><MapPin />{program.place}</span><span><Ticket />{program.status}</span></div><button className="primary-cta wide" onClick={() => onJoin(program)}>{program.status === "需報名" ? "模擬完成報名" : "加入我的行程"}<ArrowRight /></button></div></ModalShell>;
}

function StoryModal({ story, onClose }) {
  return <ModalShell label={story.title} onClose={onClose} wide><div className="story-modal"><img src={story.image} alt={story.title} /><div><span className="story-label">{story.label}</span><small>{story.kicker}</small><h2>{story.title}</h2><p>{story.body}</p><p>展覽把城市治理、地方創生與日常選擇放在同一條旅程裡；觀眾不是被動觀看，而是透過導覽、任務與回應，留下自己對未來花蓮的想像。</p><button className="secondary-cta" onClick={onClose}>回到故事展區 <ArrowRight /></button></div></div></ModalShell>;
}

function NewsModal({ news, onClose, onNavigate }) {
  return <ModalShell label={news.title} onClose={onClose} wide><article className="news-modal"><div className="news-modal-image"><img src={news.image} alt={news.title} /><span>{news.type}</span></div><div className="news-modal-copy"><small><CalendarBlank weight="fill" />{news.date}・PROTOTYPE NEWS</small><h2>{news.title}</h2><p>{news.summary}</p><p>本頁將在正式網站中提供完整的活動時間、服務異動與相關下載資料；目前內容用來展示最新消息的閱讀層級、圖片比例與跨裝置互動方式。</p><div className="news-modal-actions"><button className="primary-cta" onClick={() => { onClose(); onNavigate(news.type === "交通服務" ? "guide" : "program"); }}>{news.type === "交通服務" ? "查看場域導覽" : "查看活動節目"}<ArrowRight /></button><button className="secondary-cta" onClick={onClose}>返回最新消息</button></div></div></article></ModalShell>;
}

function ServiceModal({ type, onClose }) {
  const item = serviceContent[type];
  const Icon = item.icon;
  return <ModalShell label={item.title} onClose={onClose}><div className="service-modal"><div className="modal-icon blue"><Icon size={34} weight="duotone" /></div><small>{item.kicker}</small><h2>{item.title}</h2><p>{item.body}</p><div className="service-facts">{item.facts.map(fact => <span key={fact}><Check weight="bold" />{fact}</span>)}</div><button className="primary-cta wide" onClick={onClose}>我知道了 <Check weight="bold" /></button></div></ModalShell>;
}

function FlowerAgentMark({ size = 48 }) {
  return <span className="agent-flower-mark" style={{ "--agent-flower-size": `${size}px` }} aria-hidden="true"><Flower className="agent-flower-petals" size={size} weight="fill" /><Circle className="agent-flower-core" size={Math.round(size * 0.24)} weight="fill" /></span>;
}

const agentScenarioGroups = [
  { id: "exhibition", label: "看展主題" },
  { id: "journey", label: "行程規劃" },
  { id: "service", label: "服務資訊" },
];

const agentScenarios = [
  {
    id: "achievements",
    group: "exhibition",
    label: "施政成果",
    icon: PresentationChart,
    tone: "blue",
    question: "花蓮的施政成果，從哪裡開始看？",
    answer: "附件提案把花蓮 107–115 年施政成果整理進 A 棟，以重大建設、防災與災後重建、智慧治理三條線索，串起數位城市劇場、韌性時間軸與工程互動。",
    themes: ["重大建設", "防災治理", "智慧治理"],
    status: "年度範圍來自提案，成果數字仍待局處資料核定",
    actionLabel: "查看 A 棟成果展",
    actionType: "venue",
    target: "A棟",
  },
  {
    id: "resilience",
    group: "exhibition",
    label: "災後韌性",
    icon: ShieldCheck,
    tone: "red",
    question: "地震之後，花蓮怎麼重新站起來？",
    answer: "A 棟的韌性時間軸與防災工程互動，會把復原歷程、城市治理與未來建設整理成可操作的參觀路徑，最後還能留下你的花蓮願景。",
    themes: ["災後重建", "韌性時間軸", "工程互動"],
    status: "目前為策展敘事框架",
    actionLabel: "預覽 A 棟參觀路線",
    actionType: "route",
    target: "A棟",
  },
  {
    id: "culture",
    group: "exhibition",
    label: "文化產業",
    icon: Tree,
    tone: "green",
    question: "想看文化、產業與社福，要去哪一館？",
    answer: "H 棟以 H1 山海之息、H2 風土物產味、H3 文化生活誌與 H4 教育共好為四個主題，從人的日常理解花蓮軟實力，並延伸到戶外市集的支持行動。",
    themes: ["自然人文", "地方產業", "教育社福"],
    status: "展項內容待資料搜整完成後更新",
    actionLabel: "查看 H 棟地方故事",
    actionType: "venue",
    target: "H棟",
  },
  {
    id: "sustainability",
    group: "exhibition",
    label: "永續策略",
    icon: Repeat,
    tone: "green",
    question: "這場展覽本身怎麼實踐永續？",
    answer: "提案以沉浸、互動、參與為體驗原則，並設定模組材料回收率至少 70%、數位文宣替代印刷至少 50%、平均停留至少 40 分鐘與展後線上保存 1 年等目標。",
    themes: ["循環材料", "數位減印", "展後延伸"],
    status: "比例、停留時間與保存年限皆為提案目標，非已達成成果",
    actionLabel: "查看戶外永續場景",
    actionType: "venue",
    target: "戶外",
  },
  {
    id: "family",
    group: "journey",
    label: "親子90分鐘",
    icon: Path,
    tone: "yellow",
    question: "帶小朋友來，90 分鐘可以怎麼逛？",
    answer: "可先玩 A 棟韌性工程互動，再到 H 棟山海之息，接著走戶外打卡點，最後依正式時刻表選一場親子或舞台活動。這是原型建議，不代表即時人流或剩餘名額。",
    themes: ["工程互動", "山海之息", "戶外表演"],
    status: "適齡、時段與名額需依正式節目確認",
    actionLabel: "查看親子活動與時段",
    actionType: "page",
    target: "program",
  },
  {
    id: "circuit",
    group: "journey",
    label: "園區環線",
    icon: Compass,
    tone: "blue",
    question: "第一次來，怎麼順路逛完整個園區？",
    answer: "建議依入口、A 棟、舞台與市集、H 棟、戶外打卡點、B 棟服務與兌換的環線前進；戶外以 GPS 提醒，入館後再切換平面圖與辨識點。",
    themes: ["六站環線", "GPS 提醒", "室內導引"],
    status: "路線與場域節點為提案原型，仍待現勘核定",
    actionLabel: "開啟場域導覽",
    actionType: "page",
    target: "guide",
  },
  {
    id: "program",
    group: "journey",
    label: "展期節目",
    icon: CalendarBlank,
    tone: "yellow",
    question: "展期多久？有哪些展演與導覽？",
    answer: "附件方案暫列民國 115 年 11 月 14 日至 21 日，規劃 8 日主題活動；原型節目表包含舞台、導覽、工作坊、講座與親子活動，可依時間與集合地點查找。",
    themes: ["8 日主題", "舞台導覽", "親子活動"],
    status: "展期、節目與報名狀態皆以主辦單位正式公告為準",
    actionLabel: "查看完整活動節目",
    actionType: "page",
    target: "program",
  },
  {
    id: "missions",
    group: "journey",
    label: "集章兌換",
    icon: Stamp,
    tone: "red",
    question: "集章任務怎麼跟展覽內容串在一起？",
    answer: "四個數位任務分別對應 A 棟韌性展、H 棟地方故事、戶外永續市集與舞台活動。完成後回到 B 棟，示範一次性核銷碼與好禮兌換流程。",
    themes: ["四站任務", "展覽互動", "B 棟兌換"],
    status: "定位、驗證與核銷皆為原型模擬",
    actionLabel: "開啟集章任務",
    actionType: "page",
    target: "missions",
  },
  {
    id: "accessibility",
    group: "service",
    label: "無障礙服務",
    icon: Wheelchair,
    tone: "blue",
    question: "帶長輩或使用輪椅，怎麼走比較安心？",
    answer: "可先前往 B 棟服務中心登記協助，再依導引前往各館。原型已規劃無階梯與坡道提示；設備數量、服務時段及現場動線仍需營運單位核定。",
    themes: ["B 棟服務", "友善動線", "陪同協助"],
    status: "無障礙服務規格待正式核定",
    actionLabel: "開啟 B 棟導引",
    actionType: "route",
    target: "B棟",
  },
  {
    id: "transport",
    group: "service",
    label: "交通停車",
    icon: Bus,
    tone: "yellow",
    question: "開車、搭接駁或步行入園，怎麼選？",
    answer: "正式版可整合停車餘位、接駁班次、步行入口與無障礙下車點；目前尚未連接即時交通資料，因此不會顯示附件中的剩餘車位或預估等待時間。",
    themes: ["停車資訊", "接駁班次", "步行入口"],
    status: "即時車位、班次與交通管制尚待營運資料串接",
    actionLabel: "查看交通與服務公告",
    actionType: "page",
    target: "news",
  },
  {
    id: "service-hub",
    group: "service",
    label: "B棟服務中心",
    icon: FirstAidKit,
    tone: "red",
    question: "需要諮詢、失物或現場協助，要去哪裡？",
    answer: "B 棟提案集中資訊諮詢、失物招領、無障礙與親子協助、設備借用及集章兌換；緊急醫護、AED、人力資格與設備數量仍須納入正式營運及安全計畫。",
    themes: ["旅客諮詢", "失物招領", "現場支援"],
    status: "服務項目為提案範圍，實際辦法與量能待核定",
    actionLabel: "查看 B 棟服務館",
    actionType: "venue",
    target: "B棟",
  },
  {
    id: "online",
    group: "service",
    label: "線上展與多語",
    icon: Globe,
    tone: "blue",
    question: "不能到現場，也能線上看展或用外語導覽嗎？",
    answer: "提案規劃 3D 線上展、4K 成果影片與中文、英文、日文 AI 導覽，並延伸展後內容保存。現階段網站已示範場館、影音與靜態回答流程，3D、多語內容及長期維運仍待開發核定。",
    themes: ["3D 線上展", "中英日導覽", "4K 成果影片"],
    status: "目前為前端流程示意，尚未串接 3D 與正式多語知識庫",
    actionLabel: "查看影音花蓮",
    actionType: "page",
    target: "media",
  },
];

function Agent({ onNavigate, onRoute, onVenue }) {
  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(agentScenarioGroups[0].id);
  const [selectedId, setSelectedId] = useState(agentScenarios[0].id);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  const selected = agentScenarios.find(item => item.id === selectedId) ?? agentScenarios[0];
  const visibleScenarios = agentScenarios.filter(item => item.group === selectedGroup);

  useEffect(() => {
    if (!open) return undefined;
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());
    const closeOnEscape = event => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() => toggleRef.current?.focus());
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const closePanel = () => {
    setOpen(false);
    window.requestAnimationFrame(() => toggleRef.current?.focus());
  };

  const runScenarioAction = () => {
    toggleRef.current?.focus();
    setOpen(false);
    if (selected.actionType === "venue") onVenue(selected.target);
    else if (selected.actionType === "route") onRoute(selected.target);
    else onNavigate(selected.target);
  };

  const switchScenarioGroup = groupId => {
    const firstScenario = agentScenarios.find(item => item.group === groupId);
    setSelectedGroup(groupId);
    if (firstScenario) setSelectedId(firstScenario.id);
  };

  return <div className={`agent ${open ? "open" : ""}`}>
    {open && <section id="agent-panel" className="agent-panel" role="dialog" aria-modal="false" aria-labelledby="agent-panel-title">
      <header className="agent-panel-header">
        <span className="agent-panel-avatar"><FlowerAgentMark size={34} /></span>
        <span className="agent-panel-title"><strong id="agent-panel-title">小花｜花現未來 AI 導覽</strong><small><i />提案互動原型・資料狀態清楚標示</small></span>
        <button ref={closeRef} className="agent-panel-close" onClick={closePanel} aria-label="關閉小花 AI 導覽"><X /></button>
      </header>
      <div className="agent-panel-body">
        <div className="agent-welcome"><FlowerAgentMark size={27} /><p>想先從哪個主題開始？小花會把場館、展項、行程與服務資訊一起說清楚。</p></div>
        <div className="agent-topic-tabs" aria-label="AI 導覽問題分類">
          {agentScenarioGroups.map(group => <button key={group.id} className={selectedGroup === group.id ? "active" : ""} aria-pressed={selectedGroup === group.id} onClick={() => switchScenarioGroup(group.id)}>{group.label}</button>)}
        </div>
        <p className="agent-section-label">選一個可操作情境</p>
        <div className="agent-scenario-grid" aria-label={`${agentScenarioGroups.find(group => group.id === selectedGroup)?.label ?? "目前分類"} AI 導覽情境`}>
          {visibleScenarios.map(item => {
            const Icon = item.icon;
            return <button key={item.id} className={`agent-scenario-button tone-${item.tone} ${selected.id === item.id ? "active" : ""}`} aria-pressed={selected.id === item.id} aria-controls="agent-answer" onClick={() => setSelectedId(item.id)}><Icon weight="duotone" /><span>{item.label}</span></button>;
          })}
        </div>
        <div id="agent-answer" className="agent-conversation">
          <p className="agent-user-bubble">{selected.question}</p>
          <div className="agent-assistant-row">
            <span className="agent-answer-avatar"><FlowerAgentMark size={24} /></span>
            <article className="agent-answer-card">
              <small>小花回覆</small>
              <p aria-live="polite">{selected.answer}</p>
              <div className="agent-theme-tags">{selected.themes.map(theme => <span key={theme}>{theme}</span>)}</div>
              <div className="agent-data-status"><ShieldCheck weight="duotone" /><span>{selected.status}</span></div>
              <button className="agent-action" onClick={runScenarioAction}>{selected.actionLabel}<ArrowRight /></button>
            </article>
          </div>
        </div>
        <p className="agent-panel-disclaimer">本面板展示網站可操作流程，非即時人流或正式政策資料；核定內容到位後再串接知識庫與即時服務。</p>
      </div>
    </section>}
    <button ref={toggleRef} className="agent-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="agent-panel" aria-label={open ? "關閉小花 AI 導覽" : "開啟小花 AI 導覽"}><FlowerAgentMark size={62} /></button>
  </div>;
}

export function App() {
  const [page, setPage] = useState(() => pageFromHash() ?? "home");
  const [locale, setLocale] = useState("zh");
  const [missions, setMissions] = useState(missionSeed);
  const [modal, setModal] = useState(null);
  const [status, setStatus] = useState("");
  const [venuePage, setVenuePage] = useState(() => venueFromHash());
  const doneCount = useMemo(() => missions.filter(item => item.done).length, [missions]);
  const active = venuePage ? "guide" : page;
  const dashboardView = !venuePage && page === "dashboard";

  useEffect(() => {
    document.documentElement.lang = "zh-Hant";
  }, [locale]);

  useEffect(() => {
    const syncRoute = () => {
      const nextVenue = venueFromHash();
      const nextPage = pageFromHash();
      if (!nextVenue && !nextPage) return;
      setVenuePage(nextVenue);
      setPage(nextVenue ? "guide" : nextPage);
      setModal(null);
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("popstate", syncRoute);
    window.addEventListener("hashchange", syncRoute);
    return () => {
      window.removeEventListener("popstate", syncRoute);
      window.removeEventListener("hashchange", syncRoute);
    };
  }, []);

  useEffect(() => {
    const title = venuePage ? venuePages[venuePage]?.name : page === "home" ? "大山大海・花現未來" : pageMeta[page]?.title;
    document.title = `${title}｜花蓮永續風格展`;
  }, [page, venuePage]);

  const navigate = (id, options = {}) => {
    const target = id === "venues" ? "guide" : id;
    const nextUrl = target === "home"
      ? `${window.location.pathname}${window.location.search}`
      : `${window.location.pathname}${window.location.search}#page/${target}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (currentUrl !== nextUrl) window.history[options.replace ? "replaceState" : "pushState"]({ page: target }, "", nextUrl);
    setModal(null);
    setVenuePage(null);
    setPage(target);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const openVenue = (key) => {
    const item = venuePages[key];
    if (!item) return;
    const nextUrl = `${window.location.pathname}${window.location.search}#venue/${item.slug}`;
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== nextUrl) window.history.pushState({ venue: key }, "", nextUrl);
    setModal(null);
    setVenuePage(key);
    setPage("guide");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const backToGuide = () => {
    navigate("guide", { replace: true });
  };

  const showStatus = (message) => {
    setStatus(message);
    window.setTimeout(() => setStatus(""), 3600);
  };

  const completeMission = (id) => {
    setMissions(items => items.map(item => item.id === id ? { ...item, done: true } : item));
    setModal(null);
    showStatus(`第 ${id} 枚小石花章已加入旅程`);
  };

  const resetMission = (id) => {
    setMissions(items => items.map(item => item.id === id ? { ...item, done: false } : item));
    showStatus(`第 ${id} 個任務已重置，可再次完成集章`);
  };

  const openRoute = (zone) => setModal({ type: "route", zone });
  const openService = (service) => setModal({ type: "service", service });
  const openPanorama = (venueKey) => venuePages[venueKey]?.panorama && setModal({ type: "panorama", venueKey });

  return <div className="app" data-view={active}>
    <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); const main = document.getElementById("main-content"); main?.focus({ preventScroll: true }); main?.scrollIntoView({ block: "start" }); }}>跳至主要內容</a>
    <Header active={active} locale={locale} onLocale={setLocale} onNavigate={navigate} onOpenService={openService} onStatus={showStatus} />
    <main id="main-content" tabIndex="-1">
      {venuePage ? <VenueDetailPage venueKey={venuePage} onBack={backToGuide} onRoute={openRoute} onVenue={openVenue} onNavigate={navigate} onService={openService} onPanorama={openPanorama} /> : dashboardView ? <DashboardPage onNavigate={navigate} onStatus={showStatus} /> : <>
        {page === "home" ? <>
          <Hero />
          <AnnouncementBar onNavigate={navigate} onOpenService={openService} />
          <QuickJourney onNavigate={navigate} />
          <HomeHighlights missions={missions} onNavigate={navigate} onNews={news => setModal({ type: "news", news })} onStory={story => setModal({ type: "story", story })} onVenue={openVenue} />
        </> : <StandalonePage page={page} missions={missions} onNavigate={navigate} onNews={news => setModal({ type: "news", news })} onRoute={openRoute} onVenue={openVenue} onMission={mission => setModal({ type: "mission", mission })} onRedeem={() => setModal({ type: "redeem" })} onVideo={video => setModal({ type: "video", video })} onProgram={program => setModal({ type: "program", program })} onStory={story => setModal({ type: "story", story })} />}
      </>}
    </main>
    {!dashboardView && <Footer onNavigate={navigate} onService={openService} />}
    {!dashboardView && <Agent onNavigate={navigate} onRoute={openRoute} onVenue={openVenue} />}
    {modal?.type === "panorama" && <PanoramaModal venueKey={modal.venueKey} onClose={() => setModal(null)} />}
    {modal?.type === "video" && <VideoModal video={modal.video} onClose={() => setModal(null)} />}
    {modal?.type === "route" && <RouteModal zone={modal.zone} onClose={() => setModal(null)} onArrive={zone => { setModal(null); showStatus(`導引已開始：沿著藍色路線前往 ${zone}`); }} />}
    {modal?.type === "mission" && <MissionModal mission={missions.find(item => item.id === modal.mission.id) ?? modal.mission} onClose={() => setModal(null)} onComplete={completeMission} onReset={resetMission} />}
    {modal?.type === "redeem" && <RedeemModal missions={missions} onClose={() => setModal(null)} onExplore={() => { setModal(null); doneCount === 4 ? openService("service") : navigate("missions"); }} />}
    {modal?.type === "program" && <ProgramModal program={modal.program} onClose={() => setModal(null)} onJoin={program => { setModal(null); showStatus(`「${program.title}」已加入我的行程`); }} />}
    {modal?.type === "story" && <StoryModal story={modal.story} onClose={() => setModal(null)} />}
    {modal?.type === "news" && <NewsModal news={modal.news} onClose={() => setModal(null)} onNavigate={navigate} />}
    {modal?.type === "service" && <ServiceModal type={modal.service} onClose={() => setModal(null)} />}
    {status && <div className="action-toast" role="status"><span><Check weight="bold" /></span><strong>{status}</strong><button onClick={() => setStatus("")} aria-label="關閉訊息"><X /></button></div>}
  </div>;
}
