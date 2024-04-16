import type { Product } from "apps/commerce/types.ts";
import { HorizontalProductCard } from "deco-sites/camprebeca/components/product/HorizontalProductCard.tsx";

interface Props {
  products?: Product[] | null;
}

export default function SectionHorizontalCard({
  products,
}: Props) {
  if (!products) return null;

  return (
    <div
      class={`container bg-primary text-center md:flex md:flex-row rounded p-5 mb-3 xl:max-w-5xl`}
      data-deco="view-product"
    >
      {products.map((product) => <HorizontalProductCard product={product} />)}
    </div>
  );
}
