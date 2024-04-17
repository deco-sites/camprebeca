import { sumVotes } from "deco-sites/camprebeca/islands/ProductVote.tsx";
import Icon from "deco-sites/camprebeca/components/ui/Icon.tsx";

export default function VotesCounter() {
  return (
    <div class="pr-6 flex">
      <Icon id="Friends" width={24} height={24} />
      <span>{sumVotes.value}</span>
    </div>
  );
}
