import {
  Accordion,
  Container,
  Heading,
  Link,
  Main,
  Section,
  SkipNavContent,
  Text,
  Title,
  VStack,
} from '@villagekit/ui'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const title = 'FAQ'
const description =
  'Frequently asked questions about grid beam — what it is, how to build with it, where to find parts.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://gridbeam.xyz/faq',
  },
  twitter: { title, description },
}

interface FaqEntry {
  question: string
  answer: ReactNode
}

interface FaqCategory {
  heading: string
  slug: string
  entries: Array<FaqEntry>
}

const categories: Array<FaqCategory> = [
  {
    heading: 'The system',
    slug: 'system',
    entries: [
      {
        question: 'What is grid beam?',
        answer: (
          <>
            Grid beam is a modular construction system: identical beams drilled with
            regularly-spaced holes that bolt together with a hex key. Developed by Phil and Richard
            Jergenson in the 1970s, building on the open-construction work of Ken Isaacs; this site
            catalogues the 40 mm flavour.{' '}
            <Link variant="paragraph" href="/about">
              Learn more
            </Link>
            .
          </>
        ),
      },
      {
        question: 'Do I need any special tools to assemble it?',
        answer: (
          <>
            No special tools — basic hand tools and a 4 mm hex key are enough for almost every
            build. A measuring tape and a saw if you're cutting beams to length yourself.
          </>
        ),
      },
      {
        question: 'What materials are used?',
        answer:
          'The 40 mm grid-beam family is most often pine for furniture, structural plywood for panels, and stainless steel for fasteners. Aluminium and steel beams exist for load-bearing builds. Suppliers vary by region — check the suppliers page.',
      },
      {
        question: 'How durable are grid beams?',
        answer:
          'Drilled-beam construction is intentionally over-engineered. Tri-joints distribute load across three bolts, so failures are rare. If a beam ever does break, you replace it individually — the rest of the build stays in service.',
      },
      {
        question: 'Is the wood treated?',
        answer:
          'Most suppliers ship untreated wood for indoor use. If you want to use grid beam outdoors, treat it yourself with an appropriate finish.',
      },
      {
        question: 'Can I paint or stain the wood?',
        answer:
          'Yes — untreated wood beams take stain and paint well. Many builders leave them raw for the lighter, blonder look.',
      },
      {
        question: 'Can I use grid beam outdoors?',
        answer:
          'With a finish applied, yes. Untreated indoor-grade wood will degrade outdoors quickly. Aluminium beams (where available from a supplier) handle weather without treatment.',
      },
      {
        question: 'How do I use panels?',
        answer:
          'Bolt panels onto beams using the same 40 mm hole grid. Panels become shelves, doors, work surfaces, walls — anything flat. The catalogue has examples of every common pattern.',
      },
      {
        question: 'What add-ons exist?',
        answer: (
          <>
            A small but growing ecosystem: connector brackets, wheels, hooks, replacement caps. Some
            are off-the-shelf from the suppliers; others are 3D-printable from open repositories
            like{' '}
            <Link
              variant="paragraph"
              href="https://github.com/villagekit/replicad-models"
              target="_blank"
              rel="noopener noreferrer"
            >
              villagekit/replicad-models
            </Link>
            .
          </>
        ),
      },
      {
        question: 'What can I make with it?',
        answer:
          "Practically anything that bolts together: beds, desks, shelves, kitchens, market stalls, even bicycles and trailers. The Jergensons' original grid beam covered that whole range.",
      },
      {
        question: 'What does "modular" actually mean here?',
        answer:
          'Every part connects with every other part on the same grid. You can build, expand, or take apart a structure with the same parts. Think LEGO for furniture: pieces are interchangeable, designs are remixable, and almost nothing has to go to the dump.',
      },
    ],
  },
  {
    heading: 'Lifespan and reuse',
    slug: 'lifespan',
    entries: [
      {
        question: 'Can I recycle or repurpose grid-beam parts?',
        answer:
          'Yes — that is the whole point. A desk you took apart becomes a shelf and two end tables. A broken beam gets replaced; the rest stays in service. When a build truly reaches the end of its life, the beams and panels are still raw timber and ply that can be reused or composted.',
      },
      {
        question: 'What makes it sustainable?',
        answer: (
          <>
            <Link
              variant="paragraph"
              href="https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/durable-goods-product-specific-data#FurnitureandFurnishings"
              target="_blank"
              rel="noopener noreferrer"
            >
              The U.S. EPA estimates
            </Link>{' '}
            nearly 12 million U.S. tons of furniture waste is disposed of each year, with 9.6
            million tons reaching landfill. Grid beam is built around reuse: the same parts move
            from one project to the next instead of becoming waste. There's no glue, no foam, no
            laminated particle board — just bolts, beams, and panels.
          </>
        ),
      },
    ],
  },
  {
    heading: 'Suppliers',
    slug: 'suppliers',
    entries: [
      {
        question: 'How do I find a supplier?',
        answer: (
          <>
            See the{' '}
            <Link variant="paragraph" href="/suppliers">
              suppliers page
            </Link>{' '}
            — we list manufacturers and resellers around the world that make 40 mm grid beam,
            panels, and compatible fasteners. The list is regional; pick the entry closest to you.
          </>
        ),
      },
      {
        question: "Why doesn't gridbeam.xyz sell parts?",
        answer:
          'gridbeam.xyz is a non-commercial educational site. We catalogue designs, point at suppliers, and host tools. Selling hardware is a different job, and the suppliers we link do it well.',
      },
      {
        question: 'Can I make my own beams and panels?',
        answer:
          'Yes. Beams are a 40 × 40 mm profile with 8 mm holes drilled at 40 mm centres along the length. Panels are sheet stock with the same 40 mm hole grid drilled across both dimensions. Any milling and drilling shop can produce them — and many builders do, for the cost saving and the satisfaction.',
      },
      {
        question: "A supplier near me isn't listed. Can I add them?",
        answer: (
          <>
            Yes — the suppliers page explains the submission process. We're keen to add any
            legitimate supplier of 40 mm grid beam or panels.
          </>
        ),
      },
    ],
  },
  {
    heading: 'Other',
    slug: 'other',
    entries: [
      {
        question: 'I have an idea for a custom design — can you help?',
        answer: (
          <>
            <Link variant="paragraph" href="/contact">
              Get in touch
            </Link>
            . We're happy to discuss new designs, especially if you're willing to publish them back
            to the catalogue under EUPL-1.2.
          </>
        ),
      },
      {
        question: 'How do I add a design or story to the site?',
        answer: (
          <>
            The catalogue and stories are open-source. The designs live in{' '}
            <Link
              variant="paragraph"
              href="https://github.com/villagekit/products"
              target="_blank"
              rel="noopener noreferrer"
            >
              villagekit/products
            </Link>
            ; the site itself lives in{' '}
            <Link
              variant="paragraph"
              href="https://github.com/villagekit"
              target="_blank"
              rel="noopener noreferrer"
            >
              villagekit
            </Link>{' '}
            on GitHub. Pull requests welcome.
          </>
        ),
      },
      {
        question: 'Where can I discuss grid beam with other builders?',
        answer: (
          <>
            <Link
              variant="paragraph"
              href="https://discuss.villagekit.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              discuss.villagekit.com
            </Link>{' '}
            — the community forum. If you'd rather email,{' '}
            <Link variant="paragraph" href="/contact">
              contact us
            </Link>{' '}
            and we'll point you at the right thread.
          </>
        ),
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <Title description="Common questions about grid beam, the 40 mm grid, and where to find parts.">
          Frequently asked questions
        </Title>
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
                          <Text>{entry.answer}</Text>
                        </Accordion.ItemBody>
                      </Accordion.ItemContent>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </VStack>
            ))}

            <Text>
              Question not answered here?{' '}
              <Link variant="paragraph" href="/contact">
                Send us an email
              </Link>{' '}
              or ask on the{' '}
              <Link
                variant="paragraph"
                href="https://discuss.villagekit.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                community forum
              </Link>
              .
            </Text>
          </VStack>
        </Container>
      </Section>
    </Main>
  )
}
