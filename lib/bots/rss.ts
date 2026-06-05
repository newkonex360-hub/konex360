export type RssItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string | null;
};

const decodeEntities = (value: string) =>
  value
    .replaceAll("<![CDATA[", "")
    .replaceAll("]]>", "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .trim();

const stripHtml = (value: string) => decodeEntities(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " "));

const readTag = (xml: string, tag: string) => {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeEntities(match[1]) : "";
};

export const parseRss = (xml: string): RssItem[] => {
  const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) ?? xml.match(/<entry[\s\S]*?<\/entry>/gi) ?? [];

  return itemMatches.map((item) => {
    const atomLink = item.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/i)?.[1] ?? "";

    return {
      title: stripHtml(readTag(item, "title")),
      link: decodeEntities(readTag(item, "link") || atomLink),
      description: stripHtml(readTag(item, "description") || readTag(item, "summary") || readTag(item, "content")),
      pubDate: readTag(item, "pubDate") || readTag(item, "updated") || readTag(item, "published") || null
    };
  });
};

export const parseHtmlList = (html: string, baseUrl: string): RssItem[] => {
  const anchorMatches = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  const base = new URL(baseUrl);
  const seen = new Set<string>();

  return anchorMatches
    .map<RssItem | null>((match) => {
      const title = stripHtml(match[2]);

      if (!title || title.length < 18 || title.length > 180) {
        return null;
      }

      const link = new URL(match[1], base).toString();
      const key = `${title}:${link}`;

      if (seen.has(key)) {
        return null;
      }

      seen.add(key);

      return {
        title,
        link,
        description: title,
        pubDate: null
      };
    })
    .filter((item): item is RssItem => item !== null)
    .slice(0, 20);
};
