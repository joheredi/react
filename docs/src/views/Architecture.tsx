import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Header, Divider } from 'semantic-ui-react'

import { Button } from '@stardust-ui/react'

import DocPage from '../components/DocPage'

export default () => (
  <DocPage title="Architecture">
    <Header as="h2">Overview</Header>
    <p>
      There are two main drivers in the architecture decisions: <strong>accessibility</strong> and{' '}
      <strong>theming</strong>.
    </p>
    <p>Stardust UI project consists of two parts:</p>
    <ul>
      <li>
        <strong>Toolkit (Framework)</strong>, which allows to create any component: primitive or
        composed.
      </li>
      <li>
        <strong>Component Library</strong>, which is the set of primitive and composed components.
      </li>
    </ul>
    <p>The future intent is to split this parts into two separate npm packages.</p>
    <Header as="h2">Toolkit (Framework)</Header>
    <p>
      The responsibility of the toolkit part of the project is to provide an easy way to create UI
      components and encapsulate theming and accessibility logic. This part of the project is almost
      UI framework agnostic and written in pure TypeScript. Stardust UI uses this toolkit to create
      our own set of UI Components and allows other consumers to create their own primitive or
      composed components. This architecture allows to combine Stradust UI primitive or composed
      components with the custom primitive or composed components made by third parties, who were
      using the toolkit to create their own components.
    </p>
    <p>The toolkit combines the following parts:</p>
    <ul>
      <li>
        <strong>Component Logic</strong> - the framework core logic, which couples all other parts
        together and handles component properties, state and events, as ell as provides ability to
        inject and handle themes, accessibility behaviors and accessibility keyboard navigation
        handling.
      </li>
      <li>
        <strong>Accessibility behaviors</strong> - the logic which generates appropriate
        accessibility roles and aria-* attributes for the given component based on the component
        state.
      </li>
      <li>
        <strong>Accessibility keyboard handlers</strong> - provides the logic to handle components
        navigation and focus.
      </li>
      <li>
        <strong>Themes</strong> - the logic to inject and handle component visual representation
        (theme).
      </li>
      <li>
        <strong>Renderer</strong> - to render the HTML output, the toolkit uses renderer, which is
        now React.
      </li>
    </ul>
    <p>
      <img src="data:image/png;base64,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" />
    </p>

    <Header as="h3">Accessibility</Header>
    <p>
      One of the main purposes of the library is to make component accessible and provide ease
      accessibility integration for the entire projects which will be consumer of the library.
    </p>
    <p>
      The library encapsulates accessibility into Behaviors. The behaviors returns the recommended
      set of attributes and roles for the standard components (e.g. Image, DropDown, Dialog, etc),
      based on their state (e.g. active, disabled, expanded, etc). Also, it provides the expected
      keyboard navigation and focus handling for the components (e.g. List, Grid, Radio Group, etc).
    </p>
    <p>
      Library provides the set of accessibility behaviors and keyboard handlers for the components
      and allows to create and inject your own, if it is necessary for some custom components. In a
      most of the cases there should be enough to use the existing from the library.
    </p>
    <p>
      In addition to behaviors and keyboard handlers, the toolkit also provides FocusZone component,
      which can be used to add focus handling for the wrapped component. There is also FocusTrap
      component, which allows to trap the focus inside some area, which is useful for such a
      component as Dialog.
    </p>

    <Header as="h3">Theming</Header>
    <p>TODO</p>

    <Header as="h3">UIComponent</Header>
    <Header as="h3">AutoControlledComponent</Header>

    <Header as="h2">Component Library</Header>
    <Header as="h3">Components</Header>
    <Header as="h3">Accessibility Behaviors</Header>
    <Divider />
    <br />
    {/* Show a preview of the above snippet */}
    <Button
      as={NavLink}
      content="Accessibility"
      type="primary"
      icon="arrow left"
      iconPosition="before"
      to="accessibility"
    />
    <Button
      as={NavLink}
      content="Theming"
      type="primary"
      icon="arrow right"
      iconPosition="after"
      to="theming"
    />
  </DocPage>
)
