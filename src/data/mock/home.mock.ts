export const homePageMock = {
  IsSuccess: true,
  Metrics: {
    orders: {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      totalCanceledOrders: 0,
      recentOrders: [
        {
          _id: '675f236b193bdd438630efde',
          status: 'Received',
          customer: {
            _id: '672ac4a5d5d1b855c0b43528',
            email: 'Sienna_Rowe48@gmail.com',
            name: 'Alexis Williamson',
            country: 'France',
            city: 'Cloydshire',
            street: 'Breitenberg Forges',
            house: 354,
            flat: 7196,
            phone: '+374276033231',
            createdOn: '2024-11-06T01:21:00.000Z',
            notes:
              'Notes FnjeirrGnmGEnmjosVDvzZuUbsqEXvduZkewOVcqMauCQHdttYTJZfYfNmMetNdtdIQzsiawpGVNTIooJGdQHvlfpSfdaZlgahefXqrODHYhqNqALWMOpKItUtUQOXAUcTzqoQudOhsDZaOzUjxiqGTngoxjsLyKWKXOvMzLfFfBYcajIxNOrHalUqAXEyRzKAmgQflaShmZwxigktWQiWWINDwkuuxggcQNcOnUUEWqCNFCCvUq'
          },
          products: [
            {
              _id: '671e496261293dd4fb86eb0b',
              name: '55213666',
              amount: 555,
              price: 88696,
              manufacturer: 'Apple',
              notes: 'Top product from Nika',
              received: true
            },
            {
              _id: '671e496261293dd4fb86eb0b',
              name: '55213666',
              amount: 555,
              price: 88696,
              manufacturer: 'Apple',
              notes: 'Top product from Nika',
              received: true
            }
          ],
          delivery: {
            address: {
              country: 'France',
              city: 'Cloydshire',
              street: 'Breitenberg Forges',
              house: 354,
              flat: 7196
            },
            finalDate: '2024-12-20T00:00:00.000Z',
            condition: 'Delivery'
          },
          total_price: 177392,
          createdOn: '2024-12-15T18:43:00.000Z',
          comments: [],
          history: [
            {
              status: 'Received',
              customer: '672ac4a5d5d1b855c0b43528',
              products: [
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Top product from Nika',
                  received: true
                },
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Top product from Nika',
                  received: true
                }
              ],
              total_price: 177392,
              delivery: {
                address: {
                  country: 'France',
                  city: 'Cloydshire',
                  street: 'Breitenberg Forges',
                  house: 354,
                  flat: 7196
                },
                finalDate: '2024-12-20T00:00:00.000Z',
                condition: 'Delivery'
              },
              changedOn: '2024-12-15T18:45:00.000Z',
              action: 'All products received'
            },
            {
              status: 'Partially Received',
              customer: '672ac4a5d5d1b855c0b43528',
              products: [
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Top product from Nika',
                  received: true
                },
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Top product from Nika',
                  received: false
                }
              ],
              total_price: 177392,
              delivery: {
                address: {
                  country: 'France',
                  city: 'Cloydshire',
                  street: 'Breitenberg Forges',
                  house: 354,
                  flat: 7196
                },
                finalDate: '2024-12-20T00:00:00.000Z',
                condition: 'Delivery'
              },
              changedOn: '2024-12-15T18:45:00.000Z',
              action: 'Received'
            },
            {
              status: 'In Process',
              customer: '672ac4a5d5d1b855c0b43528',
              products: [
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Top product from Nika',
                  received: false
                },
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Top product from Nika',
                  received: false
                }
              ],
              total_price: 177392,
              delivery: {
                address: {
                  country: 'France',
                  city: 'Cloydshire',
                  street: 'Breitenberg Forges',
                  house: 354,
                  flat: 7196
                },
                finalDate: '2024-12-20T00:00:00.000Z',
                condition: 'Delivery'
              },
              changedOn: '2024-12-15T18:44:00.000Z',
              action: 'Order processing started'
            },
            {
              status: 'Draft',
              customer: '672ac4a5d5d1b855c0b43528',
              products: [
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Top product from Nika',
                  received: false
                },
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Top product from Nika',
                  received: false
                }
              ],
              total_price: 177392,
              delivery: {
                address: {
                  country: 'France',
                  city: 'Cloydshire',
                  street: 'Breitenberg Forges',
                  house: 354,
                  flat: 7196
                },
                finalDate: '2024-12-20T00:00:00.000Z',
                condition: 'Delivery'
              },
              changedOn: '2024-12-15T18:44:00.000Z',
              action: 'Delivery Scheduled'
            },
            {
              status: 'Draft',
              customer: '672ac4a5d5d1b855c0b43528',
              products: [
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Top product from Nika',
                  received: false
                },
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Top product from Nika',
                  received: false
                }
              ],
              total_price: 177392,
              delivery: null,
              changedOn: '2024-12-15T18:43:00.000Z',
              action: 'Order created'
            }
          ]
        },
        {
          _id: '675ef22c193bdd438630e564',
          status: 'In Process',
          customer: {
            _id: '67300bbed5d1b855c0b44207',
            email: 'Mireya.Satterfield@yahoo.com',
            name: 'Amos Willms',
            country: 'Canada',
            city: 'South Paris',
            street: 'Caterina Court',
            house: 28,
            flat: 6116,
            phone: '+540038276224',
            createdOn: '2024-11-10T01:26:00.000Z',
            notes:
              'Notes zvvZGJldKmuBLkkLuePMyAJZJAaxDDBbRXKnRjTeQpDJaUmBBjvSGbisNaCDrFrSdjPsqcVMxYXayRfEPIZUXIqNTLQutJWJGDbMEUSNsASpRiObcVIWJawLZBByCTXHFFXYViGVveOPukNhWgggXEKvDpPyymUeaVBOecABGTIxrLyZjOnGAeuGugiaodzxVxyCvULpzKfFVrheHaBmOKbtjDLEqKZCgKKzUsIUMGKgJdcCkFWi'
          },
          products: [
            {
              _id: '672eb8fad5d1b855c0b43f01',
              name: 'Bacon13464',
              amount: 2,
              price: 100,
              manufacturer: 'Google',
              notes: 'Test notes',
              received: false
            },
            {
              _id: '66fb2f0ef5b4ca3d51e1f0b9',
              name: 'Bike74067',
              amount: 2,
              price: 100,
              manufacturer: 'Xiaomi',
              notes: 'Test notes',
              received: false
            },
            {
              _id: '67300bfed5d1b855c0b443ab',
              name: 'Bike68990',
              amount: 2,
              price: 100,
              manufacturer: 'Google',
              notes: 'Test notes',
              received: false
            },
            {
              _id: '66df338cfd0a2ec681e690cb',
              name: 'Pizza66054',
              amount: 2,
              price: 100,
              manufacturer: 'Tesla',
              notes: 'Test notes',
              received: false
            },
            {
              _id: '67218ad061293dd4fb876123',
              name: 'Bacon41396',
              amount: 2,
              price: 100,
              manufacturer: 'Google',
              notes: 'Test notes',
              received: false
            }
          ],
          delivery: {
            address: {
              country: 'Canada',
              city: 'South Paris',
              street: 'Caterina Court',
              house: 28,
              flat: 6116
            },
            finalDate: '2024-12-31T00:00:00.000Z',
            condition: 'Delivery'
          },
          total_price: 500,
          createdOn: '2024-12-15T15:13:00.000Z',
          comments: [],
          history: [
            {
              status: 'In Process',
              customer: '67300bbed5d1b855c0b44207',
              products: [
                {
                  _id: '672eb8fad5d1b855c0b43f01',
                  name: 'Bacon13464',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Google',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '66fb2f0ef5b4ca3d51e1f0b9',
                  name: 'Bike74067',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Xiaomi',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '67300bfed5d1b855c0b443ab',
                  name: 'Bike68990',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Google',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '66df338cfd0a2ec681e690cb',
                  name: 'Pizza66054',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Tesla',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '67218ad061293dd4fb876123',
                  name: 'Bacon41396',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Google',
                  notes: 'Test notes',
                  received: false
                }
              ],
              total_price: 500,
              delivery: {
                address: {
                  country: 'Canada',
                  city: 'South Paris',
                  street: 'Caterina Court',
                  house: 28,
                  flat: 6116
                },
                finalDate: '2024-12-31T00:00:00.000Z',
                condition: 'Delivery'
              },
              changedOn: '2024-12-27T19:09:00.000Z',
              action: 'Order processing started'
            },
            {
              status: 'Draft',
              customer: '67300bbed5d1b855c0b44207',
              products: [
                {
                  _id: '672eb8fad5d1b855c0b43f01',
                  name: 'Bacon13464',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Google',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '66fb2f0ef5b4ca3d51e1f0b9',
                  name: 'Bike74067',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Xiaomi',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '67300bfed5d1b855c0b443ab',
                  name: 'Bike68990',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Google',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '66df338cfd0a2ec681e690cb',
                  name: 'Pizza66054',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Tesla',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '67218ad061293dd4fb876123',
                  name: 'Bacon41396',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Google',
                  notes: 'Test notes',
                  received: false
                }
              ],
              total_price: 500,
              delivery: {
                address: {
                  country: 'Canada',
                  city: 'South Paris',
                  street: 'Caterina Court',
                  house: 28,
                  flat: 6116
                },
                finalDate: '2024-12-31T00:00:00.000Z',
                condition: 'Delivery'
              },
              changedOn: '2024-12-27T19:09:00.000Z',
              action: 'Requested products changed'
            },
            {
              status: 'Draft',
              customer: '67300bbed5d1b855c0b44207',
              products: [
                {
                  _id: '672eb8fad5d1b855c0b43f01',
                  name: 'Bacon13464',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Google',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '66fb2f0ef5b4ca3d51e1f0b9',
                  name: 'Bike74067',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Xiaomi',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '67300bfed5d1b855c0b443ab',
                  name: 'Bike68990',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Google',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '66df338cfd0a2ec681e690cb',
                  name: 'Pizza66054',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Tesla',
                  notes: 'Test notes',
                  received: false
                }
              ],
              total_price: 400,
              delivery: {
                address: {
                  country: 'Canada',
                  city: 'South Paris',
                  street: 'Caterina Court',
                  house: 28,
                  flat: 6116
                },
                finalDate: '2024-12-31T00:00:00.000Z',
                condition: 'Delivery'
              },
              changedOn: '2024-12-27T19:09:00.000Z',
              action: 'Delivery Scheduled'
            },
            {
              status: 'Draft',
              customer: '67300bbed5d1b855c0b44207',
              products: [
                {
                  _id: '672eb8fad5d1b855c0b43f01',
                  name: 'Bacon13464',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Google',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '66fb2f0ef5b4ca3d51e1f0b9',
                  name: 'Bike74067',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Xiaomi',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '67300bfed5d1b855c0b443ab',
                  name: 'Bike68990',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Google',
                  notes: 'Test notes',
                  received: false
                },
                {
                  _id: '66df338cfd0a2ec681e690cb',
                  name: 'Pizza66054',
                  amount: 2,
                  price: 100,
                  manufacturer: 'Tesla',
                  notes: 'Test notes',
                  received: false
                }
              ],
              total_price: 400,
              delivery: null,
              changedOn: '2024-12-15T15:13:00.000Z',
              action: 'Order created'
            }
          ]
        },
        {
          _id: '674787d8d5d1b855c0b56fa0',
          status: 'Draft',
          customer: {
            _id: '66df3583fd0a2ec681e6912e',
            email: 'Pietro24@hotmail.com',
            name: 'Amanda Ferry',
            country: 'Russia',
            city: 'East Jamarcuscester',
            street: 'Denesik Parkway',
            house: 511,
            flat: 5315,
            phone: '+562390480407',
            createdOn: '2024-09-09T17:50:00.000Z',
            notes:
              'Notes XIPFbmMKwUzLcPzoZgOHbwbhNleNjwejhcsjHEWABJJMtGizbCBwcafsLqkWREVfjRpDamdJQwIhBwkVxHIAAtTSYvaZoaFKFSGyJVKPbGpUKPxkgUKjvmqPdXWTOKOcNQGcVKeFgXwftcITHlHpMSCXYAXHiJJTQOCQIdBaLOHueAxOPfXkVtQXduvhyMKpcRupLyRVCAqcseATKXVSvXITwJCgxfhOPDYywmiNeORilgqOYgJe'
          },
          products: [
            {
              _id: '671e496261293dd4fb86eb0b',
              name: '55213666',
              amount: 555,
              price: 88696,
              manufacturer: 'Apple',
              notes: 'Толя - Заябуся',
              received: false
            },
            {
              _id: '671e496261293dd4fb86eb0b',
              name: '55213666',
              amount: 555,
              price: 88696,
              manufacturer: 'Apple',
              notes: 'Толя - Заябуся',
              received: false
            }
          ],
          delivery: null,
          total_price: 177392,
          createdOn: '2024-11-27T20:58:00.000Z',
          comments: [],
          history: [
            {
              status: 'Draft',
              customer: '66df3583fd0a2ec681e6912e',
              products: [
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Толя - Заябуся',
                  received: false
                },
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Толя - Заябуся',
                  received: false
                }
              ],
              total_price: 177392,
              delivery: null,
              changedOn: '2024-11-29T16:39:00.000Z',
              action: 'Customer changed'
            },
            {
              status: 'Draft',
              customer: '672ac4a5d5d1b855c0b43528',
              products: [
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Толя - Заябуся',
                  received: false
                },
                {
                  _id: '671e496261293dd4fb86eb0b',
                  name: '55213666',
                  amount: 555,
                  price: 88696,
                  manufacturer: 'Apple',
                  notes: 'Толя - Заябуся',
                  received: false
                }
              ],
              total_price: 177392,
              delivery: null,
              changedOn: '2024-11-27T20:58:00.000Z',
              action: 'Order created'
            }
          ]
        }
      ],
      ordersCountPerDay: []
    },
    customers: {
      totalNewCustomers: 5,
      topCustomers: [],
      customerGrowth: [
        {
          date: {
            year: 2025,
            month: 1,
            day: 2
          },
          count: 0
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 3
          },
          count: 0
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 4
          },
          count: 0
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 5
          },
          count: 0
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 6
          },
          count: 0
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 7
          },
          count: 0
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 8
          },
          count: 0
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 9
          },
          count: 0
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 10
          },
          count: 0
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 11
          },
          count: 0
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 12
          },
          count: 0
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 13
          },
          count: 0
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 14
          },
          count: 2
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 15
          },
          count: 0
        },
        {
          date: {
            year: 2025,
            month: 1,
            day: 16
          },
          count: 3
        }
      ]
    },
    products: {
      topProducts: [
        {
          name: '55213666',
          sales: 27
        },
        {
          name: 'Cheese59565',
          sales: 11
        },
        {
          name: 'Chicken37519',
          sales: 11
        },
        {
          name: 'Hat17710',
          sales: 9
        },
        {
          name: 'Chair80339',
          sales: 6
        }
      ]
    }
  },
  ErrorMessage: null
};
