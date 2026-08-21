import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BuildingOffice,
  ChartLineUp,
  CheckCircle,
  Clock,
  CursorClick,
  Desktop,
  DeviceMobile,
  DeviceTablet,
  DownloadSimple,
  Eye,
  FilmSlate,
  Funnel,
  Gift,
  Globe,
  Info,
  LockKey,
  PresentationChart,
  QrCode,
  Repeat,
  Stamp,
  Target,
  Timer,
  TrendUp,
  UsersThree,
} from "@phosphor-icons/react";
import "./dashboard.css";

const activityDays = [
  { date: "11/14", day: "六", users: 3120, sessions: 3840, views: 9720, onsite: 4100, starts: 1680, completes: 790, redeemed: 610 },
  { date: "11/15", day: "日", users: 2430, sessions: 2990, views: 7440, onsite: 3350, starts: 1260, completes: 590, redeemed: 455 },
  { date: "11/16", day: "一", users: 2190, sessions: 2740, views: 6820, onsite: 3080, starts: 1120, completes: 510, redeemed: 390 },
  { date: "11/17", day: "二", users: 2260, sessions: 2810, views: 7110, onsite: 3140, starts: 1170, completes: 540, redeemed: 420 },
  { date: "11/18", day: "三", users: 2380, sessions: 2910, views: 7560, onsite: 3290, starts: 1230, completes: 590, redeemed: 465 },
  { date: "11/19", day: "四", users: 2510, sessions: 3100, views: 8040, onsite: 3460, starts: 1320, completes: 630, redeemed: 495 },
  { date: "11/20", day: "五", users: 2960, sessions: 3680, views: 9470, onsite: 4210, starts: 1750, completes: 870, redeemed: 690 },
  { date: "11/21", day: "六", users: 3520, sessions: 4410, views: 11280, onsite: 4980, starts: 2080, completes: 1050, redeemed: 835 },
];

const venueOptions = [
  { id: "all", label: "全園區", scale: 1 },
  { id: "a", label: "A 棟", scale: 0.38 },
  { id: "h", label: "H 棟", scale: 0.27 },
  { id: "b", label: "B 棟", scale: 0.13 },
  { id: "outdoor", label: "戶外園區", scale: 0.22 },
];

const channels = [
  { label: "現場 QR／活動短網址", value: 36, color: "var(--dash-blue)" },
  { label: "Direct", value: 23, color: "var(--dash-green)" },
  { label: "Organic Search", value: 18, color: "var(--dash-yellow)" },
  { label: "Organic Social", value: 13, color: "var(--dash-coral)" },
  { label: "Referral", value: 10, color: "var(--dash-purple)" },
];

const devices = [
  { label: "行動裝置", value: 72, icon: DeviceMobile, color: "var(--dash-blue)" },
  { label: "桌上型電腦", value: 21, icon: Desktop, color: "var(--dash-green)" },
  { label: "平板", value: 7, icon: DeviceTablet, color: "var(--dash-yellow)" },
];

const pageRows = [
  { page: "首頁", path: "/", views: 18960, users: 10940, rate: 69.4 },
  { page: "場域導覽", path: "#page/guide", views: 12480, users: 8420, rate: 76.8 },
  { page: "集章任務", path: "#page/missions", views: 9860, users: 6910, rate: 81.2 },
  { page: "A 棟介紹", path: "#venue/a-hall", views: 7420, users: 5230, rate: 78.6 },
  { page: "活動節目", path: "#page/program", views: 6240, users: 4510, rate: 70.3 },
];

const venueRows = [
  { id: "a", code: "A", label: "A 棟・韌性重生", visits: 11270, guide: 5840, viewer: 4260, stamp: 2430, color: "var(--dash-blue)" },
  { id: "h", code: "H", label: "H 棟・軟實力", visits: 8240, guide: 3910, viewer: 2860, stamp: 1760, color: "var(--dash-green)" },
  { id: "outdoor", code: "O", label: "戶外園區・市集舞台", visits: 6510, guide: 3150, viewer: 1880, stamp: 980, color: "var(--dash-yellow)" },
  { id: "b", code: "B", label: "B 棟・服務中心", visits: 3590, guide: 1380, viewer: 740, stamp: 400, color: "var(--dash-coral)" },
];

