import { usePortfolio } from "../../context/PortfolioContext";

export default function VSCode() {
  const { about } = usePortfolio();
  const src = about.vscode_url ?? "https://github1s.com/chknuggt/Portfolio/blob/main/README.md";

  return (
    <iframe
      className="size-full bg-[#202020]"
      src={src}
      title="VSCode"
    />
  );
}
