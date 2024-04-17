import { Temperature } from "apps/weather/loaders/temperature.ts";
import { Banner } from "deco-sites/camprebeca/sections/Images/ImageGallery.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";

// To do: Style section
export interface Props {
  temperature: Temperature;
  /**
   * @format textarea
   */
  text: string;
  /**
   * @maxItems 2
   */
  images: Banner[];
}

export default function TemperatureCulture({
  temperature,
  images = [],
}: Props) {
  return (
    <div class="container">
      <div class="fixed bottom-4 left-4">
        <button class="bg-secondary font-bold p-12 rounded-full">
          {temperature.celsius}°C
        </button>
      </div>
      <div class={"grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-2"}>
        {images.map(({ srcMobile, srcDesktop, alt }) => (
          <Picture>
            <Source
              media="(max-width: 767px)"
              src={srcMobile}
              width={100}
              height={100}
            />
            <Source
              media="(min-width: 768px)"
              src={srcDesktop ? srcDesktop : srcMobile}
              width={500}
              height={380}
            />
            <img
              class="w-full"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={srcMobile}
              alt={alt}
              decoding="async"
              loading="lazy"
            />
          </Picture>
        ))}
      </div>
    </div>
  );
}
