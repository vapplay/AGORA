import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
const cheerio = require("react-native-cheerio");

const GET_LINKS = gql`
  query ($videoLinksId: String!) {
    videoLinks(id: $videoLinksId) {
      links {
        name
        url
      }
    }
  }
`;

interface LanguageObject {
  name: string;
  url: string;
}

const filterIdimas = (array: LanguageObject[] | any) => {
  if (!Array.isArray(array) || array.length === 0) {
    return null;
  }

  const latino = array.filter((x: any) => x?.name?.includes("Latino"));
  const castellano = array.filter((x: any) => x?.name?.includes("Castellano"));

  if (latino.length === 1) {
    return latino[0]?.url;
  } else if (castellano.length > 1) {
    const filterCastellano = castellano.filter((x: any) =>
      x?.url?.includes("caste")
    );
    return filterCastellano[0]?.url;
  } else if (castellano.length === 1) {
    return castellano[0]?.url;
  } else {
    return array[0]?.url;
  }
};

export const useGetVideoLinks = (id: string) => {
  const [link, setLink] = useState<string>("");
  const [load, setLoad] = useState<boolean>(true);
  const [selectedUrl, setSelectedUrl] = useState<string>("");

  const { data, loading } = useQuery(GET_LINKS, {
    variables: {
      videoLinksId: id,
    },
  });

  useEffect(() => {
    if (!loading && data) {
      const url = filterIdimas(data?.videoLinks?.links);
      if (url) {
        setSelectedUrl(url);
      }
    }
  }, [loading, data]);

  useEffect(() => {
    if (selectedUrl) {
      body();
    }
  }, [selectedUrl]);

  const body = async () => {
    try {
      const response = await fetch("https:" + selectedUrl);
      const html = await response.text();
      const $ = cheerio.load(html);
      const validate = $(
        "body > div.wrapper > div > script:nth-child(6)"
      ).html();

      if (!validate) {
        const response = await fetch("https:" + selectedUrl);
        const html = await response.text();
        const $ = cheerio.load(html);
        const script = $("#list-server-more > ul > li:nth-child(1)").attr(
          "data-video"
        );

        const videoFetch = await fetch(script);
        const resultHtml = await videoFetch.text();
        const $2 = cheerio.load(resultHtml);
        const linkSelector = $2("body > script:nth-child(2)").html();
        const regex = /https?:\/\/[^\s"]+\.m3u8[^\s"]*/g;
        const matches = linkSelector.match(regex);

        if (matches) {
          setLink(matches[0]);
          setLoad(false);
          return;
        }
      }

      const script = $("body > div.wrapper > div > script:nth-child(6)")
        .html()
        .split("preload: 'auto',")[0];
      const regex = /sources:\s*(\[.+?\])/;
      const match = script.match(regex);
      if (match) {
        const regex2 = /file:\s*'([^']*)'/i;
        const fileMatch = match[1].match(regex2);
        if (fileMatch) {
          setLink(fileMatch[1]);
        }
      }

      setLoad(false);
    } catch (error) {
      console.error("Error fetching video link: ", error);
      setLoad(false);
    }
  };

  return { link, load };
};
