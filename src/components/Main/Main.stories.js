import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Main from './Main'

const StatefulComponent = (props) => {
  const [value, setValue] = useState(0)
  return (
    <>
      {props.children(value, setValue)}
    </>
  )
}

storiesOf('Main', module)
  .add('default', () => <StatefulComponent>
    {(value, setValue) => <Main
      increment={() => setValue(value + 1)}
      decrement={() => setValue(value - 1)}
      value={value}
      />}
  </StatefulComponent>)
