<template>
  <v-app>
    <v-app-bar app>Gui Editor</v-app-bar>
    <v-content>
      <v-container>
        <Table
          :format="format"
          :data.sync="data"
          :customComponents="['Color', 'Icon']"
          formatPath="items"
          pathForData
        />
        <v-btn @click="log()">
          Log Data
        </v-btn>
      </v-container>
      <!-- <view-property
        v-model="currentView.value"
        :items="currentView.items"
        :format="currentView.format"
      />-->
    </v-content>
  </v-app>
</template>

<script>


import Table from './components/Table.vue';

export default {
  name: 'app',
  components: {
    Table,
    // Color,
    // ItemPicker,
  },

  data: () => ({
    data: [],
    format: {
      items: 'Array:item',
      item: {
        name: 'String',
        color: 'Color',
        icon: 'Icon',
        cost: 'Array:Cost',
        generate: 'Array:Generate',
      },

      Cost: {
        item: 'Item',
        amount: 'Number',
        test: 'Array:Generate',
      },

      Generate: {
        item: 'Item',
        amount: 'Number',
        cost: 'Array:Cost',
      },
    },
  }),

  methods: {
    editComplexProperty(property, value) {
      this.currentView = {
        value: true,
        items: value,
        format: this.format[this.format.item[property]],
      };
    },

    copy() {
      const input = document.createElement('input');
      input.value = JSON.stringify(this.items);
      document.body.appendChild(input);
      input.select();

      document.execCommand('copy');
      input.remove();
      alert('copied');
    },

    enter() {
      const data = prompt('JSON');
      if (data && window.confirm('this will erase all of your current game')) {
        this.items = JSON.parse(data);
      }
    },

    log() {
      console.log(this.data);
    },
  },
};
</script>
