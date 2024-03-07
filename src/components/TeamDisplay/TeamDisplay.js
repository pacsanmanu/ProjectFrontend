import './TeamDisplay.css';

const TeamDisplay = ({ team, onChangePokemon, currentPokemon }) => {
  return (
    <div className="team-display">
      {team.map((pokemon, index) => {
        const isDisabled = pokemon.stats.life <= 0 || pokemon.name === currentPokemon.name;
        return (
          <button
            key={index}
            onClick={() => !isDisabled && onChangePokemon(pokemon.name)}
            disabled={isDisabled}
            style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
          >
            {pokemon.name}
          </button>
        );
      })}
    </div>
  );
};

export default TeamDisplay;