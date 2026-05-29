import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeExternalLinks from "rehype-external-links";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { BearMdData } from "../../types";
import { useStore } from "../../stores";
import { usePortfolio } from "../../context/PortfolioContext";

interface ContentProps {
  contentID: string;
  contentURL: string;
  content?: string | null;
}

interface MiddlebarProps {
  items: BearMdData[];
  cur: number;
  setContent: (id: string, url: string, index: number, content?: string | null) => void;
}

interface SidebarProps {
  sections: { id: string; title: string; icon: string }[];
  cur: number;
  setMidBar: (index: number) => void;
}

interface BearState {
  curSidebar: number;
  curMidbar: number;
  midbarList: BearMdData[];
  contentID: string;
  contentURL: string;
  content?: string | null;
}

const Highlighter = (dark: boolean): any => {
  interface codeProps {
    node: any;
    inline: boolean;
    className: string;
    children: any;
  }

  return {
    code({ node, inline, className, children, ...props }: codeProps) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={dark ? dracula : prism}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      );
    }
  };
};

const Sidebar = ({ sections, cur, setMidBar }: SidebarProps) => {
  return (
    <div text-white>
      <div className="h-12 pr-3 hstack space-x-3 justify-end">
        <span className="i-ic:baseline-cloud-off text-xl" />
        <span className="i-akar-icons:settings-vertical text-xl" />
      </div>
      <ul>
        {sections.map((item, index) => (
          <li
            key={`bear-sidebar-${item.id}`}
            className={`pl-6 h-8 hstack cursor-default ${cur === index ? "bg-red-500" : "bg-transparent"
              } ${cur === index ? "" : "hover:bg-gray-600"}`}
            onClick={() => setMidBar(index)}
          >
            <span className={item.icon} />
            <span className="ml-2">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Middlebar = ({ items, cur, setContent }: MiddlebarProps) => {
  return (
    <ul>
      {items.map((item: BearMdData, index: number) => (
        <li
          key={`bear-midbar-${item.id}`}
          className={`flex flex-col cursor-default border-l-2 ${cur === index
              ? "border-red-500 bg-white dark:bg-gray-900"
              : "border-transparent bg-transparent"
            } hover:(bg-white dark:bg-gray-900)`}
          onClick={() => setContent(item.id, item.file, index, item.content)}
        >
          <div className="h-8 mt-3 hstack">
            <div className="-mt-1 w-10 vstack text-c-500">
              <span className={item.icon} />
            </div>
            <span className="relative flex-1 font-bold text-gray-900 dark:text-gray-100">
              {item.title}
              {item.link && (
                <a
                  pos="absolute top-1 right-4"
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="i-ant-design:link-outlined text-c-500" />
                </a>
              )}
            </span>
          </div>
          <div className="ml-10 text-c-500" p="b-2 r-1" text="sm" border="b c-300">
            {item.excerpt}
          </div>
        </li>
      ))}
    </ul>
  );
};

const getRepoURL = (url: string) => {
  return url.slice(0, -10) + "/";
};

const fixImageURL = (text: string, contentURL: string): string => {
  text = text.replace(/&nbsp;/g, "");
  if (contentURL.indexOf("raw.githubusercontent.com") !== -1) {
    const repoURL = getRepoURL(contentURL);
    const imgReg = /!\[(.*?)\]\((.*?)\)/;
    const imgRegGlobal = /!\[(.*?)\]\((.*?)\)/g;
    const imgList = text.match(imgRegGlobal);
    if (imgList) {
      for (const img of imgList) {
        const imgURL = (img.match(imgReg) as Array<string>)[2];
        if (imgURL.indexOf("http") !== -1) continue;
        const newImgURL = repoURL + imgURL;
        text = text.replace(imgURL, newImgURL);
      }
    }
  }
  return text;
};

const Content = ({ contentID, contentURL, content }: ContentProps) => {
  const [storeMd, setStoreMd] = useState<{ [key: string]: string }>({});
  const dark = useStore((state) => state.dark);

  const fetchMarkdown = useCallback(
    (id: string, url: string) => {
      if (!storeMd[id] && url) {
        fetch(url)
          .then((response) => response.text())
          .then((text) => {
            storeMd[id] = fixImageURL(text, url);
            setStoreMd({ ...storeMd });
          })
          .catch(() => {});
      }
    },
    [storeMd]
  );

  useEffect(() => {
    if (!content) fetchMarkdown(contentID, contentURL);
  }, [contentID, contentURL, content, fetchMarkdown]);

  return (
    <div className="markdown w-2/3 mx-auto px-2 py-6 text-c-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeKatex,
          [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }]
        ]}
        components={Highlighter(dark as boolean)}
      >
        {content ?? storeMd[contentID]}
      </ReactMarkdown>
    </div>
  );
};

const Bear = () => {
  const { bearNotes, projects } = usePortfolio();

  const sections = useMemo(() => [
    {
      id: "profile",
      title: "Profile",
      icon: "i-fa-solid:paw",
      md: bearNotes.map(note => ({
        id: note.id,
        title: note.title,
        file: "",
        content: note.content ?? undefined,
        icon: "i-la:dragon",
        excerpt: note.excerpt,
      }))
    },
    {
      id: "project",
      title: "Projects",
      icon: "i-octicon:repo",
      md: projects
        .filter(p => p.content || p.markdown_file)
        .map(p => ({
          id: p.id,
          title: p.title,
          file: p.content ? "" : `markdown/${p.markdown_file}`,
          content: p.content ?? undefined,
          icon: "i-heroicons-outline:desktop-computer",
          excerpt: p.excerpt,
          link: p.live_url || p.github_url || undefined,
        }))
    }
  ], [bearNotes, projects]);

  const [state, setState] = useState<BearState>({
    curSidebar: 0,
    curMidbar: 0,
    midbarList: [],
    contentID: "",
    contentURL: "",
    content: null,
  });

  useEffect(() => {
    if (sections[0].md.length > 0 && state.contentID === "") {
      const first = sections[0].md[0];
      setState({
        curSidebar: 0,
        curMidbar: 0,
        midbarList: sections[0].md,
        contentID: first.id,
        contentURL: first.file,
        content: first.content ?? null,
      });
    }
  }, [sections]);

  const setMidBar = (index: number) => {
    const items = sections[index].md;
    if (items.length === 0) return;
    setState({
      curSidebar: index,
      curMidbar: 0,
      midbarList: items,
      contentID: items[0].id,
      contentURL: items[0].file,
      content: items[0].content ?? null,
    });
  };

  const setContent = (id: string, url: string, index: number, content?: string | null) => {
    setState({ ...state, curMidbar: index, contentID: id, contentURL: url, content: content ?? null });
  };

  return (
    <div className="bear font-avenir flex h-full">
      <div className="w-44 overflow-auto bg-gray-700">
        <Sidebar
          sections={sections}
          cur={state.curSidebar}
          setMidBar={setMidBar}
        />
      </div>
      <div className="w-60 overflow-auto" bg="gray-50 dark:gray-800" border="r c-300">
        <Middlebar
          items={state.midbarList}
          cur={state.curMidbar}
          setContent={setContent}
        />
      </div>
      <div className="flex-1 overflow-auto" bg="gray-50 dark:gray-800">
        {state.contentID && (
          <Content contentID={state.contentID} contentURL={state.contentURL} content={state.content} />
        )}
      </div>
    </div>
  );
};

export default Bear;
