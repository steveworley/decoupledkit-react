import { bundle } from 'graphql-modules';
import { makeExecutableSchema } from 'graphql-tools';

import heroes from './types/hero';
import villains from './types/villain';
import comics from './types/comic';
import pokemon from './types/pokemon';


const modules = [heroes, villains, comics, pokemon];

export default makeExecutableSchema(bundle(modules));
