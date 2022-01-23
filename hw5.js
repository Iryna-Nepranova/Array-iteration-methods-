const objects = [{
        id: 1,
        displayName: 'Object John',
        date: '10-12-2020',
        enabled: true,
        relation: null
    },
    {
        id: 2,
        displayName: 'Object Kate',
        date: '21-06-2020',
        enabled: false,
        relation: {
            relationId: 1
        }
    },
    {
        id: 3,
        displayName: 'Object Bob',
        date: '03-04-2020',
        enabled: true,
        relation: {
            relationId: 1
        }
    },
    {
        id: 4,
        displayName: 'Object Alex',
        date: '12-12-2021',
        enabled: false,
        relation: null
    },
    {
        id: 5,
        displayName: 'Object Pooja',
        date: '30-07-2019',
        enabled: true,
        relation: {
            relationId: 4
        }
    },
    {
        id: 6,
        displayName: 'Object Scott',
        date: '15-02-2021',
        enabled: true,
        relation: {
            relationId: 2
        }
    },
    {
        id: 7,
        displayName: 'Object Sergey',
        date: '06-01-2020',
        enabled: true,
        relation: {
            relationId: 5
        }
    },
    {
        id: 8,
        displayName: 'Object Adhey',
        date: '21-03-2021',
        enabled: true,
        relation: {
            relationId: 5
        }
    },
    {
        id: 9,
        displayName: 'Object Travis',
        date: '10-08-2021',
        enabled: true,
        relation: {
            relationId: 1
        }
    },
    {
        id: 10,
        displayName: 'Object Artem',
        date: '24-09-2021',
        enabled: false,
        relation: {
            relationId: 4
        }
    },
    {
        id: 11,
        displayName: 'Object Stuart',
        date: '01-04-2020',
        enabled: true,
        relation: {
            relationId: 7
        }
    },
    {
        id: 12,
        displayName: 'Object Keith',
        date: '08-05-2020',
        enabled: true,
        relation: {
            relationId: 10
        }
    },
    {
        id: 13,
        displayName: 'Object Bill',
        date: '17-10-2020',
        enabled: true,
        relation: {
            relationId: 9
        }
    },
    {
        id: 14,
        displayName: 'Object Chuck',
        date: '15-04-2020',
        enabled: true,
        relation: null
    },
    {
        id: 15,
        displayName: 'Object Joel',
        date: '09-12-2020',
        enabled: true,
        relation: null
    },
    {
        id: 16,
        displayName: 'Object Tim',
        date: '12-01-2020',
        enabled: true,
        relation: {
            relationId: 15
        }
    },
    {
        id: 17,
        displayName: 'Object Kevin',
        date: '05-09-2020',
        enabled: true,
        relation: {
            relationId: 7
        }
    },
    {
        id: 18,
        displayName: 'Object Jessica',
        date: '19-07-2021',
        enabled: true,
        relation: {
            relationId: 12
        }
    },
    {
        id: 19,
        displayName: 'Object Monica',
        date: '08-02-2021',
        enabled: true,
        relation: {
            relationId: 14
        }
    },
    {
        id: 20,
        displayName: 'Object Tony',
        date: '05-09-2020',
        enabled: true,
        relation: {
            relationId: 7
        }
    }
];


/*1. Необходимо получить отсортированный объект по дате*/
let formDate = objects.map((item) => {
    let [day, month, year] = item.date.split("-");

    return {...item,
        date: [year, month, day],
    }

});

function sortByDate(formDate) {
    formDate.sort((a, b) => a.date > b.date ? 1 : -1);
}

sortByDate(formDate);

console.log(formDate);

/*2.Необходимо получить массив объектов которые имеют enabled:true  */
let getArr = objects.filter((item) => item.enabled === true);
console.log(getArr);

/*3. Необходимо получить обьект обьектов собранных по месяцам и годам */
const ObjObj = objects.reduce((acc, item) => {
    const [date, month, year] = item.date.split("-");
    if (year in acc) {
        if (month in acc[year]) {
            return {...acc, [year]: {...acc[year], [month]: [...acc[year][month], item] } };
        }

        return {...acc, [year]: {...acc[year], [month]: [item] } }
    }

    return {...acc,
        [year]: {
            [month]: [item]
        }
    };
}, {});

console.log(ObjObj);

/*4. Необходимо получить  массив объектов, которым необходимо заменить relationId на полный объект данных.*/
let changeRelId = objects.reduce((acc, item) => {

    if (item.relation !== null) {
        let findId = objects.find((el) => el.id === item.relation.relationId);
        return [...acc,
            {...item,
                relation: {
                    relationId: findId,
                }
            }
        ]
    } else {
        return acc
    }
}, []);
console.log(changeRelId);


/*5.Необходимо получить массив объектов у которых есть relation*/
let getRel = objects.filter((item) => item.relation != null);
console.log(getRel);

/*6. Необходимо получить объект в котором сформировать данные по relation объектам. */

const result = objects.reduce((acc, item) => {

    if (item.relation != null) {
        if (item.relation.relationId in acc) {
            return {...acc, [item.relation.relationId]: [...acc[item.relation.relationId], item] };

        }
        return {...acc, [item.relation.relationId]: [item] };

    }
    return acc;


}, {});
console.log(result);

/*7. Необходимо получить массив обьектов чья дата приходится на 2020 год и поменять ему ключ enabled на true.*/

let changeKey = objects.reduce((acc, item) => {
    const [day, month, year] = item.date.split("-");
    if (year === '2020') {
        return [...acc, {...item, enabled: true }]
    }
    return acc
}, []);
console.log(changeKey);

/*8. Необходимо получить массив объектов. Объект должен иметь значение enabled такое что если у него нет relation,то 
значение false. Если relation есть, то значение enabled берется от того значения, которое указано в объекте по ссылке relationID*/

let obEnabled = objects.map((item) => {

    if (item.relation !== null) {
        let objEn = objects.find((el) => el.id === item.relation.relationId);
        return {
            ...item,
            enabled: objEn.enabled,
        }
    } else {
        return {
            ...item,
            enabled: false
        }
    }
});

console.log(obEnabled);


/*9.Необходимо получить понимание того, что есть ли у всех объектов relation или нет.*/
let existRel = objects.every((item) => item.relation !== null);
console.log(existRel);
/*10. Необходимо получить понимание есть ли объекты с enabled:true*/
let getSome = objects.some((item) => item.enabled === true);
console.log(getSome);