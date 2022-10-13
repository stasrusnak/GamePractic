import Vue from 'vue';

const addOne = (payload, state, field) => {
  const { ids, entities } = state;
  ids.push(payload[field]);
  Vue.set(entities, payload[field], payload);
  return state;
};

const addMany = (payload, state, field) => {
  payload.forEach(element => {
    addOne(element, state, field);
  });
  return state;
};

const deNormalize = obj => Object.values(obj);

const selectAll = ({ entities }) => deNormalize(entities);

const selectById = (id, { entities }) => entities[id];

const selectMultipleByIds = (ids, { entities }) =>
  ids
    .reduce((prev, id) => {
      const entity = entities[id] || undefined;
      return [...prev, entity];
    }, [])
    .filter(item => item);

const EntityAdapter = (entity, field = 'id') => ({
  state: { ...entity } || { ids: [], entities: {} },
  field,
  getInitialState() {
    return this.state;
  },
  getIds() {
    return this.state.ids;
  },
  getEntities() {
    return this.state.entities;
  },
  addOne(payload) {
    return addOne(payload, this.state, field);
  },
  addMany(payload) {
    return addMany(payload, this.state, field);
  },
  clearState() {
    this.state = { ids: [], entities: {} };
    return this.state;
  },
  selectAll,
  selectById,
  selectMultipleByIds,
  /* selectAll() {
    return selectAll(this.state);
  },
  selectById(id) {
    return selectById(id, this.state);
  },
  selectMultipleByIds(ids) {
    return selectMultipleByIds(ids, this.state);
  }, */
  deNormalize,
});

export default EntityAdapter;
