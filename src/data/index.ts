/* eslint-disable @typescript-eslint/no-explicit-any */
export const jsonData: Record<string, Record<string, any>> = {
  "connect-camp": {
    name: "巅峰之群",
    colors: {
      primary: "#ff6511",
      secondary: "#96ec00",
    },
    startAt: 1697860800000,
    registrationEndAt: 1700668800000,
    testRegEnd: 1698747000000,
    emergencyContacts: [
      { name: "Lin Yau", contact: "+6011-27318868", type: "medic" },
      { name: "Isaac Ho", contact: "+6016-3379314", type: "general" },
    ],
    pic: [
      {
        name: "Json Low",
        position: "Project Lead",
        imgSrc: "/assets/avatars/json.gif",
      },
      {
        name: "Chi Joon",
        position: "Ministry Team",
        imgSrc: "/assets/avatars/chijoon.gif",
      },
      {
        name: "How Han",
        position: "Game Master",
        imgSrc: "/assets/avatars/howhan.gif",
      },
      {
        name: "Isaac Ho",
        position: "Finance",
        imgSrc: "/assets/avatars/isaac.gif",
      },
      {
        name: "Qian Yi",
        position: "Admin",
        imgSrc: "/assets/avatars/qianyi.gif",
      },
      {
        name: "You Yuan",
        position: "Crowd Management",
        imgSrc: "/assets/avatars/youyuan.gif",
      },
      {
        name: "Jia Hao",
        position: "Event Specialist",
        imgSrc: "/assets/avatars/jiahao.gif",
      },
      {
        name: "Hiro Hoi",
        position: "Performance",
        imgSrc: "/assets/avatars/hoi.gif",
      },
    ],
    assets: {
      title: "assets/CC_Main_Title.png",
      poster: "assets/main_poster.webp",
      bg: "assets/CC_Background.png",
    },
    booklet: {
      rules: {
        1: {
          chi: "非紧急或特别事故, 不可擅自离开营地。若需离开, 需通知组长。",
          en: "Participants may not leave the campsite except in cases of emergency. Should you need to leave, you must inform your Group Leader immediately.",
        },
        2: {
          chi: "若发生任何紧急事故, 即刻通知组长。",
          en: "In the case of emergency, do inform your Group Leader immediately.",
        },
        3: {
          chi: "请准时参加所有活动, 聚会及用餐时间。",
          en: "Please be punctual for all activities, events and meals.",
        },
        4: {
          chi: "牧师分享时请勿随意走动。",
          en: "Please remain seated during sermon sessions.",
        },
        5: {
          chi: "编定的组别和房间, 未经许可不可擅自更换。",
          en: "Rooms allocated shall not change without prior permission.",
        },
        6: {
          chi: "未经许可, 请勿擅自移动所有营地内的物品位置。",
          en: "Do not remove or move any campsite properties from its location without prior permission.",
        },
        7: {
          chi: "爱惜公物, 并保持营地清洁。",
          en: "Take care of public properties and keep the place clean.",
        },
        8: {
          chi: "请小心报关个人财务, 若有遗失, 恕不负责。",
          en: "Please take care of your belongings. We will not be responsible for any lost.",
        },
        9: {
          chi: "营会严禁抽烟, 饮酒, 赌博, 吸毒, 打架。",
          en: "Smoking, alcohol, gambling, drugs and fighting are prohibited in the camp.",
        },
        10: {
          chi: "严禁男女在营地各处单独或有任何亲密举止, 例如牵手, 拥抱, 亲吻或任何不雅行为。",
          en: "Male and female are not allowed to be alone without third party or have any close body contacts, e.g. hugging, kissing or any sort of indecent behaviours.",
        },
        11: {
          chi: "为了个人安全及确保各项活动能顺利进行, 所有营会参与者须遵守已规划的营会时间表及各项活动规则, 且服从组长及节目负责人的指示。",
          en: "To ensure personal safety and the smoothness of all activities, all participants must follow the schedule and rules set by the organizer, apart from obeying the instructions of Group Leader and person in charge of each activity.",
        },
      },
      groups: {
        eagle: {
          1: [
            "Lew Qian Yi (L)",
            "Yew Jia Ying",
            "Soon Mei Shi",
            "Christie Micda",
          ],
          2: [
            "Chin Jia Hao (L)",
            "Chung Wai Quan",
            "Ng Liang Shin",
            "Tan Li Zhang",
          ],
        },
        lion: {
          1: ["Yu Enci (L)", "Leng Zhi Yan", "Audrey", "Phoebe"],
        },
      },
      rooms: {
        "Level 1": {
          "Room 1": [
            "Lew Qian Yi (RL)",
            "Yew Jia Ying",
            "Soon Mei Shi",
            "Christie Micda",
          ],
          "Dorm 1": [
            "Chin Jia Hao (RL)",
            "Chung Wai Quan",
            "Ng Liang Shin",
            "Tan Li Zhang",
          ],
        },
        "Level 2": {
          "Room 2": ["Yu Enci (RL)", "Leng Zhi Yan", "Phoebe", "Audrey"],
        },
      },
    },
  },
};

export const structureData: Record<
  "Move" | "Heart" | "Force" | "Voice" | "Mind" | "Ps. Joshua Team",
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
      "Teressa Tang",
      "Lie Wen Si",
      "Emily Him Min Li",
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
    "Heart 1 | Loh Xin Kai": [
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
    "Joel Wong Xie Zhe": ["Joey Chong"],
  },
  "Ps. Joshua Team": {
    "Ps. Joshua Team": ["Wong Kin Hou"],
  },
};
