
import "@progress/kendo-theme-material/dist/all.css"
import { filterBy } from "@progress/kendo-data-query";
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import React, { useState, useEffect } from 'react';
import { Rating } from '@progress/kendo-react-inputs';
import './index.scss';
import axios from 'axios';

const Feed = () => {
  const [feedData, setFeedData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [filter, setFilter] = React.useState();
  const pageSize = 60;

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100'); //Pega os primeiros 100 pokemons
        const pokemonList = response.data.results; // Busca as info dos pokemons
        const pokemonDetailsPromises = pokemonList.map(async (pokemon) => {
          const detailsResponse = await axios.get(pokemon.url);
          return detailsResponse.data;
        });
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);  // Espera as solicitações
        setFeedData(pokemonDetails);
        console.log(pokemonDetails)
      } catch (error) {
        console.error('Erro para puxar dados da API', error);
      }
    };

    fetchPokemonData();
  }, []);

  const getStatValue = (dataItem, statName) => { //Pega na api os valor de status dos pokemons
    const stat = dataItem.stats.find(stat => stat.stat.name === statName);
    return stat ? stat.base_stat : null;
  };

  const formatStatRating = (props, statName) => {
    const statValue = getStatValue(props.dataItem, statName);
    if (statValue !== null) { // Busca os valores e transforma para a faixa de 0 a 5 para o Rating
      const ratingValue = (statValue / 150) * 5;
      return (
        <Rating
          value={ratingValue}
          max={5}
          readonly={true}
          style={{ fontSize: '16px', textAlign: 'center' }} />
      );
    }
    return null;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'grass':
        return 'green';
      case 'water':
        return 'blue';
      case 'fire':
        return 'red';
      case 'poison':
        return 'purple';
      case 'ground':
        return 'brown';
      case 'electric':
        return 'orange';
      case 'ghost':
        return 'grey';
      case 'rock':
        return 'saddlebrown';
      case 'bug':
        return 'greenyellow';
      default:
        return 'black';
    }
  };
  
  return (
    <div className="gridTotalPage">
      <div className="imgBack"></div>
      <Grid className="gridTotal" //Especificações gerais da grid
        data={filterBy(feedData.slice(skip, skip + pageSize), filter)}
        filterable={true}
        filter={filter}
        onFilterChange={(e) => setFilter(e.filter)}
        style={{ overflow: 'visible' }}
        pageable={true}
        skip={skip}
        take={pageSize}
        total={feedData.length}
        onPageChange={(event) => setSkip(event.page.skip)}>

        <GridColumn title="Imagem" filterable={false} width="230px" cell={(props) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img src={props.dataItem.sprites.front_default} alt={props.dataItem.name} style={{ width: '150px', height: '150px' }} />
          </div>
        )} />

        <GridColumn title="Nome" field="name" width="230px" cell={(props) => (
          <th>{props.dataItem.name}</th>
        )} />

        <GridColumn field="height" title="Altura" filter="numeric" width="230px" cell={(props) => (
          <th>{props.dataItem.height}</th>
        )} />

        <GridColumn field="weight" title="Peso" filter="numeric" width="230px" cell={(props) => (
          <th>{props.dataItem.weight} kg</th>
        )} />

        
        <GridColumn title="Tipo" width="230px" filterable={false} cell={(props) => (
          <th style={{ color: getTypeColor(props.dataItem.types[0].type.name), }}>
            {props.dataItem.types.length > 0 && props.dataItem.types[0].type.name}
          </th>
        )} />

        <GridColumn title="Ataque" filterable={false} cell={(props) =>
          <th>{formatStatRating(props, 'attack')} </th>} width="230px" />

        <GridColumn title="Defesa" filterable={false} cell={(props) =>
          <th> {formatStatRating(props, 'defense')} </th>} width="230px" />

        
      </Grid>
    </div>
  );
};

export default Feed;




