const tableEntry = function (n, t, u, c, ct) {
  this.name = n;
  this.type = t;
  this.unit = u;
  this.count = Number(c);
  this.cost = Number(ct)
};

let data = {
  table: [],
  summ: 0,
  newEntry: {
    name: "",
    type: "",
    unit: "Час",
    count: "",
    cost: ""
  }
};

const app = new Vue({
  el: '#app',
  data: data,
  methods: {
    addLine: () => {
      data.table.push(new tableEntry(
        data.newEntry.name,
        data.newEntry.type,
        data.newEntry.unit,
        data.newEntry.count,
        data.newEntry.cost
      ));
      app.getSumm();
      data.newEntry = {
        name: "",
        type: "",
        unit: "Час",
        count: "",
        cost: ""
      };
    },
    deleteLine: (cmd, elem) => {
      let index = -1;
      for (let i = 0; i < data.table.length; i++) {
        if (data.table[i].name == elem.name) {
          index = i;
        }
      }
      switch(cmd) {
        case 'del': {
            if (index > -1) {
                data.table.splice(index, 1);
            }
            break;
        }
        // case 'up': {

        //     break;
        // }
        // case 'down': {

        //     break;
        // }
    };
      app.getSumm();
    },
    init: () => {
      data.table.push(new tableEntry(
        "Задача 1",
        "Тип 1",
        "Час",
        2,
        5000
      ));
      data.table.push(new tableEntry(
        "Задача 2",
        "Тип 2",
        "Шт",
        10,
        10000
      ));
      app.getSumm();
    },
    getSumm: () => {
      data.summ = 0;
      data.table.forEach(function(elem) {
        data.summ += elem.cost;
      })
    }
  }
});

app.init();
