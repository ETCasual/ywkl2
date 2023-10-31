/* eslint-disable @typescript-eslint/no-explicit-any */
export const jsonData: Record<string, Record<string, any>> = {
  "connect-camp": {
    name: "巅峰之群",
    colors: {
      primary: "#ff6511",
      secondary: "#96ec00",
    },
    startAt: 1697860800000,
    assets: {
      title: "assets/CC_Main_Title.png",
      poster: "assets/main_poster.webp",
      bg: "assets/CC_Background.png",
    },
  },
};

export const structureData: Record<
  | "Move"
  | "Heart"
  | "Force"
  | "Voice"
  | "Mind"
  | "WonderKids"
  | "General Service",
  Record<string, string[]>
> = {
  Move: {
    "Move 1 | Denise Ding": ["Denise Ding Chiau Jueng", "Fong Chung Sang"],
    "Move 2 | Elaine Teoh": ["Elaine Teoh Engyin", "Wang Mee Kee"],
    "Move 3 | Chhui Chong San": ["Chhui Chong San", "Teo Min Hang"],
    "Move 4 | Denise Ding / Chan Pui Yan": [
      "Chan Pui Yan",
      "Priscilla Chan Wai Yin",
    ],
  },
  Voice: {
    "Voice 1 | Derek Yeow Han Xiang": ["Derek Yeow Han Xiang", "Sunil Kumar"],
    "Voice 2 | Goh Zheng Yang": [
      "Saw Li Hua",
      "Evan Yap Kam Seng",
      "Beverly Yip Yi-Man",
      "Lie Wen Si",
      "Emily Him Ming Li",
      "Lie Wai Kien",
    ],
    "Voice 3 | Shum Wai Lok": [
      "Lim Sze Qi",
      "Jasmine Tang Hay Yuet",
      "Jason Mak Kah Chun",
    ],
  },
  Mind: {
    "Mind 1 | Soon Mei Shi": ["Lew Qian Yi", "Thiam Yew Mun", "Law Mei Jia"],
    "Mind 2 | Wong How Han": ["Wong How Han"],
  },
  Heart: {
    "Heart 1 | Foong Dawn Hui": [
      "Mok Hor Yin",
      "Chong Hui Ying",
      "Pooi Weng Been",
    ],
    "Heart 2 | Teo Jia Xin": ["Priscilla Lua Sim Yee", "Tan Li Zhang"],
    "Heart 3 | Joseph Chong Zuo Nian": ["Joseph Chong Zuo Nian"],
    "Heart 4 | Teo Jia Xin / Jesse Liew": ["Jesse Liew"],
    "Heart 5 | Lim Sheng Kai / Wong Wai Yee": ["Wong Wai Yee"],
  },
  Force: {
    "Force 1 | Angeline Tan Ho Yen": [
      "Yit Zhan Hao",
      "Ng Bao Yi",
      "Phan Zhi Xuan",
      "Wong Wei Heng",
    ],
    "Force 2 | Liew Hern Liang": ["Liew Hern Liang"],
  },
  WonderKids: {
    WonderKids: ["Wong Kin Hou"],
  },
  "General Service": {
    "General Service": ["Joel Wong Xin Zhe"],
  },
};
