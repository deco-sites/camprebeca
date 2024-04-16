import { FnContext } from "deco/types.ts";

interface VotesProduct {
  productTotal: number;
}

export default async function loader(
  props: { productID: string },
  _req: Request,
  _ctx: FnContext,
): Promise<VotesProduct> {
  const res = await fetch(
    `https://camp-api.deco.cx/event/${props.productID}`,
    {
      headers: {
        "x-api-key": "camp-rebeca",
      },
    },
  );

  const votesTotalProduct = (await res.json()) as VotesProduct;

  return votesTotalProduct;
}
