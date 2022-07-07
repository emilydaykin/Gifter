const shopData = [
  {
    title: 'Christmas',
    items: [
      {
        id: 1,
        name: '4-Piece Stocking',
        imageUrl:
          'https://images.unsplash.com/photo-1607900177462-ac553f1f5d97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hyaXN0bWFzJTIwc3RvY2tpbmdzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 12
      },
      {
        id: 2,
        name: 'Box of 6 Vanilla-Mousse-filled Chocolates',
        imageUrl:
          'https://images.unsplash.com/photo-1553452118-621e1f860f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdCUyMGNob2NvbGF0ZSUyMG1ha2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 3.5
      },
      {
        id: 3,
        name: 'Polar Bear Mug',
        imageUrl:
          'https://images.unsplash.com/photo-1544274040-f0f66aef3b6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hyaXN0bWFzJTIwbXVnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 9
      },
      {
        id: 4,
        name: '3-Set Knitted Scarves (White, Green & Grey)',
        imageUrl:
          'https://images.unsplash.com/photo-1457545195570-67f207084966?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNjYXJmJTIwYW5kJTIwYmVhbmllJTIwc2V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 50
      },
      {
        id: 5,
        name: 'Tube of 20 Chocolate Truffles',
        imageUrl:
          'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdCUyMGNob2NvbGF0ZSUyMG1ha2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 5
      },
      {
        id: 6,
        name: 'Dark Grey Beanie with Pom Pom',
        imageUrl:
          'https://images.unsplash.com/photo-1576861048192-fa56cf0a8161?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVhbmllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 7
      },
      {
        id: 7,
        name: '7-Piece Scented Candle Set',
        imageUrl:
          'https://images.unsplash.com/photo-1532592068623-db1978e40df5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNhbmRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        price: 40
      },
      {
        id: 8,
        name: '2-Set Fuzzy Sock Collection',
        imageUrl:
          'https://images.unsplash.com/photo-1513885332241-c2799e2e7609?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZ1enp5JTIwc29ja3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 40
      }
    ]
  },
  {
    title: 'Birthday',
    items: [
      {
        id: 1,
        name: '2-Hour Spa & Sauna Session',
        imageUrl:
          'https://images.unsplash.com/photo-1583416750470-965b2707b355?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNwYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        price: 0
      },
      {
        id: 2,
        name: 'PlayStation, Fifa & Console Set',
        imageUrl:
          'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxheXN0YXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 500
      },
      {
        id: 3,
        name: 'Orange Surf Board',
        imageUrl:
          'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VyZiUyMGJvYXJkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 150
      },
      {
        id: 4,
        name: 'Magician Set Playing Cards',
        imageUrl:
          'https://images.unsplash.com/photo-1556195332-95503f664ced?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxheWluZyUyMGNhcmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 25
      },
      {
        id: 5,
        name: 'Garden Book Shelf Box',
        imageUrl:
          'https://images.unsplash.com/photo-1591492654773-6756035bef6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c2VsZWN0aW9uJTIwbm9uJTIwZmljdGlvbiUyMGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 87
      },
      {
        id: 6,
        name: 'Brush Holder',
        imageUrl:
          'https://images.unsplash.com/photo-1617220376311-1b90accbb9e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2tpbiUyMGNhcmUlMjBraXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 23
      },
      {
        id: 7,
        name: 'Vintage Coffee Machine Mini',
        imageUrl:
          'https://images.unsplash.com/photo-1637029874508-378226bffac8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aG9tZSUyMGNvZmZlZSUyMG1hY2hpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 87
      },
      {
        id: 8,
        name: 'UV400 Sunglasses',
        imageUrl:
          'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3VuZ2xhc3Nlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        price: 42
      },
      {
        id: 9,
        name: 'Water Bottles x2 (750ml)',
        imageUrl:
          'https://images.unsplash.com/photo-1532471940687-6067d9cac167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d2F0ZXJib3R0bGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 25
      }
    ]
  },
  {
    title: 'Anniversary',
    items: [
      {
        id: 1,
        name: 'At-Home Pamper Kit with Bath Salts, Candles & Scented Flowers',
        imageUrl:
          'https://images.unsplash.com/photo-1554167838-07aa5723df3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGFtcGVyJTIwYmF0aHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        price: 45
      },
      {
        id: 2,
        name: '2x Disneyland Entrance Tickets',
        imageUrl:
          'https://images.unsplash.com/photo-1605713635131-60df11253e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZGlzbmV5bGFuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        price: 80
      },
      {
        id: 3,
        name: 'Paint Kit with 5 Water Colours & 5 Paint Brushes',
        imageUrl:
          'https://images.unsplash.com/photo-1510832842230-87253f48d74f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFpbnRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 12
      },

      {
        id: 4,
        name: 'Instant Polaroid Camera (Light Yellow)',
        imageUrl:
          'https://images.unsplash.com/photo-1560141343-966cb5212777?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cG9sYXJvaWQlMjBjYW1lcmF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 45
      },
      {
        id: 5,
        name: 'Inspirational Coastal Mugs',
        imageUrl:
          'https://images.unsplash.com/photo-1614940403522-a8c829e7eb82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bXVnc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        price: 15
      },
      {
        id: 6,
        name: 'Scented Bath Bombs',
        imageUrl:
          'https://images.unsplash.com/photo-1578426720323-6d3b67133446?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmF0aCUyMGJvbWJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 21
      },
      {
        id: 7,
        name: 'Yoga Kit: Mat, Block, Microfibre Towel and 2kg Dumbbells',
        imageUrl:
          'https://images.unsplash.com/photo-1591291621164-2c6367723315?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8eW9nYSUyMG1hdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        price: 21
      },
      {
        id: 8,
        name: 'Vegan Brownie Mix (500g)',
        imageUrl:
          'https://images.unsplash.com/photo-1511382091779-4dedcc34e19b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YnJvd25pZSUyMG1peHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        price: 21
      }
    ]
  },
  {
    title: 'Thank You',
    items: [
      {
        id: 1,
        name: '18-Piece Chocolate Assortment & Body Lotion',
        imageUrl:
          'https://images.unsplash.com/photo-1653725440988-349d319d985d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Ym94JTIwb2YlMjBzd2VldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 30
      },
      {
        id: 2,
        name: 'Handmade Soap Bar Set',
        imageUrl:
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNvYXAlMjBiYXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 18
      },
      {
        id: 3,
        name: 'Faux Flower Bouquet',
        imageUrl:
          'https://images.unsplash.com/photo-1602747301683-a4cc7c0a8622?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmF1eCUyMGZsb3dlcnMlMjBib3VxdWV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 17
      },
      {
        id: 4,
        name: '2-Piece Mug Set',
        imageUrl:
          'https://images.unsplash.com/photo-1542556398-95fb5b9f9b48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXVnc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        price: 12
      },
      {
        id: 5,
        name: 'Box of 20 Chocolates: Dark, Milk and White',
        imageUrl:
          'https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ym94JTIwb2YlMjBzd2VldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 8
      },
      {
        id: 6,
        name: 'Bath & Shower Gel Kit',
        imageUrl:
          'https://images.unsplash.com/photo-1556229181-695df2bf2d6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c29hcCUyMGdlbHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 15
      },
      {
        id: 7,
        name: '6-Piece Tea Towel Set in 3 Sizes',
        imageUrl:
          'https://images.unsplash.com/photo-1603873932226-5d1d21826bb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHRpc3N1ZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 13
      },
      {
        id: 8,
        name: 'Multi-purpose jars with suction lids',
        imageUrl:
          'https://images.unsplash.com/photo-1570649857669-4ad9f896435d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJveCUyMHRpc3N1ZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 22
      },
      {
        id: 9,
        name: '2-Set Shot Glasses',
        imageUrl:
          'https://images.unsplash.com/photo-1614708114684-83b1e3e7c2e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvdCUyMGdsYXNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 11
      }
    ]
  },
  {
    title: 'Wedding',
    items: [
      {
        id: 1,
        name: 'Silver-Rimmed Picture Frame',
        imageUrl:
          'https://images.unsplash.com/photo-1530634962287-1aa57a5e70fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHdhbGwlMjBmcmFtZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 0
      },
      {
        id: 2,
        name: 'Mr & Mrs Mug Set',
        imageUrl:
          'https://images.unsplash.com/photo-1618124436088-0d7e0da9df34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG11Z3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 14
      },
      {
        id: 3,
        name: 'Red Wine and Glass Set',
        imageUrl:
          'https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d2luZSUyMGJvdHRsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 70
      },

      {
        id: 4,
        name: 'Cook Book Collection',
        imageUrl:
          'https://images.unsplash.com/photo-1590587754541-a3a4f2e0d06f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29va2luZyUyMGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        price: 199
      },
      {
        id: 5,
        name: '12-Piece Vintage Mug Set',
        imageUrl:
          'https://images.unsplash.com/photo-1523367118146-091f762cd8ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG11Z3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 40
      },
      {
        id: 6,
        name: 'Red & Blue Towel Set',
        imageUrl:
          'https://images.unsplash.com/photo-1639298109207-5a9ccc254481?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHRvd2Vsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        price: 0
      },
      {
        id: 7,
        name: '100 Baking Sheets with Design',
        imageUrl:
          'https://images.unsplash.com/photo-1624715188184-506e76b47537?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJyb3duaWUlMjBtaXh8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        price: 0
      },
      {
        id: 8,
        name: 'Faux Plants, Bowls and Mug Set',
        imageUrl:
          'https://images.unsplash.com/photo-1551893948-d31ec1f58bce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bXVnc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        price: 35
      },
      {
        id: 9,
        name: 'High Powered Food Blender',
        imageUrl:
          'https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxlbmRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        price: 30
      }
    ]
  }
];

// clothes, bags, hats/caps, sunglasses, watches, seeds(to plant)

export default shopData;
