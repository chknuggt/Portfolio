import { usePortfolio } from "../../context/PortfolioContext";

export default function Spotify() {
  const { about } = usePortfolio();
  const src = about.spotify_embed_url ?? "https://open.spotify.com/embed/artist/6l3HvQ5sa6mXTsMTB19rO5";

  return (
    <iframe
      className="size-full bg-[#116e55]"
      src={src}
      title="Spotify"
    />
  );
}
