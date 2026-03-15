import type { WebsitesData } from "../types";

const websites: WebsitesData = {
  favorites: {
    title: "SNS Links",
    sites: [
      {
        id: "my-email",
        title: "Email",
        img: "img/sites/gmail.svg",
        link: "mailto:marioseleftheriou99@yahoo.com",
      },
      {
        id: "my-github",
        title: "Github",
        img: "img/sites/github.svg",
        link: "https://github.com/chknuggt",
      },
      {
        id: "my-linkedin",
        title: "Linkedin",
        img: "img/sites/linkedin.svg",
        link: "https://www.linkedin.com/in/marios-eleftheriou-59b399339/",
      },
    ],
  },
  freq: {
    title: "Frequently Visited",
    sites: [
      {
        id: "github",
        title: "Github",
        img: "img/sites/github.svg",
        link: "https://github.com/",
      },
      {
        id: "chess",
        title: "Chess.com",
        img: "img/icons/chess.svg",
        link: "https://www.chess.com/member/chknuggt",
      },
    ],
  },
};

export default websites;
