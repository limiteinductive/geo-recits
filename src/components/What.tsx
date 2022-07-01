import { Component, For } from "solid-js";

interface CardProps {
  title: string;
  icon: string;
  description: string;
  color: string;
}

const What: Component = () => {
  const cards: CardProps[] = [
    {
      title: "Collect data",
      icon: "i-ri-data-collect-fill",
      description:
        "Collect data from your surroundings and share it with the world.",
      color: "F22323",
    },
    {
      title: "Collect data",
      icon: "i-ri-data-collect-fill",
      description:
        "Collect data from your surroundings and share it with the world.",
      color: "F22323",
    },
    {
      title: "Collect data",
      icon: "i-ri-data-collect-fill",
      description:
        "Collect data from your surroundings and share it with the world.",
      color: "F22323",
    },
    {
      title: "Collect data",
      icon: "i-ri-data-collect-fill",
      description:
        "Collect data from your surroundings and share it with the world.",
      color: "F22323",
    },
  ];

  return (
    <div class="w-100% h-860 bg-B353DEC0 mb-200px">
      <div class="w-1280px h-100% mx-auto translate-y-86px">
        <Title />

        <div class="display-flex gap-26px">
          <For each={cards}>
            {(card: CardProps, index) => {
              return <Card card={card} />;
            }}
          </For>
        </div>
      </div>
    </div>
  );
};

const Title: Component = () => {
  return (
    <div class="border-radius-10px border-fff mb-86px text-center border-3.5px h-90px w-600px mx-auto">
      <h1 class="text-3.2rem fw-600 color-fff">Qu'est-ce Géorécit ?</h1>
    </div>
  );
};

const Card: Component<{ card: CardProps }> = (props) => {
  return (
    <div class="h-360px w-300px bg-ffffffA0 border-radius-10px">
      <div>
        <span class={props.card.icon}></span>
        <h1>{props.card.title}</h1>
      </div>
    </div>
  );
};

export default What;
