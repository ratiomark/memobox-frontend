const question = { 'root': { 'children': [{ 'children': [{ 'detail': 0, 'format': 0, 'mode': 'normal', 'style': '', 'text': 'sfwefwefwe', 'type': 'text', 'version': 1 }], 'direction': 'ltr', 'format': 'center', 'indent': 0, 'type': 'paragraph', 'version': 1 }, { 'children': [{ 'children': [{ 'detail': 0, 'format': 0, 'mode': 'normal', 'style': '', 'text': 'sfwefwefw', 'type': 'text', 'version': 1 }], 'direction': 'ltr', 'format': 'center', 'indent': 0, 'type': 'listitem', 'version': 1, 'value': 1 }], 'direction': 'ltr', 'format': 'center', 'indent': 0, 'type': 'list', 'version': 1, 'listType': 'number', 'start': 1, 'tag': 'ol' }, { 'children': [{ 'altText': 'Yellow flower in tilt shift lens', 'caption': { 'editorState': { 'root': { 'children': [], 'direction': null, 'format': '', 'indent': 0, 'type': 'root', 'version': 1 } } }, 'height': 125, 'maxWidth': 500, 'showCaption': false, 'src': '/src/shared/ui/lexical-playground/src/images/yellow-flower.jpg', 'type': 'image', 'version': 1, 'width': 100 }], 'direction': null, 'format': '', 'indent': 0, 'type': 'paragraph', 'version': 1 }, { 'children': [{ 'detail': 0, 'format': 0, 'mode': 'normal', 'style': '', 'text': 'ацуацу', 'type': 'text', 'version': 1 }], 'direction': 'ltr', 'format': '', 'indent': 0, 'type': 'paragraph', 'version': 1 }, { 'children': [], 'direction': 'ltr', 'format': '', 'indent': 0, 'type': 'paragraph', 'version': 1 }, { 'children': [{ 'detail': 0, 'format': 0, 'mode': 'normal', 'style': '', 'text': 'qua voluptate nulla eu in.', 'type': 'text', 'version': 1 }], 'direction': 'ltr', 'format': '', 'indent': 0, 'type': 'paragraph', 'version': 1 }], 'direction': 'ltr', 'format': '', 'indent': 0, 'type': 'root', 'version': 1 } }
// const questionJSON = JSON.parse(question)
// console.log(qe)
const questionJSON = JSON.parse(JSON.stringify(question))
// console.group(questionJSON)
// console.dir(questionJSON.root.children)
// console.log([0, 1, 2, 3, 4].slice(0, 4))
const rootChildrenUpdated = questionJSON.root.children.slice(0, 4).map(childNode => {
	return { ...childNode, format: '' }
})
questionJSON.root.children = rootChildrenUpdated
console.log(JSON.stringify(questionJSON).replaceAll('"format":"center"', '"format":""'))
// const c0 = rootChildren[0]
// const c1 = rootChildren[1]
// const c2 = rootChildren[2]
// let line1 = ''
// if (c0.type === 'paragraph') {
// 	for (let index = 0; index < c0.children.length; index++) {
// 		const block = c0.children[index]
// 		if (block.type === 'text') {
// 			line1 += block.text
// 		}

// 	}
// }
// console.log(line1)
