// One-shot content update for jardimluisdecamoes.com (4 locales)
// - rewrites meta TDK
// - syncs Google review count
// - appends 2 educational knowledge sections
// - adds facilities / weather / faq blocks
// - polishes remaining English chrome labels in pt.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const messagesDir = path.join(dir, '..', 'src', 'messages');
const files = ['pt.json', 'en.json', 'zh.json', 'mwl.json'];

const meta = {
  pt: {
    title: 'Jardim Luís de Camões (Leiria): Guia Completo & O Que Fazer',
    description:
      'Descubra o Jardim Luís de Camões em Leiria: jardim memorial gratuito junto ao Castelo, com estátua do poeta, fonte e bancos. Aberto todo o dia. Mapa, o que visitar e dicas práticas.',
  },
  en: {
    title: 'Jardim Luís de Camões, Leiria: Visitor Guide & Things to Do',
    description:
      'Visit Jardim Luís de Camões in Leiria, Portugal: a free memorial garden beside Leiria Castle, with a Camões statue, fountain and benches. Open all day. Map, what to see and visitor tips.',
  },
  zh: {
    title: 'Jardim Luís de Camões（莱里亚）：游览指南与周边去处',
    description:
      '探索葡萄牙莱里亚的 Jardim Luís de Camões 纪念花园：紧邻莱里亚城堡，全天免费开放，园中有诗人卡蒙斯雕像、喷泉与长椅。附地图、周边去处与实用游览贴士。',
  },
  mwl: {
    title: 'Jardim Luís de Camões (Leiria): Guia Cumpleto & O Que Bejitar',
    description:
      'Çcubra l Jardim Luís de Camões an Leiria: jardin memorial gratuito acerca de l Castielho, cula státua de l poeta, fuonte i bancos. Abierto to l die. Mapa, que bejitar i dicas prácticas.',
  },
};

