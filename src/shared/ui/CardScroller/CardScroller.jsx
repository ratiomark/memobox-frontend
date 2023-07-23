import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CardsScroller.scss'

// const cards = ['math','facts','books','biology','английский'];
const cards = [1, 2, 3, 4, 5,];

// const cards = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14];
const cardVariants = {
	selected: {
		rotateY: 180,
		scale: 1.1,
		transition: { duration: .35 },
		zIndex: 10,
		boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
	},
	notSelected: i => ({
		rotateY: i * 15,
		scale: 1 - Math.abs(i * 0.15),
		x: i ? i * 50 : 0,
		opacity: 1 - Math.abs(i * .15),
		zIndex: 10 - Math.abs(i),
		boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
		transition: { duration: .35 }
	})
}

export const CardScroller = () => {
	const [selectedCard, setSelectedCard] = useState(null);
	const [{
		startX,
		startScrollLeft,
		isDragging
	}, setDragStart] = useState({
		startX: undefined,
		startScrollLeft: undefined,
		isDragging: false
	});
	const containerRef = useRef();
	const cardRefs = useRef([]);
	
  useEffect(() => {
    console.log('CardScroller',  cardRefs)
  })
	// useEffect(() => {
	// 	const { scrollWidth, clientWidth } = containerRef.current;
	// 	console.log('scroll WIDTH:   ', scrollWidth)
	// 	console.log('client WIDTH:   ', clientWidth)
	// 	const halfScroll = (scrollWidth - clientWidth) / 2;
	// 	console.log('HALF SCROLL:   ', halfScroll)
	// 	containerRef.current.scrollLeft = halfScroll;
	// }, [containerRef.current]);

	const handleMouseDown = e => {
		console.log(`
++++ handleMouseDown ++++
      PageX:  ${e.pageX}
      Container offsetLeft:  ${containerRef.current.offsetLeft}
      Container scrollLeft:  ${containerRef.current.scrollLeft}
---- handleMouseDown ----
    `)

		setDragStart({
			startX: e.pageX - containerRef.current.offsetLeft,
			startScrollLeft: containerRef.current.scrollLeft,
			isDragging: true
		});
	}

	const handleMouseMove = e => {
		if (!isDragging || selectedCard) return;
		const x = e.pageX - containerRef.current.offsetLeft;
		const walk = x - startX;
    	console.log(`
++++ handleMouseMove ++++
      PageX:  ${e.pageX}
      X(e.pageX - containerRef.current.offsetLeft)   :  ${x}
      walk(x - startX) :  ${x - startX}
      SET container scrollLeft:  ${startScrollLeft - walk}
---- handleMouseMove ----
    `)
		
		containerRef.current.scrollLeft = startScrollLeft - walk;
	}

	const selectCard = card => {
		setSelectedCard(selectedCard ? null : card);

		if (card && !selectedCard) {
			cardRefs.current[card - 1].scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center'
			});
		}
	}

	const handleCardMouseUp = (e, card) => {
		if (isDragging) {
			const x = e.pageX - containerRef.current.offsetLeft;
			const walk = x - startX;
			console.log('WALK ', walk)
			if (Math.abs(walk) < 5) selectCard(card);
		} else selectCard(card);
	}
	
	return (
		<div
			className="flashcards"
			onMouseDown={handleMouseDown}
			onMouseUp={() => setDragStart(prev => ({ ...prev, isDragging: false }))}
			onMouseMove={handleMouseMove}
		>
			<div
				className="flashcards__container"
				ref={containerRef}
			>
				{cards.map((card, i) => (
					<motion.div
						className="card"
						key={card}
						ref={el => cardRefs.current.push(el)}
						onMouseUp={e => handleCardMouseUp(e, card)}
						onClick={e => handleCardMouseUp(e, card)}
						// onClick={() => {
						// 	if (isDragging) {
						// 		return 
						// 	}
						// 	selectCard(card)
						// }}
						// variants={cardVariants}
						// animate={selectedCard === card ? 'selected' : 'notSelected'}
						// custom={selectedCard ? selectedCard - card : 0}
					>
						{i}
					</motion.div>
				))}
			</div>
		</div>
	)
}
// import React, { useRef, useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import './CardsScroller.scss'

