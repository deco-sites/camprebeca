import { signal, useSignal, useSignalEffect } from "@preact/signals";

import {
  CheckVote,
  GrayVote,
} from "deco-sites/camprebeca/static/image/votesIcon.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { invoke } from "deco-sites/camprebeca/runtime.ts";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { sendEvent } from "deco-sites/camprebeca/sdk/analytics.tsx";

export const sumVotes = signal<number>(0);

export interface Props {
  productID: string;
}

export default function ProductVote({ productID }: Props) {
  const votesInfo = {
    hasVoted: useSignal(false),
    productVotes: useSignal(0),
  };

  let votes = {
    total: 0,
    product: 0,
  };

  // deno-lint-ignore no-explicit-any
  const VoteNotification = ToastContainer as any;

  const getProductVotes = async (productId: string) => {
    const votes = await invoke[
      "deco-sites/camprebeca"
    ].loaders.votesProduct({ productID });
    votesInfo.productVotes.value = votes.productTotal;
  };

  useSignalEffect(() => {
    const asyncFunction = () => {
      setInterval(async () => {
        await getProductVotes(productID);
      }, 30000);
    };
    if (IS_BROWSER) {
      asyncFunction();
    }
  });

  const addVote = async () => {
    if (votesInfo.hasVoted.value !== true) {
      if (IS_BROWSER) {
        votesInfo.hasVoted.value = true;
        votes = await invoke["deco-sites/camprebeca"].actions.sendVote(
          productID,
        );
      }

      sumVotes.value = votes.total;
      votesInfo.productVotes.value = votes.product;

      toast.success("Obrigado por votar", {
        position: "top-right",
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
        transition: Bounce,
      });

    //   sendEvent({
    //     name: "post_score",
    //     params: {
    //       score: votes.product,
    //       character: productID,
    //     },
    //   });
    }
  };

  return (
    <div>
      <button class="btn" onClick={addVote}>
        {!votesInfo.hasVoted.value ? <GrayVote /> : <CheckVote />}
      </button>
      <p>Total de votos: {votesInfo.productVotes.value}</p>
      <VoteNotification />
    </div>
  );
}
