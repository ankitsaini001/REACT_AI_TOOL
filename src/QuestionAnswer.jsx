import Answers from "./Answers";
const QuestionAnswer = ({item,index}) => {
    return (
        <>
            <div key={index + Math.random()} className={item.type == 'q' ? 'flex justify-end' : ''}>
                {
                    item.type == 'q' ?
                        <li key={index + Math.random()} className="p-2 text-right border-5 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit">
                            <Answers answer={item.text} index={index} totalResult={1} type={item.type} />
                        </li> :
                        item.text.map((answerItem, answerIndex) => (
                            <li key={answerIndex + Math.random()} className="p-2 text-left">
                                <Answers answer={answerItem} index={answerIndex} totalResult={item.text.length} type={item.type} />
                            </li>
                        ))
                }

            </div>
        </>
    )
}

export default QuestionAnswer;