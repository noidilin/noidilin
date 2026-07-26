import { Code, Deck, Fragment, Slide, Stack } from '@revealjs/react'
import RevealHighlight from 'reveal.js/plugin/highlight'
import RevealNotes from 'reveal.js/plugin/notes'
import '@fontsource/merriweather-sans/latin-400.css'
import '@fontsource/merriweather-sans/latin-700.css'
import '@fontsource/fraunces/latin-700.css'
import '@fontsource/fira-code/latin-400.css'
import 'reveal.js/reveal.css'
import 'reveal.js/plugin/highlight/monokai.css'
import './theme/achroma.scss'
import './App.css'

const deckConfig = {
  hash: true,
  controls: true,
  progress: true,
  center: true,
  transition: 'slide',
} as const

const plugins = [RevealHighlight, RevealNotes]

function App() {
  return (
    <Deck config={deckConfig} plugins={plugins}>
      <Slide notes="Introduce yourself and the goal of the presentation.">
        <p className="eyebrow">NEXTLINKS</p>
        <h1>Presentation title</h1>
        <p className="subtitle">A short, clear statement of the topic</p>
        <p className="byline">Your name · {new Date().getFullYear()}</p>
      </Slide>

      <Slide>
        <h2>What we will cover</h2>
        <ol className="agenda">
          <Fragment as="li" animation="fade-up">
            Context and goals
          </Fragment>
          <Fragment as="li" animation="fade-up">
            Proposed approach
          </Fragment>
          <Fragment as="li" animation="fade-up">
            Outcomes and next steps
          </Fragment>
        </ol>
      </Slide>

      <Stack>
        <Slide>
          <p className="eyebrow">DEEP DIVE</p>
          <h2>Vertical slides</h2>
          <p>Press ↓ to explore details without leaving the main story.</p>
        </Slide>
        <Slide>
          <h2>One idea per slide</h2>
          <p className="callout">Use this space for evidence, a diagram, or a key metric.</p>
        </Slide>
      </Stack>

      <Slide>
        <h2>Code when it helps</h2>
        <Code language="typescript" lineNumbers="1-2|4-6">
          {`type Outcome = {
  impact: string
}

const result: Outcome = {
  impact: 'Make the message memorable',
}`}
        </Code>
      </Slide>

      <Slide notes="Close with a direct call to action and invite questions.">
        <p className="eyebrow">THANK YOU</p>
        <h2>Questions?</h2>
        <p className="subtitle">your.name@example.com</p>
      </Slide>
    </Deck>
  )
}

export default App
