
import { useHotkeys } from 'react-hotkeys-hook'
import { useState } from 'react';

export const ExampleComponent = () => {
	const [count, setCount] = useState(0)
	useHotkeys('n+1', () => setCount(count + 1), [count])

	return (
		<p>
			Pressed {count} times.
		</p>
	)
}