const knowledgeExtra = {
  pt: [
    {
      id: 'camoes',
      title: 'Quem Foi Luís de Camões?',
      content:
        'Luís Vaz de Camões (c. 1524–1580) é considerado o maior poeta de Portugal e um dos nomes centrais da língua portuguesa. Escreveu Os Lusíadas (1572), o poema épico que celebra a expansão marítima portuguesa e a viagem de Vasco da Gama à Índia. A sua obra tornou-se um símbolo da identidade nacional — por isso o português é tantas vezes chamado «a língua de Camões». No dia 10 de junho, aniversário da sua morte, celebra-se em Portugal o Dia de Portugal, de Camões e das Comunidades Portuguesas.',
    },
    {
      id: 'leiria',
      title: 'O Castelo e a Cidade de Leiria',
      content:
        'Leiria, no Centro de Portugal, cresceu à volta do seu castelo junto ao rio Lis, tomado aos muçulmanos no século XII no contexto da Reconquista. No reinado de D. Dinis (1279–1325) o castelo foi transformado em paço régio: o rei e a rainha Santa Isabel passaram longas temporadas na cidade, onde se construiu a célebre galeria gótica de arcos ogivais. Foi também por ordem de D. Dinis que se mandou plantar o Pinhal de Leiria, junto à costa. O jardim fica mesmo junto a esta colina histórica, no coração do centro antigo, sendo um ponto de partida natural para conhecer Leiria.',
    },
  ],
  en: [
    {
      id: 'camoes',
      title: 'Who Was Luís de Camões?',
      content:
        "Luís Vaz de Camões (c. 1524–1580) is regarded as Portugal's greatest poet and a central figure of the Portuguese language. He wrote The Lusiads (Os Lusíadas, 1572), the epic poem celebrating Portugal's maritime expansion and Vasco da Gama's voyage to India. His work became a symbol of national identity — which is why Portuguese is often called 'the language of Camões'. On 10 June, the anniversary of his death, Portugal celebrates the Day of Portugal, Camões and the Portuguese Communities.",
    },
    {
      id: 'leiria',
      title: 'The Castle and the City of Leiria',
      content:
        'Leiria, in central Portugal, grew around its castle beside the River Lis. The stronghold was taken from the Moors in the 12th century during the Reconquista. Under King Dinis (1279–1325) the castle became a royal palace: the king and Queen Saint Elizabeth spent long periods in the city, where the famous Gothic loggia with ogival arches was built. King Dinis also ordered the planting of the Pinhal de Leiria forest near the coast. The garden stands right beside this historic hill, in the heart of the old town, making it a natural starting point to explore Leiria.',
    },
  ],
  zh: [
    {
      id: 'camoes',
      title: '谁是路易斯·德·卡蒙斯？',
      content:
        '路易斯·瓦斯·德·卡蒙斯（约1524–1580）被誉为葡萄牙最伟大的诗人，也是葡萄牙语世界的核心人物。他创作的史诗《卢济塔尼亚人之歌》（Os Lusíadas，1572年出版）歌颂了葡萄牙的海上扩张与瓦斯科·达伽马远航印度的历程。他的作品成为民族认同的象征——因此葡萄牙语常被称为“卡蒙斯的语言”。1580年6月10日是卡蒙斯的忌日，如今葡萄牙在每年这一天庆祝“葡萄牙、卡蒙斯与葡语国家共同体日”。',
    },
    {
      id: 'leiria',
      title: '莱里亚城堡与这座城市',
      content:
        '莱里亚位于葡萄牙中部，城市围绕利什河（Rio Lis）旁的城堡发展起来；12世纪收复失地运动期间，这座要塞从穆斯林手中夺回。在国王迪尼什一世（D. Dinis，1279–1325年在位）统治时期，城堡被改造成王室宫邸：国王与王后圣伊莎贝尔常年在此居住，宫内修建了著名的哥特式尖拱廊（galeria gótica），成为该城堡的标志。迪尼什一世还下令在沿海地区种植莱里亚松林（Pinhal de Leiria）。花园就坐落在这一历史山丘脚下、老城中心，是探索莱里亚的理想起点。',
    },
  ],
  mwl: [
    {
      id: 'camoes',
      title: 'Quien Fui Luís de Camões?',
      content:
        'Luís Vaz de Camões (c. 1524–1580) ye cunsidrado l maior poeta de Pertual i un de ls nomes centrales de la léngua pertuesa. Scriu ls Lusíadas (1572), l poema épico que celebra la spanson marítima pertuesa i la biaige de Vasco de Gama a la Índia. La sue obra tornou-se un simblo de la eidantidade nacional — ye por esso que l pertués ye tantas bezes chamado «la léngua de Camões». A 10 de júnio, data de la sue muorte, celebra-se an Pertual l Die de Pertual, de Camões i de las Quemunidades Pertuesas.',
    },
    {
      id: 'leiria',
      title: 'L Castielho i la Cidade de Leiria',
      content:
        'Leiria, an Pertual central, creciu an torno de l sou castielho, acerca de l riu Lis, tomado als muçulmanos ne l seclo XII ne l cuntesto de la Reconquista. Ne l reinado de D. Dinis (1279–1325) l castielho fui trasnformado an paço régio: l rei i la reina Santa Isabel passórun lhongas temporadas na cidade, adonde se custruiu la célebre galerie gótica d’arcores ogibales. Fui tamien por orde de D. Dinis que se mandou plantar l Pinhal de Leiria, junto a la cuosta. L jardin queda mesmo acerca de esta colina stórica, ne l coraçon de l centro antigo, sendo un punto de partida natural para coincer Leiria.',
    },
  ],
};

const knowledgeTitle = {
  pt: 'Conhecer o Jardim e a Cidade',
  en: 'Understanding the Garden & the City',
  zh: '了解花园与这座城市',
  mwl: 'Coincer l Jardin i la Cidade',
};

