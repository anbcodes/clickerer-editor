<template>
  <div>
    <v-dialog
      :value="value"
      @input="console.log(value);$emit('input', arguments[0])"
      fullscreen
    >
      <v-card>
        <v-container>
          <v-simple-table>
            <thead>
              <th
                v-for="property in Object.keys(format)"
                :key="property"
              >{{property}}</th>
              <th>Remove</th>
            </thead>
            <tbody>
              <tr v-for="(item, i) in items" :key="JSON.stringify(item || {})">
                <template v-for="property in Object.keys(format)">
                  <td
                    v-if="['Number', 'String', 'Boolean'].includes(format[property])"
                    :key="property"
                  >
                    <v-text-field
                      v-if="['Number', 'String', 'Boolean'].includes(format[property])"
                      :type="format[property]"
                      :value="item[property]"
                      @input="currentEditing = arguments[0]"
                      @click="currentEditing = ''"
                      @blur="item[property] = currentEditing || item[property]"
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
          </v-simple-table>
        </v-container>

        <view-property
          v-model="currentView.value"
          :items="currentView.items"
          :format="currentView.format"
        />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'view-property',
  props: {
    value: Boolean,
    items: Array,
    format: Object,
  },
  data: () => ({
    console,
    currentView: { format: {} },
    currentEditing: '',
  }),

  methods: {
    editComplexProperty(property, value) {
      this.currentView = {
        value: true,
        items: value,
        format: this.format[this.format[property]],
      };
    },

    create() {
      const newItem = this.createPart();
      this.items.push(...newItem);
      this.$forceUpdate();
    },

    createPart() {
      const part = [];
      part[0] = {};
      Object.keys(this.format).forEach((formatPart) => {
        const type = this.format[formatPart];
        if (!['String', 'Number', 'Boolean'].includes(type)) {
          part[0][formatPart] = [];
        } else if (type === 'String') {
          part[0][formatPart] = '';
        } else if (type === 'Number') {
          part[0][formatPart] = 0;
        } else if (type === 'Boolean') {
          part[0][formatPart] = false;
        } else {
          part[0][formatPart] = 'Not FOUND!';
        }
      });
      return part;
    },
    remove(i) {
      delete this.items[i];
      this.items = this.items.filter(v => v);
    },
  },
};
</script>