const eventRows = [
  { event: "venue_guide_start", label: "開始場域導覽", count: 14280, users: 9650, status: "自訂事件" },
  { event: "panorama_open", label: "開啟 360° 展示", count: 9740, users: 7080, status: "自訂事件" },
  { event: "mission_start", label: "啟動集章任務", count: 11610, users: 8250, status: "自訂事件" },
  { event: "mission_complete", label: "完成集章條件", count: 5570, users: 4910, status: "關鍵事件" },
  { event: "reward_redeem", label: "完成好禮兌換", count: 4360, users: 4210, status: "關鍵事件" },
  { event: "ai_agent_question", label: "小花 AI 問題", count: 3860, users: 2410, status: "自訂事件" },
];

const missionRows = [
  { title: "A 棟・韌性工程", started: 3520, completed: 2710 },
  { title: "H 棟・山海故事", started: 2980, completed: 2140 },
  { title: "戶外・花現打卡", started: 2830, completed: 1960 },
  { title: "市集・永續選物", started: 2280, completed: 1530 },
];

const heatRows = [
  { label: "A 棟", values: [32, 58, 76, 62, 71, 45] },
  { label: "H 棟", values: [24, 43, 61, 55, 68, 39] },
  { label: "戶外", values: [18, 36, 52, 48, 82, 66] },
  { label: "B 棟", values: [12, 22, 28, 31, 35, 26] },
];

const sum = (rows, key) => rows.reduce((total, item) => total + item[key], 0);
const number = value => new Intl.NumberFormat("zh-TW").format(Math.round(value));
const percentage = value => `${value.toFixed(1)}%`;

function KpiCard({ icon: Icon, label, value, change, note, tone = "blue" }) {
  return <article className={`dashboard-kpi tone-${tone}`}>
    <div className="dashboard-kpi-top"><span className="dashboard-kpi-icon"><Icon weight="duotone" /></span><small>{label}</small><span className="dashboard-kpi-info" aria-label={`${label}：${note}`} title={note}><Info /></span></div>
    <strong>{value}</strong>
    <div className="dashboard-kpi-foot"><span><TrendUp weight="bold" />{change}</span><small>{note}</small></div>
  </article>;
}

function TrendChart({ rows }) {
  const width = 760;
  const height = 260;
  const pad = 34;
  const max = Math.max(...rows.map(item => item.users), 1);
  const point = (item, index) => ({
    x: pad + (index * (width - pad * 2)) / Math.max(rows.length - 1, 1),
    y: height - pad - (item.users / max) * (height - pad * 2),
  });
  const points = rows.map(point);
  const line = points.map(item => `${item.x},${item.y}`).join(" ");
  const area = `${pad},${height - pad} ${line} ${width - pad},${height - pad}`;
  const summary = rows.map(item => `${item.date} ${number(item.users)} 人`).join("、");
  return <div className="dashboard-chart-wrap">
    <svg className="dashboard-trend-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`每日活躍使用者趨勢。${summary}`}>
      <defs><linearGradient id="dashboardTrendArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2ba8d2" stopOpacity=".28" /><stop offset="1" stopColor="#2ba8d2" stopOpacity=".02" /></linearGradient></defs>
      {[0, .25, .5, .75, 1].map(value => <line key={value} x1={pad} x2={width - pad} y1={pad + value * (height - pad * 2)} y2={pad + value * (height - pad * 2)} />)}
      <polygon points={area} fill="url(#dashboardTrendArea)" />
      <polyline points={line} fill="none" stroke="#1783b2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((item, index) => <g key={rows[index].date}><circle cx={item.x} cy={item.y} r="5" /><text x={item.x} y={height - 8} textAnchor="middle">{rows[index].date}</text><title>{rows[index].date}（{rows[index].day}）{number(rows[index].users)} 位</title></g>)}
    </svg>
    <details className="dashboard-data-details"><summary>查看每日資料表</summary><div className="dashboard-table-scroll"><table><thead><tr><th>日期</th><th>活躍使用者</th><th>工作階段</th><th>瀏覽量</th><th>現場入場</th></tr></thead><tbody>{rows.map(item => <tr key={item.date}><td>{item.date}（{item.day}）</td><td>{number(item.users)}</td><td>{number(item.sessions)}</td><td>{number(item.views)}</td><td>{number(item.onsite)}</td></tr>)}</tbody></table></div></details>
  </div>;
}

