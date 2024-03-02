import './TeamDisplay.css';

const TeamDisplay = ({ team, onChangePokemon }) => {
  console.log(team);
  return (
    <div className="team-display">
      {team.map((pokemon, index) => (
        <button
          key={index}
          onClick={() => onChangePokemon(pokemon.name)}
        >
          {pokemon.name}
        </button>
      ))}
    </div>
  );
};

export default TeamDisplay;
