interface Vote {
  total: number;
  product: number;
}

export default async function action(
  productId: string,
  _req: Request,
  _ctx: unknown,
): Promise<Vote> {
  const res = await fetch("https://camp-api.deco.cx/event", {
    headers: {
      "x-api-key": "camprebeca",
    },
    body: JSON.stringify({
      productId: productId,
    }),
    method: "POST",
  });

  const votesTotal = (await res.json()) as Vote;

  return votesTotal;
}
