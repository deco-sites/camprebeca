import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

interface Props {
  /**
   * @minItems 3
   */
  images: ImageWidget[];
  /**
   * @ignore
   */
  index: number;
}

const WIDTH = 200;
const HEIGHT = 279;

export default function PartialImageGallery({
  images,
  index = 3,
}: Props) {
  return (
    <div
      class={`flex flex-wrap gap-2 mx-auto xl:max-w-5xl my-6 place-content-center`}
    >
      {images.slice(0, index)?.map((img) => {
        return (
          <Image
            src={img}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 rounded md:w-1/4 hover:scale-110`}
            sizes="(max-width: 640px) 50vw, 20vw"
            decoding="async"
            loading="lazy"
          />
        );
      })}
      {images.length > index && (
        <button
          {...usePartialSection({
            mode: "replace",
            props: { images, index: index + 1 },
          })}
          class="bg-secondary p-4 rounded"
        >
          +
        </button>
      )}
    </div>
  );
}
