# 大山大海・花現未來｜花蓮永續展網站 DEMO

本專案是「花蓮永續風格展」活動入口網的互動原型，依據主視覺延伸場域導覽、場館介紹、360° 環景、活動節目、花蓮進行式、數位集章兌換、AI 導覽與活動營運儀表板等情境。

## 線上預覽

GitHub Pages：<https://pkernest-ux.github.io/hualien-sustainable-uiux/>

主要頁面皆使用網址雜湊切換，可由導覽列進入。營運儀表板位於 `#page/dashboard`，各場館介紹位於 `#venue/a`、`#venue/h`、`#venue/b` 與 `#venue/outdoor`。

## 本機執行

```bash
npm ci
npm run dev
```

正式建置與測試：

```bash
npm run build
npm run test:sites
```

## DEMO 說明

- 本站為服務建議書及提案展示用途，人物、活動數據、即時資訊、AI 回覆、GPS／AR 與集章兌換流程均為互動模擬。
- YouTube 影片與外部資料連結僅作為提案情境參考，正式上線前須由主辦單位確認來源、授權、內容與介接方式。
- 網站內主視覺、角色與圖像素材保留其原權利，不因本原型公開而授權第三方重製或再利用。

## 部署

推送到 `main` 後，GitHub Actions 會自動建置並將 `dist/client` 發布至 GitHub Pages。
