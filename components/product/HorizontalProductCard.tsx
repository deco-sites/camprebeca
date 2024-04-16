import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ProductVote from "deco-sites/camprebeca/islands/ProductVote.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { asset } from "$fresh/runtime.ts";

interface Props {
  product: Product;
}

const WIDTH = 200;
const HEIGHT = 279;

export const HorizontalProductCard = (
  { product }: Props,
) => {
  return (
    <div class="flex gap-2 sm:gap-4 md:gap-8 relative w-full">
      <Image
        src={product?.image?.at(0)?.url || asset("/image/loading-img.webp")}
        width={WIDTH}
        height={HEIGHT}
        class={`bg-base-100 rounded mx-auto md:w-1/4 hover:scale-110`}
        loading="lazy"
      />
      <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-2">
        <div class="flex flex-col gap-0">
          <h2 class="truncate text-base lg:text-lg text-base-content uppercase font-normal">
            {product.name}
          </h2>
          <p class="truncate text-sm lg:text-sm text-neutral">
            {product.description}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <div
            class={`flex flex-col gap-0 justify-center}`}
          >
            {
              /* <div
              class={`line-through text-base-300 text-xs font-light`}
            >
              {formatPrice(price)}
            </div>
            <div class="text-base-content lg:text-sm font-light">
              {formatPrice(price)}
            </div> */
            }
          </div>
        </div>
      </div>
      <div class="flex flex-col self-center bg-secondary rounded-btn p-2">
        <ProductVote productID={product.productID} />
        <AddToCartButtonVTEX
          eventParams={{
            items: [{
              item_url: product.url,
              quantity: 1,
              item_name: product.name!,
            }],
          }}
          productID={product.productID}
          seller={"1"}
        />
      </div>
    </div>
  );
};
