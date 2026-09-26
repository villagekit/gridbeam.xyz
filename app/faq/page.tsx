import { Accordion, Container, Heading, Link, Section, Text, Title, VStack } from '@villagekit/ui'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'FAQ',
}

interface FaqEntry {
  question: string
  answer: ReactNode | Array<ReactNode>
}

interface FaqCategory {
  heading: string
  slug: string
  entries: Array<FaqEntry>
}

const categories: Array<FaqCategory> = [
  {
    heading: 'Product',
    slug: 'product',
    entries: [
      {
        question: 'What is grid beam?',
        answer: (
          <>
            Grid beam is a modular construction system. Kits of modular parts enable you to build
            anything from furniture to creative storage solutions — it's limited only by your
            imagination!{' '}
            <Link as={NextLink} variant="paragraph" href="/about">
              Learn more.
            </Link>
          </>
        ),
      },
      {
        question: 'Do I need any special tools to assemble it?',
        answer: (
          <>
            No special tools needed! Grid beam is designed for easy assembly, and you only need
            basic hand tools like a 4mm hex key. For help on assembly, see our guide{' '}
            <Link as={NextLink} variant="paragraph" href="/stories/how-to-furniture-bolts">
              {'"How To Install Furniture Bolts"'}
            </Link>
            .
          </>
        ),
      },
      {
        question: 'What materials are used?',
        answer: 'Locally sourced wood and fasteners.',
      },
      {
        question: 'Are the materials durable?',
        answer:
          'Yes, the materials are both strong and long-lasting, so your builds stand the test of time.',
      },
      {
        question: 'Is the wood treated?',
        answer:
          'Depends on the supplier. Untreated wood keeps grid beam non-toxic and safe for indoor use.',
      },
      {
        question: 'Can you paint or stain the wood?',
        answer:
          'Absolutely! The untreated wood can be painted or stained to match your style. Customize it to make it truly your own.',
      },
      {
        question: 'Is the wood suitable for outdoors?',
        answer:
          'Grid beam is designed primarily for indoor use. If you want to use it outdoors, consider treating the wood with a suitable finish for added protection.',
      },
      {
        question: 'How do I use panels with grid beam?',
        answer:
          'Panels can be easily integrated into your grid beam structure to create surfaces, walls, or dividers. Feel free to experiment!',
      },
      {
        question: 'What add-ons are compatible with grid beam?',
        answer: (
          <>
            For now, if you have a 3d printer, we have{' '}
            <Link
              variant="paragraph"
              href="https://github.com/villagekit/replicad-models"
              target="_blank"
              rel="noopener noreferrer"
            >
              an open source repository of 3d printable add-on designs
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    heading: 'Sustainability',
    slug: 'sustainability',
    entries: [
      {
        question: 'What can I make with grid beam?',
        answer: [
          'More like, what can’t you make with it! Grid beam is designed to adapt to almost any structure or furniture you can think of, from shelves and desks to beds and creative storage solutions.',
          'The original inventor of grid beam made bicycles, electrical vehicles, trailers, and more. Anything is possible.',
        ],
      },
      {
        question: 'What do you mean by modular?',
        answer: [
          'Being modular means that every part in the grid beam system is designed to connect and work with every other part, allowing you to create endless configurations. You can build, expand, or modify your setup by simply adding or rearranging parts — without needing specialized tools or new components.',
          'Think of it like LEGO: each piece is compatible with others, letting you reimagine structures as your needs change. Modular systems are about flexibility, reuse, and infinite possibilities.',
        ],
      },
      {
        question: 'Can I recycle or repurpose grid beam?',
        answer:
          'Yes! Grid beam is built to be reused, adapted, or reassembled into new projects. When it reaches the end of its life, components can be repurposed or recycled, supporting a circular economy.',
      },
      {
        question: 'What makes grid beam sustainable?',
        answer: [
          <>
            <Link
              key="us"
              variant="paragraph"
              href="https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/durable-goods-product-specific-data#FurnitureandFurnishings"
              target="_blank"
              rel="noopener noreferrer"
            >
              The U.S. EPA estimates
            </Link>{' '}
            nearly 12 million U.S. tons of furniture waste is disposed of each year with 9.6m U.S.
            tons making it to landfills.
          </>,
          <>
            <Link
              key="au"
              variant="paragraph"
              href="https://www.handkrafted.com/blog/landfill-australias-underground-furniture-movement/"
            >
              In Australia on average
            </Link>{' '}
            each household disposes of around 24kg of wooden furniture per year.
          </>,
          'Grid beam is designed to be repairable, reusable, recyclable, and it reduces furniture waste going to landfill every year.',
          'Once a piece of furniture out lives its purpose, it can be broken down into its base parts and reused to build something new.',
        ],
      },
    ],
  },
  {
    heading: 'Support',
    slug: 'support',
    entries: [
      {
        question: 'How do I contact support?',
        answer: (
          <>
            Find our contact details{' '}
            <Link as={NextLink} variant="paragraph" href="/contact">
              here
            </Link>
            . We’re here to help!
          </>
        ),
      },
      {
        question: 'I have an idea for a custom design — can you help?',
        answer: (
          <>
            We’d love to hear your ideas!{' '}
            <Link as={NextLink} variant="paragraph" href="/contact">
              Get in touch with us
            </Link>{' '}
            to discuss custom designs and how we can make your vision a reality.
          </>
        ),
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <>
      <Section index={0} maxW="6xl">
        <Title>Frequently asked questions</Title>
        <Container maxW="3xl">
          <VStack alignItems="stretch" gap="12">
            {categories.map((category) => (
              <VStack
                key={category.slug}
                as="section"
                aria-labelledby={`faq-${category.slug}`}
                alignItems="stretch"
                gap="4"
              >
                <Heading as="h2" id={`faq-${category.slug}`} size="xl">
                  {category.heading}
                </Heading>
                <Accordion.Root multiple collapsible>
                  {category.entries.map((entry) => (
                    <Accordion.Item key={entry.question} value={entry.question}>
                      <Accordion.ItemTrigger paddingY="3">
                        <Text
                          as="span"
                          variant="secondary"
                          fontWeight="bold"
                          textAlign="left"
                          flex="1"
                        >
                          {entry.question}
                        </Text>
                        <Accordion.ItemIndicator />
                      </Accordion.ItemTrigger>
                      <Accordion.ItemContent paddingY="3">
                        <Accordion.ItemBody>
                          {Array.isArray(entry.answer) ? (
                            <VStack alignItems="flex-start">
                              {entry.answer.map((a, i) => (
                                // biome-ignore lint/suspicious/noArrayIndexKey: the answer's paragraphs are static and never reorder
                                <Text key={i}>{a}</Text>
                              ))}
                            </VStack>
                          ) : (
                            <Text>{entry.answer}</Text>
                          )}
                        </Accordion.ItemBody>
                      </Accordion.ItemContent>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </VStack>
            ))}

            <Text>
              If your question isn’t answered here, please{' '}
              <Link as={NextLink} variant="paragraph" href="/contact">
                send us an email
              </Link>{' '}
              or{' '}
              <Link
                variant="paragraph"
                href="https://discuss.villagekit.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ask on the community forum
              </Link>
            </Text>
          </VStack>
        </Container>
      </Section>
    </>
  )
}
