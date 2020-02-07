export const ACTIONS = {
  STATUS: 'modal/status',
};

export const updateModal = value => ({ type: ACTIONS.STATUS, ...value });