const facilities = {
  pt: {
    title: 'Serviços e Comodidades nas Proximidades',
    subtitle:
      'O jardim está no centro de Leiria, rodeado de serviços essenciais. Listamos apenas tipos de serviços — sem recomendar estabelecimentos específicos.',
    neutralNote:
      'Site de divulgação sem fins lucrativos: apresentamos tipos de serviços disponíveis na zona, sem sugerir marcas ou estabelecimentos concretos.',
    items: [
      {
        title: 'Casas de Banho / WC',
        desc: 'Há casas de banho públicas e sanitários em espaços municipais no centro histórico; confirme os acessos e horários locais.',
      },
      {
        title: 'Estacionamento',
        desc: 'Parques e estacionamento na via pública pagos a 1–2 minutos a pé do jardim; atenção a parquímetros e limites de tempo.',
      },
      {
        title: 'Cafés e Restaurantes',
        desc: 'Pastelarias, cafés, tascas e restaurantes de cozinha regional do Centro de Portugal rodeiam o jardim no centro antigo.',
      },
      {
        title: 'Alojamento',
        desc: 'Hotéis, guesthouses e apartamentos no centro histórico e zonas envolventes; opções na costa a cerca de 30 minutos de carro.',
      },
      {
        title: 'Supermercados e Lojas',
        desc: 'Minimercados e supermercados no centro para compras rápidas, além do comércio tradicional e de artesanato.',
      },
      {
        title: 'Combustível e Carregamento Elétrico',
        desc: 'Postos de abastecimento na cidade e pontos de carregamento para veículos elétricos em expansão na região.',
      },
      {
        title: 'Farmácias',
        desc: 'Farmácias na zona central, habitualmente com horários de turno na região.',
      },
      {
        title: 'Bancos e Caixas Multibanco',
        desc: 'Balcões bancários e caixas multibanco (ATM) nas principais ruas do centro de Leiria.',
      },
    ],
  },
  en: {
    title: 'Nearby Facilities & Services',
    subtitle:
      'The garden sits in the centre of Leiria, surrounded by essential services. We only list types of services — no specific businesses are recommended.',
    neutralNote:
      'This is a non-profit information website: we present the types of services available nearby, without endorsing any brands or specific venues.',
    items: [
      {
        title: 'Public Toilets / WC',
        desc: 'Public toilets and municipal facilities can be found in the historic centre; check local access and opening times.',
      },
      {
        title: 'Parking',
        desc: 'Paid street parking and car parks are a 1–2 minute walk from the garden; watch for meters and time limits.',
      },
      {
        title: 'Cafés and Restaurants',
        desc: 'Bakeries, cafés, snack bars and restaurants serving central-Portugal cuisine surround the garden in the old town.',
      },
      {
        title: 'Accommodation',
        desc: 'Hotels, guesthouses and apartments in the historic centre and surroundings; coastal options are about 30 minutes away by car.',
      },
      {
        title: 'Supermarkets and Shops',
        desc: 'Small supermarkets and grocery stores in the centre for quick purchases, plus traditional shops and crafts.',
      },
      {
        title: 'Fuel and EV Charging',
        desc: 'Petrol stations in the city and a growing number of electric-vehicle charging points in the region.',
      },
      {
        title: 'Pharmacies',
        desc: 'Pharmacies in the central area, usually operating on a local duty-rotation schedule.',
      },
      {
        title: 'Banks and ATMs',
        desc: 'Bank branches and ATMs can be found along the main streets of Leiria centre.',
      },
    ],
  },
  zh: {
    title: '周边设施与服务',
    subtitle: '花园位于莱里亚市中心，周边生活服务齐全。此处仅列出服务类型，不做具体商户推荐。',
    neutralNote: '本站为非营利科普网站：仅客观介绍周边可用的服务类型，不推荐任何品牌或具体商家。',
    items: [
      { title: '公共卫生间 / WC', desc: '历史中心有公共卫生间及市政设施内的洗手间，请留意开放时间与入口。' },
      { title: '停车', desc: '步行1–2分钟可达路边收费停车位与停车场；注意停车计时器与时限。' },
      { title: '咖啡馆与餐厅', desc: '老城区花园周边有面包店、咖啡馆、小餐馆及供应葡萄牙中部风味的地方餐厅。' },
      { title: '住宿', desc: '历史中心及周边有酒店、民宿与公寓；海岸地区的住宿距此约30分钟车程。' },
      { title: '超市与商店', desc: '市中心有小型超市和杂货店，可快速采购日常用品；也有传统商店与手工艺品店。' },
      { title: '加油与电动汽车充电', desc: '市区设有加油站，区域内电动汽车充电点正在不断增加。' },
      { title: '药店', desc: '中心区域有药店，通常实行当地轮值值班制度。' },
      { title: '银行与ATM', desc: '莱里亚市中心主要街道设有银行网点与自动取款机（ATM）。' },
    ],
  },
  mwl: {
    title: 'Serbícios i Cumodidades Ne las Perurmidades',
    subtitle:
      'L jardin queda ne l centro de Leiria, arrodeado de serbícios eissenciales. Apersentamos solo tipos de serbícios — sin recomendar stablecimientos specíficos.',
    neutralNote:
      'Sítio de divulgaçon sin fines lucratibos: apersentamos tipos de serbícios çponibles na zona, sin sugerir marcas nin stablecimientos cuncretos.',
    items: [
      {
        title: 'Casas de Banho / WC',
        desc: 'Eisiste casas de banho públicas i sanitários an eiquipamientos municipales ne l centro stórico; cunfirme ls acessos i horários locales.',
      },
      {
        title: 'Parque',
        desc: 'Parques i staçonamiento na bía pública pagos a 1–2 minutos de camino de l jardin; atenção als parquímetros i lhemites de tiempo.',
      },
      {
        title: 'Cafés i Restourantes',
        desc: 'Pastelaries, cafés, tascas i restourantes de quemido regional de l Centro de Pertual arrodeian l jardin ne l centro antigo.',
      },
      {
        title: 'Alojamiento',
        desc: 'Hoteles, guesthouses i apartamientos ne l centro stórico i zonas anbolbentes; oupçones na cuosta a cerca de 30 minutos de carro.',
      },
      {
        title: 'Supermercados i Botigas',
        desc: "Minisupermercados i supermercados ne l centro para cumpras rápidas, para alhá de l comércio tradecional i de l'artesanato.",
      },
      {
        title: 'Cumbustible i Carregamiento Elétrico',
        desc: 'Postos de abastecimiento na cidade i puntos de carregamiento para beiclos eilétricos an spanson na region.',
      },
      {
        title: 'Farmácias',
        desc: 'Farmácias na zona central, houabitualmente cun horários de turno na region.',
      },
      {
        title: 'Bancos i Caixas Multibanco',
        desc: 'Balcones bancairos i caixas multibanco (ATM) nas percipales ruas de l centro de Leiria.',
      },
    ],
  },
};

