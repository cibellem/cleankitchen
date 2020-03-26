const { items, menus } = require("../models")

items.create({

    name: "Caesar Salad",
    orderNumber: 25,
    station: 1,
    mods: "no dressing, S.O.S., extra dressing, no croutons",
    highlight: "#55AB55",
    averageTime: "4:00",
    currentTime: "0:00"
})

items.create({

    name: "Kale Salad",
    orderNumber: 25,
    station: 1,
    status: "working",
    mods: "no dressing",
    highlight: "#55AB55",
    averageTime: "4:00",
    currentTime: "0:00"
})


menus.bulkCreate([
    {
        name: "Caesar Salad",
        station: 1,
        mods: "no dressing, S.O.S., extra dressing, no croutons, GLUTEN ALERGY",
        highlight: "#55AB55",
        averageTime: "4:00"
    },
    {
        name: "Vanilla Ice Cream",
        station: 2,
        mods: "Chocolate syrup, Caramel syrup, sprinkles, 'the works'",
        highlight: "#F3E5AB",
        averageTime: "2:00"
    },
    {
        name: "Kale Salad",
        station: 1,
        mods: "no cranberries, no walnuts, NUT ALERGY",
        highlight: "#F3E5AB",
        averageTime: "6:00"
    },
    {
        name: "Truffles",
        station: 2,
        mods: "no toppings, extra toppings, 'the works'",
        highlight: "#F3E5AB",
        averageTime: "5:00"
    }
]);