function ChannelChart({ scale }) {
  return <div className="dashboard-bar-chart" aria-label="工作階段來源與媒介占比">{channels.map(item => <div key={item.label}><div><span>{item.label}</span><strong>{item.value}%</strong></div><span className="dashboard-bar-track"><i style={{ width: `${item.value}%`, background: item.color }} /></span><small>{number(26480 * scale * item.value / 100)} 個工作階段</small></div>)}</div>;
}

function DeviceChart() {
  const gradient = devices.reduce((parts, item, index) => {
    const start = devices.slice(0, index).reduce((total, current) => total + current.value, 0);
    parts.push(`${item.color} ${start}% ${start + item.value}%`);
    return parts;
  }, []).join(", ");
  return <div className="dashboard-device-layout">
    <div className="dashboard-donut" style={{ background: `conic-gradient(${gradient})` }} role="img" aria-label="裝置類別：行動裝置 72%，桌上型電腦 21%，平板 7%"><span><DeviceMobile weight="duotone" /><strong>72%</strong><small>行動裝置</small></span></div>
    <div className="dashboard-device-list">{devices.map(item => { const Icon = item.icon; return <div key={item.label}><span style={{ color: item.color }}><Icon weight="fill" /></span><span><small>{item.label}</small><strong>{item.value}%</strong></span></div>; })}</div>
  </div>;
}

function FunnelChart({ scale }) {
  const stages = [
    { label: "開啟任務頁", value: Math.round(9860 * scale), rate: 100 },
    { label: "啟動任務", value: Math.round(8250 * scale), rate: 83.7 },
    { label: "完成四站集章", value: Math.round(4910 * scale), rate: 49.8 },
    { label: "取得兌換資格", value: Math.round(4550 * scale), rate: 46.1 },
    { label: "完成好禮兌換", value: Math.round(4210 * scale), rate: 42.7 },
  ];
  return <div className="dashboard-funnel" aria-label="集章與兌換轉換漏斗">{stages.map((item, index) => <div key={item.label} style={{ width: `${55 + item.rate * .45}%` }}><span>{index + 1}</span><strong>{item.label}</strong><b>{number(item.value)}</b><small>{item.rate}%</small></div>)}</div>;
}

function PanelHeading({ kicker, title, note, action }) {
  return <div className="dashboard-panel-heading"><div><p>{kicker}</p><h2>{title}</h2>{note && <span>{note}</span>}</div>{action}</div>;
}