const weather = {
  pt: {
    title: 'Tempo Agora e Previsão',
    subtitle:
      'Condições atuais e previsão a 7 dias no Jardim Luís de Camões, Leiria.',
    now: 'Agora',
    feelsLike: 'Sensação',
    humidity: 'Humidade',
    wind: 'Vento',
    precip: 'Precipitação',
    updated: 'Atualizado',
    labels: {
      clear: 'Céu limpo',
      partly: 'Parcialmente nublado',
      cloudy: 'Nublado',
      fog: 'Nevoeiro',
      rain: 'Chuva',
      snow: 'Neve',
      storm: 'Trovoada',
      unknown: '—',
    },
    unavailableTitle: 'Previsão indisponível',
    unavailableText:
      'Não foi possível obter os dados meteorológicos neste momento. Volte mais tarde.',
    source: 'Dados meteorológicos: Open-Meteo',
  },
  en: {
    title: 'Weather Now & 7-Day Forecast',
    subtitle:
      'Current conditions and a 7-day forecast for Jardim Luís de Camões, Leiria.',
    now: 'Now',
    feelsLike: 'Feels like',
    humidity: 'Humidity',
    wind: 'Wind',
    precip: 'Precipitation',
    updated: 'Updated',
    labels: {
      clear: 'Clear sky',
      partly: 'Partly cloudy',
      cloudy: 'Cloudy',
      fog: 'Fog',
      rain: 'Rain',
      snow: 'Snow',
      storm: 'Thunderstorm',
      unknown: '—',
    },
    unavailableTitle: 'Forecast unavailable',
    unavailableText:
      'Weather data could not be retrieved right now. Please try again later.',
    source: 'Weather data: Open-Meteo',
  },
  zh: {
    title: '实时天气与未来7天预报',
    subtitle: 'Jardim Luís de Camões（莱里亚）的当前天气与7天预报。',
    now: '现在',
    feelsLike: '体感温度',
    humidity: '湿度',
    wind: '风速',
    precip: '降水概率',
    updated: '更新时间',
    labels: {
      clear: '晴',
      partly: '多云间晴',
      cloudy: '阴',
      fog: '雾',
      rain: '雨',
      snow: '雪',
      storm: '雷暴',
      unknown: '—',
    },
    unavailableTitle: '预报暂不可用',
    unavailableText: '暂时无法获取天气数据，请稍后再试。',
    source: '天气数据来源：Open-Meteo',
  },
  mwl: {
    title: 'Tiempo Agora i Prebison',
    subtitle: 'Cundiçones atuales i prebison de 7 dies ne l Jardim Luís de Camões, Leiria.',
    now: 'Agora',
    feelsLike: 'Sençaçon',
    humidity: 'Houmedade',
    wind: 'Biento',
    precip: 'Precipitaçon',
    updated: 'Atualizado',
    labels: {
      clear: 'Cielo limpo',
      partly: 'Parcialmente nubrado',
      cloudy: 'Nubrado',
      fog: 'Néboa',
      rain: 'Chuba',
      snow: 'Niefe',
      storm: 'Troboada',
      unknown: '—',
    },
    unavailableTitle: 'Prebison andisponible',
    unavailableText: 'Nun fui possible oubter ls dados meteorológicos neste momento. Torne mais tarde.',
    source: 'Dados meteorológicos: Open-Meteo',
  },
};

