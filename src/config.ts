export const siteName = 'Jardim Luís de Camões';
export const defaultDomain = 'jardimluisdecamoes.com';

function resolveBaseUrl(): string {
  const fromEnv =
    process.env.CURRENT_SITE_DOMAIN?.trim() || process.env.CURRENT_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.startsWith('http://') || fromEnv.startsWith('https://')
      ? fromEnv.replace(/\/+$/, '')
      : `https://${fromEnv.replace(/\/+$/, '')}`;
  }
  return `https://${defaultDomain}`;
}

/** 站点基地址。优先读取构建/部署时的 CURRENT_SITE_DOMAIN（或 CURRENT_SITE_URL），
 *  未设置时回退到默认正式域名，保证本地构建不中断。 */
export const baseUrl = resolveBaseUrl();
