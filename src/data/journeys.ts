import type { Journey, Site } from '../types';

export type { Journey, Site };

export const journeys: Journey[] = [
  {
    id: 'jesus',
    name: '耶稣的传教旅程',
    color: '#f0c040',
    sites: [
      {
        id: 'bethlehem',
        name: '伯利恒',
        modernName: 'Bethlehem（巴勒斯坦伯利恒）',
        coordinates: [35.2007, 31.7054],
        events: [
          {
            title: '耶稣降生',
            description:
              '约瑟带着马利亚从拿撒勒回到大卫的城伯利恒报名上册。马利亚在客店没有地方的情况下生下耶稣，把他放在马槽里。',
            scripture: '路加福音 2:4-7',
            scriptureText:
              '约瑟也从加利利的拿撒勒城上犹太去，到了大卫的城，名叫伯利恒……就生了头胎的儿子，用布包起来，放在马槽里。',
          },
          {
            title: '博士朝拜',
            description:
              '几个博士从东方来到伯利恒，跟随星的引导找到小孩子耶稣，俯伏拜他，并献上黄金、乳香、没药为礼物。',
            scripture: '马太福音 2:1-11',
            scriptureText:
              '当希律王的时候，耶稣生在犹太的伯利恒。有几个博士从东方来到耶路撒冷，说："那生下来作犹太人之王的在哪里？"',
          },
        ],
      },
      {
        id: 'nazareth',
        name: '拿撒勒',
        modernName: 'Nazareth（以色列拿撒勒）',
        coordinates: [35.3035, 32.6996],
        events: [
          {
            title: '童年与成长',
            description:
              '从埃及归回后，约瑟一家定居在加利利的拿撒勒。耶稣在这里长大，智慧和身量并神和人喜爱他的心都一齐增长。',
            scripture: '路加福音 2:39-40, 51-52',
            scriptureText:
              '孩子渐渐长大，强健起来，充满智慧，又有神的恩在他身上。',
          },
          {
            title: '会堂宣告使命',
            description:
              '耶稣在拿撒勒会堂里宣读以赛亚书，宣告"主的灵在我身上"的预言今天应验了，却被家乡的人厌弃。',
            scripture: '路加福音 4:16-21',
            scriptureText:
              '主的灵在我身上，因为他用膏膏我，叫我传福音给贫穷的人。',
          },
        ],
      },
      {
        id: 'bethany-beyond-jordan',
        name: '约旦河（约旦河外的伯大尼）',
        modernName: 'Al-Maghtas（约旦 Bethany Beyond the Jordan 遗址）',
        coordinates: [35.5550, 31.8370],
        events: [
          {
            title: '受洗',
            description:
              '耶稣从加利利来到约旦河，受施洗约翰的洗。他从水里上来时，天忽然开了，圣灵仿佛鸽子降在他身上，天上有声音说这是神的爱子。',
            scripture: '马太福音 3:13-17',
            scriptureText:
              '从天上有声音说："这是我的爱子，我所喜悦的。"',
          },
        ],
      },
      {
        id: 'judean-wilderness',
        name: '犹大旷野',
        modernName: '犹大旷野（Judaean Desert，传统地点为耶利哥附近的试探山）',
        coordinates: [35.4140, 31.8740],
        events: [
          {
            title: '受试探',
            description:
              '耶稣被圣灵引到旷野，禁食四十昼夜，受魔鬼的三次试探。他每次都引用圣经的话胜过试探，魔鬼便离开了他。',
            scripture: '马太福音 4:1-11',
            scriptureText:
              '耶稣却回答说："经上记着说：人活着，不是单靠食物，乃是靠神口里所出的一切话。"',
          },
        ],
      },
      {
        id: 'cana',
        name: '迦拿',
        modernName: 'Kafr Kanna（以色列加利利的卡夫卡纳）',
        coordinates: [35.3395, 32.7466],
        events: [
          {
            title: '变水为酒',
            description:
              '耶稣在迦拿的婚宴上行了头一件神迹，把六口石缸里的水变成了上好的酒，显出他的荣耀来，门徒就信了他。',
            scripture: '约翰福音 2:1-11',
            scriptureText:
              '这是耶稣所行的头一件神迹，是在加利利的迦拿行的，显出他的荣耀来，他的门徒就信他了。',
          },
        ],
      },
      {
        id: 'capernaum',
        name: '迦百农',
        modernName: 'Kfar Nahum 遗址（以色列加利利海北岸）',
        coordinates: [35.5751, 32.8807],
        events: [
          {
            title: '事工中心',
            description:
              '耶稣离开拿撒勒后住在海边的迦百农，这里成为他加利利事工的基地。他在此呼召彼得、安得烈等门徒，并在会堂教训人。',
            scripture: '马太福音 4:13-17',
            scriptureText:
              '后又离开拿撒勒，往迦百农去，就住在那里……从那时候，耶稣就传起道来，说："天国近了，你们应当悔改！"',
          },
          {
            title: '医治百夫长的仆人',
            description:
              '一位罗马百夫长为他瘫痪的仆人求耶稣，并表示只要说一句话仆人就必好。耶稣称赞他的信心，连在以色列中也没有遇见过。',
            scripture: '马太福音 8:5-13',
            scriptureText:
              '耶稣听见就希奇，对跟从的人说："我实在告诉你们：这么大的信心，就是在以色列中，我也没有遇见过。"',
          },
        ],
      },
      {
        id: 'mount-of-beatitudes',
        name: '八福山',
        modernName: 'Mount of Beatitudes（以色列加利利海西北岸八福堂）',
        coordinates: [35.5560, 32.8820],
        events: [
          {
            title: '登山宝训',
            description:
              '耶稣见许多人跟随，就上了山坐下，向门徒和众人宣讲天国的伦理，从"虚心的人有福了"的八福开始，教导何为天国子民的生活。',
            scripture: '马太福音 5:1-12',
            scriptureText:
              '虚心的人有福了！因为天国是他们的。哀恸的人有福了！因为他们必得安慰。',
          },
        ],
      },
      {
        id: 'bethsaida',
        name: '伯赛大',
        modernName: 'et-Tell / Bethsaida 遗址（约旦河入加利利海处东侧）',
        coordinates: [35.6310, 32.9100],
        events: [
          {
            title: '五饼二鱼喂饱五千人',
            description:
              '在伯赛大附近的野地，耶稣用五个饼、两条鱼，祝福擘开，喂饱了五千男人，剩下的零碎装满了十二篮子。',
            scripture: '路加福音 9:10-17',
            scriptureText:
              '他们就吃，并且都吃饱了。把剩下的零碎收拾起来，装满了十二篮子。',
          },
          {
            title: '医治瞎子',
            description:
              '耶稣在伯赛大拉着一个瞎子的手领他到村外，分两次按手在他眼睛上，使他完全复明，样样都看得清楚了。',
            scripture: '马可福音 8:22-26',
            scriptureText:
              '随后又按手在他眼睛上，他定睛一看，就复了原，样样都看得清楚了。',
          },
        ],
      },
      {
        id: 'caesarea-philippi',
        name: '该撒利亚腓立比',
        modernName: 'Banias（以色列北部巴尼亚斯，黑门山麓）',
        coordinates: [35.6944, 33.2486],
        events: [
          {
            title: '彼得认信',
            description:
              '在该撒利亚腓立比的境内，耶稣问门徒"你们说我是谁"，彼得回答"你是基督，是永生神的儿子"。耶稣从此开始预言自己将受难并复活。',
            scripture: '马太福音 16:13-20',
            scriptureText:
              '西门彼得回答说："你是基督，是永生神的儿子。"',
          },
        ],
      },
      {
        id: 'mount-tabor',
        name: '他泊山（变像山）',
        modernName: 'Mount Tabor（以色列耶斯列平原东北）',
        coordinates: [35.3870, 32.6868],
        events: [
          {
            title: '登山变像',
            description:
              '耶稣带着彼得、雅各、约翰上高山，在他们面前变了形像，脸面明亮如日头，并有摩西、以利亚显现与他说话，天上有声音见证他是神的爱子。',
            scripture: '马太福音 17:1-8',
            scriptureText:
              '就在他们面前变了形像，脸面明亮如日头，衣裳洁白如光。',
          },
        ],
      },
      {
        id: 'jericho',
        name: '耶利哥',
        modernName: 'Jericho（巴勒斯坦杰里科）',
        coordinates: [35.4444, 31.8569],
        events: [
          {
            title: '撒该悔改',
            description:
              '税吏长撒该爬上桑树要看耶稣，耶稣却主动住进他家。撒该悔改，愿把所有的一半分给穷人，耶稣宣告"今天救恩到了这家"。',
            scripture: '路加福音 19:1-10',
            scriptureText:
              '人子来，为要寻找、拯救失丧的人。',
          },
          {
            title: '医治瞎子巴底买',
            description:
              '耶稣出耶利哥时，讨饭的瞎子巴底买大声呼喊"大卫的子孙耶稣啊，可怜我吧"。耶稣因他的信心使他立刻看见，他就跟随了耶稣。',
            scripture: '马可福音 10:46-52',
            scriptureText:
              '耶稣说："你去吧！你的信救了你了。"瞎子立刻看见了，就在路上跟随耶稣。',
          },
        ],
      },
      {
        id: 'bethany',
        name: '伯大尼',
        modernName: 'Al-Eizariya（巴勒斯坦艾扎里耶，橄榄山东麓）',
        coordinates: [35.2618, 31.7717],
        events: [
          {
            title: '使拉撒路复活',
            description:
              '拉撒路死了四天，耶稣来到伯大尼的坟墓前，大声呼叫"拉撒路出来"，死人就出来了。这一神迹显明耶稣是复活与生命。',
            scripture: '约翰福音 11:38-44',
            scriptureText:
              '耶稣对她说："复活在我，生命也在我；信我的人，虽然死了，也必复活。"',
          },
          {
            title: '马利亚香膏抹主',
            description:
              '逾越节前六日，马利亚拿着极贵的真哪哒香膏抹耶稣的脚，又用自己的头发去擦，预先为耶稣安葬之日做了准备。',
            scripture: '约翰福音 12:1-8',
            scriptureText:
              '马利亚就拿着一斤极贵的真哪哒香膏，抹耶稣的脚，又用自己头发去擦，屋里就满了膏的香气。',
          },
        ],
      },
      {
        id: 'jerusalem',
        name: '耶路撒冷',
        modernName: 'Jerusalem（耶路撒冷）',
        coordinates: [35.2345, 31.7767],
        events: [
          {
            title: '荣入圣城',
            description:
              '耶稣骑着驴驹进入耶路撒冷，众人把衣服和棕树枝铺在路上，高喊"和散那归于大卫的子孙"，应验了先知撒迦利亚的预言。',
            scripture: '马太福音 21:1-11',
            scriptureText:
              '前行后随的众人喊着说："和散那归于大卫的子孙！奉主名来的，是应当称颂的！"',
          },
          {
            title: '最后的晚餐与十字架受难',
            description:
              '耶稣与门徒守逾越节的晚餐，设立圣餐；之后在客西马尼园被捕，受审后被钉死在各各他的十字架上，担当世人的罪。',
            scripture: '路加福音 22:19-20; 23:33',
            scriptureText:
              '又拿起饼来，祝谢了，就擘开，递给他们，说："这是我的身体，为你们舍的，你们也应当如此行，为的是记念我。"',
          },
          {
            title: '复活',
            description:
              '七日的头一日清早，妇女们来到坟墓，发现石头已经滚开，天使宣告"他不在这里，照他所说的，已经复活了"。耶稣复活后向门徒多次显现。',
            scripture: '马太福音 28:1-10',
            scriptureText:
              '他不在这里，照他所说的，已经复活了。你们来看安放主的地方。',
          },
        ],
      },
    ],
  },
  {
    id: 'paul1',
    name: '保罗第一次布道旅程',
    color: '#e05a5a',
    sites: [
      {
        id: 'p1-antioch-syria',
        name: '安提阿（叙利亚）',
        modernName: 'Antakya（土耳其安塔基亚）',
        coordinates: [36.1605, 36.2023],
        events: [
          {
            title: '圣灵差遣巴拿巴和扫罗',
            description:
              '安提阿教会的先知和教师事奉主、禁食的时候，圣灵吩咐为他分派巴拿巴和扫罗去做特定的工作。教会按手在他们头上，打发他们出去。',
            scripture: '使徒行传 13:1-3',
            scriptureText:
              '圣灵说："要为我分派巴拿巴和扫罗，去做我召他们所做的工。"',
          },
        ],
      },
      {
        id: 'p1-seleucia',
        name: '西流基',
        modernName: 'Samandağ 附近的 Seleucia Pieria 遗址（土耳其）',
        coordinates: [35.9300, 36.1190],
        events: [
          {
            title: '从西流基出海',
            description:
              '巴拿巴和扫罗既被圣灵差遣，就下到安提阿的海港西流基，从那里坐船前往塞浦路斯岛，开始第一次布道旅程。',
            scripture: '使徒行传 13:4',
            scriptureText:
              '他们既被圣灵差遣，就下到西流基，从那里坐船往居比路去。',
          },
        ],
      },
      {
        id: 'p1-salamis',
        name: '撒拉米（塞浦路斯）',
        modernName: 'Salamis 遗址（北塞浦路斯法马古斯塔附近）',
        coordinates: [33.9000, 35.1833],
        events: [
          {
            title: '在会堂传讲神的道',
            description:
              '他们到了撒拉米，就在犹太人各会堂里传讲神的道，约翰马可作他们的帮手。这是旅程中第一站的福音工作。',
            scripture: '使徒行传 13:5',
            scriptureText:
              '到了撒拉米，就在犹太人各会堂里传讲神的道，也有约翰作他们的帮手。',
          },
        ],
      },
      {
        id: 'p1-paphos',
        name: '帕弗',
        modernName: 'Paphos（塞浦路斯帕福斯）',
        coordinates: [32.4218, 34.7754],
        events: [
          {
            title: '方伯士求保罗信主',
            description:
              '在帕弗，行法术的以吕马抵挡福音，保罗奉主的名使他暂时瞎眼。方伯士求保罗看见所成的事，很希奇主的道，就信了。从此经文开始称扫罗为保罗。',
            scripture: '使徒行传 13:6-12',
            scriptureText:
              '方伯看见所做的事，很希奇主的道，就信了。',
          },
        ],
      },
      {
        id: 'p1-perga',
        name: '别加',
        modernName: 'Perge 遗址（土耳其安塔利亚附近）',
        coordinates: [30.8540, 36.9614],
        events: [
          {
            title: '马可离队',
            description:
              '保罗一行从帕弗开船来到旁非利亚的别加。约翰马可在这里离开他们，回耶路撒冷去了，这事后来成为保罗与巴拿巴分开的原因之一。',
            scripture: '使徒行传 13:13',
            scriptureText:
              '保罗和他的同人从帕弗开船，来到旁非利亚的别加，约翰就离开他们，回耶路撒冷去。',
          },
        ],
      },
      {
        id: 'p1-pisidian-antioch',
        name: '彼西底的安提阿',
        modernName: 'Yalvaç 附近的 Antiocheia 遗址（土耳其）',
        coordinates: [31.1890, 38.3060],
        events: [
          {
            title: '会堂讲道与转向外邦人',
            description:
              '保罗在安息日的会堂里讲道，从以色列历史讲到耶稣的复活与赦罪之恩。下一个安息日合城的人几乎都来听道，犹太人嫉妒抵挡，保罗宣告要转向外邦人。',
            scripture: '使徒行传 13:14-52',
            scriptureText:
              '我已经立你作外邦人的光，叫你施行救恩，直到地极。',
          },
        ],
      },
      {
        id: 'p1-iconium',
        name: '以哥念',
        modernName: 'Konya（土耳其科尼亚）',
        coordinates: [32.4846, 37.8746],
        events: [
          {
            title: '神迹证实恩道',
            description:
              '保罗和巴拿巴在以哥念会堂讲道，叫犹太人和希腊人信的很多。他们在那里住了多日，主借他们的手施行神迹奇事，证明他的恩道。后因城里有人要凌辱他们，便逃往路司得。',
            scripture: '使徒行传 14:1-7',
            scriptureText:
              '二人在那里住了多日，倚靠主放胆讲道，主借他们的手施行神迹奇事，证明他的恩道。',
          },
        ],
      },
      {
        id: 'p1-lystra',
        name: '路司得',
        modernName: 'Hatunsaray 附近的 Lystra 遗址（土耳其科尼亚省）',
        coordinates: [32.4540, 37.5790],
        events: [
          {
            title: '医治瘸腿的人，被误认为神',
            description:
              '保罗使一个生来瘸腿的人行走，众人就说"有神借着人形降临"，要向他们献祭。保罗和巴拿巴撕裂衣裳，劝众人离弃虚妄归向永生神。',
            scripture: '使徒行传 14:8-18',
            scriptureText:
              '我们也是人，性情和你们一样。我们传福音给你们，是叫你们离弃这些虚妄，归向那创造天、地、海和其中万物的永生神。',
          },
          {
            title: '保罗被石头打',
            description:
              '从安提阿和以哥念来的犹太人挑唆众人，用石头打保罗，以为他死了，便拖到城外。门徒围着他，他就起来回城，次日往特庇去。',
            scripture: '使徒行传 14:19-20',
            scriptureText:
              '门徒正围着他，他就起来，走进城去。第二天，同巴拿巴往特庇去。',
          },
        ],
      },
      {
        id: 'p1-derbe',
        name: '特庇',
        modernName: 'Kerti Hüyük 遗址（土耳其卡拉曼省附近）',
        coordinates: [33.3520, 37.3490],
        events: [
          {
            title: '传福音使许多人作门徒',
            description:
              '保罗和巴拿巴在特庇传福音，使好些人作门徒。之后他们回程经过路司得、以哥念、安提阿，坚固门徒的心，并在各教会选立长老。',
            scripture: '使徒行传 14:20-23',
            scriptureText:
              '对那城里的人传了福音，使好些人作门徒，就回路司得、以哥念、安提阿去，坚固门徒的心。',
          },
        ],
      },
      {
        id: 'p1-return-antioch',
        name: '返回安提阿',
        modernName: 'Antakya（土耳其安塔基亚）',
        coordinates: [36.1605, 36.2023],
        events: [
          {
            title: '述说神所行的事',
            description:
              '保罗和巴拿巴经别加、亚大利坐船回到安提阿，聚集会众，述说神借他们所行的一切事，并神怎样为外邦人开了信道的门。',
            scripture: '使徒行传 14:26-28',
            scriptureText:
              '到了那里，聚集了会众，就述说神借他们所行的一切事，并神怎样为外邦人开了信道的门。',
          },
        ],
      },
    ],
  },
  {
    id: 'paul2',
    name: '保罗第二次布道旅程',
    color: '#5a8de0',
    sites: [
      {
        id: 'p2-antioch',
        name: '安提阿（叙利亚）',
        modernName: 'Antakya（土耳其安塔基亚）',
        coordinates: [36.1605, 36.2023],
        events: [
          {
            title: '保罗与巴拿巴分开，带西拉出发',
            description:
              '保罗提议回访各城的弟兄，因带不带马可的事与巴拿巴起了争论，二人分开。保罗拣选西拉出发，走遍叙利亚、基利家，坚固众教会。',
            scripture: '使徒行传 15:36-41',
            scriptureText:
              '保罗拣选了西拉，也出去，蒙弟兄们把他交于主的恩中。他就走遍叙利亚、基利家，坚固众教会。',
          },
        ],
      },
      {
        id: 'p2-derbe',
        name: '特庇',
        modernName: 'Kerti Hüyük 遗址（土耳其卡拉曼省附近）',
        coordinates: [33.3520, 37.3490],
        events: [
          {
            title: '回访特庇',
            description:
              '保罗和西拉从陆路经基利家来到特庇，回访第一次旅程建立的教会，坚固门徒的信心。',
            scripture: '使徒行传 16:1',
            scriptureText: '保罗来到特庇，又到路司得。',
          },
        ],
      },
      {
        id: 'p2-lystra',
        name: '路司得',
        modernName: 'Hatunsaray 附近的 Lystra 遗址（土耳其科尼亚省）',
        coordinates: [32.4540, 37.5790],
        events: [
          {
            title: '提摩太加入',
            description:
              '在路司得有一个门徒提摩太，是被弟兄们所称赞的。保罗要带他同去，就给他行了割礼，提摩太从此成为保罗重要的同工。',
            scripture: '使徒行传 16:1-3',
            scriptureText:
              '路司得和以哥念的弟兄都称赞他。保罗要带他同去。',
          },
        ],
      },
      {
        id: 'p2-troas',
        name: '特罗亚',
        modernName: 'Dalyan 附近的 Alexandria Troas 遗址（土耳其恰纳卡莱省）',
        coordinates: [26.1590, 39.7510],
        events: [
          {
            title: '马其顿异象',
            description:
              '圣灵禁止保罗在亚细亚和庇推尼讲道，他们就下到特罗亚。夜间保罗看见异象：有一个马其顿人求他"请你过到马其顿来帮助我们"，福音由此传入欧洲。',
            scripture: '使徒行传 16:6-10',
            scriptureText:
              '在夜间有异象现与保罗：有一个马其顿人站着求他说："请你过到马其顿来帮助我们！"',
          },
        ],
      },
      {
        id: 'p2-philippi',
        name: '腓立比',
        modernName: 'Filippoi 遗址（希腊卡瓦拉附近）',
        coordinates: [24.2860, 41.0131],
        events: [
          {
            title: '吕底亚信主',
            description:
              '在腓立比河边的祷告处，主开启卖紫色布的妇人吕底亚的心，她和她一家都受了洗，成为欧洲第一批信徒。',
            scripture: '使徒行传 16:13-15',
            scriptureText:
              '主就开导她的心，叫她留心听保罗所讲的话。',
          },
          {
            title: '狱中赞美，禁卒全家得救',
            description:
              '保罗和西拉被棍打下监，半夜祷告唱诗赞美神，忽然地大震动，监门全开。禁卒问"我当怎样行才可以得救"，他们答"当信主耶稣，你和你一家都必得救"。',
            scripture: '使徒行传 16:25-34',
            scriptureText:
              '他们说："当信主耶稣，你和你一家都必得救。"',
          },
        ],
      },
      {
        id: 'p2-thessalonica',
        name: '帖撒罗尼迦',
        modernName: 'Thessaloniki（希腊塞萨洛尼基）',
        coordinates: [22.9444, 40.6401],
        events: [
          {
            title: '一连三个安息日辩论圣经',
            description:
              '保罗照他素常的规矩进会堂，一连三个安息日本着圣经与犹太人辩论，证明基督必须受害并从死里复活。有些人信了，但不信的犹太人耸动合城的人闹事。',
            scripture: '使徒行传 17:1-9',
            scriptureText:
              '讲解陈明基督必须受害，从死里复活，又说："我所传与你们的这位耶稣，就是基督。"',
          },
        ],
      },
      {
        id: 'p2-berea',
        name: '庇哩亚',
        modernName: 'Veria（希腊韦里亚）',
        coordinates: [22.2020, 40.5240],
        events: [
          {
            title: '天天考查圣经',
            description:
              '庇哩亚人贤于帖撒罗尼迦的人，甘心领受这道，天天考查圣经，要晓得这道是与不是，所以他们中间多有相信的。',
            scripture: '使徒行传 17:10-12',
            scriptureText:
              '这地方的人贤于帖撒罗尼迦的人，甘心领受这道，天天考查圣经，要晓得这道是与不是。',
          },
        ],
      },
      {
        id: 'p2-athens',
        name: '雅典',
        modernName: 'Athens（希腊雅典）',
        coordinates: [23.7275, 37.9838],
        events: [
          {
            title: '亚略巴古讲道',
            description:
              '保罗看见雅典满城都是偶像，心里着急。他在亚略巴古从"未识之神"的坛讲起，宣告创造万物的主，并以耶稣的复活作为审判的凭据。',
            scripture: '使徒行传 17:16-34',
            scriptureText:
              '我游行的时候，观看你们所敬拜的，遇见一座坛，上面写着"未识之神"。你们所不认识而敬拜的，我现在告诉你们。',
          },
        ],
      },
      {
        id: 'p2-corinth',
        name: '哥林多',
        modernName: 'Archaia Korinthos 遗址（希腊科林斯附近）',
        coordinates: [22.8800, 37.9060],
        events: [
          {
            title: '住了一年零六个月',
            description:
              '保罗在哥林多遇见亚居拉和百基拉，与他们同住做帐棚为业。主在异象中鼓励他"不要怕，只管讲，在这城里我有许多的百姓"，他就住了一年零六个月，将神的道教训他们。',
            scripture: '使徒行传 18:1-11',
            scriptureText:
              '夜间，主在异象中对保罗说："不要怕，只管讲，不要闭口。有我与你同在，必没有人下手害你。"',
          },
        ],
      },
      {
        id: 'p2-ephesus',
        name: '以弗所',
        modernName: 'Efes 遗址（土耳其塞尔丘克附近）',
        coordinates: [27.3417, 37.9395],
        events: [
          {
            title: '短暂停留，应许再来',
            description:
              '保罗在回程途中到了以弗所，进会堂与犹太人辩论。众人请他多住些日子，他却辞别说"神若许我，我还要回到你们这里"，留下百基拉和亚居拉。',
            scripture: '使徒行传 18:19-21',
            scriptureText:
              '就辞别他们，说："神若许我，我还要回到你们这里。"于是开船离了以弗所。',
          },
        ],
      },
      {
        id: 'p2-return-antioch',
        name: '返回安提阿',
        modernName: 'Antakya（土耳其安塔基亚）',
        coordinates: [36.1605, 36.2023],
        events: [
          {
            title: '结束第二次旅程',
            description:
              '保罗在该撒利亚下了船，上耶路撒冷问教会安，随后下安提阿去，在那里住了些日子，结束第二次布道旅程。',
            scripture: '使徒行传 18:22',
            scriptureText:
              '在该撒利亚下了船，就上耶路撒冷去问教会安，随后下安提阿去。',
          },
        ],
      },
    ],
  },
  {
    id: 'paul3',
    name: '保罗第三次布道旅程',
    color: '#5ac08a',
    sites: [
      {
        id: 'p3-antioch',
        name: '安提阿（叙利亚）',
        modernName: 'Antakya（土耳其安塔基亚）',
        coordinates: [36.1605, 36.2023],
        events: [
          {
            title: '第三次旅程启程',
            description:
              '保罗在安提阿住了些日子，又离开那里，挨次经过加拉太和弗吕家地方，坚固众门徒，开始第三次布道旅程。',
            scripture: '使徒行传 18:23',
            scriptureText:
              '住了些日子，又离开那里，挨次经过加拉太和弗吕家地方，坚固众门徒。',
          },
        ],
      },
      {
        id: 'p3-ephesus',
        name: '以弗所',
        modernName: 'Efes 遗址（土耳其塞尔丘克附近）',
        coordinates: [27.3417, 37.9395],
        events: [
          {
            title: '两年多的教导',
            description:
              '保罗在以弗所推喇奴的学房天天辩论，这样有两年之久，叫一切住在亚细亚的，无论是犹太人是希腊人，都听见主的道。神借保罗的手行了些非常的奇事。',
            scripture: '使徒行传 19:8-10',
            scriptureText:
              '这样有两年之久，叫一切住在亚细亚的，无论是犹太人是希腊人，都听见主的道。',
          },
          {
            title: '银匠底米丢引起的骚乱',
            description:
              '因许多人离弃偶像，制造亚底米神银龛的银匠底米丢煽动同行闹事，满城轰动，众人喊着"大哉，以弗所人的亚底米啊"。骚乱平息后保罗动身往马其顿去。',
            scripture: '使徒行传 19:23-41',
            scriptureText:
              '众人听见，就怒气填胸，喊着说："大哉，以弗所人的亚底米啊！"',
          },
        ],
      },
      {
        id: 'p3-macedonia',
        name: '马其顿',
        modernName: '希腊北部马其顿地区（以腓立比一带为代表）',
        coordinates: [24.2860, 41.0131],
        events: [
          {
            title: '走遍马其顿劝勉门徒',
            description:
              '骚乱平定后，保罗辞别以弗所往马其顿去，走遍了那一带地方，用许多话劝勉门徒，然后来到希腊。',
            scripture: '使徒行传 20:1-2',
            scriptureText:
              '走遍了那一带地方，用许多话劝勉门徒，然后来到希腊。',
          },
        ],
      },
      {
        id: 'p3-corinth',
        name: '哥林多',
        modernName: 'Archaia Korinthos 遗址（希腊科林斯附近）',
        coordinates: [22.8800, 37.9060],
        events: [
          {
            title: '在希腊住了三个月',
            description:
              '保罗在希腊（主要在哥林多）住了三个月，期间写下了罗马书。因犹太人设计要害他，他就定意从马其顿回去，不直接坐船往叙利亚。',
            scripture: '使徒行传 20:2-3',
            scriptureText:
              '在那里住了三个月，将要坐船往叙利亚去，犹太人设计要害他，他就定意从马其顿回去。',
          },
        ],
      },
      {
        id: 'p3-troas',
        name: '特罗亚',
        modernName: 'Dalyan 附近的 Alexandria Troas 遗址（土耳其恰纳卡莱省）',
        coordinates: [26.1590, 39.7510],
        events: [
          {
            title: '犹推古复活',
            description:
              '七日的第一日，保罗在特罗亚讲道直到半夜。少年人犹推古坐在窗台上沉睡，从三层楼掉下去死了，保罗伏在他身上抱着他，使他复活，众人得了不小的安慰。',
            scripture: '使徒行传 20:7-12',
            scriptureText:
              '保罗下去，伏在他身上，抱着他说："你们不要发慌，他的灵魂还在身上。"',
          },
        ],
      },
      {
        id: 'p3-miletus',
        name: '米利都',
        modernName: 'Milet 遗址（土耳其艾登省）',
        coordinates: [27.2778, 37.5306],
        events: [
          {
            title: '向以弗所长老告别',
            description:
              '保罗为赶在五旬节前到耶路撒冷，请以弗所教会的长老到米利都相见。他回顾自己的服事，嘱咐他们牧养神的教会，众人与他抱头痛哭送别。',
            scripture: '使徒行传 20:17-38',
            scriptureText:
              '圣灵立你们作全群的监督，你们就当为自己谨慎，也为全群谨慎，牧养神的教会，就是他用自己血所买来的。',
          },
        ],
      },
      {
        id: 'p3-tyre',
        name: '推罗',
        modernName: 'Tyre / Sour（黎巴嫩苏尔）',
        coordinates: [35.1939, 33.2705],
        events: [
          {
            title: '门徒劝保罗不要上耶路撒冷',
            description:
              '船在推罗卸货，保罗找着门徒住了七天。门徒被圣灵感动，劝保罗不要上耶路撒冷去，临别时众人同妻子儿女送他们到城外，在岸上跪下祷告。',
            scripture: '使徒行传 21:3-6',
            scriptureText:
              '他们被圣灵感动，对保罗说，不要上耶路撒冷去。',
          },
        ],
      },
      {
        id: 'p3-caesarea',
        name: '该撒利亚',
        modernName: 'Caesarea Maritima 遗址（以色列凯撒利亚）',
        coordinates: [34.8917, 32.5000],
        events: [
          {
            title: '亚迦布的预言',
            description:
              '在该撒利亚传福音的腓利家中，先知亚迦布拿保罗的腰带捆上自己的手脚，预言保罗将在耶路撒冷被捆绑交在外邦人手里。保罗却说他为主的名连死也愿意。',
            scripture: '使徒行传 21:8-14',
            scriptureText:
              '保罗说："你们为什么这样痛哭，使我心碎呢？我为主耶稣的名，不但被人捆绑，就是死在耶路撒冷也是愿意的。"',
          },
        ],
      },
      {
        id: 'p3-jerusalem',
        name: '耶路撒冷',
        modernName: 'Jerusalem（耶路撒冷）',
        coordinates: [35.2345, 31.7767],
        events: [
          {
            title: '在圣殿被捕',
            description:
              '保罗到耶路撒冷后，在圣殿里被从亚细亚来的犹太人煽动的群众抓住，险些被打死。千夫长带兵救下他并把他捆锁，保罗由此开始了漫长的被囚与申辩历程。',
            scripture: '使徒行传 21:27-36',
            scriptureText:
              '合城都震动，百姓一齐跑来，拿住保罗，拉他出殿，殿门立刻都关了。',
          },
        ],
      },
    ],
  },
];