const footerLinks = {
  pt: [
    { name: 'Visit Portugal — Turismo de Portugal', url: 'https://www.visitportugal.com/pt-pt' },
    { name: 'Direção-Geral do Património Cultural', url: 'https://www.patrimoniocultural.gov.pt/' },
    { name: 'Turismo Centro de Portugal', url: 'https://www.centerofportugal.com/' },
    { name: 'Câmara Municipal de Leiria', url: 'https://www.cm-leiria.pt/' },
    { name: 'AIMA — Agência para a Integração, Migrações e Asilo', url: 'https://aima.gov.pt/pt' },
  ],
  en: [
    { name: 'Visit Portugal — National Tourism Authority', url: 'https://www.visitportugal.com/en' },
    { name: 'Património Cultural (DGPC)', url: 'https://www.patrimoniocultural.gov.pt/' },
    { name: 'Turismo Centro de Portugal', url: 'https://www.centerofportugal.com/' },
    { name: 'Leiria City Council', url: 'https://www.cm-leiria.pt/' },
    { name: 'AIMA — Agency for Integration, Migration and Asylum', url: 'https://aima.gov.pt/pt' },
  ],
  zh: [
    { name: '葡萄牙国家旅游局（Visit Portugal）', url: 'https://www.visitportugal.com/en' },
    { name: '葡萄牙文化遗产总局（DGPC）', url: 'https://www.patrimoniocultural.gov.pt/' },
    { name: '葡萄牙中部大区旅游局', url: 'https://www.centerofportugal.com/' },
    { name: '莱里亚市政府', url: 'https://www.cm-leiria.pt/' },
    { name: 'AIMA — 葡萄牙移民与庇护署', url: 'https://aima.gov.pt/pt' },
  ],
  mwl: [
    { name: 'Bejita Pertual — Turismo de Pertual', url: 'https://www.visitportugal.com/pt-pt' },
    { name: 'Direçon-Geral de l Património Cultural', url: 'https://www.patrimoniocultural.gov.pt/' },
    { name: 'Turismo Centro de Pertual', url: 'https://www.centerofportugal.com/' },
    { name: 'Cámara Municipal de Leiria', url: 'https://www.cm-leiria.pt/' },
    { name: 'AIMA — Agéncia pa la Amportaçon, Migraçones i Asilo', url: 'https://aima.gov.pt/pt' },
  ],
};

const footerPhotoCredit = {
  pt: 'Todas as fotografias apresentadas neste site permanecem propriedade dos respetivos fotógrafos, com direitos de autor reservados.',
  en: 'All photos displayed on this website remain the property of and copyrighted by their original photographers.',
  zh: '本网站所展示的所有图片，其产权及版权均归原摄影者所有。',
  mwl: 'Todas las fotografie apersentadas neste site quedan a la pertenéncia de ls respetibos fotógrafos, cun dreitos d\'outor reserbados.',
};

