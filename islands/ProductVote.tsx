import { signal, useSignal, useSignalEffect } from "@preact/signals";
import { invoke } from "deco-sites/camprebeca/runtime.ts";
import {
  CheckVote,
  GrayVote,
} from "deco-sites/camprebeca/static/image/icons-vote.tsx";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ToastStyle from "deco-sites/camprebeca/components/ToastStyle.tsx";
import { sendEvent } from "deco-sites/camprebeca/sdk/analytics.tsx";

export const sumVotes = signal<number>(0);

export interface Props {
  productId: string;
}

export default function ProductVote({ productId }: Props) {
  const hasVoted = useSignal(false);
  const productVotes = useSignal(0);

  // deno-lint-ignore no-explicit-any
  const Toast = ToastContainer as any;

  useSignalEffect(() => {
    const getVotes = async () => {
      const votesTotalProduct = await invoke["deco-sites/camprebeca"].loaders
        .votesProduct({ productId });
      productVotes.value = votesTotalProduct.product;
      const votesTotal = await invoke["deco-sites/camprebeca"].loaders
        .votesTotal();
      sumVotes.value = votesTotal.total;
    };
    getVotes();

    setInterval(getVotes, 30000);
  });

  const addVote = async () => {
    if (hasVoted.value !== true) {
      hasVoted.value = true;
      const vote = await invoke["deco-sites/camprebeca"].actions.sendVote({
        productId,
      });
      sumVotes.value = vote.total;
      productVotes.value = vote.product;

      toast.success("Obrigado por votar", {
        position: "top-right",
        autoClose: 3000,
        draggable: false,
        theme: "colored",
        icon: false,
        transition: Bounce,
      });

      sendEvent({
        name: "post_score",
        params: {
          score: vote.product,
          character: productId,
        },
      });
    }
  };

  return (
    <div>
      <button class="btn" onClick={addVote}>
        {!hasVoted.value ? <GrayVote /> : <CheckVote />}
      </button>
      <p class={"text-cold"}>Total de votos: {productVotes.value}</p>
      <ToastStyle />
      <Toast />
    </div>
  );
}
