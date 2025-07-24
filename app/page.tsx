"use client";
import { apiService } from "@/services/api";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

interface dataItem {
  content: string;
  id: string;
  link: [];
  published: string;
  title: string;
}

export default function Home() {
  const [data, setData] = useState<dataItem[]>([]);
  const [index, setIndex] = useState(-1);
  const [html, setHtml] = useState<string>("");

  const makeClickableParagraphs = async (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const paragraphs = doc.querySelectorAll("p");

    paragraphs.forEach((p) => {
      const text = p.textContent?.trim() || "";

      p.classList.add("clickable-paragraph");
      p.setAttribute("data-sentence", text);
    });

    return doc.body.innerHTML;
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const articles = await apiService.fetchNews();
        setData(articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    getdata();
  }, []);

  useEffect(() => {
    if (index !== -1) {
      const processContent = async () => {
        const processedHtml = await makeClickableParagraphs(
          data[index].content,
        );
        const cleanHtml = DOMPurify.sanitize(processedHtml);
        setHtml(cleanHtml);
      };
      processContent();
    }
  }, [index, data]);

  const handleParagraphClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains("clickable-paragraph")) {
      const sentence = target.dataset.sentence;
      const translation = await apiService.translate(sentence || "");
      const summary = translation.summary;
      console.log(JSON.parse(summary));
    }
  };

  return (
    <main className="bg-zinc-900 text-white">
      <header className="font-mono bg-zinc-900/50 backdrop-blur-md p-3 px-5 border-b border-zinc-700 fixed top-0 w-full">
        <h1 className="text-xl font-bold">LEXIMIND_</h1>
        <p className="text-sm opacity-50">Improve your reading experience</p>
      </header>
      <div
        className={`h-dvh pt-20 ${index === -1 ? "overflow-y-auto" : "overflow-hidden"}`}
      >
        <h1 className="font-bold text-2xl m-2 mx-5">ALL NEWS</h1>
        {data.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              setIndex(index);
            }}
            className="border-b p-5 cursor-pointer border-zinc-700 hover:bg-zinc-800 transition-colors text-left"
          >
            <div className="w-14 h-2 bg-purple-700 mb-2"></div>
            <h2 className="font-bold text-lg">{item.title}</h2>
          </button>
        ))}
      </div>
      <div
        className={`text-black fixed p-5 left-0 top-0 overflow-y-auto h-full w-full flex flex-col bg-white ${index === -1 ? "hidden" : ""}`}
      >
        <button onClick={() => setIndex(-1)} className="mb-2">
          <X />
        </button>
        <div className="content font-sans my-3 flex flex-col gap-1">
          <h2 className="font-bold text-lg font-mono">{data[index]?.title}</h2>
          <p className="text-sm opacity-50">{data[index]?.published}</p>
          <div
            onClick={handleParagraphClick}
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </div>
      </div>
    </main>
  );
}