const sourcesBlock = {
  pt: {
    title: 'Fontes e Referências',
    note: 'Esta é uma página informativa, sem fins lucrativos, mantida pela comunidade. O conteúdo foi compilado a partir de fontes oficiais públicas e informações locais, procurando manter-se neutro e verificável.',
    officialLabel: 'Portais oficiais de informação',
    lastUpdated: 'Última atualização: 4 de setembro de 2026',
  },
  en: {
    title: 'Sources & References',
    note: 'This is a non-profit, community-maintained guide. It was compiled from publicly available official sources and local information, keeping the content neutral and verifiable.',
    officialLabel: 'Official information portals',
    lastUpdated: 'Last updated: 4 September 2026',
  },
  zh: {
    title: '资料来源与参考',
    note: '本页为社区维护的非盈利科普指南，内容依据可公开核实的官方资料与实地信息整理，力求中立客观。',
    officialLabel: '官方信息门户',
    lastUpdated: '最后更新：2026年9月4日',
  },
  mwl: {
    title: 'Fuontes i Refréncias',
    note: 'Esta ye ua páigina anformatiba, sin fines lucratibos, mantenida pula quemunidade. L cuntenido fui cumpilado a partir de fuontes oufeciales públicas i anformaçones locales, buscando quedar neutro i berificable.',
    officialLabel: 'Portales oufeciales d\'anformaçon',
    lastUpdated: 'Redadeira atualizaçon: 4 de setembre de 2026',
  },
};

const mapSectionExtra = {
  pt: {
    authority: 'Fonte oficial',
    authorityLinkLabel: 'Turismo Centro de Portugal — portal regional de turismo',
    authorityLinkUrl: 'https://www.centerofportugal.com/',
  },
  en: {
    authority: 'Official source',
    authorityLinkLabel: 'Turismo Centro de Portugal (regional tourism board)',
    authorityLinkUrl: 'https://www.centerofportugal.com/',
  },
  zh: {
    authority: '官方来源',
    authorityLinkLabel: '葡萄牙中部大区旅游局（区域旅游局官网）',
    authorityLinkUrl: 'https://www.centerofportugal.com/',
  },
  mwl: {
    authority: 'Fuonte oufecial',
    authorityLinkLabel: 'Turismo Centro de Pertual (portal regional de turismo)',
    authorityLinkUrl: 'https://www.centerofportugal.com/',
  },
};

const basicInfoPhone = {
  pt: { phone: 'Telefone', phoneValue: '+351 244 839 500' },
  en: { phone: 'Phone', phoneValue: '+351 244 839 500' },
  zh: { phone: '电话', phoneValue: '+351 244 839 500' },
  mwl: { phone: 'Telefone', phoneValue: '+351 244 839 500' },
};

