import { GeneralTypes } from './general/types';
import { CollectionTypes } from './collection/types';

export default interface ApplicationState {
  general: GeneralTypes;
  collection: CollectionTypes;
}
