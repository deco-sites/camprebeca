import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  utm: string;
}

/**
 * @title UTM Campaign
 * @description Add your UTM campaign
 */
const MatchUTM = ({ utm }: Props, ctx: MatchContext) => {
  const url = new URL(ctx.request.url);
  const utmParam = url.searchParams.get("utmcampaign");

  return utmParam === utm ? true : false;
};

export default MatchUTM;
