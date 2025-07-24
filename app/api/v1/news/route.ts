import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export async function GET() {
  try {
    const response = await fetch(
      "https://theconversation.com/us/articles.atom",
    );
    const xmlText = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      textNodeName: "#text",
      parseTagValue: false,
      parseAttributeValue: false,
      trimValues: true,
    });
    const json = parser.parse(xmlText);
    const entries = json.feed.entry;

    const articles = entries
      .slice(0, 16)
      .map(
        (entry: {
          content: string;
          id: string;
          title: string;
          link: [] | string;
          published: string;
        }) => {
          // 正確提取 content 內容
          let contentText = "";
          if (entry.content) {
            if (typeof entry.content === "string") {
              contentText = entry.content;
            } else if (entry.content["#text"]) {
              contentText = entry.content["#text"];
            } else {
              contentText = JSON.stringify(entry.content);
            }
          }

          return {
            id: entry.id,
            title: entry.title,
            link: Array.isArray(entry.link) ? entry.link : [entry.link],
            published: entry.published,
            content: contentText,
          };
        },
      );

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
