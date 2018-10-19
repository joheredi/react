import * as React from 'react'
import { Segment, Text } from '@stardust-ui/react'

const SegmentExampleInvertedShorthand = () => (
  <div>
    <Segment variables={siteVars => ({ color: siteVars.brand })}>Colored segment.</Segment>
    <br />
    <Segment inverted variables={siteVars => ({ color: siteVars.brand })}>
      <Text styles={{ color: 'white' }}>Colored inverted segment.</Text>
    </Segment>
  </div>
)

export default SegmentExampleInvertedShorthand
