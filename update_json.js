const fs = require('fs');
const path = require('path');

const locales = ['zh', 'en', 'pt', 'mwl'];

locales.forEach(loc => {
  const filePath = path.join(__dirname, 'src/messages', `${loc}.json`);
  if (!fs.existsSync(filePath)) return;
  
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Common replacements
  const replaceStr = (str) => {
    if (typeof str !== 'string') return str;
    return str
      .replace(/Centro Histórico de Évora/g, 'Jardim Luís de Camões')
      .replace(/Évora/g, 'Leiria')
      .replace(/埃武拉历史中心/g, '路易斯·德·卡蒙斯花园')
      .replace(/埃武拉/g, '莱里亚')
      .replace(/阿连特茹/g, '中部大区')
      .replace(/7000-661/g, '2400-137')
      .replace(/Jardim Diana/g, 'Largo 5 de Outubro 48');
  };

  const traverse = (obj) => {
    for (let k in obj) {
      if (typeof obj[k] === 'string') {
        obj[k] = replaceStr(obj[k]);
      } else if (typeof obj[k] === 'object' && obj[k] !== null) {
        traverse(obj[k]);
      }
    }
  };

  traverse(data);

  // Specific overrides based on user input
  if (loc === 'zh') {
    data.hero.reviewCount = "6,635";
    data.hero.subtitle = "莱里亚 · 葡萄牙";
    data.basicInfo.typeValue = "花园";
    data.basicInfo.addressValue = "Largo 5 de Outubro 48, 2400-137 Leiria, 葡萄牙";
    data.basicInfo.plusCodeValue = "P5VV+VF 莱里亚 葡萄牙";
    data.mapSection.subtitle = "Largo 5 de Outubro 48, 2400-137 Leiria, 葡萄牙";
    data.footer.rights = "© 2026 Jardim Luís de Camões. 保留所有权利。";
  } else if (loc === 'en') {
    data.hero.reviewCount = "6,635";
    data.hero.subtitle = "Leiria · Portugal";
    data.basicInfo.typeValue = "Garden";
    data.basicInfo.addressValue = "Largo 5 de Outubro 48, 2400-137 Leiria, Portugal";
    data.basicInfo.plusCodeValue = "P5VV+VF Leiria Portugal";
    data.mapSection.subtitle = "Largo 5 de Outubro 48, 2400-137 Leiria, Portugal";
    data.footer.rights = "© 2026 Jardim Luís de Camões. All rights reserved.";
  } else if (loc === 'pt') {
    data.hero.reviewCount = "6,635";
    data.hero.subtitle = "Leiria · Portugal";
    data.basicInfo.typeValue = "Jardim";
    data.basicInfo.addressValue = "Largo 5 de Outubro 48, 2400-137 Leiria, Portugal";
    data.basicInfo.plusCodeValue = "P5VV+VF Leiria Portugal";
    data.mapSection.subtitle = "Largo 5 de Outubro 48, 2400-137 Leiria, Portugal";
    data.footer.rights = "© 2026 Jardim Luís de Camões. Todos os direitos reservados.";
  } else if (loc === 'mwl') {
    data.hero.reviewCount = "6,635";
    data.hero.subtitle = "Leiria · Pertual";
    data.basicInfo.typeValue = "Jardim";
    data.basicInfo.addressValue = "Largo 5 de Outubro 48, 2400-137 Leiria, Pertual";
    data.basicInfo.plusCodeValue = "P5VV+VF Leiria Pertual";
    data.mapSection.subtitle = "Largo 5 de Outubro 48, 2400-137 Leiria, Pertual";
    data.footer.rights = "© 2026 Jardim Luís de Camões. Todos ls dreitos reserbados.";
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});