export function DashboardPage({ onNavigate, onStatus }) {
  const [period, setPeriod] = useState("all");
  const [venue, setVenue] = useState("all");
  const [comparison, setComparison] = useState("previous");
  const [tab, setTab] = useState("overview");
  const [details, setDetails] = useState(null);
  const [updatedAt, setUpdatedAt] = useState("2026/11/21 19:10");

  useEffect(() => {
    document.getElementById("dashboard-page-title")?.focus({ preventScroll: true });
  }, []);

  const filteredDays = useMemo(() => {
    if (period === "weekday") return activityDays.slice(2, 7);
    if (period === "weekend") return [activityDays[0], activityDays[1], activityDays[7]];
    return activityDays;
  }, [period]);
  const selectedVenue = venueOptions.find(item => item.id === venue) ?? venueOptions[0];
  const periodScale = sum(filteredDays, "sessions") / sum(activityDays, "sessions");
  const scale = periodScale * selectedVenue.scale;
  const totals = useMemo(() => ({
    users: Math.round(sum(filteredDays, "users") * selectedVenue.scale),
    sessions: Math.round(sum(filteredDays, "sessions") * selectedVenue.scale),
    views: Math.round(sum(filteredDays, "views") * selectedVenue.scale),
    onsite: Math.round(sum(filteredDays, "onsite") * selectedVenue.scale),
    starts: Math.round(sum(filteredDays, "starts") * selectedVenue.scale),
    completes: Math.round(sum(filteredDays, "completes") * selectedVenue.scale),
    redeemed: Math.round(sum(filteredDays, "redeemed") * selectedVenue.scale),
  }), [filteredDays, selectedVenue]);
  const engagementRate = 67.5 + (venue === "a" ? 4.1 : venue === "h" ? 2.4 : venue === "outdoor" ? -1.2 : venue === "b" ? 1.3 : 0);
  const keyEventRate = totals.users ? Math.min(99, totals.completes / totals.users * 100) : 0;
  const compareLabel = comparison === "none" ? "未啟用比較" : comparison === "previous" ? "較前 8 日" : "較活動首 3 日";

  const refresh = () => {
    const now = new Date();
    const label = new Intl.DateTimeFormat("zh-TW", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).format(now);
    setUpdatedAt(`模擬更新 ${label}`);
    onStatus("儀表板模擬資料已重新整理");
  };

  return <article className="dashboard-page">
    <section className="dashboard-intro" aria-labelledby="dashboard-page-title">
      <div className="dashboard-intro-main">
        <nav className="dashboard-breadcrumb" aria-label="麵包屑"><button onClick={() => onNavigate("home")}><ArrowLeft />回到公開網站</button><span>工作人員工具</span></nav>
        <div className="dashboard-title-row"><span><PresentationChart weight="duotone" /></span><div><p>ACTIVITY OPERATIONS CENTER</p><h1 id="dashboard-page-title" tabIndex="-1">活動營運儀表板</h1></div></div>
        <p className="dashboard-lead">整合網站觸及、場域互動、360° 展示、集章任務與兌換成果，協助專案團隊在活動期間掌握營運表現。</p>
      </div>
    </section>

    <section className="dashboard-toolbar" aria-label="儀表板篩選與操作">
      <div className="dashboard-filter"><label htmlFor="dashboard-period">分析期間</label><select id="dashboard-period" value={period} onChange={event => setPeriod(event.target.value)}><option value="all">活動全期・11/14–11/21</option><option value="weekday">平日・11/16–11/20</option><option value="weekend">週末・11/14、11/15、11/21</option></select></div>
      <div className="dashboard-filter"><label htmlFor="dashboard-venue">場域</label><select id="dashboard-venue" value={venue} onChange={event => setVenue(event.target.value)}>{venueOptions.map(item => <option value={item.id} key={item.id}>{item.label}</option>)}</select></div>
      <div className="dashboard-filter"><label htmlFor="dashboard-comparison">比較</label><select id="dashboard-comparison" value={comparison} onChange={event => setComparison(event.target.value)}><option value="previous">較前 8 日</option><option value="opening">較活動首 3 日</option><option value="none">不比較</option></select></div>
      <div className="dashboard-toolbar-actions"><span><Clock />最後更新：{updatedAt}</span><button type="button" onClick={refresh}><Repeat />重新整理</button><button type="button" className="dashboard-export" onClick={() => setDetails(details === "export" ? null : "export")} aria-expanded={details === "export"}><DownloadSimple />匯出報表</button></div>
    </section>

    {details === "export" && <section className="dashboard-info-panel" aria-live="polite">
      <div><DownloadSimple weight="duotone" /><span><strong>管理報表輸出</strong><small>正式版可輸出含篩選條件、指標定義與資料更新時間的 PDF 摘要及 CSV 明細。</small></span></div><div className="dashboard-export-actions"><button onClick={() => onStatus("已模擬建立 PDF 營運摘要")}>模擬產出 PDF</button><button onClick={() => onStatus("已模擬建立 CSV 明細資料")}>模擬產出 CSV</button></div>
      <button className="dashboard-info-close" onClick={() => setDetails(null)}>收合說明</button>
    </section>}

    <section className="dashboard-summary" aria-label="核心績效指標">
      <PanelHeading kicker="EXECUTIVE SUMMARY" title="活動表現一覽" note={`${selectedVenue.label}・${compareLabel}・所有數值為模擬`} action={<button className="dashboard-definition-button" onClick={() => setDetails(details === "definitions" ? null : "definitions")}><Info />指標定義</button>} />
      {details === "definitions" && <div className="dashboard-definition-strip"><span><strong>活躍使用者</strong>有參與工作階段的去重使用者</span><span><strong>互動率</strong>互動工作階段 ÷ 全部工作階段</span><span><strong>關鍵事件率</strong>完成指定成果事件的使用者占比</span></div>}
      <div className="dashboard-kpi-grid">
        <KpiCard icon={UsersThree} label="活躍使用者" value={number(totals.users)} change={comparison === "none" ? "—" : "+12.8%"} note="GA4 activeUsers" tone="blue" />
        <KpiCard icon={CursorClick} label="工作階段" value={number(totals.sessions)} change={comparison === "none" ? "—" : "+9.6%"} note="GA4 sessions" tone="green" />
        <KpiCard icon={Eye} label="頁面瀏覽量" value={number(totals.views)} change={comparison === "none" ? "—" : "+15.2%"} note="GA4 screenPageViews" tone="yellow" />
        <KpiCard icon={Timer} label="互動率" value={percentage(engagementRate)} change={comparison === "none" ? "—" : "+4.1 個百分點"} note="engagedSessions ÷ sessions" tone="coral" />
        <KpiCard icon={Clock} label="平均互動時間" value="2分46秒" change={comparison === "none" ? "—" : "+18 秒"} note="每一活躍使用者的平均互動時間" tone="purple" />
        <KpiCard icon={Target} label="關鍵事件率" value={percentage(keyEventRate)} change={comparison === "none" ? "—" : "+3.2 個百分點"} note="完成集章等指定成果事件" tone="blue" />
      </div>
      <div className="dashboard-operation-strip">
        <div><BuildingOffice /><span><small>現場入場</small><strong>{number(totals.onsite)}</strong></span></div>
        <div><QrCode /><span><small>導覽啟動</small><strong>{number(14280 * scale)}</strong></span></div>
        <div><FilmSlate /><span><small>360° 展示開啟</small><strong>{number(9740 * scale)}</strong></span></div>
        <div><Stamp /><span><small>完成集章</small><strong>{number(totals.completes)}</strong></span></div>
        <div><Gift /><span><small>完成兌換</small><strong>{number(totals.redeemed)}</strong></span></div>
      </div>
    </section>

    <nav className="dashboard-tabs" aria-label="儀表板分析主題">
      {[{ id: "overview", label: "數位觸及", icon: Globe }, { id: "onsite", label: "現場參與", icon: BuildingOffice }, { id: "conversion", label: "集章轉換", icon: Funnel }].map(item => { const Icon = item.icon; return <button key={item.id} className={tab === item.id ? "active" : ""} aria-pressed={tab === item.id} onClick={() => setTab(item.id)}><Icon weight="duotone" />{item.label}</button>; })}
    </nav>

    <section className="dashboard-analysis" aria-live="polite">
      {tab === "overview" && <>
        <div className="dashboard-panel dashboard-panel-wide"><PanelHeading kicker="USERS OVER TIME" title="每日活躍使用者趨勢" note="依目前篩選條件同步更新" /><TrendChart rows={filteredDays.map(item => ({ ...item, users: Math.round(item.users * selectedVenue.scale), sessions: Math.round(item.sessions * selectedVenue.scale), views: Math.round(item.views * selectedVenue.scale), onsite: Math.round(item.onsite * selectedVenue.scale) }))} /></div>
        <div className="dashboard-panel"><PanelHeading kicker="ACQUISITION" title="流量來源／媒介" note="對應 UTM 與工作階段來源" /><ChannelChart scale={scale} /></div>
        <div className="dashboard-panel"><PanelHeading kicker="TECH" title="裝置類別" note="行動裝置為主要服務情境" /><DeviceChart /></div>
        <div className="dashboard-panel dashboard-panel-wide"><PanelHeading kicker="CONTENT PERFORMANCE" title="熱門頁面與畫面" note="依瀏覽量排序" /><div className="dashboard-table-scroll"><table className="dashboard-table"><thead><tr><th>內容</th><th>路徑</th><th>瀏覽量</th><th>使用者</th><th>互動率</th></tr></thead><tbody>{pageRows.map(row => <tr key={row.path}><td><strong>{row.page}</strong></td><td><code>{row.path}</code></td><td>{number(row.views * scale)}</td><td>{number(row.users * scale)}</td><td><span className="dashboard-rate"><i style={{ width: `${row.rate}%` }} />{row.rate}%</span></td></tr>)}</tbody></table></div></div>
      </>}

      {tab === "onsite" && <>
        <div className="dashboard-panel dashboard-panel-wide"><PanelHeading kicker="VENUE OPERATIONS" title="各場館互動表現" note="場館選單可聚焦單一區域" /><div className="dashboard-venue-grid">{venueRows.filter(row => venue === "all" || row.id === venue).map(row => <article key={row.id}><span style={{ background: row.color }}>{row.code}</span><div><small>{row.label}</small><strong>{number(row.visits * periodScale)}</strong><p>入場／掃碼人次</p></div><dl><div><dt>導覽啟動</dt><dd>{number(row.guide * periodScale)}</dd></div><div><dt>360° 開啟</dt><dd>{number(row.viewer * periodScale)}</dd></div><div><dt>集章完成</dt><dd>{number(row.stamp * periodScale)}</dd></div></dl></article>)}</div></div>
        <div className="dashboard-panel"><PanelHeading kicker="PEAK HOURS" title="場館時段熱度" note="顏色越深代表相對人流越高" /><div className="dashboard-heatmap"><div className="dashboard-heat-head"><span /><span>09</span><span>11</span><span>13</span><span>15</span><span>17</span><span>19</span></div>{heatRows.filter(row => venue === "all" || row.label.startsWith(selectedVenue.label[0])).map(row => <div key={row.label}><strong>{row.label}</strong>{row.values.map((value, index) => <span key={index} style={{ "--heat": value / 100 }} title={`${row.label} ${9 + index * 2}:00 相對熱度 ${value}%`}>{value}</span>)}</div>)}</div></div>
        <div className="dashboard-panel dashboard-event-panel"><PanelHeading kicker="EVENT STREAM" title="互動事件摘要" note="事件命名為提案規格" /><div className="dashboard-event-list">{eventRows.map(row => <div key={row.event}><span><CursorClick /></span><div><strong>{row.label}</strong><code>{row.event}</code></div><b>{number(row.count * scale)}</b><small className={row.status === "關鍵事件" ? "key" : ""}>{row.status}</small></div>)}</div></div>
      </>}

      {tab === "conversion" && <>
        <div className="dashboard-panel dashboard-panel-wide"><PanelHeading kicker="MISSION FUNNEL" title="集章與兌換轉換漏斗" note="從任務入口到現場核銷" /><FunnelChart scale={scale} /></div>
        <div className="dashboard-panel"><PanelHeading kicker="MISSION PERFORMANCE" title="各任務完成率" note="完成數 ÷ 啟動數" /><div className="dashboard-mission-list">{missionRows.map(row => { const rate = row.completed / row.started * 100; return <div key={row.title}><span><strong>{row.title}</strong><small>{number(row.completed * scale)} / {number(row.started * scale)} 人</small></span><span className="dashboard-bar-track"><i style={{ width: `${rate}%` }} /></span><b>{percentage(rate)}</b></div>; })}</div></div>
        <div className="dashboard-panel dashboard-insight"><PanelHeading kicker="ACTIONABLE INSIGHTS" title="營運判讀建議" note="依模擬資料自動整理" /><ul><li><span><CheckCircle weight="fill" /></span><p><strong>行動裝置優先</strong>72% 流量來自行動裝置，現場 QR 頁面應維持單手操作與快速載入。</p></li><li><span><ArrowUpRight /></span><p><strong>優化任務中段</strong>從啟動任務到完成四站仍有明顯落差，可用下一站提示與現場引導補強。</p></li><li><span><Gift /></span><p><strong>兌換率表現可追蹤</strong>將 reward_eligible 與 reward_redeem 分開，才能區分「符合資格但未兌換」的流失。</p></li></ul></div>
      </>}
    </section>

    <section className="dashboard-data-model">
      <div><p>DATA READINESS</p><h2>正式上線前的資料串接清單</h2><span>讓每一張圖都能回到清楚的資料來源、定義與責任人。</span></div>
      <div className="dashboard-source-grid">
        {[{ icon: Globe, title: "GA4／Google tag", text: "使用者、工作階段、頁面、來源、裝置與互動事件", status: "規劃串接" }, { icon: QrCode, title: "QR／集章事件", text: "任務啟動、完成、資格取得、兌換與場館節點", status: "規劃串接" }, { icon: BuildingOffice, title: "現場營運紀錄", text: "入場、節目、服務台與異常回報；支援人工匯入", status: "欄位待核定" }, { icon: LockKey, title: "權限與隱私", text: "彙總顯示、角色權限、保存期限與去識別化", status: "政策待核定" }].map(item => { const Icon = item.icon; return <article key={item.title}><span><Icon weight="duotone" /></span><div><strong>{item.title}</strong><p>{item.text}</p><small>{item.status}</small></div></article>; })}
      </div>
    </section>

    <footer className="dashboard-footer"><span><LockKey />提案展示／模擬後台</span><p>指標定義參照 GA4 常用報表欄位；現場與集章指標為本案事件規格，正式數值須以核定資料源為準。</p><button onClick={() => onNavigate("home")}>返回公開網站<ArrowRight /></button></footer>
  </article>;
}
