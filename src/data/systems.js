const GRID_BEAM_SYSTEMS = [
  {
    id: 'gridbeam.com',
    label: 'gridbeam.com',
    systemOfMeasurement: 'imperial',
    defaultSizeId: '1.5in',
    sizes: [
      {
        id: '0.75in',
        label: '3/4 inch',
        beamWidth: 0.75
      },
      {
        id: '1in',
        label: '1 inch',
        beamWidth: 1
      },
      {
        id: '1.5in',
        label: '1 1/2 inch',
        beamWidth: 1.5
      },
      {
        id: '2in',
        label: '2 inch',
        beamWidth: 2
      },
      {
        id: '3in',
        label: '3 inch',
        beamWidth: 3
      }
    ],
    defaultMaterialId: 'wood',
    materials: [
      {
        id: 'wood',
        label: 'wood',
        sizes: [
          {
            id: '1.5in',
            holeDiameter: 5 / 16,
            holeDiameterLabel: '5/16 inch',
            boltDiameter: 1 / 4,
            boltDiameterLabel: '1/4 inch'
          }
        ]
      },
      {
        id: 'aluminum',
        label: 'aluminum',
        sizes: [
          {
            id: '0.75in',
            holeDiameter: 9 / 32,
            holeDiameterLabel: '9/32 inch',
            boltDiameter: 1 / 4,
            boltDiameterLabel: '1/4 inch'
          },
          {
            id: '1in',
            holeDiameter: 11 / 32,
            holeDiameterLabel: '11/32 inch',
            boltDiameter: 5 / 16,
            boltDiameterLabel: '5/16 inch'
          },
          {
            id: '1.5in',
            holeDiameter: 13 / 32,
            holeDiameterLabel: '13/32 inch',
            boltDiameter: 3 / 8,
            boltDiameterLabel: '3/8 inch'
          },
          {
            id: '2in',
            holeDiameter: 7 / 16,
            holeDiameterLabel: '7/16 inch',
            boltDiameter: 3 / 8,
            boltDiameterLabel: '3/8 inch'
          },
          {
            id: '3in',
            holeDiameter: 3 / 4,
            holeDiameterLabel: '3/4 inch',
            boltDiameter: 1 / 2,
            boltDiameterLabel: '1/2 inch'
          }
        ]
      },
      {
        id: 'steel',
        label: 'steel',
        sizes: [
          {
            id: '2in',
            holeDiameter: 7 / 16,
            holeDiameterLabel: '7/16 inch',
            boltDiameter: 3 / 8,
            boltDiameterLabel: '3/8 inch'
          }
        ]
      }
    ]
  },
  {
    id: 'metric proto 1',
    label: 'gridbeam.com',
    systemOfMeasurement: 'metric',
    defaultSizeId: '40mm',
    sizes: [
      {
        id: '20mm',
        label: '20 mm',
        beamWidth: 20
      },
      {
        id: '25mm',
        label: '25 mm',
        beamWidth: 25
      },
      {
        id: '40mm',
        label: '40 mm',
        beamWidth: 40
      },
      {
        id: '50mm',
        label: '50 mm',
        beamWidth: 50
      },
      {
        id: '60mm',
        label: '60 mm',
        beamWidth: 60
      },
      {
        id: '75mm',
        label: '75 mm',
        beamWidth: 75
      },
      {
        id: '100mm',
        label: '100 mm',
        beamWidth: 100
      }
    ],
    defaultMaterialId: 'wood',
    materials: [
      {
        id: 'wood',
        label: 'wood',
        sizes: [
          {
            id: '1.5in',
            holeDiameter: 5 / 16,
            holeDiameterLabel: '5/16 inch',
            boltDiameter: 1 / 4,
            boltDiameterLabel: '1/4 inch'
          }
        ]
      },
      {
        id: 'aluminum',
        label: 'aluminum',
        sizes: [
          {
            id: '0.75in',
            holeDiameter: 9 / 32,
            holeDiameterLabel: '9/32 inch',
            boltDiameter: 1 / 4,
            boltDiameterLabel: '1/4 inch'
          },
          {
            id: '1in',
            holeDiameter: 11 / 32,
            holeDiameterLabel: '11/32 inch',
            boltDiameter: 5 / 16,
            boltDiameterLabel: '5/16 inch'
          },
          {
            id: '1.5in',
            holeDiameter: 13 / 32,
            holeDiameterLabel: '13/32 inch',
            boltDiameter: 3 / 8,
            boltDiameterLabel: '3/8 inch'
          },
          {
            id: '2in',
            holeDiameter: 7 / 16,
            holeDiameterLabel: '7/16 inch',
            boltDiameter: 3 / 8,
            boltDiameterLabel: '3/8 inch'
          },
          {
            id: '3in',
            holeDiameter: 3 / 4,
            holeDiameterLabel: '3/4 inch',
            boltDiameter: 1 / 2,
            boltDiameterLabel: '1/2 inch'
          }
        ]
      },
      {
        id: 'steel',
        label: 'steel',
        sizes: [
          {
            id: '2in',
            holeDiameter: 7 / 16,
            holeDiameterLabel: '7/16 inch',
            boltDiameter: 3 / 8,
            boltDiameterLabel: '3/8 inch'
          }
        ]
      }
    ]
  }
]

module.exports = GRID_BEAM_SYSTEMS
