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
        beamWidthLabel: '1 1/2 inch',
        holes: [
          {
            id: 'wood',
            holeDiameter: 5 / 16,
            holeDiameterLabel: '5/16 inch',
            boltDiameter: 1 / 4,
            boltDiameterLabel: '1/4 inch'
          },
          {
            id: 'metal',
            holeDiameter: 13 / 32,
            holeDiameterLabel: '13/32 inch',
            boltDiameter: 3 / 8,
            boltDiameterLabel: '3/8 inch'
          }
        ]
      },
      {
        id: '2in',
        beamWidth: 2,
        beamWidthLabel: '2 inch',
        holes: [
          {
            id: 'metal',
            holeDiameter: 7 / 16,
            holeDiameterLabel: '7/16 inch',
            boltDiameter: 3 / 8,
            boltDiameterLabel: '3/8 inch'
          }
        ]
      },
      {
        id: '3in',
        beamWidth: 3,
        beamWidthLabel: '3 inch',
        holes: [
          {
            id: 'metal',
            holeDiameter: 3 / 4,
            holeDiameterLabel: '3/4 inch',
            boltDiameter: 1 / 2,
            boltDiameterLabel: '1/2 inch'
          }
        ]
      }
    ],
    defaultMaterialId: 'wood',
    materials: [
      {
        id: 'wood',
        label: 'wood',
        sizeIds: ['1.5in'],
        holeId: 'wood'
      },
      {
        id: 'aluminum',
        label: 'aluminum',
        sizeIds: ['1.5in', '2in', '3in'],
        holeId: 'metal'
      },
      {
        id: 'steel',
        label: 'steel',
        sizeIds: ['2in'],
        holeId: 'metal'
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
        beamWidthLabel: '3/4 inch',
        holes: [
          {
            id: 'metal',
            holeDiameter: 9 / 32,
            holeDiameterLabel: '9/32 inch',
            boltDiameter: 1 / 4,
            boltDiameterLabel: '1/4 inch'
          }
        ]
      },
      {
        id: '1in',
        beamWidth: 1,
        beamWidthLabel: '1 inch',
        holes: [
          {
            id: 'metal',
            holeDiameter: 11 / 32,
            holeDiameterLabel: '11/32 inch',
            boltDiameter: 5 / 16,
            boltDiameterLabel: '5/16 inch'
          }
        ]
      },
      {
        id: '1.5in',
        beamWidth: 1.5,
        beamWidthLabel: '1 1/2 inch',
        holes: [
          {
            id: 'wood',
            holeDiameter: 5 / 16,
            holeDiameterLabel: '5/16 inch',
            boltDiameter: 1 / 4,
            boltDiameterLabel: '1/4 inch'
          },
          {
            id: 'metal',
            holeDiameter: 21 / 64,
            holeDiameterLabel: '21/64 inch',
            boltDiameter: 5 / 16,
            boltDiameterLabel: '5/16 inch'
          }
        ]
      },
      {
        id: '2in',
        beamWidth: 2,
        beamWidthLabel: '2 inch',
        holes: [
          {
            id: 'metal',
            holeDiameter: 7 / 16,
            holeDiameterLabel: '7/16 inch',
            boltDiameter: 3 / 8,
            boltDiameterLabel: '3/8 inch'
          }
        ]
      }
    ],
    defaultMaterialId: 'wood',
    materials: [
      {
        id: 'wood',
        label: 'wood',
        sizeIds: ['1.5in'],
        holeId: 'wood'
      },
      {
        id: 'metal',
        label: 'metal',
        sizeIds: ['0.75in', '1in', '1.5in', '2in'],
        holeId: 'metal'
      }
    ]
  },
  {
    id: 'open-source-ecology-wiki',
    label: 'https://wiki.opensourceecology.org/wiki/Gridbeam',
    systemOfMeasurement: 'metric',
    defaultSizeId: '40mm',
    sizes: [
      {
        id: '25mm',
        beamWidth: 25,
        beamWidthLabel: '25 mm',
        holes: [
          {
            id: 'wood',
            holeDiameter: 8,
            holeDiameterLabel: '8 mm',
            boltDiameter: 6,
            boltDiameterLabel: '6 mm'
          },
          {
            id: 'metal',
            holeDiameter: 7,
            holeDiameterLabel: '7 mm',
            boltDiameter: 6,
            boltDiameterLabel: '6 mm'
          }
        ]
      },
      {
        id: '40mm',
        beamWidth: 40,
        beamWidthLabel: '40 mm',
        holes: [
          {
            id: 'wood',
            holeDiameter: 11,
            holeDiameterLabel: '11 mm',
            boltDiameter: 9,
            boltDiameterLabel: '9 mm'
          },
          {
            id: 'metal',
            holeDiameter: 10,
            holeDiameterLabel: '10 mm',
            boltDiameter: 9,
            boltDiameterLabel: '9 mm'
          }
        ]
      },
      {
        id: '50mm',
        beamWidth: 50,
        beamWidthLabel: '50 mm',
        holes: [
          {
            id: 'wood',
            holeDiameter: 14,
            holeDiameterLabel: '14 mm',
            boltDiameter: 12,
            boltDiameterLabel: '12 mm'
          },
          {
            id: 'metal',
            holeDiameter: 13,
            holeDiameterLabel: '13 mm',
            boltDiameter: 12,
            boltDiameterLabel: '12 mm'
          }
        ]
      }
    ],
    defaultMaterialId: 'wood',
    materials: [
      {
        id: 'wood',
        label: 'wood',
        sizeIds: ['25mm', '40mm', '50mm'],
        holeId: 'wood'
      },
      {
        id: 'metal',
        label: 'metal',
        sizeIds: ['25mm', '40mm', '50mm'],
        holeId: 'metal'
      }
    ]
  },
  {
    id: 'grid-beam-xyz',
    label: 'gridbeam.xyz prototype (WIP)',
    systemOfMeasurement: 'metric',
    defaultSizeId: '40mm',
    sizes: [
      {
        id: '10mm',
        beamWidth: 10,
        beamWidthLabel: '10 mm',
        holes: [
          {
            id: 'plastic',
            holeDiameter: 5,
            holeDiameterLabel: '5 mm',
            boltDiameter: 4,
            boltDiameterLabel: '4 mm'
          }
        ]
      },
      {
        id: '20mm',
        beamWidth: 20,
        beamWidthLabel: '20 mm',
        holes: [
          {
            id: 'metal',
            holeDiameter: 6,
            holeDiameterLabel: '6 mm ?',
            boltDiameter: 5,
            boltDiameterLabel: '5 mm ?'
          }
        ]
      },
      {
        id: '40mm',
        beamWidth: 40,
        beamWidthLabel: '40 mm',
        holes: [
          {
            id: 'wood',
            holeDiameter: 8,
            holeDiameterLabel: '8 mm ?',
            boltDiameter: 6,
            boltDiameterLabel: '6 mm ?'
          },
          {
            id: 'metal',
            holeDiameter: 9,
            holeDiameterLabel: '9 mm ?',
            boltDiameter: 8,
            boltDiameterLabel: '8 mm ?'
          }
        ]
      },
      {
        id: '60mm',
        beamWidth: 60,
        beamWidthLabel: '60 mm',
        holes: [
          {
            id: 'metal',
            holeDiameter: 13,
            holeDiameterLabel: '13 mm ?',
            boltDiameter: 12,
            boltDiameterLabel: '12 mm ?'
          }
        ]
      },
      {
        id: '100mm',
        beamWidth: 10,
        beamWidthLabel: '100 mm',
        holes: [
          {
            id: 'metal',
            holeDiameter: 21,
            holeDiameterLabel: '21 mm ?',
            boltDiameter: 20,
            boltDiameterLabel: '20 mm ?'
          }
        ]
      }
    ],
    defaultMaterialId: 'wood',
    materials: [
      {
        id: 'wood',
        label: 'wood',
        sizeIds: ['40mm'],
        holeId: 'wood'
      },
      {
        id: 'aluminum',
        label: 'aluminum',
        sizeIds: ['20mm', '40mm', '60mm'],
        holeId: 'metal'
      },
      {
        id: 'steel',
        label: 'steel',
        sizeIds: ['20mm', '40mm', '100mm'],
        holeId: 'metal'
      },
      {
        id: 'plastic',
        label: 'plastic',
        sizeIds: ['10mm'],
        holeId: 'plastic'
      }
    ]
  }
]

module.exports = GRID_BEAM_SYSTEMS
