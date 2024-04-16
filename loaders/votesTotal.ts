import { FnContext } from "deco/types.ts";

export interface VotesTotal {
  total: number;
}

export default async function votesTotal(
  _props: unknown,
  _req: Request,
  _ctx: FnContext,
): Promise<VotesTotal> {
  const res = await fetch("https://camp-api.deco.cx/events", {
    headers: {
      "x-api-key": "camprebeca",
    },
  });

  const votesTotal = (await res.json()) as VotesTotal;

  return votesTotal;
}
