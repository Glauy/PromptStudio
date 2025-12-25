
import { SceneId, SceneDefinition } from '../../types';
import { portraitScene } from './portrait';
import { natureScene } from './nature';
import { miniatureScene } from './miniature';
import { freshScene } from './fresh';
import { emotionalScene } from './emotional';
import { vintageScene } from './vintage';
import { artisticScene } from './artistic';
import { commercialScene } from './commercial';
import { stillLifeScene } from './stilllife';
import { spaceScene } from './space';
import { futureScene } from './future';
import { narrativeScene } from './narrative';
import { placeholderScenes } from './placeholders';

export const SCENE_DEFINITIONS: Record<SceneId, SceneDefinition> = {
  portrait: portraitScene,
  nature: natureScene,
  miniature: miniatureScene,
  fresh: freshScene,
  emotional: emotionalScene,
  vintage: vintageScene,
  artistic: artisticScene,
  commercial: commercialScene,
  stilllife: stillLifeScene,
  space: spaceScene,
  future: futureScene,
  narrative: narrativeScene,
  ...placeholderScenes as Record<SceneId, SceneDefinition>
};
