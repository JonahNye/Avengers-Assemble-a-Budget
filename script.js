"use strict";

$(document).ready(() => {
    // Creates list of initial purchases
    const purchases = [{
            name: "Pants for Bruce",
            price: 60,
            category: "Attire"
        },
        {
            name: "Parking Ticket",
            price: 100,
            category: "Bills"
        },
        {
            name: "Pants for Bruce",
            price: 60,
            category: "Attire"
        },
        {
            name: "Shawarma",
            price: 20,
            category: "Food"
        },
        {
            name: "Missiles",
            price: 3000,
            category: "Weapons"
        },
        {
            name: "Pants for Bruce",
            price: 60,
            category: "Attire"
        },
        {
            name: "Arrow for Hawkeye",
            price: 400,
            category: "Weapons"
        },
        {
            name: "City Repairs",
            price: 10000,
            category: "Bills"
        },
        {
            name: "Thor's Bar Tab",
            price: 600,
            category: "Food"
        }
    ];

    let options = {
        useEasing: false,
        useGrouping: false,
        separator: '',
        decimal: '',
    };
    let budget = 1000000;
    // This function creates totals by category
    const categoryTotals = (purchases) => {
        let food = 0,
            attire = 0,
            bills = 0,
            weapons = 0;
        // catTotals = [];
        for (let purchase of purchases) {
            switch (purchase.category) {
                case "Attire":
                    attire += Number(purchase.price);
                    break;
                case "Food":
                    food += Number(purchase.price);
                    break;
                case "Bills":
                    bills += Number(purchase.price);
                    break;
                case "Weapons":
                    weapons += Number(purchase.price);
                    break;
                default:
                    break;
            }
        }
        return [{
                x: "Food",
                value: food
            },
            {
                x: "Attire",
                value: attire
            },
            {
                x: "Bills",
                value: bills
            },
            {
                x: "Weapons",
                value: weapons
            }
        ];
    };

    let chartData = categoryTotals(purchases);

    const budgetRemaining = (categoryTotals) => {
        let grandTotal = 0,
            placeValues = [];

        for (let category of categoryTotals) {
            grandTotal += category.value;
        }

        if ((budget - grandTotal) <= 0) {
            $(".brokenBudget").show();
            $("body").fadeOut(3000);
        }

        grandTotal = budget - grandTotal;
        placeValues[0] = Math.floor(grandTotal / 1000000);
        grandTotal -= (placeValues[0] * 1000000);
        placeValues[1] = Math.floor(grandTotal / 100000);
        grandTotal -= (placeValues[1] * 100000);
        placeValues[2] = Math.floor(grandTotal / 10000);
        grandTotal -= (placeValues[2] * 10000);
        placeValues[3] = Math.floor(grandTotal / 1000);
        grandTotal -= (placeValues[3] * 1000);
        placeValues[4] = Math.floor(grandTotal / 100);
        grandTotal -= (placeValues[4] * 100);
        placeValues[5] = Math.floor(grandTotal / 10);
        grandTotal -= (placeValues[5] * 10);
        placeValues[6] = grandTotal;

        for (let i = 1; i < $(".digit").length; i++) {
            $(".digit")[i].children[0].textContent = `${placeValues[i - 1]}`;
        }

        let millions = new CountUp("millions", 0, placeValues[0], 0, 3, options);
        if (!millions.error) {
            millions.start();
        } else {
            console.error(millions.error);
        }
        let hThousands = new CountUp("hThousands", 0, placeValues[1], 0, 3, options);
        if (!hThousands.error) {
            hThousands.start();
        } else {
            console.error(hThousands.error);
        }
        let tThousands = new CountUp("tThousands", 0, placeValues[2], 0, 3, options);
        if (!tThousands.error) {
            tThousands.start();
        } else {
            console.error(tThousands.error);
        }
        let thousands = new CountUp("thousands", 0, placeValues[3], 0, 3, options);
        if (!thousands.error) {
            thousands.start();
        } else {
            console.error(thousands.error);
        }
        let hundreds = new CountUp("hundreds", 0, placeValues[4], 0, 3, options);
        if (!hundreds.error) {
            hundreds.start();
        } else {
            console.error(hundreds.error);
        }
        let tens = new CountUp("tens", 0, placeValues[5], 0, 3, options);
        if (!tens.error) {
            tens.start();
        } else {
            console.error(tens.error);
        }
        let ones = new CountUp("ones", 0, placeValues[6], 0, 3, options);
        if (!ones.error) {
            ones.start();
        } else {
            console.error(ones.error);
        }
    };

    budgetRemaining(chartData);
    // Creates pie chart populated with initial values 
    anychart.onDocumentReady(function () {
        let chart = anychart.pie();
        chart.palette(anychart.palettes.blue);
        chart.title(`Total Spent: $${chartData[0].value + chartData[1].value + chartData[2].value + chartData[3].value}`);
        chart.data(chartData);
        chart.container('container');
        chart.draw();
    });

    // Adds new purchases to purchase array and redraws chart with ne info
    $(document).on("click", ".category-btn", (event) => {
        $("#ker-ching")[0].play();
        let newItem = {
            name: $(".itemName")[0].value,
            price: Number($(".priceInput")[0].value),
            category: $(".catSelector")[0].value
        };

        if ($(window).width() <= 768) {
            $(".addItem")
                .fadeOut("slow");
        }

        $("input").each(function () {
            $(this).val("");
        })

        $(".pie-chart").empty().append(`<div id="container" style="width: 100%; height: 100%"></div>`);

        purchases.push(newItem);
        chartData = categoryTotals(purchases);
        let chart = anychart.pie();
        chart.palette(anychart.palettes.blue);
        chart.title(`Total Spent: $${chartData[0].value + chartData[1].value + chartData[2].value + chartData[3].value}`);
        chart.data(chartData);
        chart.container('container');
        chart.draw();
        $("#ticker")[0].play();
        budgetRemaining(chartData);
    });

    $(document).on("click", ".purchase-btn", (event) => {
        $(".addItem")
            .fadeIn("slow")
            .css("display", "flex");
    });

    $(window).resize(function () {
        if ($(window).width() >= 768) {
            $(".addItem").css("display", "flex");
        } else {
            $(".addItem").css("display", "none");
        }
    });

    //Opens a list of purchased items when hovering over the categories
    $(document).on("mouseenter", ".weapons", (event) => {
        $(".weapons").append(`
        <section class="purchase-list"></section> 
        `);

        for (let purchase of purchases) {
            if (purchase.category === "Weapons") {

                $(".purchase-list").append(`<p>${purchase.name} : $${purchase.price}</p>`);
            }
        }
    });

    $(document).on("mouseenter", ".weapons, .bills, .attire, .food, .sidebar", (event) => {
        $(event.target).css("cursor", "crosshair");
    });
    
    $(document).on("mouseenter", "button", (event) => {
        $(event.target).css("cursor", "pointer");
    })

    $(document).on("mouseleave", ".weapons", (event) => {
        $(".purchase-list").remove("");
    });

    $(document).on("mouseenter", ".food", (event) => {
        $(".food").append(`
        <section class="purchase-list"></section> 
        `);

        for (let purchase of purchases) {
            if (purchase.category === "Food") {
                $(".purchase-list").append(`<p>${purchase.name} : $${purchase.price}</p>`);
            }
        }
    });

    $(document).on("mouseleave", ".food", (event) => {
        $(".purchase-list").remove("");
    });

    $(document).on("mouseenter", ".attire", (event) => {
        $(".attire").append(`
        <section class="purchase-list"></section> 
        `);

        for (let purchase of purchases) {
            if (purchase.category === "Attire") {
                $(".purchase-list").append(`<p>${purchase.name} : $${purchase.price}</p>`);
            }
        }
    });

    $(document).on("mouseleave", ".attire", (event) => {
        $(".purchase-list").remove("");
    });

    $(document).on("mouseenter", ".bills", (event) => {
        $(".bills").append(`
        <section class="purchase-list"></section> 
        `);

        for (let purchase of purchases) {
            if (purchase.category === "Bills") {
                $(".purchase-list").append(`<p>${purchase.name} : $${purchase.price}</p>`);
            }
        }
    });

    $(document).on("mouseleave", ".bills", (event) => {
        $(".purchase-list").remove("");
    });
});