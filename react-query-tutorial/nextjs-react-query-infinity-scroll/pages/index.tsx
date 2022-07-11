import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import useLocalStorage from "use-local-storage";
import { v4 as uuidv4 } from "uuid";
import PokemonCard from "../components/PokemonCard";
import { useObserver } from "../hooks";

interface pokemonType {
  name: string;
  url: string;
}

interface resType {
  count: number;
  next: string;
  previous: string;
  results: pokemonType[];
}

const OFFSET = 30;

const getPokemonList = async ({ pageParam = 0 }) => {
  const result = await axios.get<resType>("https://pokeapi.co/api/v2/pokemon", {
    params: {
      limit: OFFSET,
      offset: pageParam
    }
  });

  return result.data;
};

const Home: NextPage = () => {
  const [scrollY] = useLocalStorage("poke_list_scroll", 0);

  const { data, isFetchingNextPage, fetchNextPage, status } = useInfiniteQuery(
    "pokemonList",
    getPokemonList,
    {
      getNextPageParam: lastPage => {
        const { next } = lastPage;
        if (!next) return false;
        const offset = new URL(next).searchParams.get("offset");
        return Number(offset);
      },
      refetchOnWindowFocus: false
    }
  );

  const bottom: React.RefObject<HTMLDivElement> = useRef(null);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect
  });

  useEffect(() => {
    window.scrollTo(0, Number(scrollY));
  }, [scrollY]);

  // do not this this makes your scroll go top of the page after fetching
  // if (isLoading) {
  //   return <div>loading</div>;
  // }
  // if (isFetching) {
  //   return <div>fetching</div>;
  // }

  return (
    <div>
      {status === "loading" && <p>로딩중</p>}
      {status === "error" && <p>패칭중</p>}
      <div>
        {data?.pages.map(group => (
          <div key={uuidv4()}>
            {group.results.map(pokemon => (
              <PokemonCard {...pokemon} key={uuidv4()} />
            ))}
          </div>
        ))}
      </div>
      <div ref={bottom} />
      {isFetchingNextPage && <p>계속 불러오는 중</p>}
    </div>
  );
};

export default Home;
