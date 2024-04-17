import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ProductVote from "deco-sites/camprebeca/islands/ProductVote.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { asset } from "$fresh/runtime.ts";
import { useOffer } from "deco-sites/camprebeca/sdk/useOffer.ts";

interface Props {
  product: Product;
  imageAnimate: boolean;
}

const WIDTH = 200;
const HEIGHT = 279;

export const HorizontalProductCard = (
  { product, imageAnimate }: Props,
) => {
  const { price = 0 } = useOffer(product.offers);
  return (
    <div class="flex flex-col w-full md:flex-row mt-3 md:items-center">
      <Image
        src={product?.image?.at(0)?.url || asset("/image/loading-img.webp")}
        width={WIDTH}
        height={HEIGHT}
        class={`rounded mx-auto md:w-1/4 ${
          imageAnimate ? "hover:scale-110" : ""
        }`}
      />
      <div class="flex-auto flex flex-col gap-3">
        <h2 class="truncate text-base lg:text-lg uppercase font-bold">
          {product.name}
        </h2>
        <p class="truncate">
          {product.description}
        </p>
        <div
          class={`flex flex-col gap-0 justify-center}`}
        >
          {formatPrice(price)}
        </div>
      </div>
      <div class="flex flex-col self-center bg-secondary rounded-btn p-2">
        <ProductVote productId={product.productID} />
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