const faq = {
  pt: {
    title: 'Perguntas Frequentes',
    subtitle: 'Respostas rápidas para preparar a sua visita.',
    items: [
      {
        q: 'A entrada no jardim é gratuita?',
        a: 'Sim. O Jardim Luís de Camões é um espaço público ao ar livre, gratuito e aberto a todos.',
      },
      {
        q: 'Qual é o horário de funcionamento?',
        a: 'O jardim está aberto todo o dia, todos os dias, sem bilhete nem restrições sazonais. O início da manhã e o fim da tarde são os momentos mais tranquilos.',
      },
      {
        q: 'O que posso visitar nas proximidades?',
        a: 'A poucos minutos a pé ficam o Castelo de Leiria, a Sé de Leiria, os museus da cidade e o centro histórico com comércio tradicional.',
      },
      {
        q: 'Onde posso estacionar?',
        a: 'Existe estacionamento pago na via pública a 1–2 minutos a pé do jardim. Preste atenção aos parquímetros e aos limites de tempo.',
      },
      {
        q: 'Quanto tempo devo dedicar à visita?',
        a: 'Para o jardim em si bastam 30 a 60 minutos; recomendamos combiná-lo com o Castelo de Leiria e o centro histórico para um passeio de meio dia.',
      },
      {
        q: 'Qual é a melhor altura para visitar?',
        a: 'O jardim é agradável durante todo o ano. De manhã cedo ou ao fim da tarde a luz é melhor para fotografias e o ambiente é mais calmo.',
      },
      {
        q: 'Onde fica o jardim e como chego?',
        a: 'Fica no Largo 5 de Outubro 48, no centro de Leiria, junto ao castelo. A estação de comboios e autocarros fica a uma curta caminhada.',
      },
    ],
  },
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Quick answers to help you plan your visit.',
    items: [
      {
        q: 'Is admission to the garden free?',
        a: 'Yes. Jardim Luís de Camões is a free public open-air space, open to everyone.',
      },
      {
        q: 'What are the opening hours?',
        a: 'The garden is open all day, every day, with no ticket and no seasonal restrictions. Early morning and late afternoon are the quietest times.',
      },
      {
        q: 'What can I visit nearby?',
        a: 'Within a short walk you will find Leiria Castle, Leiria Cathedral, the city museums and the historic centre with traditional shops.',
      },
      {
        q: 'Where can I park?',
        a: 'Paid street parking is available a 1–2 minute walk from the garden. Watch for parking meters and time limits.',
      },
      {
        q: 'How long should I spend there?',
        a: 'Allow 30 to 60 minutes for the garden itself; we recommend combining it with Leiria Castle and the historic centre for a half-day outing.',
      },
      {
        q: 'What is the best time to visit?',
        a: 'The garden is pleasant all year round. Early morning or late afternoon offers the best light for photos and a calmer atmosphere.',
      },
      {
        q: 'Where is the garden and how do I get there?',
        a: 'It is at Largo 5 de Outubro 48, in the centre of Leiria, next to the castle. The train and bus station is a short walk away.',
      },
    ],
  },
  zh: {
    title: '常见问题',
    subtitle: '快速解答，助您规划游览。',
    items: [
      { q: '花园入场免费吗？', a: '是的。Jardim Luís de Camões 是免费开放的户外公共空间，欢迎所有人进入。' },
      { q: '开放时间是？', a: '花园全天开放、全年无休，无需门票、不受季节限制。清晨与傍晚时段最为清静。' },
      { q: '附近有什么可游览的？', a: '步行几分钟即可到达莱里亚城堡、莱里亚主教堂、城市博物馆，以及拥有传统商铺的老城区。' },
      { q: '在哪里停车？', a: '距花园步行1–2分钟有收费的路边停车位。请注意停车计时器与时限。' },
      { q: '参观需要多长时间？', a: '仅游览花园30–60分钟即可；建议与莱里亚城堡和老城区串联游览，安排半天行程。' },
      { q: '什么时间参观最好？', a: '花园四季皆宜。清晨或傍晚光线最适合拍照，环境也更安静。' },
      { q: '花园在哪里，如何前往？', a: '位于莱里亚市中心 Largo 5 de Outubro 48，紧邻城堡。火车站与汽车站均在步行范围内。' },
    ],
  },
  mwl: {
    title: 'Perguntas Frequentes',
    subtitle: 'Respuostas rápidas para preparar la sue bejita.',
    items: [
      {
        q: 'La antrada ne l jardin ye gratuita?',
        a: 'Si. L Jardim Luís de Camões ye un spácio público a l aire libre, gratuito i abierto a todos.',
      },
      {
        q: 'Qual ye l horairo de funcionamiento?',
        a: 'L jardin stá abierto to l die, todos ls dies, sin bilhete nin restriçones sazinales. L ampeço de la manhana i l fin de la tarde son ls momentos mais sossegados.',
      },
      {
        q: 'Que puodo bejitar ne las perurmidades?',
        a: 'A poucos minutos de camino ficam l Castielho de Leiria, la Sé de Leiria, ls museus de la cidade i l centro stórico cun comércio tradecional.',
      },
      {
        q: 'Adonde puodo parcar?',
        a: 'Eisiste staçonamiento pago na bía pública a 1–2 minutos de camino de l jardin. Atenda als parquímetros i als lhemites de tiempo.',
      },
      {
        q: 'Quanto tiempo debio dedicar a la bejita?',
        a: 'Para l jardin an si bastan 30 a 60 minutos; recomenda-se cumbinar cul Castielho de Leiria i l centro stórico para un passeio de meio die.',
      },
      {
        q: 'Qual ye la melhor altura para bejitar?',
        a: 'L jardin ye agradable durante to l anho. De manhana cedo ó al fin de la tarde la luç ye melhor para fotografies i l ambiente mais sossegado.',
      },
      {
        q: 'Adonde queda l jardin i cumo chego?',
        a: 'Queda ne l Largo 5 de Outubre 48, ne l centro de Leiria, acerca de l castielho. La staçon de comboios i outocarros queda a ua pequeinha caminada.',
      },
    ],
  },
};

