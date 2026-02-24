import Icon from "@/components/ui/icon";

const diagrams = [
  {
    id: "uml",
    label: "UML — Use Case",
    icon: "Users",
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-700",
    nodes: [
      { role: "Клиент", actions: ["Просмотр каталога", "Оформление заказа", "Оплата", "Отслеживание"] },
      { role: "Менеджер", actions: ["Подтверждение заказа", "Назначение доставки", "Обновление статуса"] },
      { role: "Система", actions: ["Уведомления", "Обработка платежа", "Генерация накладной"] },
    ],
  },
  {
    id: "sequence",
    label: "UML — Sequence",
    icon: "ArrowRightLeft",
    color: "bg-purple-50 border-purple-200",
    accent: "text-purple-700",
    steps: [
      { from: "Клиент", to: "Сайт", msg: "Добавить товар в корзину" },
      { from: "Сайт", to: "Сервер", msg: "POST /orders" },
      { from: "Сервер", to: "БД", msg: "INSERT order" },
      { from: "Сервер", to: "Платёжная система", msg: "Запрос оплаты" },
      { from: "Платёжная система", to: "Сервер", msg: "Подтверждение" },
      { from: "Сервер", to: "Клиент", msg: "Заказ оформлен ✓" },
    ],
  },
  {
    id: "er",
    label: "ER-модель (3НФ)",
    icon: "Database",
    color: "bg-green-50 border-green-200",
    accent: "text-green-700",
    entities: [
      { name: "Users", fields: ["id PK", "name", "email", "phone"] },
      { name: "Orders", fields: ["id PK", "user_id FK", "status", "created_at"] },
      { name: "Products", fields: ["id PK", "name", "price", "stock"] },
      { name: "Order_Items", fields: ["id PK", "order_id FK", "product_id FK", "qty"] },
    ],
    relations: ["Users → Orders (1:N)", "Orders → Order_Items (1:N)", "Products → Order_Items (1:N)"],
  },
  {
    id: "userflow",
    label: "User Flow",
    icon: "Route",
    color: "bg-amber-50 border-amber-200",
    accent: "text-amber-700",
    steps: [
      "Главная страница",
      "Каталог товаров",
      "Карточка товара",
      "Корзина",
      "Оформление заказа",
      "Оплата",
      "Подтверждение",
    ],
  },
];

export default function Diagrams() {
  return (
    <div id="diagrams" className="bg-neutral-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-xs tracking-widest text-neutral-400 mb-4">Проектирование системы</p>
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-16 leading-tight">
          Диаграммы и модели
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* UML Use Case */}
          <div className={`border rounded-xl p-8 ${diagrams[0].color}`}>
            <div className="flex items-center gap-3 mb-6">
              <Icon name={diagrams[0].icon} fallback="CircleAlert" size={20} className={diagrams[0].accent} />
              <span className={`font-semibold uppercase text-sm tracking-wide ${diagrams[0].accent}`}>{diagrams[0].label}</span>
            </div>
            <div className="space-y-4">
              {diagrams[0].nodes.map((node) => (
                <div key={node.role} className="bg-white rounded-lg p-4 border border-blue-100">
                  <p className="font-bold text-sm text-neutral-700 mb-2">👤 {node.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {node.actions.map((a) => (
                      <span key={a} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{a}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sequence */}
          <div className={`border rounded-xl p-8 ${diagrams[1].color}`}>
            <div className="flex items-center gap-3 mb-6">
              <Icon name={diagrams[1].icon} fallback="CircleAlert" size={20} className={diagrams[1].accent} />
              <span className={`font-semibold uppercase text-sm tracking-wide ${diagrams[1].accent}`}>{diagrams[1].label}</span>
            </div>
            <div className="space-y-3">
              {diagrams[1].steps.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs text-neutral-400 w-5 shrink-0 mt-1">{i + 1}.</span>
                  <div className="flex-1 bg-white rounded px-3 py-2 border border-purple-100 text-sm">
                    <span className="text-purple-700 font-medium">{s.from}</span>
                    <span className="text-neutral-400 mx-2">→</span>
                    <span className="text-purple-700 font-medium">{s.to}</span>
                    <span className="text-neutral-500 ml-2">: {s.msg}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ER */}
          <div className={`border rounded-xl p-8 ${diagrams[2].color}`}>
            <div className="flex items-center gap-3 mb-6">
              <Icon name={diagrams[2].icon} fallback="CircleAlert" size={20} className={diagrams[2].accent} />
              <span className={`font-semibold uppercase text-sm tracking-wide ${diagrams[2].accent}`}>{diagrams[2].label}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {diagrams[2].entities.map((e) => (
                <div key={e.name} className="bg-white rounded-lg p-3 border border-green-100">
                  <p className="font-bold text-xs text-green-800 mb-2 uppercase">{e.name}</p>
                  {e.fields.map((f) => (
                    <p key={f} className="text-xs text-neutral-500 py-0.5 border-b border-neutral-100 last:border-0">{f}</p>
                  ))}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg p-3 border border-green-100">
              <p className="text-xs text-neutral-400 uppercase mb-2 font-semibold">Связи</p>
              {diagrams[2].relations.map((r) => (
                <p key={r} className="text-xs text-green-800 py-0.5">{r}</p>
              ))}
            </div>
          </div>

          {/* User Flow */}
          <div className={`border rounded-xl p-8 ${diagrams[3].color}`}>
            <div className="flex items-center gap-3 mb-6">
              <Icon name={diagrams[3].icon} fallback="CircleAlert" size={20} className={diagrams[3].accent} />
              <span className={`font-semibold uppercase text-sm tracking-wide ${diagrams[3].accent}`}>{diagrams[3].label}</span>
            </div>
            <div className="flex flex-col gap-3">
              {diagrams[3].steps.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    {i < diagrams[3].steps.length - 1 && <div className="w-0.5 h-3 bg-amber-300" />}
                  </div>
                  <div className="flex-1 bg-white rounded-lg px-4 py-2 border border-amber-100">
                    <p className="text-sm text-neutral-700 font-medium">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Нормальные формы */}
        <div id="nf" className="mt-8 border border-neutral-200 rounded-xl p-8 bg-white">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="ListChecks" fallback="CircleAlert" size={20} className="text-neutral-700" />
            <span className="font-semibold uppercase text-sm tracking-wide text-neutral-700">Нормальные формы (1НФ → 2НФ → 3НФ)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                nf: "1НФ",
                title: "Первая нормальная форма",
                rule: "Все атрибуты атомарны, нет повторяющихся групп",
                example: "Поле «телефоны» → отдельная таблица user_phones",
              },
              {
                nf: "2НФ",
                title: "Вторая нормальная форма",
                rule: "Каждый не ключевой атрибут зависит от всего составного ключа",
                example: "Order_Items: цена товара вынесена в Products, не дублируется",
              },
              {
                nf: "3НФ",
                title: "Третья нормальная форма",
                rule: "Нет транзитивных зависимостей от не ключевых атрибутов",
                example: "Город клиента → отдельная таблица, не зависит от order_id",
              },
            ].map((n) => (
              <div key={n.nf} className="bg-neutral-50 rounded-lg p-5 border border-neutral-100">
                <div className="w-10 h-10 bg-neutral-900 text-white rounded flex items-center justify-center text-sm font-bold mb-3">{n.nf}</div>
                <p className="font-semibold text-neutral-900 text-sm mb-1">{n.title}</p>
                <p className="text-neutral-500 text-xs mb-2 leading-relaxed">{n.rule}</p>
                <p className="text-neutral-400 text-xs italic">{n.example}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
