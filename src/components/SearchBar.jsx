import React, { useState } from 'react';

const Searchbar = (props) => {
  const [search, setSearch] = useState('dito');

  return (
    <div>
      <div>
        <input
          placeholder='Buscar pokemon'
          onChange={onChangeHandler}
          value={search}
        />
      </div>
    </div>
  );
};

export default Searchbar;