// const cards = [1, 2, 3, 4, 5,];
// // const cards = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14];
// const cardVariants = {
// 	selected: {
// 		rotateY: 180,
// 		scale: 1.1,
// 		transition: { duration: .35 },
// 		zIndex: 10,
// 		boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
// 	},
// 	notSelected: i => ({
// 		rotateY: i * 15,
// 		scale: 1 - Math.abs(i * 0.15),
// 		x: i ? i * 50 : 0,
// 		opacity: 1 - Math.abs(i * .15),
// 		zIndex: 10 - Math.abs(i),
// 		boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
// 		transition: { duration: .35 }
// 	})
// }

// export const CardScroller = () => {
// 	const [selectedCard, setSelectedCard] = useState(null);
// 	const [{
// 		startX,
// 		startScrollLeft,
// 		isDragging
// 	}, setDragStart] = useState({
// 		startX: undefined,
// 		startScrollLeft: undefined,
// 		isDragging: false
// 	});
// 	const containerRef = useRef();
// 	const cardRefs = useRef([]);
	
// 	useEffect(() => {
// 		const { scrollWidth, clientWidth } = containerRef.current;
// 		console.log('scroll WIDTH:   ', scrollWidth)
// 		console.log('client WIDTH:   ', clientWidth)
// 		const halfScroll = (scrollWidth - clientWidth) / 2;
// 		console.log('HALF SCROLL:   ', halfScroll)
// 		containerRef.current.scrollLeft = halfScroll;
// 	}, [containerRef.current]);

// 	const handleMouseDown = e => {
// 		console.log(`
// ++++ handleMouseDown ++++
//       PageX:  ${e.pageX}
//       Container offsetLeft:  ${containerRef.current.offsetLeft}
//       Container scrollLeft:  ${containerRef.current.scrollLeft}
// ---- handleMouseDown ----
//     `)

// 		setDragStart({
// 			startX: e.pageX - containerRef.current.offsetLeft,
// 			startScrollLeft: containerRef.current.scrollLeft,
// 			isDragging: true
// 		});
// 	}

// 	const handleMouseMove = e => {
// 		if (!isDragging || selectedCard) return;
// 		const x = e.pageX - containerRef.current.offsetLeft;
// 		const walk = x - startX;
//     	console.log(`
// ++++ handleMouseMove ++++
//       PageX:  ${e.pageX}
//       X(e.pageX - containerRef.current.offsetLeft)   :  ${x}
//       walk(x - startX) :  ${x - startX}
//       SET container scrollLeft:  ${startScrollLeft - walk}
// ---- handleMouseMove ----
//     `)
		
// 		containerRef.current.scrollLeft = startScrollLeft - walk;
// 	}

// 	const selectCard = card => {
// 		setSelectedCard(selectedCard ? null : card);

// 		if (card && !selectedCard) {
// 			cardRefs.current[card - 1].scrollIntoView({
// 				behavior: 'smooth',
// 				block: 'nearest',
// 				inline: 'center'
// 			});
// 		}
// 	}

// 	const handleCardMouseUp = (e, card) => {
// 		if (isDragging) {
// 			const x = e.pageX - containerRef.current.offsetLeft;
// 			const walk = x - startX;
// 			// if (Math.abs(walk) < 5) selectCard(card);
// 		} else selectCard(card);
// 	}
	
// 	return (
// 		<div
// 			className="flashcards"
// 			onMouseDown={handleMouseDown}
// 			onMouseUp={() => setDragStart(prev => ({ ...prev, isDragging: false }))}
// 			onMouseMove={handleMouseMove}
// 		>
// 			<div
// 				className="flashcards__container"
// 				ref={containerRef}
// 			>
// 				{cards.map((card, i) => (
// 					<motion.div
// 						className="card"
// 						key={card}
// 						ref={el => cardRefs.current.push(el)}
// 						onMouseUp={e => handleCardMouseUp(e, card)}
// 						// onClick={() => {
// 						// 	if (isDragging) {
// 						// 		return 
// 						// 	}
// 						// 	selectCard(card)
// 						// }}
// 						variants={cardVariants}
// 						animate={selectedCard === card ? 'selected' : 'notSelected'}
// 						custom={selectedCard ? selectedCard - card : 0}
// 					/>
// 				))}
// 			</div>
// 		</div>
// 	)
// }