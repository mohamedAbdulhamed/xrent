export const test_products = [
    {
        "id": "1",
        "title": "Product 1",
        "description": "Description for product 1",
        "isForSale": true,
        "price": 158,
        "rating": 3.0,
        "size": "M",
        "colors": [
            "Pink",
            "Beige",
            "Silver"
        ],
        "condition": "Acceptable",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "2",
        "title": "Product 2",
        "description": "Description for product 2",
        "isForSale": true,
        "price": 200,
        "rating": 3.8,
        "size": "S",
        "colors": [
            "Black",
            "Brown",
            "Yellow"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 750,
        "availability": [
            {
                "id": "3",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 66,
                "status": "unavailable",
                "productId": "2"
            },
            {
                "id": "4",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 136,
                "status": "available",
                "productId": "2"
            }
        ]
    },
    {
        "id": "3",
        "title": "Product 3",
        "description": "Description for product 3",
        "isForSale": true,
        "price": 115,
        "rating": 3.1,
        "size": "M",
        "colors": [
            "Yellow",
            "Blue"
        ],
        "condition": "Good",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 301,
        "availability": [
            {
                "id": "5",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 84,
                "status": "available",
                "productId": "3"
            },
            {
                "id": "6",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 51,
                "status": "available",
                "productId": "3"
            }
        ]
    },
    {
        "id": "4",
        "title": "Product 4",
        "description": "Description for product 4",
        "isForSale": false,
        "price": null,
        "rating": 3.0,
        "size": "L",
        "colors": [
            "Gold",
            "White",
            "Green"
        ],
        "condition": "Acceptable",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "5",
        "title": "Product 5",
        "description": "Description for product 5",
        "isForSale": true,
        "price": 195,
        "rating": 3.0,
        "size": "S",
        "colors": [
            "Yellow"
        ],
        "condition": "Good",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "6",
        "title": "Product 6",
        "description": "Description for product 6",
        "isForSale": false,
        "price": null,
        "rating": 4.4,
        "size": "S",
        "colors": [
            "Black",
            "Pink"
        ],
        "condition": "Good",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 375,
        "availability": [
            {
                "id": "11",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 64,
                "status": "available",
                "productId": "6"
            },
            {
                "id": "12",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 126,
                "status": "unavailable",
                "productId": "6"
            }
        ]
    },
    {
        "id": "7",
        "title": "Product 7",
        "description": "Description for product 7",
        "isForSale": true,
        "price": 37,
        "rating": 4.4,
        "size": "L",
        "colors": [
            "Beige"
        ],
        "condition": "Acceptable",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "8",
        "title": "Product 8",
        "description": "Description for product 8",
        "isForSale": true,
        "price": 189,
        "rating": 4.3,
        "size": "S",
        "colors": [
            "Pink",
            "Multicolour",
            "Black"
        ],
        "condition": "Good",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "9",
        "title": "Product 9",
        "description": "Description for product 9",
        "isForSale": false,
        "price": null,
        "rating": 3.7,
        "size": "S",
        "colors": [
            "Black",
            "Silver",
            "Pink"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 227,
        "availability": [
            {
                "id": "17",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 32,
                "status": "unavailable",
                "productId": "9"
            },
            {
                "id": "18",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 57,
                "status": "unavailable",
                "productId": "9"
            }
        ]
    },
    {
        "id": "10",
        "title": "Product 10",
        "description": "Description for product 10",
        "isForSale": false,
        "price": null,
        "rating": 3.9,
        "size": "M",
        "colors": [
            "Silver"
        ],
        "condition": "Like New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 264,
        "availability": [
            {
                "id": "19",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 53,
                "status": "unavailable",
                "productId": "10"
            },
            {
                "id": "20",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 112,
                "status": "unavailable",
                "productId": "10"
            }
        ]
    },
    {
        "id": "11",
        "title": "Product 11",
        "description": "Description for product 11",
        "isForSale": true,
        "price": 51,
        "rating": 4.2,
        "size": "M",
        "colors": [
            "Pink",
            "Multicolour"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "12",
        "title": "Product 12",
        "description": "Description for product 12",
        "isForSale": false,
        "price": null,
        "rating": 4.1,
        "size": "L",
        "colors": [
            "Pink"
        ],
        "condition": "Good",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "13",
        "title": "Product 13",
        "description": "Description for product 13",
        "isForSale": false,
        "price": null,
        "rating": 4.7,
        "size": "S",
        "colors": [
            "Clear"
        ],
        "condition": "Like New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "14",
        "title": "Product 14",
        "description": "Description for product 14",
        "isForSale": false,
        "price": null,
        "rating": 4.1,
        "size": "S",
        "colors": [
            "Blue",
            "Clear"
        ],
        "condition": "Acceptable",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "15",
        "title": "Product 15",
        "description": "Description for product 15",
        "isForSale": true,
        "price": 73,
        "rating": 3.2,
        "size": "M",
        "colors": [
            "Purple",
            "Blue",
            "Brown"
        ],
        "condition": "Acceptable",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 297,
        "availability": [
            {
                "id": "29",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 51,
                "status": "available",
                "productId": "15"
            },
            {
                "id": "30",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 126,
                "status": "unavailable",
                "productId": "15"
            }
        ]
    },
    {
        "id": "16",
        "title": "Product 16",
        "description": "Description for product 16",
        "isForSale": false,
        "price": null,
        "rating": 4.1,
        "size": "M",
        "colors": [
            "Multicolour",
            "Orange",
            "Clear"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "17",
        "title": "Product 17",
        "description": "Description for product 17",
        "isForSale": false,
        "price": null,
        "rating": 3.7,
        "size": "XL",
        "colors": [
            "Brown",
            "Red",
            "Beige"
        ],
        "condition": "Like New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 275,
        "availability": [
            {
                "id": "33",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 44,
                "status": "unavailable",
                "productId": "17"
            },
            {
                "id": "34",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 131,
                "status": "unavailable",
                "productId": "17"
            }
        ]
    },
    {
        "id": "18",
        "title": "Product 18",
        "description": "Description for product 18",
        "isForSale": true,
        "price": 40,
        "rating": 4.5,
        "size": "S",
        "colors": [
            "White",
            "Purple"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 811,
        "availability": [
            {
                "id": "35",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 130,
                "status": "available",
                "productId": "18"
            },
            {
                "id": "36",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 34,
                "status": "available",
                "productId": "18"
            }
        ]
    },
    {
        "id": "19",
        "title": "Product 19",
        "description": "Description for product 19",
        "isForSale": true,
        "price": 51,
        "rating": 3.0,
        "size": "S",
        "colors": [
            "White"
        ],
        "condition": "Like New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 456,
        "availability": [
            {
                "id": "37",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 47,
                "status": "available",
                "productId": "19"
            },
            {
                "id": "38",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 32,
                "status": "unavailable",
                "productId": "19"
            }
        ]
    },
    {
        "id": "20",
        "title": "Product 20",
        "description": "Description for product 20",
        "isForSale": false,
        "price": null,
        "rating": 3.0,
        "size": "S",
        "colors": [
            "Multicolour",
            "Beige"
        ],
        "condition": "Like New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "21",
        "title": "Product 21",
        "description": "Description for product 21",
        "isForSale": false,
        "price": null,
        "rating": 3.2,
        "size": "XL",
        "colors": [
            "Gold"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 985,
        "availability": [
            {
                "id": "41",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 98,
                "status": "unavailable",
                "productId": "21"
            },
            {
                "id": "42",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 42,
                "status": "unavailable",
                "productId": "21"
            }
        ]
    },
    {
        "id": "22",
        "title": "Product 22",
        "description": "Description for product 22",
        "isForSale": true,
        "price": 34,
        "rating": 3.4,
        "size": "S",
        "colors": [
            "Purple",
            "Green",
            "Gold"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 424,
        "availability": [
            {
                "id": "43",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 99,
                "status": "available",
                "productId": "22"
            },
            {
                "id": "44",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 34,
                "status": "available",
                "productId": "22"
            }
        ]
    },
    {
        "id": "23",
        "title": "Product 23",
        "description": "Description for product 23",
        "isForSale": false,
        "price": null,
        "rating": 3.1,
        "size": "S",
        "colors": [
            "Brown",
            "Clear",
            "Blue"
        ],
        "condition": "Acceptable",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "24",
        "title": "Product 24",
        "description": "Description for product 24",
        "isForSale": true,
        "price": 126,
        "rating": 3.1,
        "size": "XL",
        "colors": [
            "Gold",
            "Black",
            "Yellow"
        ],
        "condition": "Acceptable",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "25",
        "title": "Product 25",
        "description": "Description for product 25",
        "isForSale": true,
        "price": 165,
        "rating": 3.8,
        "size": "L",
        "colors": [
            "Yellow",
            "Blue",
            "Green"
        ],
        "condition": "Acceptable",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 413,
        "availability": [
            {
                "id": "49",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 41,
                "status": "available",
                "productId": "25"
            },
            {
                "id": "50",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 115,
                "status": "available",
                "productId": "25"
            }
        ]
    },
    {
        "id": "26",
        "title": "Product 26",
        "description": "Description for product 26",
        "isForSale": false,
        "price": null,
        "rating": 3.2,
        "size": "XL",
        "colors": [
            "Beige"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 308,
        "availability": [
            {
                "id": "51",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 59,
                "status": "unavailable",
                "productId": "26"
            },
            {
                "id": "52",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 148,
                "status": "available",
                "productId": "26"
            }
        ]
    },
    {
        "id": "27",
        "title": "Product 27",
        "description": "Description for product 27",
        "isForSale": false,
        "price": null,
        "rating": 3.6,
        "size": "M",
        "colors": [
            "Gold",
            "Brown",
            "White"
        ],
        "condition": "Like New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 436,
        "availability": [
            {
                "id": "53",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 129,
                "status": "unavailable",
                "productId": "27"
            },
            {
                "id": "54",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 67,
                "status": "available",
                "productId": "27"
            }
        ]
    },
    {
        "id": "28",
        "title": "Product 28",
        "description": "Description for product 28",
        "isForSale": true,
        "price": 66,
        "rating": 3.9,
        "size": "M",
        "colors": [
            "Purple",
            "Blue"
        ],
        "condition": "Like New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 703,
        "availability": [
            {
                "id": "55",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 141,
                "status": "available",
                "productId": "28"
            },
            {
                "id": "56",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 150,
                "status": "unavailable",
                "productId": "28"
            }
        ]
    },
    {
        "id": "29",
        "title": "Product 29",
        "description": "Description for product 29",
        "isForSale": true,
        "price": 188,
        "rating": 3.7,
        "size": "S",
        "colors": [
            "Pink"
        ],
        "condition": "Good",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "30",
        "title": "Product 30",
        "description": "Description for product 30",
        "isForSale": true,
        "price": 88,
        "rating": 3.9,
        "size": "M",
        "colors": [
            "Orange"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 538,
        "availability": [
            {
                "id": "59",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 119,
                "status": "available",
                "productId": "30"
            },
            {
                "id": "60",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 111,
                "status": "available",
                "productId": "30"
            }
        ]
    },
    {
        "id": "31",
        "title": "Product 31",
        "description": "Description for product 31",
        "isForSale": true,
        "price": 99,
        "rating": 3.4,
        "size": "L",
        "colors": [
            "Clear",
            "Multicolour"
        ],
        "condition": "Like New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "32",
        "title": "Product 32",
        "description": "Description for product 32",
        "isForSale": false,
        "price": null,
        "rating": 3.5,
        "size": "XL",
        "colors": [
            "Gold",
            "Beige"
        ],
        "condition": "Acceptable",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "33",
        "title": "Product 33",
        "description": "Description for product 33",
        "isForSale": true,
        "price": 21,
        "rating": 4.2,
        "size": "M",
        "colors": [
            "Clear"
        ],
        "condition": "Good",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "34",
        "title": "Product 34",
        "description": "Description for product 34",
        "isForSale": true,
        "price": 155,
        "rating": 4.2,
        "size": "L",
        "colors": [
            "Red",
            "Gold",
            "Blue"
        ],
        "condition": "Like New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 679,
        "availability": [
            {
                "id": "67",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 39,
                "status": "unavailable",
                "productId": "34"
            },
            {
                "id": "68",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 93,
                "status": "available",
                "productId": "34"
            }
        ]
    },
    {
        "id": "35",
        "title": "Product 35",
        "description": "Description for product 35",
        "isForSale": true,
        "price": 61,
        "rating": 3.9,
        "size": "S",
        "colors": [
            "Clear"
        ],
        "condition": "Good",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "36",
        "title": "Product 36",
        "description": "Description for product 36",
        "isForSale": false,
        "price": null,
        "rating": 4.4,
        "size": "XL",
        "colors": [
            "Clear"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 655,
        "availability": [
            {
                "id": "71",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 102,
                "status": "unavailable",
                "productId": "36"
            },
            {
                "id": "72",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 123,
                "status": "unavailable",
                "productId": "36"
            }
        ]
    },
    {
        "id": "37",
        "title": "Product 37",
        "description": "Description for product 37",
        "isForSale": true,
        "price": 71,
        "rating": 3.3,
        "size": "L",
        "colors": [
            "White",
            "Yellow"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 204,
        "availability": [
            {
                "id": "73",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 95,
                "status": "unavailable",
                "productId": "37"
            },
            {
                "id": "74",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 89,
                "status": "unavailable",
                "productId": "37"
            }
        ]
    },
    {
        "id": "38",
        "title": "Product 38",
        "description": "Description for product 38",
        "isForSale": true,
        "price": 93,
        "rating": 3.7,
        "size": "S",
        "colors": [
            "Green",
            "Blue"
        ],
        "condition": "Like New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "39",
        "title": "Product 39",
        "description": "Description for product 39",
        "isForSale": false,
        "price": null,
        "rating": 4.4,
        "size": "XL",
        "colors": [
            "Blue"
        ],
        "condition": "Acceptable",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "40",
        "title": "Product 40",
        "description": "Description for product 40",
        "isForSale": false,
        "price": null,
        "rating": 4.8,
        "size": "L",
        "colors": [
            "Red",
            "Brown",
            "Blue"
        ],
        "condition": "Good",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 845,
        "availability": [
            {
                "id": "79",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 79,
                "status": "unavailable",
                "productId": "40"
            },
            {
                "id": "80",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 30,
                "status": "unavailable",
                "productId": "40"
            }
        ]
    },
    {
        "id": "41",
        "title": "Product 41",
        "description": "Description for product 41",
        "isForSale": true,
        "price": 176,
        "rating": 3.8,
        "size": "S",
        "colors": [
            "Brown"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "42",
        "title": "Product 42",
        "description": "Description for product 42",
        "isForSale": true,
        "price": 90,
        "rating": 4.7,
        "size": "S",
        "colors": [
            "White",
            "Blue",
            "Clear"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "43",
        "title": "Product 43",
        "description": "Description for product 43",
        "isForSale": false,
        "price": null,
        "rating": 4.9,
        "size": "S",
        "colors": [
            "Gold",
            "Multicolour",
            "White"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 750,
        "availability": [
            {
                "id": "85",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 123,
                "status": "available",
                "productId": "43"
            },
            {
                "id": "86",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 126,
                "status": "unavailable",
                "productId": "43"
            }
        ]
    },
    {
        "id": "44",
        "title": "Product 44",
        "description": "Description for product 44",
        "isForSale": true,
        "price": 55,
        "rating": 3.0,
        "size": "S",
        "colors": [
            "Black",
            "Multicolour",
            "Clear"
        ],
        "condition": "Good",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "45",
        "title": "Product 45",
        "description": "Description for product 45",
        "isForSale": true,
        "price": 64,
        "rating": 3.4,
        "size": "L",
        "colors": [
            "Silver"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 828,
        "availability": [
            {
                "id": "89",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 90,
                "status": "available",
                "productId": "45"
            },
            {
                "id": "90",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 68,
                "status": "unavailable",
                "productId": "45"
            }
        ]
    },
    {
        "id": "46",
        "title": "Product 46",
        "description": "Description for product 46",
        "isForSale": false,
        "price": null,
        "rating": 4.1,
        "size": "S",
        "colors": [
            "Green",
            "Beige",
            "Silver"
        ],
        "condition": "Good",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 558,
        "availability": [
            {
                "id": "91",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 122,
                "status": "unavailable",
                "productId": "46"
            },
            {
                "id": "92",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 75,
                "status": "available",
                "productId": "46"
            }
        ]
    },
    {
        "id": "47",
        "title": "Product 47",
        "description": "Description for product 47",
        "isForSale": true,
        "price": 80,
        "rating": 3.1,
        "size": "S",
        "colors": [
            "Multicolour",
            "Purple",
            "White"
        ],
        "condition": "Good",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "48",
        "title": "Product 48",
        "description": "Description for product 48",
        "isForSale": false,
        "price": null,
        "rating": 4.8,
        "size": "L",
        "colors": [
            "White"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 513,
        "availability": [
            {
                "id": "95",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 45,
                "status": "available",
                "productId": "48"
            },
            {
                "id": "96",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 87,
                "status": "available",
                "productId": "48"
            }
        ]
    },
    {
        "id": "49",
        "title": "Product 49",
        "description": "Description for product 49",
        "isForSale": false,
        "price": null,
        "rating": 4.9,
        "size": "S",
        "colors": [
            "Silver"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": false,
        "depositAmount": null,
        "availability": null
    },
    {
        "id": "50",
        "title": "Product 50",
        "description": "Description for product 50",
        "isForSale": false,
        "price": null,
        "rating": 3.8,
        "size": "L",
        "colors": [
            "Blue"
        ],
        "condition": "New",
        "city": "Cairo",
        "category": {
            "id": "1",
            "title": "Dresses"
        },
        "images": [
            "red_shoes1.png",
            "red_shoes2.png",
            "red_shoes3.png"
        ],
        "isForRent": true,
        "depositAmount": 450,
        "availability": [
            {
                "id": "99",
                "startDate": new Date("2024-12-01"),
                "endDate": new Date("2024-12-31"),
                "price": 136,
                "status": "available",
                "productId": "50"
            },
            {
                "id": "100",
                "startDate": new Date("2024-09-19"),
                "endDate": new Date("2024-09-25"),
                "price": 38,
                "status": "available",
                "productId": "50"
            }
        ]
    }
]