import Icon from "@/components/ui/icon";

const features = [
  {
    icon: "GitBranch",
    title: "UML-диаграммы",
    desc: "Use-case, Sequence и Activity диаграммы — полное видение взаимодействия компонентов системы заказов.",
  },
  {
    icon: "Database",
    title: "ER-модель и нормализация",
    desc: "Семантическое моделирование данных с применением 1НФ, 2НФ и 3НФ. Чистая структура без избыточности.",
  },
  {
    icon: "Workflow",
    title: "Data Flow диаграммы",
    desc: "Графическое представление потоков данных — от входящего заказа до хранилища и выходящих уведомлений.",
  },
  {
    icon: "Route",
    title: "User Flow",
    desc: "Визуальный путь пользователя: от выбора товара → оформления → оплаты → получения подтверждения.",
  },
];

export default function Featured() {
  return (
    <div id="architecture" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-xs tracking-widest text-neutral-400 mb-4">Архитектура системы</p>
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight max-w-2xl">
          Продуманная структура от модели до интерфейса
        </h2>
        <p className="text-neutral-500 mb-16 max-w-xl text-lg">
          Каждый элемент системы спроектирован с учётом реального взаимодействия пользователя и данных.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
          {features.map((f) => (
            <div key={f.title} className="bg-white p-10 flex flex-col gap-4 hover:bg-neutral-50 transition-colors duration-300">
              <div className="w-12 h-12 bg-black flex items-center justify-center">
                <Icon name={f.icon} fallback="CircleAlert" size={22} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">{f.title}</h3>
              <p className="text-neutral-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-4">
          <a
            href="#diagrams"
            className="bg-black text-white px-6 py-3 uppercase tracking-wide text-sm hover:bg-neutral-800 transition-colors duration-300"
          >
            Смотреть диаграммы
          </a>
          <a
            href="#order"
            className="border border-black text-black px-6 py-3 uppercase tracking-wide text-sm hover:bg-black hover:text-white transition-colors duration-300"
          >
            Оформить заказ
          </a>
        </div>
      </div>
    </div>
  );
}