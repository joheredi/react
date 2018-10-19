import * as React from 'react'
import { Segment, Text } from '@stardust-ui/react'

const SegmentExampleInvertedShorthand = () => (
  <div>
    <Segment content="Colored segment." variables={siteVars => ({ color: siteVars.brand })} />
    <br />
    <Segment
      inverted
      content={<Text content="Colored inverted segment." styles={{ color: 'white' }} />}
      variables={siteVars => ({ color: siteVars.brand })}
    />
  </div>
)

export default SegmentExampleInvertedShorthand
