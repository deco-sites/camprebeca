export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";

import { Product } from "apps/commerce/types.ts";
import { MultivariateFlag } from "deco/blocks/flag.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";

/**
 * @title Flag Product Card
 */
export default function ProductCardFlag(
  props: MultivariateProps<Product[] | null>,
): MultivariateFlag<Product[] | null> {
  return multivariate(props);
}
