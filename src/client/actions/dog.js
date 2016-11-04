// export const MAKE_BARK = 'MAKE_BARK';
//
// export const makeBark = () => ({
//   type: MAKE_BARK,
//   payload: true
// });
import { createAction } from 'redux-actions';

export const MAKE_BARK = 'MAKE_BARK';
export const makeBark = createAction(MAKE_BARK, () => true);
