const GRID_BEAM_SYSTEMS = [
  {
    id: 'gridbeam.com',
    label: 'gridbeam.com',
    systemOfMeasurement: 'imperial',
    defaultSizeId: '1.5in',
    sizes: [
      {
        id: '1.5in',
        beamWidth: 1.5,
        beamWidthLabel: '1 1/2 inch'
      },
      {
        id: '2in',
        beamWidth: 2,
        beamWidthLabel: '2 inch'
      },
      {
        id: '3in',
        beamWidth: 3,
        beamWidthLabel: '3 inch'
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
    id: 'how-to-build-with-grid-beam-book',
    label: '"How To Build With Grid Beam" book',
    systemOfMeasurement: 'imperial',
    defaultSizeId: '1.5in',
    sizes: [
      {
        id: '0.75in',
        beamWidth: 0.75,
        beamWidthLabel: '3/4 inch'
      },
      {
        id: '1in',
        beamWidth: 1,
        beamWidthLabel: '1 inch'
      },
      {
        id: '1.5in',
        beamWidth: 1.5,
        beamWidthLabel: '1 1/2 inch'
      },
      {
        id: '2in',
        beamWidth: 2,
        beamWidthLabel: '2 inch'
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
        id: 'metal',
        label: 'metal',
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
            holeDiameter: 21 / 64,
            holeDiameterLabel: '21/64 inch',
            boltDiameter: 5 / 16,
            boltDiameterLabel: '5/16 inch'
          },
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
    id: 'metric-proto-40',
    label: 'metric prototype 40mm (WIP)',
    systemOfMeasurement: 'metric',
    defaultSizeId: '40mm',
    sizes: [
      {
        id: '10mm',
        beamWidth: 10,
        beamWidthLabel: '10 mm'
      },
      {
        id: '20mm',
        beamWidth: 20,
        beamWidthLabel: '20 mm'
      },
      {
        id: '40mm',
        beamWidth: 40,
        beamWidthLabel: '40 mm'
      },
      {
        id: '60mm',
        beamWidth: 60,
        beamWidthLabel: '60 mm'
      }
    ],
    defaultMaterialId: 'wood',
    materials: [
      {
        id: 'wood',
        label: 'wood',
        sizes: [
          {
            id: '40mm',
            holeDiameter: 8,
            holeDiameterLabel: '8 mm ?',
            boltDiameter: 6,
            boltDiameterLabel: '6 mm ?'
          }
        ]
      },
      {
        id: 'metal',
        label: 'metal',
        sizes: [
          {
            id: '20mm',
            holeDiameter: 6,
            holeDiameterLabel: '6 mm ?',
            boltDiameter: 5,
            boltDiameterLabel: '5 mm ?'
          },
          {
            id: '40mm',
            holeDiameter: 9,
            holeDiameterLabel: '9 mm ?',
            boltDiameter: 8,
            boltDiameterLabel: '8 mm ?'
          },
          {
            id: '60mm',
            holeDiameter: 13,
            holeDiameterLabel: '13 mm ?',
            boltDiameter: 12,
            boltDiameterLabel: '12 mm ?'
          }
        ]
      },
      {
        id: 'plastic',
        label: 'plastic',
        sizes: [
          {
            id: '10mm',
            holeDiameter: 5,
            holeDiameterLabel: '5 mm',
            boltDiameter: 4,
            boltDiameterLabel: '4 mm'
          }
        ]
      }
    ]
  }
]

module.exports = GRID_BEAM_SYSTEMS
