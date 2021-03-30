import React from 'react';
import AnimalCard from './animal-card/AnimalCard';
import AnimalsFilters from './animals-filters/AnimalsFilter';
import './Animals.scss';


export default function Animals() {
  return (
    <main id="content">
        <AnimalsFilters></AnimalsFilters>
        <AnimalCard></AnimalCard>
        <AnimalCard></AnimalCard>
        <AnimalCard></AnimalCard>
        <AnimalCard></AnimalCard>
        <AnimalCard></AnimalCard>

    </main>
  );
}
