import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );

      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Transform the data into the format expected by AsyncPaginate
      return {
        options: data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`, // or another unique identifier
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (err) {
      console.error(err);
      return { options: [] }; // Return empty options on error
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search for City"
      debounceTimeout={600}
      value={search}
      loadOptions={loadOptions}
      onChange={handleOnChange}
    />
  );
};

export default Search;
