import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

// ─── Types ───────────────────────────────────────────────────────────────────
type Tab = "story" | "usecase" | "sequence" | "activity" | "dataflow" | "er" | "nf" | "userflow" | "prototype";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "story",     label: "User Story",    icon: "BookOpen" },
  { id: "usecase",   label: "Use Case",      icon: "Users" },
  { id: "sequence",  label: "Sequence",      icon: "ArrowRightLeft" },
  { id: "activity",  label: "Activity",      icon: "GitBranch" },
  { id: "dataflow",  label: "Data Flow",     icon: "Workflow" },
  { id: "er",        label: "ER-модель",     icon: "Database" },
  { id: "nf",        label: "Норм. формы",   icon: "ListChecks" },
  { id: "userflow",  label: "User Flow",     icon: "Route" },
  { id: "prototype", label: "Прототип UI",   icon: "Monitor" },
];

// ─── USER STORY ──────────────────────────────────────────────────────────────
const UserStorySection = () => (
  <div className="space-y-6">
    <SectionTitle icon="BookOpen" title="User Story" subtitle="Истории пользователей системы заказов" />
    {[
      {
        role: "Клиент",
        color: "blue",
        stories: [
          { id: "US-01", action: "зарегистрироваться на сайте", goal: "иметь личный кабинет и историю заказов" },
          { id: "US-02", action: "просматривать каталог товаров", goal: "найти нужный товар и сравнить цены" },
          { id: "US-03", action: "добавить товар в корзину", goal: "оформить несколько товаров одним заказом" },
          { id: "US-04", action: "оформить и оплатить заказ", goal: "получить товар с доставкой" },
          { id: "US-05", action: "отслеживать статус заказа", goal: "знать, когда ожидать доставку" },
        ],
      },
      {
        role: "Менеджер",
        color: "purple",
        stories: [
          { id: "US-06", action: "получать новые заказы в системе", goal: "оперативно их обрабатывать" },
          { id: "US-07", action: "изменять статус заказа", goal: "держать клиента в курсе" },
          { id: "US-08", action: "управлять каталогом товаров", goal: "поддерживать актуальность ассортимента" },
        ],
      },
      {
        role: "Система",
        color: "green",
        stories: [
          { id: "US-09", action: "отправлять уведомления клиенту", goal: "информировать об изменении статуса" },
          { id: "US-10", action: "обрабатывать платёж", goal: "подтвердить оплату и зафиксировать заказ" },
        ],
      },
    ].map(({ role, color, stories }) => (
      <div key={role} className={`border rounded-xl overflow-hidden border-${color}-200`}>
        <div className={`bg-${color}-50 px-6 py-3 border-b border-${color}-200`}>
          <span className={`font-bold text-${color}-800 text-sm uppercase tracking-wide`}>👤 Как {role}</span>
        </div>
        <div className="divide-y divide-neutral-100">
          {stories.map((s) => (
            <div key={s.id} className="px-6 py-4 flex gap-4 items-start bg-white hover:bg-neutral-50 transition-colors">
              <span className="text-xs font-mono bg-neutral-100 text-neutral-500 px-2 py-1 rounded shrink-0">{s.id}</span>
              <p className="text-sm text-neutral-700">
                <span className="font-medium">Я хочу</span> {s.action},{" "}
                <span className="font-medium">чтобы</span> {s.goal}.
              </p>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

// ─── USE CASE ────────────────────────────────────────────────────────────────
const UseCaseSection = () => (
  <div className="space-y-6">
    <SectionTitle icon="Users" title="UML — Use Case диаграмма" subtitle="Взаимодействие акторов с системой" />
    <div className="bg-white border border-neutral-200 rounded-xl p-8">
      <div className="flex gap-8 flex-col lg:flex-row">
        {/* Акторы */}
        <div className="flex flex-col gap-4 lg:w-48">
          {[
            { name: "Клиент", icon: "👤", color: "blue" },
            { name: "Менеджер", icon: "👔", color: "purple" },
            { name: "Платёжная система", icon: "💳", color: "green" },
          ].map((a) => (
            <div key={a.name} className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-${a.color}-50 border border-${a.color}-200`}>
              <span className="text-3xl">{a.icon}</span>
              <span className={`text-xs font-semibold text-${a.color}-800 text-center`}>{a.name}</span>
            </div>
          ))}
        </div>

        {/* Система — прямоугольник */}
        <div className="flex-1 border-2 border-dashed border-neutral-300 rounded-xl p-6">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-6 text-center font-semibold">«Система заказов»</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Регистрация / вход", actor: "Клиент", color: "blue" },
              { label: "Просмотр каталога", actor: "Клиент", color: "blue" },
              { label: "Управление корзиной", actor: "Клиент", color: "blue" },
              { label: "Оформление заказа", actor: "Клиент", color: "blue" },
              { label: "Оплата заказа", actor: "Клиент + Платёжная система", color: "green" },
              { label: "Отслеживание заказа", actor: "Клиент", color: "blue" },
              { label: "Подтверждение заказа", actor: "Менеджер", color: "purple" },
              { label: "Изменение статуса", actor: "Менеджер", color: "purple" },
              { label: "Управление каталогом", actor: "Менеджер", color: "purple" },
              { label: "Отправка уведомлений", actor: "Система", color: "neutral" },
            ].map((uc) => (
              <div key={uc.label} className={`flex items-center gap-3 p-3 rounded-lg bg-${uc.color}-50 border border-${uc.color}-100`}>
                <div className={`w-2 h-2 rounded-full bg-${uc.color}-400 shrink-0`} />
                <div>
                  <p className="text-sm font-medium text-neutral-800">{uc.label}</p>
                  <p className="text-xs text-neutral-400">{uc.actor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── SEQUENCE ────────────────────────────────────────────────────────────────
const SequenceSection = () => {
  const actors = ["Клиент", "Браузер", "Сервер", "БД", "Платёжная система"];
  const steps = [
    { from: 0, to: 1, msg: "Добавить в корзину", type: "solid" },
    { from: 1, to: 2, msg: "POST /cart", type: "solid" },
    { from: 2, to: 3, msg: "INSERT cart_item", type: "solid" },
    { from: 3, to: 2, msg: "OK", type: "dashed" },
    { from: 0, to: 1, msg: "Оформить заказ", type: "solid" },
    { from: 1, to: 2, msg: "POST /orders", type: "solid" },
    { from: 2, to: 3, msg: "INSERT order", type: "solid" },
    { from: 2, to: 4, msg: "Запрос оплаты", type: "solid" },
    { from: 4, to: 2, msg: "Подтверждение платежа", type: "dashed" },
    { from: 2, to: 3, msg: "UPDATE order status='paid'", type: "solid" },
    { from: 2, to: 1, msg: "Заказ создан ✓", type: "dashed" },
    { from: 1, to: 0, msg: "Показать подтверждение", type: "dashed" },
  ];
  const colors = ["blue", "indigo", "violet", "green", "amber"];
  return (
    <div className="space-y-6">
      <SectionTitle icon="ArrowRightLeft" title="UML — Sequence диаграмма" subtitle="Последовательность взаимодействий при оформлении заказа" />
      <div className="bg-white border border-neutral-200 rounded-xl p-6 overflow-x-auto">
        {/* Головки акторов */}
        <div className="flex gap-2 mb-4 min-w-[700px]">
          {actors.map((a, i) => (
            <div key={a} className={`flex-1 text-center text-xs font-bold py-2 rounded bg-${colors[i]}-100 text-${colors[i]}-800 border border-${colors[i]}-200`}>
              {a}
            </div>
          ))}
        </div>
        {/* Шаги */}
        <div className="space-y-2 min-w-[700px]">
          {steps.map((s, i) => {
            const left = (s.from / (actors.length - 1)) * 100;
            const right = (s.to / (actors.length - 1)) * 100;
            const isRight = s.to > s.from;
            return (
              <div key={i} className="relative h-8 flex items-center">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className={`absolute h-0.5 ${s.type === "dashed" ? "border-t-2 border-dashed border-neutral-400" : `bg-${colors[Math.min(s.from, s.to)]}-400`}`}
                    style={{
                      left: `${Math.min(left, right)}%`,
                      width: `${Math.abs(right - left)}%`,
                    }}
                  />
                  <div
                    className="absolute text-xs bg-white px-2 py-0.5 rounded border border-neutral-200 text-neutral-600 whitespace-nowrap z-10"
                    style={{ left: `${(left + right) / 2}%`, transform: "translateX(-50%) translateY(-110%)" }}
                  >
                    {s.msg}
                  </div>
                  <div
                    className="absolute text-neutral-500 text-base"
                    style={{ left: isRight ? `${right}%` : undefined, right: isRight ? undefined : `${100 - right}%`, transform: "translateX(-50%)" }}
                  >
                    {isRight ? "→" : "←"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── ACTIVITY ────────────────────────────────────────────────────────────────
const ActivitySection = () => {
  const nodes = [
    { id: "start", label: "Начало", type: "start" },
    { id: "login", label: "Авторизация", type: "action" },
    { id: "catalog", label: "Просмотр каталога", type: "action" },
    { id: "add", label: "Добавить в корзину", type: "action" },
    { id: "more", label: "Ещё товары?", type: "decision" },
    { id: "order", label: "Оформить заказ", type: "action" },
    { id: "pay", label: "Оплата успешна?", type: "decision" },
    { id: "confirm", label: "Заказ подтверждён", type: "action" },
    { id: "notify", label: "Уведомление клиенту", type: "action" },
    { id: "end", label: "Конец", type: "end" },
    { id: "retry", label: "Повторить оплату", type: "action" },
  ];
  const edges = [
    { from: "start", to: "login", label: "" },
    { from: "login", to: "catalog", label: "" },
    { from: "catalog", to: "add", label: "" },
    { from: "add", to: "more", label: "" },
    { from: "more", to: "catalog", label: "Да" },
    { from: "more", to: "order", label: "Нет" },
    { from: "order", to: "pay", label: "" },
    { from: "pay", to: "confirm", label: "Да" },
    { from: "pay", to: "retry", label: "Нет" },
    { from: "retry", to: "pay", label: "" },
    { from: "confirm", to: "notify", label: "" },
    { from: "notify", to: "end", label: "" },
  ];
  return (
    <div className="space-y-6">
      <SectionTitle icon="GitBranch" title="UML — Activity диаграмма" subtitle="Поток действий при оформлении заказа" />
      <div className="bg-white border border-neutral-200 rounded-xl p-8">
        <div className="flex flex-col items-center gap-0">
          {[
            { node: nodes[0] },
            { arrow: "↓" },
            { node: nodes[1] },
            { arrow: "↓" },
            { node: nodes[2] },
            { arrow: "↓" },
            { node: nodes[3] },
            { arrow: "↓" },
            { decision: nodes[4], yes: "← Да (назад к каталогу)", no: "Нет ↓" },
            { arrow: "↓" },
            { node: nodes[5] },
            { arrow: "↓" },
            { decision: nodes[6], yes: "Да ↓", no: "Нет → Повторить" },
            { arrow: "↓" },
            { node: nodes[7] },
            { arrow: "↓" },
            { node: nodes[8] },
            { arrow: "↓" },
            { node: nodes[9] },
          ].map((item, i) => {
            if ("arrow" in item) {
              return <div key={i} className="text-neutral-400 text-xl leading-none py-1">{item.arrow}</div>;
            }
            if ("decision" in item) {
              return (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{item.yes}</span>
                  <div className="w-36 h-10 bg-amber-50 border-2 border-amber-400 flex items-center justify-center text-xs font-semibold text-amber-800 rotate-0"
                    style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", width: 140, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span>{item.decision.label}</span>
                  </div>
                  <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">{item.no}</span>
                </div>
              );
            }
            if ("node" in item) {
              const n = item.node;
              if (n.type === "start" || n.type === "end") {
                return <div key={i} className="w-6 h-6 rounded-full bg-neutral-900" />;
              }
              return (
                <div key={i} className="px-6 py-2 bg-neutral-100 border border-neutral-300 rounded-lg text-sm text-neutral-800 font-medium min-w-[180px] text-center">
                  {n.label}
                </div>
              );
            }
            return null;
          })}
        </div>
        {/* Легенда */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <LegendItem color="bg-neutral-900" shape="circle" label="Начало / Конец" />
          <LegendItem color="bg-neutral-100 border border-neutral-300" shape="rect" label="Действие" />
          <LegendItem color="bg-amber-50 border-2 border-amber-400" shape="diamond" label="Решение" />
        </div>
      </div>
    </div>
  );
};

// ─── DATA FLOW ───────────────────────────────────────────────────────────────
const DataFlowSection = () => (
  <div className="space-y-6">
    <SectionTitle icon="Workflow" title="Data Flow диаграмма (DFD)" subtitle="Потоки данных в системе заказов" />

    {/* Уровень 0 — контекстная диаграмма */}
    <div className="bg-white border border-neutral-200 rounded-xl p-8">
      <p className="text-xs uppercase tracking-widest text-neutral-400 mb-6 font-semibold">Уровень 0 — Контекстная диаграмма</p>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {[
          { label: "Клиент", icon: "👤", side: "left" },
        ].map((ext) => (
          <div key={ext.label} className="flex flex-col items-center gap-2 px-6 py-4 border-2 border-neutral-300 rounded text-sm font-semibold bg-neutral-50">
            <span className="text-2xl">{ext.icon}</span>
            {ext.label}
          </div>
        ))}
        <div className="flex flex-col gap-2 items-center text-xs text-neutral-500">
          <span className="flex items-center gap-1">→ Данные заказа</span>
          <span className="flex items-center gap-1">← Статус / уведомление</span>
        </div>
        <div className="px-10 py-8 border-2 border-blue-400 rounded-full bg-blue-50 text-blue-800 font-bold text-center">
          Система<br/>заказов
        </div>
        <div className="flex flex-col gap-2 items-center text-xs text-neutral-500">
          <span>→ Запрос оплаты</span>
          <span>← Подтверждение</span>
        </div>
        <div className="flex flex-col items-center gap-2 px-6 py-4 border-2 border-neutral-300 rounded text-sm font-semibold bg-neutral-50">
          <span className="text-2xl">💳</span>
          Платёжная система
        </div>
      </div>
    </div>

    {/* Уровень 1 */}
    <div className="bg-white border border-neutral-200 rounded-xl p-8">
      <p className="text-xs uppercase tracking-widest text-neutral-400 mb-6 font-semibold">Уровень 1 — Детализация процессов</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            num: "P1",
            title: "Управление пользователями",
            inputs: ["Email, пароль", "Данные профиля"],
            outputs: ["Токен сессии", "Данные пользователя"],
            stores: ["DS1: Users"],
            color: "blue",
          },
          {
            num: "P2",
            title: "Обработка заказов",
            inputs: ["Товары из корзины", "Адрес доставки"],
            outputs: ["ID заказа", "Статус заказа"],
            stores: ["DS2: Orders", "DS3: Order_Items"],
            color: "purple",
          },
          {
            num: "P3",
            title: "Управление каталогом",
            inputs: ["Фильтры поиска", "ID товара"],
            outputs: ["Список товаров", "Карточка товара"],
            stores: ["DS4: Products"],
            color: "green",
          },
          {
            num: "P4",
            title: "Обработка платежей",
            inputs: ["Сумма заказа", "Платёжные данные"],
            outputs: ["Статус оплаты", "Чек"],
            stores: ["DS5: Payments"],
            color: "amber",
          },
          {
            num: "P5",
            title: "Уведомления",
            inputs: ["Событие изменения статуса"],
            outputs: ["Email / SMS клиенту"],
            stores: ["DS6: Notifications"],
            color: "rose",
          },
          {
            num: "P6",
            title: "Отслеживание доставки",
            inputs: ["ID заказа"],
            outputs: ["Текущий статус", "История статусов"],
            stores: ["DS2: Orders"],
            color: "teal",
          },
        ].map((p) => (
          <div key={p.num} className={`border border-${p.color}-200 rounded-xl p-5 bg-${p.color}-50`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-7 h-7 rounded-full bg-${p.color}-500 text-white text-xs flex items-center justify-center font-bold shrink-0`}>{p.num}</span>
              <span className={`text-sm font-semibold text-${p.color}-900`}>{p.title}</span>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-neutral-500 font-medium">Вход:</span>
                {p.inputs.map((inp) => (
                  <span key={inp} className="ml-1 bg-white border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-600">{inp}</span>
                ))}
              </div>
              <div>
                <span className="text-neutral-500 font-medium">Выход:</span>
                {p.outputs.map((out) => (
                  <span key={out} className="ml-1 bg-white border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-600">{out}</span>
                ))}
              </div>
              <div>
                <span className="text-neutral-500 font-medium">Хранилища:</span>
                {p.stores.map((st) => (
                  <span key={st} className={`ml-1 bg-${p.color}-100 border border-${p.color}-200 px-1.5 py-0.5 rounded text-${p.color}-700`}>{st}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── ER DIAGRAM ──────────────────────────────────────────────────────────────
const ErSection = () => (
  <div className="space-y-6">
    <SectionTitle icon="Database" title="ER-диаграмма" subtitle="Семантическое моделирование структуры данных" />
    <div className="bg-white border border-neutral-200 rounded-xl p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "USERS",
            color: "blue",
            fields: [
              { name: "id", type: "INT", key: "PK" },
              { name: "name", type: "VARCHAR(100)" },
              { name: "email", type: "VARCHAR(150)", key: "UQ" },
              { name: "phone", type: "VARCHAR(20)" },
              { name: "created_at", type: "TIMESTAMP" },
            ],
          },
          {
            name: "ORDERS",
            color: "purple",
            fields: [
              { name: "id", type: "INT", key: "PK" },
              { name: "user_id", type: "INT", key: "FK" },
              { name: "status", type: "ENUM" },
              { name: "total_price", type: "DECIMAL" },
              { name: "address_id", type: "INT", key: "FK" },
              { name: "created_at", type: "TIMESTAMP" },
            ],
          },
          {
            name: "PRODUCTS",
            color: "green",
            fields: [
              { name: "id", type: "INT", key: "PK" },
              { name: "category_id", type: "INT", key: "FK" },
              { name: "name", type: "VARCHAR(200)" },
              { name: "price", type: "DECIMAL" },
              { name: "stock", type: "INT" },
            ],
          },
          {
            name: "ORDER_ITEMS",
            color: "amber",
            fields: [
              { name: "id", type: "INT", key: "PK" },
              { name: "order_id", type: "INT", key: "FK" },
              { name: "product_id", type: "INT", key: "FK" },
              { name: "quantity", type: "INT" },
              { name: "unit_price", type: "DECIMAL" },
            ],
          },
          {
            name: "PAYMENTS",
            color: "rose",
            fields: [
              { name: "id", type: "INT", key: "PK" },
              { name: "order_id", type: "INT", key: "FK" },
              { name: "method", type: "VARCHAR(50)" },
              { name: "status", type: "ENUM" },
              { name: "paid_at", type: "TIMESTAMP" },
            ],
          },
          {
            name: "ADDRESSES",
            color: "teal",
            fields: [
              { name: "id", type: "INT", key: "PK" },
              { name: "user_id", type: "INT", key: "FK" },
              { name: "city", type: "VARCHAR(100)" },
              { name: "street", type: "VARCHAR(200)" },
              { name: "zip", type: "VARCHAR(20)" },
            ],
          },
        ].map((table) => (
          <div key={table.name} className={`border-2 border-${table.color}-300 rounded-xl overflow-hidden`}>
            <div className={`bg-${table.color}-500 text-white px-4 py-2 font-bold text-sm text-center tracking-wide`}>
              {table.name}
            </div>
            <div className="divide-y divide-neutral-100 bg-white">
              {table.fields.map((f) => (
                <div key={f.name} className="flex items-center justify-between px-4 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    {f.key && (
                      <span className={`px-1.5 py-0.5 rounded text-white text-[10px] font-bold ${f.key === "PK" ? "bg-yellow-500" : f.key === "FK" ? "bg-blue-500" : "bg-green-500"}`}>
                        {f.key}
                      </span>
                    )}
                    <span className="font-medium text-neutral-800">{f.name}</span>
                  </div>
                  <span className="text-neutral-400 font-mono">{f.type}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Связи */}
      <div className="mt-8 border-t border-neutral-100 pt-6">
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4 font-semibold">Связи между таблицами</p>
        <div className="flex flex-wrap gap-3">
          {[
            { rel: "USERS → ORDERS", card: "1:N", desc: "Один пользователь — много заказов" },
            { rel: "ORDERS → ORDER_ITEMS", card: "1:N", desc: "Один заказ — много позиций" },
            { rel: "PRODUCTS → ORDER_ITEMS", card: "1:N", desc: "Один товар — во многих позициях" },
            { rel: "ORDERS → PAYMENTS", card: "1:1", desc: "Один заказ — один платёж" },
            { rel: "USERS → ADDRESSES", card: "1:N", desc: "Один пользователь — много адресов" },
          ].map((r) => (
            <div key={r.rel} className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2">
              <span className="text-xs font-mono text-neutral-700 font-medium">{r.rel}</span>
              <span className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded font-bold">{r.card}</span>
              <span className="text-xs text-neutral-400">{r.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── NORMAL FORMS ─────────────────────────────────────────────────────────────
const NfSection = () => (
  <div className="space-y-6">
    <SectionTitle icon="ListChecks" title="Нормальные формы" subtitle="Приведение БД к 1НФ → 2НФ → 3НФ" />
    <div className="space-y-6">
      {[
        {
          nf: "1НФ",
          title: "Первая нормальная форма",
          color: "blue",
          rule: "Все значения атомарны (неделимы). Нет повторяющихся групп и массивов.",
          problem: "❌ Было: поле 'products' хранило строку '\"Кофе x2, Чай x1\"'",
          solution: "✅ Стало: таблица ORDER_ITEMS с отдельной строкой на каждую позицию",
          table: {
            before: [["order_id", "products"], ["1", "Кофе x2, Чай x1"], ["2", "Вода x5"]],
            after: [["order_id", "product_id", "qty"], ["1", "101", "2"], ["1", "102", "1"], ["2", "103", "5"]],
          },
        },
        {
          nf: "2НФ",
          title: "Вторая нормальная форма",
          color: "purple",
          rule: "Все не ключевые атрибуты полностью зависят от всего первичного ключа (нет частичных зависимостей).",
          problem: "❌ Было: ORDER_ITEMS(order_id, product_id, qty, product_name, product_price) — название и цена зависят только от product_id",
          solution: "✅ Стало: product_name и price вынесены в таблицу PRODUCTS",
          table: {
            before: [["order_id", "product_id", "qty", "product_name", "price"], ["1", "101", "2", "Кофе", "150"]],
            after: [["order_id", "product_id", "qty"], ["1", "101", "2"]],
          },
        },
        {
          nf: "3НФ",
          title: "Третья нормальная форма",
          color: "green",
          rule: "Нет транзитивных зависимостей — не ключевые атрибуты не зависят от других не ключевых атрибутов.",
          problem: "❌ Было: ORDERS(id, user_id, city, zip) — city зависит от zip, а не от id",
          solution: "✅ Стало: адресные данные вынесены в таблицу ADDRESSES с внешним ключом address_id",
          table: {
            before: [["order_id", "user_id", "city", "zip"], ["1", "5", "Москва", "101000"]],
            after: [["order_id", "user_id", "address_id"], ["1", "5", "12"]],
          },
        },
      ].map((nf) => (
        <div key={nf.nf} className={`border border-${nf.color}-200 rounded-xl overflow-hidden`}>
          <div className={`flex items-center gap-4 px-6 py-4 bg-${nf.color}-50 border-b border-${nf.color}-200`}>
            <div className={`w-12 h-12 rounded-full bg-${nf.color}-500 text-white flex items-center justify-center font-black text-sm shrink-0`}>{nf.nf}</div>
            <div>
              <p className={`font-bold text-${nf.color}-900`}>{nf.title}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{nf.rule}</p>
            </div>
          </div>
          <div className="bg-white px-6 py-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-2 uppercase">До нормализации</p>
              <p className="text-sm text-red-600 mb-3">{nf.problem}</p>
              <MiniTable rows={nf.table.before} />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-2 uppercase">После нормализации</p>
              <p className={`text-sm text-${nf.color}-700 mb-3`}>{nf.solution}</p>
              <MiniTable rows={nf.table.after} highlight />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── USER FLOW ────────────────────────────────────────────────────────────────
const UserFlowSection = () => {
  const flows = [
    {
      title: "Оформление заказа",
      color: "blue",
      steps: [
        { label: "Главная", icon: "Home", desc: "Клиент открывает сайт" },
        { label: "Каталог", icon: "ShoppingBag", desc: "Просматривает товары" },
        { label: "Карточка товара", icon: "Package", desc: "Изучает описание" },
        { label: "Корзина", icon: "ShoppingCart", desc: "Добавляет товары" },
        { label: "Оформление", icon: "ClipboardList", desc: "Вводит адрес доставки" },
        { label: "Оплата", icon: "CreditCard", desc: "Вводит данные карты" },
        { label: "Подтверждение", icon: "CheckCircle", desc: "Заказ создан!" },
      ],
    },
    {
      title: "Отслеживание заказа",
      color: "purple",
      steps: [
        { label: "Личный кабинет", icon: "User", desc: "Клиент входит в аккаунт" },
        { label: "Мои заказы", icon: "List", desc: "Список заказов" },
        { label: "Детали заказа", icon: "FileText", desc: "Статус и информация" },
        { label: "Трекинг", icon: "MapPin", desc: "Текущее местоположение" },
      ],
    },
  ];
  return (
    <div className="space-y-6">
      <SectionTitle icon="Route" title="User Flow" subtitle="Визуальный путь пользователя к цели" />
      {flows.map((flow) => (
        <div key={flow.title} className="bg-white border border-neutral-200 rounded-xl p-8">
          <p className={`text-sm font-bold text-${flow.color}-700 uppercase tracking-wide mb-6`}>{flow.title}</p>
          <div className="flex flex-wrap items-center gap-2">
            {flow.steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-2 group">
                  <div className={`w-14 h-14 rounded-2xl bg-${flow.color}-100 border-2 border-${flow.color}-300 flex items-center justify-center group-hover:bg-${flow.color}-200 transition-colors`}>
                    <Icon name={step.icon} fallback="CircleAlert" size={22} className={`text-${flow.color}-600`} />
                  </div>
                  <p className="text-xs font-semibold text-neutral-700 text-center max-w-[70px] leading-tight">{step.label}</p>
                  <p className="text-[10px] text-neutral-400 text-center max-w-[80px] leading-tight">{step.desc}</p>
                </div>
                {i < flow.steps.length - 1 && (
                  <Icon name="ChevronRight" fallback="CircleAlert" size={20} className="text-neutral-300 shrink-0 mb-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── PROTOTYPE ────────────────────────────────────────────────────────────────
type Screen = "home" | "catalog" | "product" | "cart" | "checkout" | "payment" | "success" | "orders" | "tracking";

const SCREENS: Record<Screen, { title: string; next?: Screen[]; prev?: Screen }> = {
  home:     { title: "Главная",          next: ["catalog"] },
  catalog:  { title: "Каталог товаров",  next: ["product"], prev: "home" },
  product:  { title: "Карточка товара",  next: ["cart"],    prev: "catalog" },
  cart:     { title: "Корзина",          next: ["checkout"], prev: "catalog" },
  checkout: { title: "Оформление",       next: ["payment"], prev: "cart" },
  payment:  { title: "Оплата",           next: ["success"], prev: "checkout" },
  success:  { title: "Заказ оформлен!",  next: ["orders"] },
  orders:   { title: "Мои заказы",       next: ["tracking"], prev: "home" },
  tracking: { title: "Трекинг заказа",   prev: "orders" },
};

const ScreenContent: Record<Screen, React.ReactNode> = {
  home: (
    <div className="space-y-3">
      <div className="h-20 bg-gradient-to-r from-neutral-800 to-neutral-600 rounded-lg flex items-center justify-center">
        <span className="text-white text-xs font-bold">ORDERFLOW — Система заказов</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {["Каталог товаров", "Мои заказы"].map((b) => (
          <div key={b} className="bg-blue-500 text-white text-xs py-2 rounded text-center font-medium cursor-pointer">{b}</div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["📦 Быстро", "💳 Безопасно", "🔔 Уведомления"].map((f) => (
          <div key={f} className="bg-neutral-100 rounded p-2 text-center text-xs text-neutral-600">{f}</div>
        ))}
      </div>
    </div>
  ),
  catalog: (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="flex-1 bg-neutral-100 rounded px-2 py-1.5 text-xs text-neutral-400">Поиск...</div>
        <div className="bg-blue-100 text-blue-600 text-xs px-2 py-1.5 rounded">Фильтр</div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Кофе Арабика", price: "450₽", img: "☕" },
          { name: "Чай зелёный", price: "280₽", img: "🍵" },
          { name: "Вода 1.5л", price: "60₽", img: "💧" },
          { name: "Сок апельсин", price: "120₽", img: "🍊" },
        ].map((p) => (
          <div key={p.name} className="border border-neutral-200 rounded-lg p-2 bg-white">
            <div className="text-2xl text-center mb-1">{p.img}</div>
            <p className="text-xs font-medium text-neutral-800 text-center">{p.name}</p>
            <p className="text-xs text-blue-600 font-bold text-center">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  product: (
    <div className="space-y-3">
      <div className="h-24 bg-amber-50 rounded-lg flex items-center justify-center text-5xl">☕</div>
      <div>
        <p className="font-bold text-sm text-neutral-800">Кофе Арабика Premium</p>
        <p className="text-xs text-neutral-400 mt-1">Свежеобжаренный кофе из Эфиопии. 250г.</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-black text-blue-600">450₽</span>
        <div className="flex items-center gap-2 bg-neutral-100 rounded-lg px-3 py-1">
          <span className="text-xs font-bold">−</span>
          <span className="text-sm font-bold">1</span>
          <span className="text-xs font-bold">+</span>
        </div>
      </div>
      <div className="bg-blue-500 text-white text-xs py-2 rounded text-center font-medium">Добавить в корзину</div>
    </div>
  ),
  cart: (
    <div className="space-y-3">
      <p className="text-xs font-bold text-neutral-500 uppercase">Корзина (2 товара)</p>
      {[
        { name: "Кофе Арабика", qty: "1", price: "450₽", img: "☕" },
        { name: "Чай зелёный", qty: "2", price: "560₽", img: "🍵" },
      ].map((i) => (
        <div key={i.name} className="flex items-center gap-3 border-b border-neutral-100 pb-3">
          <span className="text-xl">{i.img}</span>
          <div className="flex-1">
            <p className="text-xs font-medium text-neutral-800">{i.name}</p>
            <p className="text-xs text-neutral-400">кол-во: {i.qty}</p>
          </div>
          <span className="text-xs font-bold text-blue-600">{i.price}</span>
        </div>
      ))}
      <div className="flex justify-between font-bold text-sm">
        <span>Итого:</span>
        <span className="text-blue-600">1 010₽</span>
      </div>
      <div className="bg-blue-500 text-white text-xs py-2 rounded text-center font-medium">Оформить заказ</div>
    </div>
  ),
  checkout: (
    <div className="space-y-3">
      <p className="text-xs font-bold text-neutral-500 uppercase">Данные доставки</p>
      {["Имя получателя", "Телефон", "Город", "Адрес"].map((f) => (
        <div key={f} className="bg-neutral-100 rounded px-3 py-2 text-xs text-neutral-400">{f}</div>
      ))}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
        <p className="text-xs font-semibold text-neutral-700 mb-2">Способ доставки</p>
        {["Курьер (150₽)", "Самовывоз (0₽)"].map((d) => (
          <div key={d} className="flex items-center gap-2 text-xs text-neutral-600 py-1">
            <div className="w-3 h-3 rounded-full border-2 border-blue-400" />
            {d}
          </div>
        ))}
      </div>
      <div className="bg-blue-500 text-white text-xs py-2 rounded text-center font-medium">Перейти к оплате</div>
    </div>
  ),
  payment: (
    <div className="space-y-3">
      <p className="text-xs font-bold text-neutral-500 uppercase">Оплата</p>
      <div className="border border-neutral-200 rounded-lg p-3 space-y-2">
        <div className="bg-neutral-100 rounded px-3 py-2 text-xs text-neutral-400">1234 5678 9012 3456</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-neutral-100 rounded px-3 py-2 text-xs text-neutral-400">MM/YY</div>
          <div className="bg-neutral-100 rounded px-3 py-2 text-xs text-neutral-400">CVV</div>
        </div>
      </div>
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 flex justify-between text-xs">
        <span className="text-neutral-500">К оплате:</span>
        <span className="font-black text-blue-600">1 160₽</span>
      </div>
      <div className="bg-green-500 text-white text-xs py-2 rounded text-center font-medium">Оплатить 1 160₽</div>
    </div>
  ),
  success: (
    <div className="flex flex-col items-center justify-center gap-3 py-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">✓</div>
      <p className="font-black text-neutral-800 text-base">Заказ оформлен!</p>
      <p className="text-xs text-neutral-400 text-center">Заказ №ORD-2024-0042 принят. Уведомление отправлено на email.</p>
      <div className="bg-blue-500 text-white text-xs py-2 px-6 rounded text-center font-medium">Мои заказы</div>
    </div>
  ),
  orders: (
    <div className="space-y-2">
      <p className="text-xs font-bold text-neutral-500 uppercase">Мои заказы</p>
      {[
        { id: "ORD-0042", date: "24 фев", status: "В пути", color: "blue" },
        { id: "ORD-0038", date: "18 фев", status: "Доставлен", color: "green" },
        { id: "ORD-0031", date: "10 фев", status: "Отменён", color: "red" },
      ].map((o) => (
        <div key={o.id} className="flex items-center justify-between border border-neutral-200 rounded-lg px-3 py-2.5 bg-white">
          <div>
            <p className="text-xs font-bold text-neutral-800">{o.id}</p>
            <p className="text-xs text-neutral-400">{o.date}</p>
          </div>
          <span className={`text-xs bg-${o.color}-100 text-${o.color}-700 px-2 py-1 rounded font-medium`}>{o.status}</span>
        </div>
      ))}
    </div>
  ),
  tracking: (
    <div className="space-y-3">
      <p className="text-xs font-bold text-neutral-500 uppercase">Трекинг ORD-0042</p>
      {[
        { label: "Заказ принят", done: true, time: "24 фев 10:00" },
        { label: "Оплачен", done: true, time: "24 фев 10:05" },
        { label: "Передан курьеру", done: true, time: "24 фев 14:00" },
        { label: "В пути", done: true, time: "24 фев 15:30" },
        { label: "Доставлен", done: false, time: "Ожидается" },
      ].map((s, i) => (
        <div key={s.label} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${s.done ? "bg-green-500 text-white" : "bg-neutral-200 text-neutral-400"}`}>
              {s.done ? "✓" : i + 1}
            </div>
            {i < 4 && <div className={`w-0.5 h-5 ${s.done ? "bg-green-300" : "bg-neutral-200"}`} />}
          </div>
          <div className="pb-2">
            <p className={`text-xs font-semibold ${s.done ? "text-neutral-800" : "text-neutral-400"}`}>{s.label}</p>
            <p className="text-xs text-neutral-400">{s.time}</p>
          </div>
        </div>
      ))}
    </div>
  ),
};

const PrototypeSection = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const info = SCREENS[screen];

  const FLOW_SCREENS: Screen[] = ["home", "catalog", "product", "cart", "checkout", "payment", "success"];

  return (
    <div className="space-y-6">
      <SectionTitle icon="Monitor" title="Интерактивный прототип UI" subtitle="Нажмите на кнопки, чтобы перейти между экранами" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Телефон */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative">
            <div className="w-[220px] bg-neutral-900 rounded-[32px] p-3 shadow-2xl">
              <div className="bg-white rounded-[24px] overflow-hidden">
                {/* Status bar */}
                <div className="bg-neutral-900 text-white text-[9px] flex justify-between px-4 py-1.5">
                  <span>9:41</span>
                  <span>●●● 5G 🔋</span>
                </div>
                {/* Header */}
                <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
                  {info.prev && (
                    <button onClick={() => setScreen(info.prev!)} className="text-white text-lg leading-none">‹</button>
                  )}
                  {!info.prev && <span />}
                  <span className="text-xs font-semibold">{info.title}</span>
                  <span className="text-xs opacity-0">‹</span>
                </div>
                {/* Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={screen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 min-h-[340px]"
                  >
                    {ScreenContent[screen]}
                  </motion.div>
                </AnimatePresence>
                {/* Nav buttons */}
                {info.next && (
                  <div className="px-3 pb-3 flex gap-2">
                    {info.next.map((n) => (
                      <button
                        key={n}
                        onClick={() => setScreen(n)}
                        className="flex-1 bg-blue-500 text-white text-xs py-2 rounded-xl font-semibold"
                      >
                        {SCREENS[n].title} →
                      </button>
                    ))}
                  </div>
                )}
                {/* Home bar */}
                <div className="flex justify-center pb-2">
                  <div className="w-16 h-1 bg-neutral-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Карта экранов */}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase text-neutral-400 mb-4 tracking-wide">Карта переходов</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(Object.keys(SCREENS) as Screen[]).map((s) => (
              <button
                key={s}
                onClick={() => setScreen(s)}
                className={`text-left p-3 rounded-xl border-2 transition-all text-xs font-medium ${
                  screen === s
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                <div className="font-bold text-sm mb-0.5">{SCREENS[s].title}</div>
                {SCREENS[s].next && (
                  <div className="text-neutral-400 text-[10px]">→ {SCREENS[s].next!.map((n) => SCREENS[n].title).join(", ")}</div>
                )}
              </button>
            ))}
          </div>

          {/* Поток */}
          <p className="text-xs font-semibold uppercase text-neutral-400 mt-6 mb-3 tracking-wide">Основной поток заказа</p>
          <div className="flex flex-wrap items-center gap-1">
            {FLOW_SCREENS.map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <button
                  onClick={() => setScreen(s)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    screen === s ? "bg-blue-500 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {SCREENS[s].title}
                </button>
                {i < FLOW_SCREENS.length - 1 && <span className="text-neutral-300 text-xs">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const SectionTitle = ({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center shrink-0">
      <Icon name={icon} fallback="CircleAlert" size={18} className="text-white" />
    </div>
    <div>
      <h2 className="text-xl font-black text-neutral-900">{title}</h2>
      <p className="text-sm text-neutral-400">{subtitle}</p>
    </div>
  </div>
);

const MiniTable = ({ rows, highlight }: { rows: string[][]; highlight?: boolean }) => (
  <div className="border border-neutral-200 rounded-lg overflow-hidden text-xs">
    {rows.map((row, i) => (
      <div key={i} className={`flex divide-x divide-neutral-200 ${i === 0 ? "bg-neutral-100 font-bold" : highlight ? "bg-green-50" : "bg-red-50"}`}>
        {row.map((cell, j) => (
          <div key={j} className="flex-1 px-2 py-1.5 text-neutral-700">{cell}</div>
        ))}
      </div>
    ))}
  </div>
);

const LegendItem = ({ color, shape, label }: { color: string; shape: string; label: string }) => (
  <div className="flex items-center gap-2 text-xs text-neutral-500">
    <div className={`w-4 h-4 ${color} ${shape === "circle" ? "rounded-full" : shape === "diamond" ? "rotate-45" : "rounded-sm"}`} />
    {label}
  </div>
);

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Docs() {
  const [active, setActive] = useState<Tab>("story");

  const SECTION_MAP: Record<Tab, React.ReactNode> = {
    story:     <UserStorySection />,
    usecase:   <UseCaseSection />,
    sequence:  <SequenceSection />,
    activity:  <ActivitySection />,
    dataflow:  <DataFlowSection />,
    er:        <ErSection />,
    nf:        <NfSection />,
    userflow:  <UserFlowSection />,
    prototype: <PrototypeSection />,
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <a href="/" className="text-neutral-400 hover:text-white transition-colors text-sm">← На сайт</a>
          <span className="text-neutral-600">|</span>
          <span className="font-bold tracking-wide">OrderFlow — Документация</span>
        </div>
        <span className="text-xs text-neutral-500 hidden sm:block">Архитектура системы заказов</span>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-neutral-200 sticky top-[57px] z-10 overflow-x-auto">
        <div className="flex px-4 min-w-max">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2 px-4 py-3.5 text-xs font-semibold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${
                active === tab.id
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <Icon name={tab.icon} fallback="CircleAlert" size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {SECTION_MAP[active]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
