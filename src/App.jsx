import { useState, useEffect } from 'react'

function App() {
	const hiragana = [
		{ romaji: 'a', hiragana: 'あ' },
		{ romaji: 'i', hiragana: 'い' },
		{ romaji: 'u', hiragana: 'う' },
		{ romaji: 'e', hiragana: 'え' },
		{ romaji: 'o', hiragana: 'お' },
		{ romaji: 'ka', hiragana: 'か' },
		{ romaji: 'ki', hiragana: 'き' },
		{ romaji: 'ku', hiragana: 'く' },
		{ romaji: 'ke', hiragana: 'け' },
		{ romaji: 'ko', hiragana: 'こ' },
		{ romaji: 'sa', hiragana: 'さ' },
		{ romaji: 'shi', hiragana: 'し' },
		{ romaji: 'su', hiragana: 'す' },
		{ romaji: 'se', hiragana: 'せ' },
		{ romaji: 'so', hiragana: 'そ' },
		{ romaji: 'ta', hiragana: 'た' },
		{ romaji: 'chi', hiragana: 'ち' },
		{ romaji: 'tsu', hiragana: 'つ' },
		{ romaji: 'te', hiragana: 'て' },
		{ romaji: 'to', hiragana: 'と' },
		{ romaji: 'na', hiragana: 'な' },
		{ romaji: 'ni', hiragana: 'に' },
		{ romaji: 'nu', hiragana: 'ぬ' },
		{ romaji: 'ne', hiragana: 'ね' },
		{ romaji: 'no', hiragana: 'の' },
		{ romaji: 'ha', hiragana: 'は' },
		{ romaji: 'hi', hiragana: 'ひ' },
		{ romaji: 'fu', hiragana: 'ふ' },
		{ romaji: 'he', hiragana: 'へ' },
		{ romaji: 'ho', hiragana: 'ほ' },
		{ romaji: 'ma', hiragana: 'ま' },
		{ romaji: 'mi', hiragana: 'み' },
		{ romaji: 'mu', hiragana: 'む' },
		{ romaji: 'me', hiragana: 'め' },
		{ romaji: 'mo', hiragana: 'も' },
		{ romaji: 'ya', hiragana: 'や' },
		{ romaji: 'yu', hiragana: 'ゆ' },
		{ romaji: 'yo', hiragana: 'よ' },
		{ romaji: 'ra', hiragana: 'ら' },
		{ romaji: 'ri', hiragana: 'り' },
		{ romaji: 'ru', hiragana: 'る' },
		{ romaji: 're', hiragana: 'れ' },
		{ romaji: 'ro', hiragana: 'ろ' },
		{ romaji: 'wa', hiragana: 'わ' },
		{ romaji: 'wo', hiragana: 'を' },
		{ romaji: 'n', hiragana: 'ん' }
	]

	const [input, setInput] = useState('')
	const [current, setCurrent] = useState(0)
	
	const [streak, setStreak] = useState(0)
	const [maxStreak, setMaxStreak] = useState(0)

	const [error, setError] = useState(false)

	const setRandomHiragana = () => {
		const randomIndex = Math.floor(Math.random() * hiragana.length)
		setCurrent(randomIndex)
	}

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		 
		if (input.toLowerCase() === hiragana[current].romaji) {
			setStreak(streak + 1)
			setMaxStreak(streak + 1 > maxStreak ? streak + 1 : maxStreak)
			setError(false)

			localStorage.setItem('streak', streak + 1)
			localStorage.setItem('maxStreak', streak + 1 > maxStreak ? streak + 1 : maxStreak)
		} else {
			const h = hiragana[current].hiragana
			const r = hiragana[current].romaji
			setError(`Wrong! The correct answer for ${h} is ${r}`)
			setStreak(0)
			localStorage.setItem('streak', 0)
		}

		setInput('')
		setRandomHiragana()
	}

	useEffect(() => {
		setRandomHiragana()
		setStreak(parseInt(localStorage.getItem('streak')) || 0)
		setMaxStreak(parseInt(localStorage.getItem('maxStreak')) || 0)
	}, [])

	return (
		<div className="min-h-screen bg-purple-900 text-white text-center">
			<header className="p-6 mb-8">
				<h1 className="text-2xl font-bold uppercase">Hiragana Quiz</h1>
				<div>
					<p>{streak} / {maxStreak}</p>
				</div>
			</header>

			<div className="text-9xl font-bold mb-8">
				<p>{hiragana[current].hiragana}</p>
			</div>

			<div className="mb-8">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						onChange={handleChange}
						value={input}
						className="block w-24 bg-transparent border-b-2 border-b-white mx-auto outline-none text-center text-6xl pb-2" />
				</form>
			</div>
			{error && 
				<div>
					<p>{ error }</p>
				</div>
			}
		</div>
	)
}

export default App