<h1 align="center">
  useTransitionValue
</h1>

<h3 align="center">
  Transition / Animate number values using easing functions
</h3>

<div align="center">
  <a href="/cool">See Demos</a>
</div>

### ⚡️ Getting started 

```shell
npm install react-transitionValue
```


``` javascript

  import { useTransitionValue } from 'react-transition-value'
  
  const AnimateValue = () => {

    // transitionValue will automatically update and transition through all values from 0 to 1000
    const [transitionValue, setTransitionValue] = useTransitionValue(0)

    return <div onClick={() => setTransitionValue(1000)}
      {transitionValue}
    </div>
  }
```

### Api
``` javascript
const [transitionValue, setTransitionValue] = useTransitionValue(from, options)
```
#### options
options are not required
| Property        | Type           | Default Value  | Description  |
| ------------- |:-------------| :-----| :-----|
| to      | number | 100 | Target value to transition to |
| from      | number | 0 | Initial value to transition from |
| duration      | number      |   200 | Transition duration in milliseconds |
| autoStart | boolean      |    false | Automatically start the transition |
| easing | function      |    easeOutExpo | <a href="https://easings.net/">Easing function</a> used for the transition |
| onDone | function      |    ({from, to}) => {} | Called once transition finished |
| onStep | function      |    ({from, to, value}) => {} | Called on each transition step |

#### setTransitionValue
allows override of options
``` javascript
setTransitionValue(to, options)
```