<template></template>
<script>
import dot from 'dot-object';

export default {
  props: {
    data: Object,
    dataPath: String,
    format: Object,
    formatPath: String,
  },

  computed: {
    formatPart() {
      return dot.pick(this.format, this.formatPath);
    },
    dataPart() {
      return dot.pick(this.data, this.dataPath);
    },
  },

  data: () => ({
    watchThings: {},
  }),
  methods: {

  },

  watch: {
    data() {

    },
    ...watchThings,
  },
};

const data = {

};
// eslint-disable-next-line
const sampleFormat = {
  formats: {
    items: 'Array:item',
    item: {
      name: 'String',
      color: 'Colors',
      icon: 'String',
      cost: 'Array:Cost',
      generate: 'Array:Generate',
    },

    Cost: {
      item: 'Items',
      amount: 'Number',
    },

    Generate: {
      item: 'Items',
      amount: 'Number',
    },
  },

  types: {
    Colors: {
      $type: 'autocomplete',
      items: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey', 'grey'],
      color: '__VALUE__',
    },

    Items: {
      $type: 'autocomplete',
      items: [],
      $dataChange(newData) {
        this.items = newData.items.map(v => v.name);
      },
    },
  },
};
</script>
