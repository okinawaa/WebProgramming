import axios from "axios";
import { GetServerSideProps } from "next";

interface PokemonProps {
  name: string;
  id: string;
}

const Pokemon = ({ name, id }: PokemonProps) => {
  return (
    <div>
      {name}
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
      />
    </div>
  );
};

// SSR로 데이터를 처리
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${params?.pokeId}`
  );

  return { props: { name: data.name, id: data.id } };
};

export default Pokemon;
