import { effect } from "@preact/signals";
import { sumVotes } from "deco-sites/camprebeca/islands/ProductVote.tsx";
import { invoke } from "deco-sites/camprebeca/runtime.ts";

const getVotesTotal = async () => {
  const votes = await invoke["deco-sites/camprebeca"].loaders.votesTotal();
  sumVotes.value = votes.total;
};

effect(() => {
  const asyncFunction = async () => {
    await getVotesTotal();
    setInterval(async () => {
      await getVotesTotal();
    }, 3000);
  };
  asyncFunction();
  sumVotes.value = sumVotes.peek();
});

export default function VotesCounter() {
  return (
    <div class="pr-6 flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-friends"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
        <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
      </svg>
      <span>{sumVotes.value}</span>
    </div>
  );
}
