import { useShallow } from "zustand/react/shallow";
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { commonmark } from "@milkdown/preset-commonmark";
import { gfm } from "@milkdown/preset-gfm";
import { history } from "@milkdown/plugin-history";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { useStore } from "../../stores";
import { usePortfolio } from "../../context/PortfolioContext";

const MilkdownEditor = ({ initialContent }: { initialContent: string }) => {
  const { setTyporaMd } = useStore(useShallow((state) => ({
    setTyporaMd: state.setTyporaMd
  })));

  useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, initialContent);
        ctx
          .get(listenerCtx)
          .mounted((ctx) => {
            const wrapper = ctx.get(rootCtx) as HTMLDivElement;
            const editor = wrapper.querySelector(
              ".editor[role='textbox']"
            ) as HTMLDivElement;
            wrapper.onclick = () => editor?.focus();
          })
          .markdownUpdated((_, markdown) => setTyporaMd(markdown));

        root.className =
          "typora bg-white dark:bg-gray-800 text-c-700 h-full overflow-y-scroll";
      })
      .use(listener)
      .use(commonmark)
      .use(gfm)
      .use(history)
  );

  return <Milkdown />;
};

export default function Typora() {
  const { typoraDocument } = usePortfolio();
  const initialContent = typoraDocument?.content ?? "";

  return (
    <MilkdownProvider>
      <MilkdownEditor initialContent={initialContent} />
    </MilkdownProvider>
  );
}
