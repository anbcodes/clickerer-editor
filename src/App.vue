<template>
  <v-app>
    <v-app-bar app>Gui Editor</v-app-bar>
    <v-content>
      <v-container>
        <v-simple-table>
          <thead>
            <th
              v-for="property in Object.keys(format.item)"
              :key="property"
            >{{property}}</th>
            <th>remove</th>
          </thead>
          <tbody>
            <tr v-for="(item, i) in items" :key="JSON.stringify(item)">
              <template v-for="property in Object.keys(format.item)">
                <td
                  v-if="['Number', 'String', 'Boolean'].includes(format.item[property])"
                  :key="property"
                >
                  <v-text-field
                    v-if="['Number', 'String', 'Boolean'].includes(format.item[property])"
                    :type="format.item[property]"
                    :value="item[property]"
                    @click="currentEditing = ''"
                    @blur="item[property] = currentEditing"
                    @input="currentEditing = arguments[0]"
                  />
                  <v-checkbox v-else v-model="item[property]" />
                </td>
                <td :key="property" v-else>
                  <v-btn
                    @click="editComplexProperty(property, item[property])"
                    icon
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </td>
              </template>
              <td>
                <v-btn icon @click="remove(i)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
          <v-btn icon @click="create()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn @click="copy()">copy</v-btn>
          <v-btn @click="enter()">enter</v-btn>
        </v-simple-table>
      </v-container>
      <view-property
        v-model="currentView.value"
        :items="currentView.items"
        :format="currentView.format"
      />
    </v-content>
  </v-app>
</template>

<script>
import viewProperty from './components/Recursive.vue';

export default {
  name: 'app',
  components: {
    viewProperty,
  },

  data: () => ({
    currentEditing: '',
    format: {
      item: {
        name: 'String',
        color: 'String',
        icon: 'String',
        cost: 'cost',
        generate: 'generate',
      },

      cost: {
        item: 'String',
        amount: 'Number',
      },

      generate: {
        item: 'String',
        amount: 'Number',
      },
    },
    currentView: { format: {} },
    name: 'Farming',
    items: [

    ],
  }),

  methods: {
    editComplexProperty(property, value) {
      this.currentView = {
        value: true,
        items: value,
        format: this.format[this.format.item[property]],
      };
    },

    create() {
      const newItem = this.createPart('item');
      const newItems = [...this.items, ...newItem];
      this.items = newItems;
      console.log(this.items);
    },

    createPart(name) {
      const part = [];
      part[0] = {};
      Object.keys(this.format[name]).forEach((formatPart) => {
        const type = this.format[name][formatPart];
        if (!['String', 'Number', 'Boolean'].includes(type)) {
          part[0][formatPart] = [];
        } else if (type === 'String') {
          part[0][formatPart] = '';
        } else if (type === 'Number') {
          part[0][formatPart] = 0;
        } else if (type === 'Boolean') {
          part[0][formatPart] = false;
        }
      });
      return part;
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

    remove(i) {
      delete this.items[i];
      this.items = this.items.filter(v => v);
    },
  },
};
</script>
