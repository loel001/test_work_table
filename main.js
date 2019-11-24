const tableEntry = function (n, t, u, c, ct) {
  this.name = n;
  this.type = t;
  this.unit = u;
  this.count = Number(c);
  this.cost = Number(ct)
};

let data = {
  table: [],
  sort: '',
  summ: 0,
  errorName: false,
  errorCost: false,
  newEntry: {
    name: "",
    type: "",
    unit: "Час",
    count: "",
    cost: ""
  }
};

const dynamicSort = function (property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

const app = new Vue({
  el: '#app',
  data: data,
  methods: {
    addLine: () => {
      if (!app.isUnic(data.newEntry.name) || data.newEntry.name === "") {
        data.errorName = true;
      } else {
        data.errorName = false;
      }
      if (data.newEntry.cost <= 0) {
        data.errorCost = true;
      } else {
        data.errorCost = false;
      }
      if (data.errorName === false && data.errorCost === false) {
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
      }
    },
    isUnic: (name) => {
      let result = true;
      data.table.forEach(function (elem) {
        if (name === elem.name) {
          result = false;
        }
      });
      return result;
    },
    moveLine: (cmd, elem) => {
      let index = -1;
      for (let i = 0; i < data.table.length; i++) {
        if (data.table[i].name == elem.name) {
          index = i;
        }
      }
      switch (cmd) {
        case 'del': {
          if (index > -1) {
            data.table.splice(index, 1);
          }
          break;
        }
        case 'up': {
          if (index - 1 > -1) {
            let tmp = data.table[index];
            data.table[index] = data.table[index - 1];
            data.table[index - 1] = tmp;
          }
          break;
        }
        case 'down': {
          if (index + 1 < data.table.length) {
            let tmp = data.table[index];
            data.table[index] = data.table[index + 1];
            data.table[index + 1] = tmp;
          }
          break;
        }
      };
      app.getSumm();
    },
    doSort: (key) => {
      if (data.sort.indexOf(key) !== -1) {
        if (data.sort.indexOf('-') === -1) {
          key = '-' + key;
        }
      }
      data.sort = key;
      data.table.sort(dynamicSort(key));
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
      app.doSort('name');
    },
    getSumm: () => {
      data.summ = 0;
      data.table.forEach(function (elem) {
        data.summ += Number(elem.cost);
      })
    }
  }
});

app.init();
