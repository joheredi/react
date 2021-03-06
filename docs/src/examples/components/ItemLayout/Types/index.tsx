import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Item layout."
      examplePath="components/ItemLayout/Types/ItemLayoutExample"
    />
    <ComponentExample
      title="Selection"
      description="An item layout can be formatted to indicate that its items can be selected."
      examplePath="components/ItemLayout/Types/ItemLayoutExampleSelection"
    />
  </ExampleSection>
)

export default Types
