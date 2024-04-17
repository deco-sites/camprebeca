export interface Props {
  id: string;
  description: string;
}

export default function Coupon(props: Props) {
  return (
    <div
      class={`bg-primary text-primary-content p-4 lg:px-8 lg:py-4`}
    >
      <div class="flex container items-center gap-4">
        <input
          value={props.id}
          class={"text-base lg:text-xl leading-7 w-16 p-2"}
          disabled
        />
        <p
          class={`text-sm leading-5 text-black`}
        >
          {props.description}
        </p>
      </div>
    </div>
  );
}
