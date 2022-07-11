import Link from "next/link";
import { useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useLocalStorage from "use-local-storage";
import { useObserver } from "../../hooks";
import * as Styled from "./PokemonCard.style";

interface PokemonCardProps {
  url: string;
  name: string;
}

const PokemonCard = ({ name, url }: PokemonCardProps) => {
  const target: React.RefObject<HTMLDivElement> = useRef(null);
  const [visible, setVisible] = useState(true);
  const urlArray = url.split("/");
  const id = urlArray[urlArray.length - 2];
  const [_, setScrollY] = useLocalStorage("poke_list_scroll", 0);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting ? setVisible(true) : setVisible(false);

  useObserver({
    target,
    onIntersect,
    threshold: 0.1
  });
  return (
    <Styled.Container
      onClick={() => {
        setScrollY(window.scrollY);
      }}
      ref={target}
    >
      {visible && (
        <Link href={`/pokemon/${id}`}>
          <a>
            <LazyLoadImage
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={name}
            />
            <span>{id}</span>
            <span>{name}</span>
          </a>
        </Link>
      )}
    </Styled.Container>
  );
};

export default PokemonCard;