// English -> Portuguese polish (exact-value match, applied to pt.json only)
const ptPolish = [
  ['Open 24 Hours', 'Aberto 24 Horas'],
  ['View Location', 'Ver Localização'],
  ['Back to Home', 'Voltar ao Início'],
  ['Home', 'Início'],
  ['Gallery', 'Galeria'],
  ['Map', 'Mapa'],
  ['Reviews', 'Avaliações'],
  ['Visiting Tips', 'Dicas de Visita'],
  ['Basic Information', 'Informações Básicas'],
  ['Official Name', 'Nome Oficial'],
  ['Attraction Type', 'Tipo de Atração'],
  ['Country', 'País'],
  ['City', 'Cidade'],
  ['Google Rating', 'Avaliação Google'],
  ['Address', 'Morada'],
  ['Opening Hours', 'Horário de Funcionamento'],
  ['Ticket Information', 'Informação de Bilhetes'],
  ['Transportation', 'Como Chegar'],
  ['From the Airport', 'A partir do Aeroporto'],
  ['Driving', 'De Carro'],
  ['Public Transport', 'Transportes Públicos'],
  ['Short-Distance Travel', 'Percursos Curtos'],
  ['Cycling', 'Ciclismo'],
  ['Travel Tips', 'Dicas de Viagem'],
  ['Visiting Route', 'Roteiro de Visita'],
  ['Visiting Notes', 'Notas de Visita'],
  ['Photo Spots', 'Melhores Pontos para Fotografar'],
  ['Photography Tips', 'Dicas de Fotografia'],
  ['Accommodation Suggestions', 'Sugestões de Alojamento'],
  ['Local Cuisine', 'Gastronomia Local'],
  ['Accommodation Notes', 'Notas de Alojamento'],
  ['Stunning Photos', 'Fotos do Jardim'],
  ['Show All Photos', 'Mostrar Todas as Fotos'],
  ['Visitor Reviews', 'Avaliações de Visitantes'],
  ['View on Google Maps', 'Ver no Google Maps'],
  ['Transportation Guide', 'Mapa e Localização'],
];

function polishValues(obj, map) {
  for (const key of Object.keys(obj)) {
    const v = obj[key];
    if (typeof v === 'string') {
      const hit = map.find(([from]) => v === from);
      if (hit) obj[key] = hit[1];
    } else if (v && typeof v === 'object') {
      polishValues(v, map);
    }
  }
}

function apply(localeKey, file) {
  const abs = path.join(messagesDir, file);
  const obj = JSON.parse(fs.readFileSync(abs, 'utf8'));

  obj.meta = meta[localeKey];

  if (obj.hero && typeof obj.hero === 'object') {
    obj.hero.reviewCount = '6,696';
  }

  if (obj.knowledge && Array.isArray(obj.knowledge.sections)) {
    const existing = new Set(obj.knowledge.sections.map((s) => s.id));
    obj.knowledge.sections = obj.knowledge.sections.concat(
      knowledgeExtra[localeKey].filter((x) => !existing.has(x.id))
    );
  } else {
    obj.knowledge = { sections: knowledgeExtra[localeKey] };
  }
  obj.knowledge.title = knowledgeTitle[localeKey];

  obj.facilities = facilities[localeKey];
  obj.weather = weather[localeKey];
  obj.faq = faq[localeKey];
  if (obj.footer && typeof obj.footer === 'object') {
    obj.footer.links = footerLinks[localeKey];
    obj.footer.photoCredit = footerPhotoCredit[localeKey];
    delete obj.footer.officialLinks; // legacy unrendered block (leftover template data)
  }
  if (obj.mapSection && typeof obj.mapSection === 'object') {
    obj.mapSection = { ...obj.mapSection, ...mapSectionExtra[localeKey] };
  }
  if (obj.basicInfo && typeof obj.basicInfo === 'object') {
    obj.basicInfo = { ...obj.basicInfo, ...basicInfoPhone[localeKey] };
  }
  obj.sources = sourcesBlock[localeKey];

  if (localeKey === 'pt') {
    polishValues(obj, ptPolish);
  }

  fs.writeFileSync(abs, JSON.stringify(obj, null, 2) + '\n', 'utf8');
  console.log('updated', file);
}

for (const localeKey of ['pt', 'en', 'zh', 'mwl']) {
  apply(localeKey, files[['pt', 'en', 'zh', 'mwl'].indexOf(localeKey)]);
}

// sanity: top-level key parity
function topKeys(file) {
  return Object.keys(JSON.parse(fs.readFileSync(path.join(messagesDir, file), 'utf8'))).sort();
}
const sets = files.map((f) => topKeys(f).join(','));
const same = sets.every((s) => s === sets[0]);
console.log('top-level parity:', same ? 'PASS' : 'FAIL');
if (!same) {
  files.forEach((f, i) => console.log(f, sets[i]));
}
