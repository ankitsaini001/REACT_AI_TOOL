import { useState } from "react";
import "./App.css";
import { URL } from "./constant";
import Answers from "./Answers";

function App() {
  const [askquestion, setQuestion] = useState("");
  const [getresult, setResult] = useState([]);

  const payLoad = {
    contents: [
      {
        parts: [{ text: askquestion }],
      },
    ],
  };

  const askQuery = async () => {
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payLoad),
    });
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());
    //console.log(dataString);
    setResult([...getresult, { type: 'q', text: askquestion }, { type: 'a', text: dataString }]);
  };

  console.log(getresult);


  return (
    <>
      <div className="grid grid-cols-5 h-screen text-white bg-gray-900">
        {/* Sidebar */}
        <div className="col-span-1 bg-zinc-800 flex justify-center">
          <h1 className="text-lg font-bold">{askquestion}</h1>
        </div>

        {/* Main Content Area */}
        <div className="col-span-4 flex flex-col h-screen p-10">
          {/* Response Display Container */}
          <div className="flex-1 overflow-auto bg-zinc-800 p-4 rounded-lg shadow-lg">
            <ul>
              {
                getresult.map((item, index) => (
                  <div key={index + Math.random()} className={item.type == 'q' ? 'flex justify-end' : ''}>
                    {
                      item.type == 'q' ?
                        <li key={index + Math.random()} className="p-2 text-right border-5 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit">
                          <Answers answer={item.text} index={index} totalResult={1}  type={item.type}/>
                        </li> :
                        item.text.map((answerItem, answerIndex) => (
                          <li key={answerIndex + Math.random()} className="p-2 text-left">
                            <Answers answer={answerItem} index={answerIndex} totalResult={item.text.length} type={item.type} />
                          </li>
                        ))
                    }

                  </div>
                ))
              }

            </ul>
            {/* <ul className="space-y-2">
              {getresult.length > 0 ? (
                getresult.map((item, index) => (
                  <li key={index+Math.random()} className="p-2 text-left">
                    <Answers answer={item} index={index} totalResult={getresult.length}/>
                  </li>
                ))
              ) : (
                <p className="text-gray-400 text-center">Ask me anything...</p>
              )}
            </ul> */}
          </div>

          {/* Fixed Input Field at Bottom */}
          <div className="w-full max-w-3xl mt-4 p-2 bg-zinc-800 text-white rounded-full border border-zinc-700 flex items-center shadow-md self-center">
            <input
              type="text"
              value={askquestion}
              onChange={(event) => setQuestion(event.target.value)}
              className="w-full p-3 bg-transparent outline-none"
              placeholder="Ask me anything..."
            />
            <button
              onClick={askQuery}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
